import logo from './../logo.svg';
import './../styles/App.css';
import React, { useState } from 'react';
import Header from './Header.js';
import List from './List.js';
import SelectTag from './SelectTag.js';
import DepositAmountTextbox from './DepositAmountTextbox.js';
import Graph from './Graph.js';
import CurrentAPYDisplay from './CurrentAPYDisplay.js';

function App() {
  const [asset, setAsset] = useState("DAI");
  const [deposit, setDeposit] = useState(1000);

  return (
    <div className="App">
      <Header />
      <SelectTag onChange={setAsset} value={asset} />
      <DepositAmountTextbox onChange={setDeposit} value={deposit} />
      <CurrentAPYDisplay asset={asset} />
      <div class='Graph'>
        <Graph asset={asset} deposit={deposit} />
      </div>
    </div>
  );
}

export default App;
