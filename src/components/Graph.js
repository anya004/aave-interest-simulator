import React, { PureComponent } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';

const GET_ASSET_DATA = gql`
  query GetAssetData {
    reserves (where: {symbol: $symbol}, orderBy: symbol) {
        symbol
        name
        decimals
        utilizationRate
        averageStableRate
        reserveFactor
        borrowingEnabled
        totalLiquidity
        totalCurrentVariableDebt
        totalPrincipalStableDebt
    }
}
`;

// function Graph() {
//     const { loading, error, data } = useQuery(GET_ASSET_DATA);

//     if (loading)
//         return 'Loading...';
//     if (error)
//         return `Error! ${error.message}`;

// }

// const Graph = ({ data }) => (

// );

const Graph = ({ data }) => {
    return (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Principle" stackId="1" stroke="#8884d8" fill="#B6509E" />
        <Area type="monotone" dataKey="Interest" stackId="1" stroke="#82ca9d" fill="#2EBAC6" />
      </AreaChart>
    );
}

export default Graph;