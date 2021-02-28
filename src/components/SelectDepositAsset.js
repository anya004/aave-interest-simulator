import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_ASSET_SYMBOLS = gql`
  query GetAssetSymbols {
    reserves (where: {isActive: true}, orderBy: symbol) {
        symbol
        usageAsCollateralEnabled
        borrowingEnabled
    }
}
`;

function SelectDepositAsset({ onChange, value, depositAssetAsCollatoral, setDepositAssetAsCollatoral }) {
    const { loading, error, data } = useQuery(GET_ASSET_SYMBOLS);

    function handleChange(e) {
        console.log("Asset Selected!!")
        onChange?.(e.target.value);
        // onChange?.(JSON.parse(e.target.value).symbol);
        // setDepositAssetAsCollatoral?.(JSON.parse(e.target.value).collateral);
    }

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;
    
    return (
        <form class="form-floating">
        <select id="floatingSelectDepositValue" class="form-select form-select-sm mb-3" onChange={handleChange} value={value}>
            {data.reserves.map((reserve, i) => (
                <option key={reserve.symbol} value={reserve.symbol}>
                    {reserve.symbol}
                </option>
            ))}
        </select>
        <label for="floatingSelectDepositValue">Deposit Asset</label>
        </form>
    );
}

export default SelectDepositAsset;
