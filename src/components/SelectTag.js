import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_ASSET_SYMBOLS = gql`
  query GetAssetSymbols {
    reserves (where: {isActive: true}, orderBy: symbol) {
        symbol
    }
}
`;

function SelectTag({ onChange, value }) {
    const { loading, error, data } = useQuery(GET_ASSET_SYMBOLS);

    function handleChange(e) {
        console.log("Asset Selected!!");
        onChange?.(e.target.value);
    }

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;
    
    return (
        <select onChange={handleChange} value={value}>
            {data.reserves.map((reserve, i) => (
                <option key={reserve.symbol} value={reserve.symbol}>{reserve.symbol}</option>
            ))}
        </select>
    );
}

export default SelectTag;
