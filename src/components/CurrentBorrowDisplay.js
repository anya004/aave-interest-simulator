import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {formatAsPercent, getDecimal} from '../helpers.js';

const GET_ASSET_DATA_FOR_BORROW_APR = gql`
  query GetAssetDataForBorrow($symbol: String!) 
    {
        reserves (where: {symbol: $symbol}) {
          variableBorrowRate
          stableBorrowRate
        }
    }
`;

function CurrentBorrowDisplay ({ asset }) {
    const { loading, error, data } = useQuery(GET_ASSET_DATA_FOR_BORROW_APR, {
        variables: {symbol: asset},
        pollInterval: 60000,
    });

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;   
    
    //console.log(formatAsPercent(getInstantPoolDepositAPY(data.reserves[0])));
    return (
      <React.Fragment>
        <div class="row">
      <div class="row">
        <div class="card" style={{height: "auto"}}>
            <div class="card-body">
                <h5 class="card-title text-danger">{formatAsPercent(getDecimal(data.reserves[0].variableBorrowRate,27))}
                </h5>
                <p>Current Variable Borrow APR Rate</p>
            </div>
        </div>
      </div>
      </div>
      <div class="row">
      <div class="row">
          <div class="card" style={{height: "auto"}}>
              <div class="card-body">
                  <h5 class="card-title text-danger">{formatAsPercent(getDecimal(data.reserves[0].stableBorrowRate,27))}
                  </h5>
                  <p>Current Stable APR Rate</p>
              </div>
          </div>
      </div>
      </div>
      </React.Fragment>
    );
  };
  
export default CurrentBorrowDisplay;