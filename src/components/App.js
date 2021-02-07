import logo from './../logo.svg';
import './../styles/App.css';
import React, { useState } from 'react';
import Header from './Header.js';
import List from './List.js';
import SelectTag from './SelectTag.js';
import DepositAmountTextbox from './DepositAmountTextbox.js';
import GraphRadio from './GraphRadio';
import Graph from './Graph.js';
import CurrentAPYDisplay from './CurrentAPYDisplay.js';
import Avg30DayAPYDisplay from './Avg30DayAPYDisplay.js';

function App() {
  const [asset, setAsset] = useState("DAI");
  const [deposit, setDeposit] = useState(1000);
  const [radioSelectedOption, setRadioSelectedOption] = useState("interest");

  return (
    <div className="App">
      <Header class="row" />
      <div class="App-page">
        <div class="container-fluid row">
          <div class="col-2">
            <SelectTag onChange={setAsset} value={asset} />
          </div>
          <div class="col-3">
            <DepositAmountTextbox onChange={setDeposit} value={deposit} />
          </div>
        </div>
        
        <div class="container-fluid row">
          <div class="col-9">
            <div class="row col-3">
              <GraphRadio onChange={setRadioSelectedOption} radioSelectedOption={radioSelectedOption} />
            </div>
            <div class="row Graph">
              {radioSelectedOption == "interest" &&
                <h4>Accumulated Interest Based on Last 30 Days</h4>
              }
              {radioSelectedOption == "rate" &&
                <h4>Historical Rate Over the Last 30 Days</h4>
              }
              <Graph asset={asset} deposit={deposit} graphType={radioSelectedOption}/>
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
