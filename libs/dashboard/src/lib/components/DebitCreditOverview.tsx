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

export const DebitCreditChart = observer(() => {
  const store = useDashboardStore();

  if (store.isLoading) return <p>Loading chart...</p>;
  if (store.error) return <p>Error: {store.error}</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={store.chartData}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="credit" fill="#4CAF50" />
        <Bar dataKey="debit" fill="#F44336" />
      </BarChart>
    </ResponsiveContainer>
  );
});
