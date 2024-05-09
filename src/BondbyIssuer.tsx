import { useEffect, useState } from 'react'
import './App.css'
import { Autocomplete, Button, Table } from '@mantine/core';
import config from './config';
import axios from 'axios';

function BondbyIssuer() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleButtonClick = () => {
    console.log(selectedOption)
    // setSelectedOption()
  }

  return (
    <>
    <IssuerDropdown 
      setSelectedOption={setSelectedOption}
      handleButtonClick={handleButtonClick}/>
    <BondIssuerTable 
      selectedOption={selectedOption}/>
    </>
  )
}

interface IssuerDropdownProps {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  handleButtonClick: () => void;
}

const IssuerDropdown: React.FC<IssuerDropdownProps> = ({setSelectedOption, handleButtonClick}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  

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

  const handleSearch = () => {
    setSelectedOption(selectedValue);
    handleButtonClick();
  }


  return (
    <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Autocomplete
            // label="Bond Issuer"
            placeholder="Pick bond issuer"
            data={options}
            maxDropdownHeight={200}
            value={selectedValue}
            onChange={setSelectedValue}
          />
          <Button style={{ marginLeft: '10px' }} variant="filled" size="sd" onClick={()=>handleSearch()}>Search</Button>
        </div>
    </>
  )
}


interface Bond {
  name: string;
  isin: string;
  dateTime: string;
  price: number;
}

interface BondSearch {
  name: { originalValue: string };
  isin: string;
  dateTimeLastQuote: string;
  overview: {
    lastPrice: number;
  };
}


const BondIssuerTable: React.FC<{ selectedOption: string }>= ({selectedOption}) => {
  const [results, setResults] = useState<Bond[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${config.baseUrl}${config.apiRoutes.bondSearch()}`
        const response = await axios.post<BondSearch[]>(url, { issuers: [selectedOption] });
        const formattedData = response.data.map(bond => ({
          name: bond.name.originalValue,
          isin: bond.isin,
          dateTime: bond.dateTimeLastQuote,
          price: bond.overview.lastPrice
        }))
        setResults(formattedData)
      } catch(error) {
        console.error('Error fetching data:', error);
      }};
      fetchData();
    },[selectedOption])
  // const elements = [
  //   { position: 1, name: 'Hydrogen', symbol: 'H', mass: 1.0079 },
  //   { position: 2, name: 'Helium', symbol: 'He', mass: 4.0026 },
  //   { position: 3, name: 'Lithium', symbol: 'Li', mass: 6.941 },
  //   { position: 4, name: 'Beryllium', symbol: 'Be', mass: 9.0122 },
  //   { position: 5, name: 'Boron', symbol: 'B', mass: 10.811 },
  // ];
  const rows = results.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.isin}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>{element.dateTime}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ISIN</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Date Last Price</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default BondbyIssuer
