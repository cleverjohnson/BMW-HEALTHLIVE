import React from 'react';
import { Line } from 'react-chartjs-2';
import GlucoseDataTable from './GlucoseDataTable';
import { Box, Typography } from '@mui/material';

const GlucoseMonitor = ({ glucoseData, alerts, safetyActions }) => {
  if (!Array.isArray(glucoseData)) {
    return <div>Error: glucoseData must be an array.</div>;
  }

  const getSafetyAction = (alertId) => {
    const sa = safetyActions.find((sa) => sa.alert_id === alertId);
    return sa ? sa.action : 'No safety action found';
  };

  const chartData = {
    labels: glucoseData.map((gd) => gd.timestamp),
    datasets: [
      {
        label: 'Glucose Level',
        data: glucoseData.map((gd) => gd.glucose_level),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
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
          gridLines: {
            display: true, // Add grid lines
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: true, // Add grid lines
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return `Glucose Level: ${value} mg/dL`;
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
      <Box my={2}>
        <GlucoseDataTable glucoseData={glucoseData} />
      </Box>
      <Typography variant="h6" component="div">Alerts:</Typography>
      <Box maxHeight="140px" overflow="auto" my={1}>
        {alerts.length > 0 ? (
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>
                {alert.message} - Safety Action: {getSafetyAction(alert.id)}
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2" component="p">
            No alerts found.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default GlucoseMonitor;
