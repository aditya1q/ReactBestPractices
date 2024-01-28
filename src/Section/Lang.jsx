import React from 'react';

const Lang = () => {
    const data = [
        {
            id: 1,
            name: "aditya",
            course: "MCA"
        },
        {
            id: 2,
            name: "Kanha",
            course: "BCA"
        },
        {
            id: 3,
            name: "Mohit",
            course: "MSC"
        },
        {
            id: 4,
            name: "Anubhav",
            course: "BSC"
        },
    ];

    return (
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center' }}>
            {data.map((item) => {
                return (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <h2>{item.course}</h2>
                    </div>
                );
            })}
        </section>
    );
};

export default Lang;
