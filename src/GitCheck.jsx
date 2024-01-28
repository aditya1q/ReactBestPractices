import React from 'react';

const GitCheck = () => {
    const [count, setCount] = React.useState(0);
    const handleIncrese = () => {
        setCount(prevCount => prevCount + 1)
    }

    const handleDecrese = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1)
        }
    }
    return (
        <div>
            <button onClick={handleIncrese}>increse</button>
            <span>{count}</span>
            <button onClick={handleDecrese}>decrese</button>
        </div>
    );
}

export default GitCheck;
