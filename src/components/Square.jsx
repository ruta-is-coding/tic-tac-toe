// src/components/Square.js
import React from 'react';

const Square = ({ value, onClick, index }) => {
    return (
        <button className="square" onClick={onClick} data-cy={`square-${index}`}>
            {value}
        </button>
    );
};

export default Square;