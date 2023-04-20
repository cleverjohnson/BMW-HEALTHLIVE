import React from 'react';
import { Line } from 'react-chartjs-2';

const GlucoseGraph = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.timestamp),
    datasets: [
      {
        label: 'Glucose Level',
        data: data.map((d) => d.glucose_level),
        borderColor: data.map((d) => {
          if (d.glucose_level < 70) return 'red';
          if (d.glucose_level > 180) return 'red';
          return 'green';
        }),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        pointRadius: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 24,
        },
      },
      y: {
        min: 40,
        max: 250,
        ticks: {
          stepSize: 20,
        },
        grid: {
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const label = context.chart.data.labels[context.dataIndex];
            return `Time: ${label}, Glucose Level: ${value} mg/dL`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default GlucoseGraph;
