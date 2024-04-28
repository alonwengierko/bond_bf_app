import { useState } from 'react'
import './App.css'

import BondTable from './BondInfoTable'
import BondForm from './BondForm'
import BondChart from './BondChart'


function App() {
  const [isin, setIsin] = useState("")

  return (
    <div className="app-container">
      <div className="form-container">
        <BondForm onSubmit={setIsin}/>
      </div>
      <div className="content-container">
        <div className="table-container">
          <BondTable isin={isin}/>
        </div>
        <div className="chart-container">
          <BondChart isin={isin}/>
        </div>
      </div>
    </div>
  )
}

export default App
