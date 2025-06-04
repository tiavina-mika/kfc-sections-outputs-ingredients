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

type Ingredient = {
  supplierItem: {
    objectId: string;
    name: string;
  };
  netWeight: number;
};

type SectionOutput = {
  objectId: string;
  index: string;
  name: string;
  netWeight: number;
  type: string;
  ingredients: Ingredient[];
};

type StepComponent = {
  index: string;
  type: string;
  sectionOutputs: SectionOutput[];
};

const stepComponents: StepComponent[] = [
  {
    index: "1adb075d-84b0-443a-be90-83559b253e42",
    type: "ingredient",
    sectionOutputs: [
      {
        objectId: "so1",
        index: "83559b253e42-1adb075d-84b0-443a-be90",
        name: "Porc",
        netWeight: 0.002,
        type: "ingredient",
        ingredients: [
          {
            supplierItem: {
              objectId: "tKFVbHYlIP",
              name: "Paprika fumé",
            },
            netWeight: 1,
          },
          {
            supplierItem: {
              objectId: "tKFVbHYlIP",
              name: "Cumin moulu",
            },
            netWeight: 1,
          },
        ],
      },
      {
        objectId: "so2",
        index: "be9083559b253e42-1adb075d-84b0-443a",
        name: "",
        // name: "Sauce lard",
        netWeight: 0.003,
        type: "ingredient",
        ingredients: [],
      },
    ],
  },
];

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

// const initialValues: SectionOutputsIngredientsFormValues = {
//   sectionOutputs:
//     stepComponents[0]?.sectionOutputs.map((so) => ({
//       name: so.name,
//       type: so.type,
//       ingredients: so.ingredients,
//     })) || [],
// };

type Props = {
  onSubmit: (values: SectionOutputsIngredientsFormValues) => void;
  section: Record<string, any> | null;
};

const SectionOutputsIngredientsForm = forwardRef<FormikProps<SectionOutputsIngredientsFormValues>, Props>(
  ({ onSubmit, section }, ref) => {

  return (
    <Formik
      // initialValues={initialValues}
      initialValues={{ sectionOutputs: section?.sectionOutputs || []}}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={ref}
    >
      {({ values }) => (
        <Form>
            <FieldArray name="sectionOutputs">
              {({ push, remove }) => (
                <>
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
                    {values.sectionOutputs.map((section, index) => (
                      <StyledPart
                        display="flex"
                        alignItems="flex-start"
                      >
                        <Stack flex={1} spacing={2}>
                          {/* name field */}
                          <Field
                            as={TextField}
                            name={`sectionOutputs.${index}.name`}
                            label={`Nom de la partie ${index + 1}`}
                            fullWidth
                            variant="standard"
                            size="small"
                          />
                          {/* ingredients field */}
                          <Grid container spacing={1} sx={{ flex: 1 }}>
                            {/* no ingredient */}
                            {section.ingredients.length === 0 ? (
                              <StyledNoIngredients size={6} />
                            ) : (
                              // with ingredients
                              section.ingredients.map((ingredient, ingredientIndex) => (
                                <Grid size={6} key={ingredientIndex}>
                                  <StyledIngredient>
                                    <DragIndicatorIcon />
                                    <Typography variant="body2" sx={{ fontSize: 16, lineHeight: 1.5, fontWeight: 400 }}>
                                      {ingredient.supplierItem.name}
                                    </Typography>
                                  </StyledIngredient>
                                </Grid>
                              ))
                            )}
                          </Grid>
                        </Stack>
                        {/* delete a part */}
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
                </>
              )}
            </FieldArray>
        </Form>
      )}
    </Formik>
  );
});

export default SectionOutputsIngredientsForm;