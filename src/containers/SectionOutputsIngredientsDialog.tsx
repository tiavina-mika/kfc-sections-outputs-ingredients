import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SectionOutputsIngredientsForm, { type SectionOutputsIngredientsFormValues } from "./SectionOutputsIngredientsForm";
import type { FormikProps } from "formik";
import { useRef } from "react";


type Props = {
  open: boolean;
  onClose: () => void;
  // onSubmit: (values: SectionOutputsIngredientsFormValues) => void;
};

const SectionOutputsIngredientsDialogForm = ({
  open,
  onClose,
  // onSubmit,
}: Props) => {
    const formikRef = useRef<FormikProps<SectionOutputsIngredientsFormValues>>(null);

  const handleConfirm = () => {
    if (!formikRef.current) return;
    formikRef.current.submitForm();
    onClose();
  };

  const handleValidate = (values: SectionOutputsIngredientsFormValues) => {
    console.log("values", values);
  };

return (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>
      Divisez votre section en répartissant les ingrédients dans chaque partie
      et attribuez-leur un nom.
    </DialogTitle>
    <DialogContent>
      <SectionOutputsIngredientsForm ref={formikRef} onSubmit={handleValidate} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} variant="outlined">
        Retour
      </Button>
      <Button type="submit" variant="contained" color="primary" onClick={handleConfirm}>
        Valider
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default SectionOutputsIngredientsDialogForm;