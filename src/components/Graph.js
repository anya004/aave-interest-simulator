import { invariant } from 'ts-invariant';
import { cloneDeep, isArray } from 'lodash';
import React, { useState, useMemo, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { getAverageRate, formatGraphData , formatGraphDataVariableBorrowed} from '../helpers.js';
import {
    AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Tooltip, Legend
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
            id
            symbol
            paramsHistory(where: {timestamp_gt: $timestamp_gt, timestamp_lte: $timestamp_lte}, first: $first, orderBy: timestamp, orderDirection: asc) {
                id
                liquidityIndex
                timestamp
                priceInUsd
            }
        }
    }  
`;

const GET_HISTORICAL_ASSET_DATA_FOR_VARIABLE_RATE = gql`
    query VBReservesRatesHistory($timestamp_gt: Int, $timestamp_lte: Int, $symbol: String!, $first: Int) {
        reserves(where: {symbol: $symbol}) {
            id
            symbol
            paramsHistory(where: {timestamp_gt: $timestamp_gt, timestamp_lte: $timestamp_lte}, first: $first, orderBy: timestamp, orderDirection: asc) {
                id
                variableBorrowIndex
                variableBorrowRate
                timestamp
                priceInUsd
            }
        }
    }  
`;



const Graph = ({asset, deposit, borrowAsset, borrowAmount, graphType, currencySelectedOption, setInterstOwed, setInterstEarned}) => {
    const [now] = useState(Math.round(Date.now() / 1000));
    const [daysAgo30] = useState(Math.round((Date.now()-(30*24*60*60*1000)) / 1000));
    console.log("now:", now);
    console.log("daysAgo30:", daysAgo30);

    //DEPOSIT APY
    const { loading, networkStatus, error, data, previousData, fetchMore } = useQuery(GET_HISTORICAL_ASSET_DATA_FOR_AVG_APY, {
        variables: {
            symbol: asset,
            timestamp_gt: daysAgo30,
            timestamp_lte: now,
            first: 1000
        },
        fetchPolicy: 'cache-and-network',
    });

    const maxTimestamp = useMemo(
        () => typeof data !== 'undefined' 
                ? Math.max(...data.reserves[0].paramsHistory.map(({ timestamp }) => timestamp))
                : undefined,
        [data]);
    
    // function fetchMoreData(timestamp) {
    //     while () {
    //         if (networkStatus != 1 || networkStatus != 3) {
    //             continue;
    //         }
            
    //         if (data.reserves[0].paramsHistory.length) {
                
    //         }
            

    //         fetchMore({
    //             variables: {
    //                 timestamp_gt: timestamp
    //             },
    //         });
    //     }
    // }
    
    const fetchedData = useMemo(
        () => {
            let keepScanning = true;

            console.log("Network status", networkStatus);
            if (!data) {
                console.log("Supposedly no data..", data);
                return;
            }
            
            if (loading) {
                console.log("Stop useMemo because query is currently loading", loading);
                //return;
            }
    
            console.log("About to call fetchMore in useMemo");
            console.log("maxTimestamp:", maxTimestamp)
            if (networkStatus != 1 || networkStatus != 3) {
                fetchMore({
                    variables: {
                        timestamp_gt: maxTimestamp
                    },
                });
            }
        },
    [maxTimestamp, data, loading]);

    //does not stop reloading and fetching more    
    // useEffect(() => {
    //     if (!data) {
    //         console.log("Supposedly no data..", data);
    //         return;
    //     }

    //     if (loading) {
    //         console.log("Stop useEffect because query is currently loading", loading);
    //         return;
    //     }

    //     console.log("About to call fetchMore in UseEffect");
    //     console.log("maxTimestamp:", maxTimestamp)
    //     fetchMore({
    //         variables: {
    //             timestamp_gt: maxTimestamp
    //         },
    //     });
        
    // }, [maxTimestamp, loading, data]);


    // useEffect(() => {
    //     if (!data)
    //         return;

    //     let keepScanning = true;

    //     console.log('data', JSON.parse(JSON.stringify(data)));
    //     if (keepScanning){
    //         // debugger;
    //         const maxTimestamp = Math.max(...data.reserves[0].paramsHistory.map(({ timestamp }) => timestamp));
    //         fetchMore({
    //             variables: {
    //                 timestamp_gt: maxTimestamp
    //             },
    //             updateQuery: (prev, { fetchMoreResult }) => {
    //                 console.log("deposit query prev", prev);
    //                 if (!fetchMoreResult) {
    //                     return prev;
    //                 }

    //                 if (!fetchMoreResult.reserves[0].paramsHistory.length) {
    //                     keepScanning = false;
    //                     return prev;
    //                 }

    //                 invariant(isArray(fetchMoreResult.reserves[0].paramsHistory), "fetchMoreResult paramsHistory expected to be an array");

    //                 const retval = {
    //                     ...prev,
    //                     reserves: [
    //                         {
    //                             paramsHistory: [
    //                                 ...(prev.reserves[0].paramsHistory || []),
    //                                 ...fetchMoreResult.reserves[0].paramsHistory,
    //                             ]
    //                         }
    //                     ]
    //                 };
    //                 console.log('data retval', JSON.parse(JSON.stringify(retval)));
    //                 return retval;
    //             }
    //         });
    //     }

    //     return () => {
    //         keepScanning = false;
    //         console.log("data useEffect exunt");
    //     }
    // }, [data]);

    // const graphData = useMemo(() => {
    //     const paramsHistory = data?.reserves?.[0]?.paramsHistory;
    //     if (!paramsHistory) return [];
    //     return formatGraphData(data.reserves[0].paramsHistory, deposit);
    // }, [data]);
    
    //VARIABLE BORROW
    // const { data: dataVB, error: errorVB, loading: loadingVB, fetchMore: fetchMoreVB} = useQuery(GET_HISTORICAL_ASSET_DATA_FOR_VARIABLE_RATE, {
    //     variables: {
    //         symbol: borrowAsset,
    //         timestamp_gt: daysAgo30,
    //         timestamp_lte: now,
    //         first: 1000
    //     },
        //fetchPolicy: 'no-cache',
    // });

    // useEffect(() => {
    //     if (!dataVB)
    //         return;

    //     let keepScanningVB = true;

    //     console.log('dataVB', JSON.parse(JSON.stringify(dataVB)));
    //     console.log("keepScanningVB?", keepScanningVB);
    //     if (keepScanningVB){
    //         // debugger;
    //         const maxTimestampVB = Math.max(...dataVB.reserves[0].paramsHistory.map(({ timestamp }) => timestamp));
    //         fetchMoreVB({
    //             variables: {
    //                 timestamp_gt: maxTimestampVB
    //             },
    //             updateQuery: (prev, { fetchMoreResult }) => {
    //                 console.log("borrow query prev", prev);
    //                 if (!fetchMoreResult) {
    //                     return prev;
    //                 }

    //                 if (!fetchMoreResult.reserves[0].paramsHistory.length) {
    //                     keepScanningVB = false;
    //                     return prev;
    //                 }

    //                 invariant(isArray(fetchMoreResult.reserves[0].paramsHistory), "fetchMoreResult paramsHistory expected to be an array");

    //                 const retval = {
    //                     ...prev,
        //                 reserves: [
        //                     {
        //                         paramsHistory: [
        //                             ...(prev.reserves[0].paramsHistory || []),
        //                             ...fetchMoreResult.reserves[0].paramsHistory,
        //                         ]
        //                     }
        //                 ]
        //             };

        //             console.log('dataVB retval', JSON.parse(JSON.stringify(retval)));
        //             return retval;
        //         }
        //     });
        // }

    //     return () => {
    //         keepScanningVB = false;
    //         console.log("dataVB useEffect exunt");
    //     }
    // }, [dataVB]);

    if (loading || networkStatus === 3)
        return 'Loading...';
    // if (loadingVB)
    //     return 'Loading...';
    if (error)
        return `Error! ${error.message}`;
    // if (errorVB)
    //     return `Error! ${errorVB.message}`;

    console.log("Rendering with fetchedData.reserves[0].paramsHistory.length", data.reserves[0].paramsHistory.length, data.reserves[0].paramsHistory.slice(-1)[0].id);

    // console.log("rendering with data", JSON.parse(JSON.stringify(data)), "dataVB", JSON.parse(JSON.stringify(dataVB)));
    
    const graphData = formatGraphData(data.reserves[0].paramsHistory, deposit);
    // const graphDataVariableBorrow = formatGraphDataVariableBorrowed(dataVB.reserves[0].paramsHistory, borrowAmount);
    //console.log("graphDataVariableBorrow:", graphDataVariableBorrow);

    //console.log("Graph Data:", graphData);

    // const mergedData = [
    //     ...graphData,
    //     ...graphDataVariableBorrow,
    // ];
    //console.log("Merged Data", mergedData);

    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour12: false};
    if (graphType === "interest") {
        //console.log("here", graphDataVariableBorrow[graphDataVariableBorrow.length - 1].OwedInterestUsd);
        //setInterstOwed(graphDataVariableBorrow[graphDataVariableBorrow.length-1].OwedInterestUsd);
        console.log("Setting InterestUsd state in graph with: ", graphData[graphData.length-1].InterestUsd)
        //setInterstEarned(graphData[graphData.length-1].InterestUsd);
        return (
            <>
            <ResponsiveContainer width="100%" height="85%">
                <ComposedChart
                    padding={{top:0}}
                    margin={{
                    top: 0, right: 30, left: 30, bottom: 30,
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
                        tickFormatter = {(unixTime) => new Date(unixTime*1000).toLocaleDateString("default", { month: 'short', day: "numeric" })}
                        dataKey="day"
                        />
                    <YAxis 
                        label={{ value: currencySelectedOption === "native" ?  asset:"USD", angle: -90, position: 'insideLeft'}}
                    />
                    <Tooltip 
                        labelFormatter={(unixTime) => new Date(unixTime*1000).toLocaleString('en-US')}
                        formatter={
                            (value,) => ( 
                                [
                                    currencySelectedOption === "native" ? value.toFixed(3).toString().concat(" ", asset):"$".concat(value.toFixed(2).toString()), 
                                ]
                            )
                        }
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" data={graphData} dataKey={currencySelectedOption === "native" ?  "Interest":"InterestUsd"} name="Earned Interest" stackId="1" fill="#B6509E" stroke="#B6509E" />
                    {/* <Line type="monotone" data={graphDataVariableBorrow} dataKey={currencySelectedOption == "native" ?  "OwedInterest":"OwedInterestUsd"} name="Owed Interest" stackId="1" stroke="#2EBAC6" fill="#2EBAC6" /> */}
                </ComposedChart>
            </ResponsiveContainer>
            <button onClick={() => {
                console.log("Before fetchMore PreviousData:", previousData);
                console.log("maxTime:", maxTimestamp);
                fetchMore({
                    variables: {
                        timestamp_gt: maxTimestamp,
                    },
                });
            }
            }/>
            </>
        );
    }
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
{/* <Area type="monotone" dataKey={currencySelectedOption == "native" ?  "Interest":"InterestUsd"} stackId="1" stroke="#B6509E"  fill="#B6509E" />
                    <Area type="monotone" dataKey={currencySelectedOption == "native" ?  "OwedInterest":"OwedInterestUsd"} stackId="1" stroke="#B6509E"  fill="#2EBAC6" /> */}

export default Graph;