import logo from './../logo.svg';
import './../styles/App.css';
import React, { useState } from 'react';
import Header from './Header.js';
import List from './List.js';
import SelectDepositAsset from './SelectDepositAsset.js';
import SelectBorrowAsset from './SelectBorrowAsset.js';
import DepositAmountTextbox from './DepositAmountTextbox.js';
import BorrowAmountTextbox from './BorrowAmountTextbox.js';
import GraphRadio from './GraphRadio';
import CurrencyRadio from './CurrencyRadio.js';
import Graph from './Graph.js';
import CurrentAPYDisplay from './CurrentAPYDisplay.js';
import Avg30DayAPYDisplay from './Avg30DayAPYDisplay.js';

function App() {
  const [asset, setAsset] = useState("DAI");
  const [borrowAsset, setBorrowAsset] = useState("DAI");
  const [deposit, setDeposit] = useState(1000);
  const [borrowed, setBorrowed] = useState(0);
  const [radioSelectedOption, setRadioSelectedOption] = useState("interest");
  const [currencySelectedOption, setCurrencySelectedOption] = useState("native");

  return (
    <div className="App">
      <Header class="row" />
      <div class="App-page">
        <div class="container-fluid row">
          <div class="col-2">
            <SelectDepositAsset onChange={setAsset} value={asset} />
          </div>
          <div class="col-3">
            <DepositAmountTextbox onChange={setDeposit} value={deposit} />
          </div>
          <div class="col-2">
            <SelectBorrowAsset onChange={setBorrowAsset} value={borrowAsset} />
          </div>
          <div class="col-3">
            <BorrowAmountTextbox onChange={setBorrowed} value={borrowed} />
          </div>
        </div>
        
        <div class="container-fluid row">
          <div class="col-9">
            <div class="row">
              <div class="col-3"> 
                <GraphRadio onChange={setRadioSelectedOption} radioSelectedOption={radioSelectedOption} />
              </div>
              <div class="col-3">
                <CurrencyRadio onChange={setCurrencySelectedOption} currencySelectedOption={currencySelectedOption} />
              </div>
            </div>
            <div class="row Graph">
              {radioSelectedOption == "interest" &&
                <h4>Accumulated Interest Based on Last 30 Days</h4>
              }
              {radioSelectedOption == "rate" &&
                <h4>Historical Rate Over the Last 30 Days</h4>
              }
              <Graph asset={asset} deposit={deposit} borrowAsset={borrowAsset} graphType={radioSelectedOption} currencySelectedOption={currencySelectedOption}/>
            </div>
          </div>
          <div class="col-3 w-25">
            <CurrentAPYDisplay asset={asset} />
            <Avg30DayAPYDisplay asset={asset} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
