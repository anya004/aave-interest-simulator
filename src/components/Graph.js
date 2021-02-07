import { invariant } from 'ts-invariant';
import { isArray } from 'lodash';
import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMemo } from '@apollo/client';
import { getAverageRate, formatGraphData } from '../helpers.js';
import {
    AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Tooltip,
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
                liquidityIndex
                timestamp
                priceInUsd
            }
        }
    }  
`;

const GET_HISTORICAL_ASSET_DATA_FOR_VARIABLE_RATE = gql`
    query ReservesRatesHistory($timestamp_gt: Int, $timestamp_lte: Int, $symbol: String!, $first: Int) {
        reserves(where: {symbol: $symbol}) {
            paramsHistory(where: {timestamp_gt: $timestamp_gt, timestamp_lte: $timestamp_lte}, first: $first, orderBy: timestamp, orderDirection: asc) {
                variableBorrowIndex
                timestamp
                priceInUsd
            }
        }
    }  
`;

const Graph = ({asset, deposit, borrowAsset, graphType, currencySelectedOption}) => {
    const [now] = useState(Math.round(Date.now() / 1000));
    const [daysAgo30] = useState(Math.round((Date.now()-(30*24*60*60*1000)) / 1000));

    //DEPOSIT APY
    const { loading, error, data, fetchMore } = useQuery(GET_HISTORICAL_ASSET_DATA_FOR_AVG_APY, {
        variables: {
            symbol: asset,
            timestamp_gt: daysAgo30,
            timestamp_lte: now,
            first: 1000
        },
    });

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
    //     return formatGraphData(data.reserves[0].paramsHistory, deposit);
    // }, [data]);
    
    //VARIABLE BORROW
    const { data: dataVB, error: errorVB, loading: loadingVB, fetchMore: fetchMoreVB} = useQuery(GET_HISTORICAL_ASSET_DATA_FOR_VARIABLE_RATE, {
        variables: {
            symbol: borrowAsset,
            timestamp_gt: daysAgo30,
            timestamp_lte: now,
            first: 1000
        },
    });

    useEffect(() => {
        if (!dataVB)
            return;

        let keepScanningVB = true;

        if (keepScanningVB){
            // debugger;
            const maxTimestampVB = Math.max(...dataVB.reserves[0].paramsHistory.map(({ timestamp }) => timestamp));
            fetchMoreVB({
                variables: {
                    timestamp_gt: maxTimestampVB
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                        return prev;
                    }

                    if (!fetchMoreResult.reserves[0].paramsHistory.length) {
                        keepScanningVB = false;
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
            keepScanningVB = false;
        }
    }, [dataVB]);

    if (loading || loadingVB)
        return 'Loading...';
    if (error)
        return `Error! ${error.message}`;
    if (errorVB)
        return `Error! ${errorVB.message}`;

    console.log("Rendering with dataVB.reserves[0].paramsHistory.length", data.reserves[0].paramsHistory.length);
    
    const graphData = formatGraphData(data.reserves[0].paramsHistory, deposit);
    console.log("Graph Data:", graphData.slice(0, 300));

    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour12: false};
    if (graphType === "interest")
        return (
            <ResponsiveContainer width="100%" height="85%">
                <AreaChart
                    data={graphData}
                    margin={{
                    top: 20, right: 30, left: 30, bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <defs>
                        <linearGradient id="colorUv"  x1="0" y1="1" x2="1" y2="0">
                            <stop offset="5%" stopColor="#2EBAC6" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#B6509E" stopOpacity={0.7}/>
                        </linearGradient>
                    </defs>
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
                    <YAxis 
                        label={{ value: currencySelectedOption == "native" ?  asset:"USD", angle: -90, position: 'insideLeft'}}
                    />
                    <Tooltip 
                        labelFormatter={(unixTime) => new Date(unixTime*1000).toLocaleString('en-US')}
                        formatter={
                            (value, name, props) => ( 
                                [
                                    currencySelectedOption == "native" ? value.toFixed(3).toString().concat(" ", asset):"$".concat(value.toFixed(2).toString()), 
                                    "Interest", 
                                ] 
                            )
                        }
                    />
                    <Area type="monotone" dataKey={currencySelectedOption == "native" ?  "Interest":"InterestUsd"} stackId="1" stroke="#B6509E"  fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    else
        return (
            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={graphData}
                    margin={{
                    top: 20, right: 30, left: 30, bottom: 20,
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
                    <YAxis 
                        label={{ value: "Percent", angle: -90, position: 'insideLeft'}}
                    />
                    <Tooltip 
                        labelFormatter={(unixTime) => new Date(unixTime*1000).toLocaleString('en-US')}
                    />
                    <Line type="monotone" dataKey="Rate" stackId="1" stroke="#B6509E" fill="#2EBAC6" />
                </LineChart>
            </ResponsiveContainer>
        );
}
//<Area type="monotone" dataKey="Principle" stackId="1" stroke="#8884d8" fill="#B6509E" /> fill="#2EBAC6"

export default Graph;