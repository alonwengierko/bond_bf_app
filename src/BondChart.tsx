import { useEffect, useState } from 'react';
import axios from "axios";
import { createChart, IChartApi, Time } from 'lightweight-charts';

// interface BondData {
//     time: number;
//     close: number;
//   }

interface Props {
  isin: string;
}
// async function generateLineChart({isin}) {
//     // Line chart
//     const response = await axios.get(`http://localhost:8000/v1/bond/historical?isin=${isin}`);
//     const responseData = response.data.result || [];
//     const data = Array.isArray(responseData) ? responseData.reverse().map((item: any) => ({
//     time: item.date, //new Date(item.date).getTime()
//     value: item.close})) : [];
//     const chart = createChart(document.getElementById('chart-container'), { width: 800, height: 600 });
//     const lineSeries = chart.addLineSeries();
//     lineSeries.setData(data)
//     return chart
// }

async function generateCandlestickChart({isin}: Props) {
    // Candlestick chart
    const response = await axios.get(`http://localhost:8000/v1/bond/historical?isin=${isin}&price_type=all`);
    const responseData = response.data.result || [];
    const data = Array.isArray(responseData) ? responseData.reverse().map((item: any) => ({
        open: item.open,
        high: item.high,
        low: item.low, 
        close: item.close,
        time: Math.floor(new Date(item.date).getTime() / 1000) as Time
    })) : [];
    const chart = createChart(document.getElementById('chart-container') as HTMLElement, { width: 800, height: 600 });
    const candlestickSeries = chart.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: true, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });        
    candlestickSeries.setData(data);
    chart.timeScale().fitContent();
    return chart;
}

function BondChart({ isin }: Props) {
const [chart, setChart] = useState<IChartApi | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (chart) {
            chart.remove(); // Remove previous chart if it exists
          }
        const newChart = await generateCandlestickChart({ isin });
        setChart(newChart);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isin) {
      fetchData();
    }
  }, [isin]);

  return <div id="chart-container" />;
}


export default BondChart;