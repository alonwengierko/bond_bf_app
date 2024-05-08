import { useEffect, useState } from 'react'
import './App.css'
import { Autocomplete, Button } from '@mantine/core';
import config from './config';
import axios from 'axios';

function BondbyIssuer() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${config.baseUrl}${config.apiRoutes.bondIssuers()}`
        const response = await axios.get(url);
        setOptions(response.data.issuers)
      } catch(error) {
        console.error('Error fetching data:', error);
      }};

      fetchData();
    },[])

  const handleButtonClick = () => {
    console.log(selectedOption)
  }
  return (
    <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Autocomplete
            // label="Bond Issuer"
            placeholder="Pick value or enter anything"
            data={options}
            maxDropdownHeight={200}
            value={selectedOption}
            onChange={setSelectedOption}
          />
          <Button style={{ marginLeft: '10px' }} variant="filled" size="sd" onClick={handleButtonClick}>Search</Button>
        </div>
    </>
  )
}

export default BondbyIssuer
