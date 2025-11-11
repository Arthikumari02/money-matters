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
import * as styles from './Style';

export const DebitCreditChart = observer(() => {
  const store = useDashboardStore();

  if (store.isLoading) return <div className="h-64 flex items-center justify-center">Loading chart...</div>;
  if (store.error) return <div className="h-64 flex items-center justify-center">Error: {store.error}</div>;
  if (!store.chartData || store.chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center">No data available</div>;
  }

  const chartData = toJS(store.chartData);

  return (
    <div className={styles.DebitCreditOverviewChartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="credit" fill="#4D78FF" name="Credit" />
          <Bar dataKey="debit" fill="#FCAA0B" name="Debit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
