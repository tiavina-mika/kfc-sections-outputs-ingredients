import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import SectionOutputsIngredientsDialogForm from './SectionOutputsIngredientsDialog';
import { Box, Typography } from '@mui/material';

type Props = {
  sections: Record<string, any>[];
}
const Sections = ({ sections = [] }: Props) => {
  const [selectedSection, setSelectedSection] = useState<Record<string, any> | null>(null);

  const handleClearSelectedSection = () => {
    setSelectedSection(null);
  }

  return (
    <>
      {/* --------- Table --------- */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Steps Count</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((section) => (
              <TableRow key={section.id}>
                <TableCell>{section.id}</TableCell>
                <TableCell>{section.name}</TableCell>
                <TableCell>{section.productionSteps?.length || 0}</TableCell>
                <TableCell>
                  {/* icon button with tooltip and edit icon */}
                  <Tooltip title="Edit Section">
                    <IconButton
                      aria-label="edit"
                      onClick={() => setSelectedSection([section])}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* -------- Dialog --------- */}
      <SectionOutputsIngredientsDialogForm
        onClose={handleClearSelectedSection}
        open={!!selectedSection}
        section={selectedSection}
      />

      {/* If no sections, show a message */}
      {sections.length === 0 && (
        <Box textAlign="center" mt={2}>
          <Typography>No sections available.</Typography>
        </Box>
      )}
    </>
  )
};

export default Sections;