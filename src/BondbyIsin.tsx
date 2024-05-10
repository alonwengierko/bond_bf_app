import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './App.css'

import BondTable from './BondInfoTable'
import BondForm from './BondForm'
import BondChart from './BondChart'


const BondbyIsin: React.FC = () => {
  const { isin } = useParams<{ isin: string}>();
  const [currentIsin, setCurrentIsin] = useState<string>("");

  useEffect(() => {
    if (isin)
      setCurrentIsin(isin);
  }, [isin]);

  return (
    <div className="app-container">
      <div className="form-container">
        <BondForm onSubmit={setCurrentIsin}/>
      </div>
      <div className="content-container">
        <div className="table-container">
          <BondTable isin={currentIsin}/>
        </div>
        <div className="chart-container">
          <BondChart isin={currentIsin}/>
        </div>
      </div>
    </div>
  )
}

export default BondbyIsin
