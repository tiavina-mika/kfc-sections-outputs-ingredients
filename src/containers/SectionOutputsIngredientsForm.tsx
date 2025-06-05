import { DragDropContext, Draggable, type DropResult } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Formik, FieldArray, Form, Field, type FormikProps } from "formik";
import {
  Button,
  IconButton,
  TextField,
  Typography,
  Box,
  Stack,
  styled,
  Grid,
} from "@mui/material";
import { forwardRef } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { getSectionOutputsIngredientsFormInitialValues } from "../utils/step.utils";
import StrictModeDroppable from "./StrictModeDroppable";


type Ingredient = {
  supplierItem: {
    objectId: string;
    name: string;
  };
  netWeight: number;
};

const StyledPart = styled(Box)({
  padding: "16px 12px 8px 12px",
  gap: "16px",
  borderRadius: 8,
  background: "#E3F2FD",
});

const StyledIngredient = styled(Box)({
  padding: "8px",
  display: "flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 8,
  backgroundColor: "#fff"
});

const StyledNoIngredients = styled(Grid)({
  padding: "8px",
  gap: 8,
  borderRadius: 8,
  height: 40,
  border: "2px dashed #fff"

});

export type SectionOutputsIngredientsFormValues = {
  sectionOutputs: {
    name: string;
    ingredients: Ingredient[];
  }[];
};

type Props = {
  onSubmit: (values: SectionOutputsIngredientsFormValues) => void;
  section: Record<string, any> | null;
};

const SectionOutputsIngredientsForm = forwardRef<FormikProps<SectionOutputsIngredientsFormValues>, Props>(
  ({ onSubmit, section }, ref) => {

    // Helper to reorder/move ingredients
    const onDragEnd = (
      result: DropResult,
      values: SectionOutputsIngredientsFormValues,
      setFieldValue: (field: string, value: any) => void
    ) => {
      const { source, destination } = result;
      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const sourcePartIdx = parseInt(source.droppableId.replace("ingredients-", ""));
      const destPartIdx = parseInt(destination.droppableId.replace("ingredients-", ""));

      const sourceIngredients = Array.from(values.sectionOutputs[sourcePartIdx].ingredients);
      const [moved] = sourceIngredients.splice(source.index, 1);

      if (sourcePartIdx === destPartIdx) {
        sourceIngredients.splice(destination.index, 0, moved);
        setFieldValue(`sectionOutputs.${sourcePartIdx}.ingredients`, sourceIngredients);
      } else {
        const destIngredients = Array.from(values.sectionOutputs[destPartIdx].ingredients);
        destIngredients.splice(destination.index, 0, moved);
        setFieldValue(`sectionOutputs.${sourcePartIdx}.ingredients`, sourceIngredients);
        setFieldValue(`sectionOutputs.${destPartIdx}.ingredients`, destIngredients);
      }
    };

    return (
      <Formik
        initialValues={getSectionOutputsIngredientsFormInitialValues(section)}
        validateOnBlur={false}
        onSubmit={onSubmit}
        enableReinitialize
        innerRef={ref}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="sectionOutputs">
              {({ push, remove }) => (
                <DragDropContext
                  onDragEnd={result => onDragEnd(result, values, setFieldValue)}
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 1 }}>
                    <Button
                      variant="text"
                      startIcon={<AddIcon />}
                      onClick={() =>
                        push({ name: "", ingredients: [] })
                      }
                    >
                      Ajouter une nouvelle partie
                    </Button>
                  </Box>
                  <Stack spacing={2}>
                    {values.sectionOutputs.map((sectionOutput: Record<string, any>, index: number) => (
                      <StyledPart
                        key={index}
                        display="flex"
                        alignItems="flex-start"
                      >
                        <Stack flex={1} spacing={2}>
                          <Field
                            as={TextField}
                            name={`sectionOutputs.${index}.name`}
                            label={`Nom de la partie ${index + 1}`}
                            fullWidth
                            variant="standard"
                            size="small"
                          />
                          <StrictModeDroppable droppableId={`ingredients-${index}`} direction="vertical">
                            {(provided) => (
                              <Grid
                                container
                                spacing={1}
                                sx={{ flex: 1 }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {sectionOutput.ingredients.length === 0 ? (
                                  <StyledNoIngredients size={6} />
                                ) : (
                                  sectionOutput.ingredients.map((ingredient: Record<string, any>, ingredientIndex: number) => (
                                    <Draggable
                                      key={ingredientIndex}
                                      draggableId={`ingredient-${index}-${ingredientIndex}`}
                                      index={ingredientIndex}
                                    >
                                      {(provided) => (
                                        <Grid
                                          size={6}
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <StyledIngredient style={{ ...provided.draggableProps.style }}
>
                                            <DragIndicatorIcon />
                                            <Typography variant="body2" sx={{ fontSize: 16, lineHeight: 1.5, fontWeight: 400 }}>
                                              {ingredient.supplierItem.name}
                                            </Typography>
                                          </StyledIngredient>
                                        </Grid>
                                      )}
                                    </Draggable>
                                  ))
                                )}
                                {provided.placeholder}
                              </Grid>
                            )}
                          </StrictModeDroppable>
                        </Stack>
                        {index > 1 && (
                          <IconButton
                            aria-label="Supprimer la partie"
                            onClick={() => remove(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </StyledPart>
                    ))}
                  </Stack>
                </DragDropContext>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    );
  }
);

export default SectionOutputsIngredientsForm;
