import React from 'react';
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
      <div class="row">
      <div class="card" style={{height: "5rem"}}>
        <div class="card-body">
             
            <h5 class="card-title text-success">{formatAsPercent(getInstantPoolDepositAPY(data.reserves[0]))}
            </h5>
            <p>Current Deposit APY Rate</p>
        </div>
     </div>
  </div>
    );
  };
  
export default CurrentAPYDisplay;