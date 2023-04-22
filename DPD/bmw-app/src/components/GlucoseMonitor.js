import React from 'react';
import { Line } from 'react-chartjs-2';

const GlucoseMonitor = ({ glucoseData, alerts }) => {
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
      <h3>Alerts:</h3>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default GlucoseMonitor;
