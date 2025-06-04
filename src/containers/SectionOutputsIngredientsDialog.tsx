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

const sx = {
  dialog: {
    " & .MuiDialog-paper": {
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      padding: "32px",
    }
  }
}
type Props = {
  open: boolean;
  onClose: () => void;
  // onSubmit: (values: SectionOutputsIngredientsFormValues) => void;
  section: Record<string, any> | null;
};

const SectionOutputsIngredientsDialogForm = ({
  open,
  onClose,
  section,
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
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={sx.dialog}>
    <DialogTitle sx={{ px: 0 }}>
      Divisez votre section en répartissant les ingrédients dans chaque partie
      et attribuez-leur un nom.
    </DialogTitle>
    <DialogContent sx={{ px: 0 }}>
      <SectionOutputsIngredientsForm ref={formikRef} onSubmit={handleValidate} section={section} />
    </DialogContent>
    <DialogActions sx={{ justifyContent: "space-between", px: 0 }}>
      <Button onClick={onClose} variant="text">
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