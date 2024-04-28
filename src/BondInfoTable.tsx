import {useState, useEffect} from 'react';
import axios from "axios";
import './BondTable.css';

interface BondData {
    isin: string;
    issuer: string;
    issueDate: string,
    maturity: string,
  }

interface Props {
    isin: string;
}

function BondTable({isin}: Props) {
    const [ data, setData ] = useState<BondData | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/v1/bond/characteristics?isin=${isin}`)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error))
    }, [isin]);

    return (
        <div className="table-container">
            {data ? (
                <table className='bond-table'>
                    <tbody>
                    {Object.entries(data).map(([key, value]) => (
                        <tr key={key}>
                        <td className='key-cell'>{key}</td>
                        <td className='value-cell'>{value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) 
            : null
            }
        </div>
    );
}


export default BondTable;