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
  type Theme,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { getSectionOutputsIngredientsFormInitialValues } from "../utils/step.utils";
import StrictModeDroppable from "./StrictModeDroppable";
import * as Yup from "yup";
import type { SectionOutputsIngredientsFormValues } from "../types/section.type";


const sectionOutputsIngredientsValidationSchema = Yup.object().shape({
  sectionOutputs: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Le nom de la partie est requis"),
      ingredients: Yup.array().of(
        Yup.object().shape({
          supplierItem: Yup.object().shape({
            objectId: Yup.string(),
            name: Yup.string(),
          }),
          // netWeight: Yup.number().min(0, "Le poids net doit être positif"),
        })
      ).min(1, "Au moins un ingrédient est requis")
    })
  )
});


type StyledDraggableCardProps = {
  isDragging: boolean;
  theme?: Theme; // Required for styled(Card)<Props> to correctly infer theme type
};

const StyledPart = styled(Box)({
  padding: "16px 12px 8px 12px",
  gap: "16px",
  borderRadius: 8,
  background: "#E3F2FD",
});

const StyledDraggableCard = styled(Box)<StyledDraggableCardProps>(({ theme, isDragging }) => ({
  userSelect: 'none',
  padding: "8px",
  display: "flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  transition: 'background-color 0.2s ease, box-shadow 0.2s ease', // Smooth transitions
  cursor: 'grab',

  ...(isDragging && {
    cursor: 'grabbing !important',
    boxShadow: theme.shadows[6], // Higher elevation when dragging
    transform: 'rotate(2deg)', // A subtle visual effect when dragging
  }),

  '&:active': {
    cursor: 'grabbing',
  },
}));

const StyledNoIngredients = styled(Grid)({
  padding: "8px",
  gap: 8,
  borderRadius: 8,
  height: 40,
  border: "2px dashed #fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const getError = (errors: Record<string, any>, index: number, fieldName: string) => {
  if (!Array.isArray(errors.sectionOutputs) || typeof errors.sectionOutputs[index] !== "object" || errors.sectionOutputs[index] === null) {
    return undefined;
  }

  return errors.sectionOutputs[index][fieldName] as string | undefined;
}



type Props = {
  onSubmit: (values: SectionOutputsIngredientsFormValues ) => void;
  section: Record<string, any> | null;
};

const SectionOutputsIngredientsForm = forwardRef<FormikProps<SectionOutputsIngredientsFormValues>, Props>(
  ({ onSubmit, section }, ref) => {
    const [sectionValues, setSectionValues] = useState<Record<string, any> | null>(null);

    useEffect(() => {
      if (section) {
        setSectionValues(section);
      }
    }, [section]);

    // const [initialValues, setInitialValues] = useState<SectionOutputsIngredientsFormValues | null>(null);

    // useEffect(() => {
    //   const sectionValues = getSectionOutputsIngredientsFormInitialValues(section);

    //   if (!sectionValues) {
    //     setInitialValues({ sectionOutputs: [] });
    //     return;
    //   }
    //   setInitialValues(sectionValues as SectionOutputsIngredientsFormValues);
    // }, [section]);

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
        initialValues={getSectionOutputsIngredientsFormInitialValues(sectionValues)}
        validateOnBlur={false}
        onSubmit={onSubmit}
        enableReinitialize
        innerRef={ref}
        validationSchema={sectionOutputsIngredientsValidationSchema}
        validateOnChange={false}
      >
        {({ values, setFieldValue, errors }) => (
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
                            error={!!getError(errors, index, 'name')}
                            helperText={getError(errors, index, 'name')}
                          />
                          <StrictModeDroppable droppableId={`ingredients-${index}`} direction="vertical">
                            {(provided, snapshot) => (
                              <Grid
                                container
                                spacing={1}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                sx={{
                                  backgroundColor: snapshot.isDraggingOver ? '#d0e3f7' : undefined,
                                  transition: 'background-color 0.2s ease',
                                  flex: 1
                                }}
                              >
                                {sectionOutput.ingredients.length === 0 ? (
                                  <StyledNoIngredients size={6}>
                                    {typeof getError(errors, index, 'ingredients') === 'string' && (
                                      <Typography variant="caption" color="error">
                                        {getError(errors, index, 'ingredients')}
                                      </Typography>
                                    )}
                                  </StyledNoIngredients>
                                ) : (
                                  sectionOutput.ingredients.map((ingredient: Record<string, any>, ingredientIndex: number) => (
                                    <Draggable
                                      key={`ingredient-${index}-${ingredientIndex}`}
                                      draggableId={`ingredient-${index}-${ingredientIndex}`}
                                      index={ingredientIndex}
                                    >
                                      {(provided, snapshot) => (
                                        <Grid size={6}>
                                          <StyledDraggableCard
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                          >
                                            <DragIndicatorIcon aria-label="drag handle" />
                                            <Typography variant="body2" sx={{ fontSize: 16, lineHeight: 1.5, fontWeight: 400 }}>
                                              {ingredient.supplierItem.name}
                                            </Typography>
                                          </StyledDraggableCard>
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
