import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {formatAsPercent, getAverageRate} from '../helpers.js';

const GET_ASSET_DATA_FOR_AVG_VARIABLE_30_DAYS = gql`
  query GetAssetDataForAvgVariable30Days($symbol: String!, $timestamp_gte:Int) {
      reserves(where: {symbol: $symbol}) {
          id
          pool
          symbol
          lastUpdateTimestamp
          variableBorrowIndex
          paramsHistory(where: {timestamp_gte: $timestamp_gte}, first: 1, orderBy: timestamp, orderBy: variableBorrowIndex, orderDirection: asc) {
            variableBorrowIndex
            timestamp
        }
      }
  }  
`;  

function Avg30DayVariableAPYDisplay ({ asset }) {
    const [daysAgo30] = useState(Math.round((Date.now()-(30*24*60*60*1000)) / 1000));

    const { loading, error, data } = useQuery(GET_ASSET_DATA_FOR_AVG_VARIABLE_30_DAYS, {
        variables: {symbol: asset, timestamp_gte: daysAgo30},
        pollInterval: 60000,
    });

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;   
    
    return (
      <div class="row">
          <div class="card" style={{height: "auto"}}>
            <div class="card-body" >
                
                <h5 class="text-danger">{ 
                formatAsPercent(
                    getAverageRate(
                        data.reserves[0].paramsHistory[0].variableBorrowIndex,
                        data.reserves[0].variableBorrowIndex,
                        data.reserves[0].paramsHistory[0].timestamp,
                        data.reserves[0].lastUpdateTimestamp
                        )
                    )
                }
                </h5>
                <p class="card-title">30 Day Avg. Variable Borrow Rate</p> 
            </div>
         </div>
      </div>
    );
  };
  
export default Avg30DayVariableAPYDisplay;