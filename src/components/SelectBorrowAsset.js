import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_BORROWABLE_ASSET_SYMBOLS = gql`
  query GetBorrowAssetSymbols {
    reserves (where: {isActive: true, borrowingEnabled: true}, orderBy: symbol) {
        symbol
    }
}
`;

function SelectBorrowAsset({ onChange, value }) {
    const { loading, error, data } = useQuery(GET_BORROWABLE_ASSET_SYMBOLS, {
        fetchPolicy: "network-only"
      });

    function handleChange(e) {
        console.log("Borrow Asset Selected!!");
        onChange?.(e.target.value);
    }

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;
    
    return (
        <form class="form-floating">
        <select id="floatingSelectBorrowValue" class="form-select form-select-sm mb-3" onChange={handleChange} value={value}>
            {data.reserves.map((reserve, i) => (
                <option key={reserve.symbol} value={reserve.symbol}>
                    {reserve.symbol}
                </option>
            ))}
        </select>
        <label for="floatingSelectBorrowValue">Borrow Asset</label>
        </form>
    );
}

export default SelectBorrowAsset;
