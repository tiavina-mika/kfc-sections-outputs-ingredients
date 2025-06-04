import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Props = {
  sections: Record<string, any>[];
}
const Sections = ({ sections = [] }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Steps Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((section) => (
            <TableRow key={section.id}>
              <TableCell>{section.id}</TableCell>
              <TableCell>{section.name}</TableCell>
              <TableCell>{section.productionSteps?.length || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default Sections;