import { invariant } from 'ts-invariant';
import { isArray } from 'lodash';
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getAverageRate } from '../helpers.js';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
  } from 'recharts';

const GET_CURRENT_ASSET_DATA_FOR_AVG_APY = gql`
  query ReservesRatesCurrent($symbol: String!) {
      reserves(where: {symbol: $symbol}) {
          id
          pool
          symbol
          lastUpdateTimestamp
          liquidityIndex
          variableBorrowIndex
      }
  }  
`;  

const GET_HISTORICAL_ASSET_DATA_FOR_AVG_APY = gql`
    query ReservesRatesHistory($timestamp_gt: Int, $timestamp_lte: Int, $symbol: String!, $first: Int) {
        reserves(where: {symbol: $symbol}) {
            paramsHistory(where: {timestamp_gt: $timestamp_gt, timestamp_lte: $timestamp_lte}, first: $first, orderBy: timestamp, orderDirection: asc) {
                variableBorrowIndex
                liquidityIndex
                timestamp
            }
        }
    }  
`;

const data_graph = [
    {
      day: 'Page A', Principle: 4000, Interest: 2400,
    },
    {
      day: 'Page B', Principle: 3000, Interest: 1398,
    },
    {
      day: 'Page C', Principle: 2000, Interest: 9800,
    },
    {
      day: 'Page D', Principle: 2780, Interest: 3908,
    },
    {
      day: 'Page E', Principle: 1890, Interest: 4800,
    },
    {
      day: 'Page F', Principle: 2390, Interest: 3800,
    },
    {
      day: 'Page G', Principle: 3490, Interest: 4300,
    },
];

const Graph = ({asset}) => {

    const { loading, error, data, fetchMore } = useQuery(GET_HISTORICAL_ASSET_DATA_FOR_AVG_APY, {
        variables: {
            symbol: asset,
            timestamp_gt: 1609858800, //convert to a function
            timestamp_lte: 1612537620, //convert to a function, starts at now...
            first: 1000
        },
    });

    console.log(data);

    useEffect(() => {
        if (!data)
            return;

        let keepScanning = true;

        if (keepScanning){
            // debugger;
            const maxTimestamp = Math.max(...data.reserves[0].paramsHistory.map(({ timestamp }) => timestamp));
            fetchMore({
                variables: {
                    timestamp_gt: maxTimestamp
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                        return prev;
                    }

                    if (!fetchMoreResult.reserves[0].paramsHistory.length) {
                        keepScanning = false;
                        return prev;
                    }

                    invariant(isArray(prev.reserves[0].paramsHistory), "prev paramsHistory expected to be an array");
                    invariant(isArray(fetchMoreResult.reserves[0].paramsHistory), "fetchMoreResult paramsHistory expected to be an array");

                    return {
                        reserves: [
                            {
                                paramsHistory: [
                                    ...prev.reserves[0].paramsHistory,
                                    ...fetchMoreResult.reserves[0].paramsHistory,
                                ]
                            }
                        ]
                    };
                }
            });
        }

        return () => {
            keepScanning = false;
        }
    }, [data])

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;  

    console.log("Rendering with data.reserves[0].paramsHistory.length", data.reserves[0].paramsHistory.length);
    
    return (
        <ResponsiveContainer width="85%" height="85%">
            <AreaChart
                data={data_graph}
                margin={{
                top: 30, right: 30, left: 30, bottom: 15,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: 'Day', position: "insideBottom", offset: -10 }} dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Principle" stackId="1" stroke="#8884d8" fill="#B6509E" />
                <Area type="monotone" dataKey="Interest" stackId="1" stroke="#82ca9d" fill="#2EBAC6" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default Graph;