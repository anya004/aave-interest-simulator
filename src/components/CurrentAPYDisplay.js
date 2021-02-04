import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {formatAsPercent, getInstantPoolDepositAPY} from '../helpers.js';

const GET_ASSET_DATA_FOR_APY = gql`
  query GetAssetDataForAPY($symbol: String!) 
    {
        reserves (where: {symbol: $symbol}) {
          symbol
          decimals
          averageStableRate
          utilizationRate
          totalCurrentVariableDebt
          reserveFactor
          totalPrincipalStableDebt
          borrowingEnabled
          stableDebtLastUpdateTimestamp
          variableBorrowRate
        }
    }
`;

function CurrentAPYDisplay ({ asset }) {
    const { loading, error, data } = useQuery(GET_ASSET_DATA_FOR_APY, {
        variables: {symbol: asset},
        pollInterval: 15000,
    });

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;   
    
    //console.log(formatAsPercent(getInstantPoolDepositAPY(data.reserves[0])));
    return (
      <div className="App">
          <label>Current APY Rate: {formatAsPercent(getInstantPoolDepositAPY(data.reserves[0]))}</label>
      </div>
    );
  };
  
export default CurrentAPYDisplay;