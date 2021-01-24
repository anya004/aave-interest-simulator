import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_LENDINGPOOL_CONF = gql`
  query LendingPoolConf {
    lendingPoolConfigurations(first: 5) {
      id
      lendingPool
      lendingPoolCore
      lendingPoolParametersProvider
      reserves {
        symbol
        name
        decimals
        isActive
        utilizationRate
        borrowingEnabled
        stableBorrowRateEnabled
        reserveInterestRateStrategy
        variableRateSlope1
        variableRateSlope2
        stableRateSlope1
        stableRateSlope2
        baseVariableBorrowRate
        totalLiquidity 
      }
    }
  }
`;

 function List() {
    const { loading, error, data } = useQuery(GET_LENDINGPOOL_CONF);

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;

    console.log(data);

    return (
        <ul>
            {data.lendingPoolConfigurations[0].reserves.map((reserve, i) => (
                <li key={reserve.symbol}>{reserve.name} ({reserve.symbol}), utilization rate: {reserve.utilizationRate}</li>
            ))}
        </ul>
    );
}

export default List;
