import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Formik, FieldArray, Form, Field, type FormikProps } from "formik";
import {
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { forwardRef } from "react";

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
      name: "Sauce lard",
      netWeight: 0.003,
      type: "ingredient",
      ingredients: [],
    },
  ],
},
];

export type SectionOutputsIngredientsFormValues = {
  sectionOutputs: {
    name: string;
    ingredients: Ingredient[];
  }[];
};

const initialValues: SectionOutputsIngredientsFormValues = {
  sectionOutputs:
    stepComponents[0]?.sectionOutputs.map((so) => ({
      name: so.name,
      ingredients: so.ingredients,
    })) || [],
};

type Props = {
  onSubmit: (values: SectionOutputsIngredientsFormValues) => void;
};

const SectionOutputsIngredientsForm = forwardRef<FormikProps<SectionOutputsIngredientsFormValues>, Props>(
  ({ onSubmit }, ref) => {

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={ref}
    >
      {({ values }) => (
        <Form>
            <FieldArray name="sectionOutputs">
              {({ push, remove }) => (
                <>
                  <Box mb={2}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() =>
                        push({ name: "", ingredients: [] })
                      }
                    >
                      Ajouter une nouvelle partie
                    </Button>
                  </Box>
                  <Stack spacing={2}>
                    {values.sectionOutputs.map((section, idx) => (
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        gap={2}
                        mb={2}
                      >
                        <Box flex={1}>
                          <Field
                            as={TextField}
                            name={`sectionOutputs.${idx}.name`}
                            label="Nom de la partie"
                            fullWidth
                            variant="outlined"
                            size="small"
                          />
                          <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                            {section.ingredients.length === 0 ? (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Aucun ingrédient
                              </Typography>
                            ) : (
                              section.ingredients.map((ingredient, i) => (
                                <Card
                                  key={i}
                                  variant="outlined"
                                  sx={{
                                    minWidth: 120,
                                    display: "inline-block",
                                    mr: 1,
                                    mb: 1,
                                  }}
                                >
                                  <CardContent
                                    sx={{
                                      padding: "8px !important",
                                      "&:last-child": { paddingBottom: "8px" },
                                    }}
                                  >
                                    <Typography variant="body2">
                                      {ingredient.supplierItem.name}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              ))
                            )}
                          </Box>
                        </Box>
                        <IconButton
                          aria-label="Supprimer la partie"
                          onClick={() => remove(idx)}
                          color="error"
                          sx={{ mt: 1 }}
                          disabled={values.sectionOutputs.length === 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
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