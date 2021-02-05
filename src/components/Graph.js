import { invariant } from 'ts-invariant';
import { isArray } from 'lodash';
import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getAverageRate, formatGraphData } from '../helpers.js';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Tooltip,
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

const Graph = ({asset, deposit}) => {
    const [now] = useState(Math.round(Date.now() / 1000));
    const [daysAgo30] = useState(Math.round((Date.now()-(30*24*60*60*1000)) / 1000));

    const { loading, error, data, fetchMore } = useQuery(GET_HISTORICAL_ASSET_DATA_FOR_AVG_APY, {
        variables: {
            symbol: asset,
            timestamp_gt: daysAgo30,
            timestamp_lte: now,
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
    }, [data]);

    // const graphData = useMemo(() => {
    //     const paramsHistory = data?.reserves?.[0]?.paramsHistory;
    //     if (!paramsHistory) return [];

    //     // compute here...

    //     return someTransformationOfData;
    // }, [data]);

    if (loading)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;  

    console.log("Rendering with data.reserves[0].paramsHistory.length", data.reserves[0].paramsHistory.length);
    
    const graphData = formatGraphData(data.reserves[0].paramsHistory, deposit);
    console.log("Graph Data:", graphData.slice(0, 300));

    return (
        <ResponsiveContainer width="85%" height="85%">
            <AreaChart
                data={graphData}
                margin={{
                top: 30, right: 30, left: 30, bottom: 15,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    label={{ value: 'Day', position: "insideBottom", offset: -10 }}
                    scale="time"
                    type="number"
                    domain = {['auto', 'auto']}
                    tickCount={9}
                    angle={-30}
                    interval="preserveStartEnd"
                    tickFormatter = {(unixTime) => new Date(unixTime*1000).toLocaleDateString()}
                    dataKey="day"
                    />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Interest" stackId="1" stroke="#82ca9d" fill="#2EBAC6" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
//<Area type="monotone" dataKey="Principle" stackId="1" stroke="#8884d8" fill="#B6509E" />

export default Graph;