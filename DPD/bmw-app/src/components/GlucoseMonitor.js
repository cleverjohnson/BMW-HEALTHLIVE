import React from 'react';
import { Line } from 'react-chartjs-2';
import GlucoseDataTable from './GlucoseDataTable';

const GlucoseMonitor = ({ glucoseData, alerts }) => {
  if (!Array.isArray(glucoseData)) {
    return <div>Error: glucoseData must be an array.</div>;
  }
  const chartData = {
    labels: glucoseData.map((gd) => gd.timestamp),
    datasets: [
      {
        label: 'Glucose Level',
        data: glucoseData.map((gd) => gd.glucose_level),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'minute',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
      <GlucoseDataTable glucoseData={glucoseData} />
      <h3>Alerts:</h3>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default GlucoseMonitor;

