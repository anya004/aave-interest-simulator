import logo from './../logo.svg';
import './../styles/App.css';
import React, { useState } from 'react';
import List from './List.js';
import SelectTag from './SelectTag.js';
import DepositAmountTextbox from './DepositAmountTextbox.js';

function App() {
  const [asset, setAsset] = useState("DAI");
  const [deposit, setDeposit] = useState(1000);

  return (
    <div className="App">
      <SelectTag onChange={setAsset} value={asset} />
      <DepositAmountTextbox onChange={setDeposit} value={deposit}/>
      <List />
    </div>
  );
}

export default App;
