import React from 'react'
import Title from '../Title'
import { Line } from 'react-chartjs-2'
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
)

const MarketTrends = () => {
  const priceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Wheat',
        data: [2400, 2500, 2300, 2600, 2800, 2750],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      },
      {
        label: 'Rice',
        data: [1800, 1850, 1900, 1950, 1900, 2000],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1
      }
    ]
  }

  return (
    <div className='mb-12'>
      <Title text1={'MARKET'} text2={'TRENDS'} />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8'>
        {/* Price Chart */}
        <div className='lg:col-span-2 border rounded-lg p-6 bg-white shadow-sm'>
          <h3 className='font-semibold mb-4'>Price Trends (₹/ton)</h3>
          <Line data={priceData} options={{ responsive: true }} />
        </div>

        {/* Market Updates */}
        <div className='border rounded-lg p-6 bg-white shadow-sm'>
          <h3 className='font-semibold mb-4'>Market Updates</h3>
          <div className='space-y-4'>
            <div className='border-l-4 border-blue-500 pl-4'>
              <p className='font-medium'>Wheat Prices Surge</p>
              <p className='text-sm text-gray-600'>10% increase in wheat prices due to supply constraints</p>
              <p className='text-xs text-gray-400 mt-1'>2 hours ago</p>
            </div>
            <div className='border-l-4 border-green-500 pl-4'>
              <p className='font-medium'>Rice Export Update</p>
              <p className='text-sm text-gray-600'>New export regulations affecting rice trade</p>
              <p className='text-xs text-gray-400 mt-1'>5 hours ago</p>
            </div>
            <div className='border-l-4 border-yellow-500 pl-4'>
              <p className='font-medium'>Market Forecast</p>
              <p className='text-sm text-gray-600'>Positive outlook for grain markets in Q3</p>
              <p className='text-xs text-gray-400 mt-1'>1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketTrends