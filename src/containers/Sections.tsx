import { useEffect, useState } from 'react';
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
import { Box, Typography } from '@mui/material';
import SectionOutputsIngredientsDialogForm from './SectionOutputsIngredientsDialog';
import type { SectionOutputsIngredientsFormValues } from '../types/section.type';
// import { recipe } from '../utils/data';

type Props = {
  sections: Record<string, any>[];
}
const Sections = ({ sections = [] }: Props) => {
  const [sectionsList, setSectionsList] = useState<Record<string, any>[]>([]);
  const [selectedSection, setSelectedSection] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    setSectionsList(sections);
  }, [sections]);

  const handleClearSelectedSection = () => {
    setSelectedSection(null);
  }

  const handleConfirmSectionOutputs = (values: SectionOutputsIngredientsFormValues) => {
    setSectionsList((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === selectedSection?.id) {
          return {
            ...section,
            sectionOutputs: values.sectionOutputs,
          };
        }
        return section;
      });
    });

    handleClearSelectedSection();
  };

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
              <TableCell>Outputs</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sectionsList.map((section) => (
              <TableRow key={section.id}>
                <TableCell>{section.id}</TableCell>
                <TableCell>{section.name}</TableCell>
                <TableCell>{section.productionSteps?.length || 0}</TableCell>
                <TableCell>
                  {section.sectionOutputs?.length ? (
                    section.sectionOutputs.map((output: any, index: number) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <Typography variant="body2">{output.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {output.ingredients.map((ingredient: any) => ingredient.supplierItem.name).join(', ')}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">No outputs</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {/* icon button with tooltip and edit icon */}
                  <Tooltip title="Edit Section">
                    <IconButton
                      aria-label="edit"
                      onClick={() => setSelectedSection(section)}
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
        // section={recipe.sections[0]} // For demo purposes, using the first section
        onSubmit={handleConfirmSectionOutputs}
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