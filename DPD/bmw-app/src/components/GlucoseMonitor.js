import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import GlucoseDataTable from './GlucoseDataTable';
import { Box, Typography } from '@mui/material';

const GlucoseMonitor = ({ glucoseData, alerts, safetyActions, dataStartIndex, dataEndIndex }) => {
  const getSafetyAction = (alertId) => {
    const sa = safetyActions.find((sa) => sa.alert_id === alertId);
    return sa ? sa.action : 'No safety action found';
  };

  const getGlucoseLevelColor = (glucoseLevel) => {
    if (glucoseLevel < 70) {
      return 'red';
    } else if (glucoseLevel >= 70 && glucoseLevel <= 130) {
      return 'green';
    } else {
      return 'yellow';
    }
  };
  
  const chartData = useMemo(() => ({
    labels: glucoseData.slice(dataStartIndex, dataEndIndex).map((gd) => gd.timestamp),
    datasets: [
      {
        label: 'Glucose Level',
        data: glucoseData.slice(dataStartIndex, dataEndIndex).map((gd) => gd.glucose_level),
        borderColor: (ctx) => getGlucoseLevelColor(ctx.dataset.data[ctx.dataIndex]),
        backgroundColor: (ctx) => `${getGlucoseLevelColor(ctx.dataset.data[ctx.dataIndex])}1A`,
        borderWidth: 2,
      },
    ],
  }), [glucoseData, dataStartIndex, dataEndIndex]);     

  const chartOptions = useMemo(() => ({
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'minute',
          },
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            fontColor: 'black', // set x-axis label color to black
          },
          scaleLabel: {
            display: true,
            labelString: 'Time',
            fontColor: 'black', // set x-axis label color to black
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: 'black', // set y-axis label color to black
          },
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          scaleLabel: {
            display: true,
            labelString: 'Glucose Level',
            fontColor: 'black', // set y-axis label color to black
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
    backgroundColor: 'rgba(231, 242, 252, 1)', // set the background color to a lighter shade of blue
  }), []);  

  return (
    <div>
      {Array.isArray(glucoseData) ? (
        <>
          <Line data={chartData} options={chartOptions} />
          <Box my={2}>
            <GlucoseDataTable glucoseData={glucoseData} />
          </Box>
          <AlertsList alerts={alerts} getSafetyAction={getSafetyAction} />
        </>
      ) : (
        <div>Error: glucoseData must be an array.</div>
      )}
    </div>
  );
};

GlucoseMonitor.propTypes = {
  glucoseData: PropTypes.array.isRequired,
  alerts: PropTypes.array.isRequired,
  safetyActions: PropTypes.arrayOf(
    PropTypes.shape({
      alert_id: PropTypes.number.isRequired,
      action: PropTypes.string.isRequired,
    }),
  ).isRequired,
  dataStartIndex: PropTypes.number.isRequired,
  dataEndIndex: PropTypes.number.isRequired,
};

const AlertsList = ({ alerts, getSafetyAction }) => (
  <>
    <Typography variant="h6" component="div">
      Alerts:
    </Typography>
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
  </>
);

AlertsList.propTypes = {
  alerts: PropTypes.array.isRequired,
  getSafetyAction: PropTypes.func.isRequired,
};

export default GlucoseMonitor;
