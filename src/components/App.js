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
import Avg30DayVariableAPYDisplay from './Avg30DayVariableAPYDisplay.js';
import InterestBalance from './InterestBalance.js';
import CurrentBorrowDisplay from './CurrentBorrowDisplay.js';
import Footer from './Footer.js';

function App() {
  const [asset, setAsset] = useState("DAI");
  const [depositAssetAsCollatoral, setDepositAssetAsCollatoral] = useState(true);
  const [borrowAsset, setBorrowAsset] = useState("DAI");
  const [deposit, setDeposit] = useState(1000);
  const [borrowed, setBorrowed] = useState(0);
  const [radioSelectedOption, setRadioSelectedOption] = useState("interest");
  const [currencySelectedOption, setCurrencySelectedOption] = useState("native");
  const [interestEarned, setInterstEarned] = useState(0);
  const [interestOwed, setInterstOwed] = useState(0);

  return (
    <div className="App">
      <Header class="row" />
      <div class="App-page">
        <div class="container-fluid row">
          <div class="col-2">
            <SelectDepositAsset 
              onChange={setAsset} 
              value={asset} 
              depositAssetAsCollatoral={depositAssetAsCollatoral} 
              setDepositAssetAsCollatoral={setDepositAssetAsCollatoral}
            />
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
              <Graph asset={asset} 
                deposit={deposit} 
                borrowAsset={borrowAsset} 
                borrowAmount={borrowed} 
                graphType={radioSelectedOption} 
                currencySelectedOption={currencySelectedOption}
                setInterstOwed={setInterstOwed}
                setInterstEarned={setInterstEarned}
                />
            </div>
          </div>
          <div class="container-fluid col-3 stats">
            <div class="row">
              <InterestBalance interestEarned={interestEarned} interestOwed={interestOwed} />
            </div>
            <div class="row">
                <CurrentAPYDisplay asset={asset} />
        </div>
        <div class="row">
                <Avg30DayAPYDisplay asset={asset} />
              </div>
            <div class="row">
              <Avg30DayVariableAPYDisplay asset={borrowAsset} />
            </div>
            <CurrentBorrowDisplay asset={borrowAsset}/>
          </div>
        </div>
      </div>
      <Footer class="App-footer"/>
    </div>
  );
}

export default App;
