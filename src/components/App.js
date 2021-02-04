import logo from './../logo.svg';
import './../styles/App.css';
import React, { useState } from 'react';
import Header from './Header.js';
import List from './List.js';
import SelectTag from './SelectTag.js';
import DepositAmountTextbox from './DepositAmountTextbox.js';
import Graph from './Graph.js';
import CurrentAPYDisplay from './CurrentAPYDisplay.js';

const data = [
  {
    name: 'Page A', Principle: 4000, Interest: 2400,
  },
  {
    name: 'Page B', Principle: 3000, Interest: 1398,
  },
  {
    name: 'Page C', Principle: 2000, Interest: 9800,
  },
  {
    name: 'Page D', Principle: 2780, Interest: 3908,
  },
  {
    name: 'Page E', Principle: 1890, Interest: 4800,
  },
  {
    name: 'Page F', Principle: 2390, Interest: 3800,
  },
  {
    name: 'Page G', Principle: 3490, Interest: 4300,
  },
];

function App() {
  const [asset, setAsset] = useState("DAI");
  const [deposit, setDeposit] = useState(1000);

  return (
    <div className="App">
      <Header />
      <SelectTag onChange={setAsset} value={asset} />
      <DepositAmountTextbox onChange={setDeposit} value={deposit}/>
      <CurrentAPYDisplay asset={asset}/>
      <div class='graph'>
        <Graph data={data}/>
      </div>
      <List />
    </div>
  );
}

export default App;
