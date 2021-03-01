import React, { useState, useMemo } from 'react';
import { gql } from '@apollo/client';
import { useParamsHistoryData } from '../hooks/useParamsHistoryData';
import { formatGraphData , formatGraphDataVariableBorrowed} from '../helpers.js';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart, Tooltip, Legend
  } from 'recharts';

// const GET_CURRENT_ASSET_DATA_FOR_AVG_APY = gql`
//   query ReservesRatesCurrent($symbol: String!) {
//       reserves(where: {symbol: $symbol}) {
//           id
//           pool
//           symbol
//           lastUpdateTimestamp
//           liquidityIndex
//           variableBorrowIndex
//       }
//   }  
// `;  

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



const Graph = ({asset, deposit, borrowAsset, borrowAmount, graphType, currencySelectedOption, setInterestOwed, setInterestEarned}) => {
    const [now] = useState(Math.round(Date.now() / 1000));
    const [daysAgo30] = useState(Math.round((Date.now()-(30*24*60*60*1000)) / 1000));
    console.log("now:", now);
    console.log("daysAgo30:", daysAgo30);

    const {
        data: dataAvg,
        loading: loadingAvg,
        error: errorAvg,
      } = useParamsHistoryData(
        GET_HISTORICAL_ASSET_DATA_FOR_AVG_APY,
        asset,
        now,
        daysAgo30
      );
    
    const {
        data: dataBor,
        loading: loadingBor,
        error: errorBor,
      } = useParamsHistoryData(
        GET_HISTORICAL_ASSET_DATA_FOR_VARIABLE_RATE,
        borrowAsset,
        now,
        daysAgo30
      );

    const graphData = useMemo(
        () => {
            if (loadingAvg || errorAvg)
                return null;
            else
                return formatGraphData(dataAvg.reserves[0].paramsHistory, deposit);
        },
        [loadingAvg, errorAvg, dataAvg, deposit]
      );

    const graphDataVariableBorrow = useMemo(
        () => {
            if (loadingBor || errorBor)
                return null;
            else
                return formatGraphDataVariableBorrowed(dataBor.reserves[0].paramsHistory, borrowAmount);
        },
        [loadingBor, errorBor, dataBor, borrowAmount]
      );

    if (loadingAvg)
        return 'Loading...';
    if (loadingBor)
        return 'Loading...';
    if (errorAvg)
        return `Error! ${errorAvg.message}`;
    if (errorBor)
        return `Error! ${errorBor.message}`;

    //console.log("Rendering with dataAvg.reserves[0].paramsHistory.length", dataAvg.reserves[0].paramsHistory.length, dataAvg.reserves[0].paramsHistory.slice(-1)[0].id);

    //let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour12: false};
    if (graphType === "interest") {
        //console.log("here", graphDataVariableBorrow[graphDataVariableBorrow.length - 1].OwedInterestUsd);
        setInterestOwed(graphDataVariableBorrow[graphDataVariableBorrow.length-1].OwedInterestUsd);
        console.log("Setting InterestUsd state in graph with: ", graphData[graphData.length-1].InterestUsd)
        setInterestEarned(graphData[graphData.length-1].InterestUsd);
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
                    <Line type="monotone" data={graphDataVariableBorrow} dataKey={currencySelectedOption === "native" ?  "OwedInterest":"OwedInterestUsd"} name="Owed Interest" stackId="1" stroke="#2EBAC6" fill="#2EBAC6" />
                </ComposedChart>
            </ResponsiveContainer>
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
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey="DepositRate" name="Deposit Rate" stackId="1" stroke="#B6509E" fill="#2EBAC6" />
                </LineChart>
            </ResponsiveContainer>
        );
}

export default Graph;