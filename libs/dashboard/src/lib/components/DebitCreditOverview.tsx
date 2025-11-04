import { observer } from 'mobx-react-lite';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDashboardStore } from '../contexts/DashboardContext';
import { toJS } from 'mobx';

export const DebitCreditChart = observer(() => {
  const store = useDashboardStore();

  if (store.isLoading) return <p>Loading chart...</p>;
  if (store.error) return <p>Error: {store.error}</p>;

  const chartData = toJS(store.chartData);

  console.log('Chart Data:', chartData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="credit" fill="#4D78FF" />
        <Bar dataKey="debit" fill="#FCAA0B" />
      </BarChart>
    </ResponsiveContainer>
  );
});
