import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const GlucoseDataTable = ({ glucoseData }) => {
  if (!Array.isArray(glucoseData)) {
    return <div>Error: glucoseData must be an array.</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>Glucose Level (mg/dL)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {glucoseData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{data.timestamp}</TableCell>
            <TableCell>{data.glucose_level}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


export default GlucoseDataTable;
