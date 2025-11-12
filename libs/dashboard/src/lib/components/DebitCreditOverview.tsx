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
import { useTranslation } from 'react-i18next';
import * as styles from './Style';

export const DebitCreditChart = observer(() => {
  const { t } = useTranslation('dashboard');
  const store = useDashboardStore();
  const chartData = React.useMemo(() =>
    store.chartData ? toJS(store.chartData) : [],
    [store.chartData]
  );

  const renderLoadingState = () => (
    <div className="h-64 flex items-center justify-center">
      {t('loading_chart')}
    </div>
  );

  const renderErrorState = (error: string) => (
    <div className="h-64 flex items-center justify-center text-red-500">
      Error: {error}
    </div>
  );

  const renderNoDataState = () => (
    <div className="h-64 flex items-center justify-center">
      {t('no_data_available')}
    </div>
  );

  const renderChart = (data: any) => (
    <div className={styles.DebitCreditOverviewChartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="credit" fill="#4D78FF" name={t('credit')} />
          <Bar dataKey="debit" fill="#FCAA0B" name={t('debit')} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  if (store.isLoading) return renderLoadingState();
  if (store.error) return renderErrorState(store.error);
  if (!chartData || chartData.length === 0) return renderNoDataState();

  return renderChart(chartData);
});

export default DebitCreditChart;