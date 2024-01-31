import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MarginLineChart = () => {
  const [dealer, setDealer] = useState([]);
  const [liveData, setLiveDataInternal] = useState(null);
  const [dealerId, setDealerID] = useState("admin");
  const [dealerName, setDealerName] = useState("admin");
  const [highest, setHighest] = useState();
  const [lowest, setLowest] = useState();
  const [current, setCurrent] = useState();

  const [dataAvailable, setDataAvailable] = useState(true);

  const api_server_url = process.env.REACT_APP_API_SERVER_URL;

  const handleDealer = (event) => {
    const selectedDealer = event.target.value;
    setDealerID(event.target.value);
    setDealerName(event.target.value);
  };

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://216.48.189.254:5001/dealer/marginchart`).then((res) => {
        console.log("set dealer", res.data);
        const dealerName = res.data;
        const dealerNameFinal = dealerName.map((dealer) => ({
          value: dealer.id,
          label: dealer.name,
        }));
        setDealer(dealerNameFinal);
        axios
          .post(`http://216.48.189.254:5001/dealer/marginchart`, {
            dealer_id: "admin",
            days: 1,
          })
          .then((res) => {
            console.log(res.data);
            setLiveDataInternal(res.data.data);
            setHighest(res.data.highest);
            setLowest(res.data.lowest);
            setCurrent(res.data.current);
          })
          .catch((error) => {
            console.error(
              "Error fetching data for the selected dealer:",
              error
            );
            setDataAvailable(false);
          });
      });
    };

    // Initial call
    fetchData();

    // Set up an interval to call fetchData every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    // Cleanup function to clear the interval if the component unmounts
    return () => clearInterval(intervalId);
  }, [api_server_url]);

  if (!dataAvailable) {
    <p className="flex items-center justify-center h-full text-sm text-gray-500">
      Data not available
    </p>;
  }

  if (!liveData) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading.....
      </div>
    );
  }

  return (
    // <div className="flex flex-col items-center">
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer>
        <AreaChart
          data={liveData}
          isAnimationActive={false} // Disable animations for the AreaChart
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b9599" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b9599" stopOpacity="0" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="time"
            tick={{
              fontSize: "10px",
              fill: "white",
              angle: -15,
              textAnchor: "middle",
            }}
          />
          <YAxis
            dataKey="usedMargin"
            tick={{ fontSize: "10px", fill: "white" }}
          />

          <Area
            type="monotone"
            dataKey="usedMargin"
            stroke="#3b9599"
            fill="url(#gradient)" // Apply the gradient fill
          />

          <Tooltip
            content={(dataItem) => {
              if (dataItem.payload && dataItem.payload.length > 0) {
                const timeValue = dataItem.payload[0].payload.time;
                const sumValue = dataItem.payload[0].payload.usedMargin;
                return (
                  <div
                    style={{
                      background: "rgba(1, 13, 18, 0.95)",
                      color: "white",
                      borderRadius: "5px",
                      padding: "8px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Value: {sumValue}
                    </p>
                    <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Time: {timeValue}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    // {/* <div>
    //   <h3 className="text-center text-sm">Margin Line Chart</h3>
    // </div> */}
    // </div>
  );
};

export default MarginLineChart;
