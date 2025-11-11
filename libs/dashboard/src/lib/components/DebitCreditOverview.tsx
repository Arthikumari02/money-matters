import React from 'react';
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

const renderLoadingState = () => (
  <div className="h-64 flex items-center justify-center">
    Loading chart...
  </div>
);

const renderErrorState = (error: string) => (
  <div className="h-64 flex items-center justify-center">
    Error: {error}
  </div>
);

const renderNoDataState = () => (
  <div className="h-64 flex items-center justify-center">
    No data available
  </div>
);

const renderChart = (chartData: any) => (
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

export const DebitCreditChart = observer(() => {
  const store = useDashboardStore();
  const chartData = React.useMemo(() => 
    store.chartData ? toJS(store.chartData) : [],
    [store.chartData]
  );

  if (store.isLoading) {
    return renderLoadingState();
  }
  
  if (store.error) {
    return renderErrorState(store.error);
  }
  
  if (!chartData || chartData.length === 0) {
    return renderNoDataState();
  }

  return renderChart(chartData);
});
