import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const GlucoseDataTable = ({ glucoseData }) => {
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(glucoseData)) {
      return;
    }

    const highGlucoseData = glucoseData.filter((data) => data.glucose_level > 180);
    setDisplayedData(highGlucoseData.slice(0, 5));

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight && displayedData.length < highGlucoseData.length) {
        const endIndex = Math.min(displayedData.length + 5, highGlucoseData.length);
        setDisplayedData([...displayedData, ...highGlucoseData.slice(displayedData.length, endIndex)]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [glucoseData, displayedData]);

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
        {displayedData.map((data, index) => (
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
