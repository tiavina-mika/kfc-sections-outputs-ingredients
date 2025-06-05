import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import type { FormikProps } from "formik";
import { useRef } from "react";
import type { SectionOutputsIngredientsFormValues } from "../types/section.type";
import SectionOutputsIngredientsForm from "./SectionOutputsIngredientsForm";

const sx = {
  dialog: {
    " & .MuiDialog-paper": {
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      padding: "32px",
      width: 700
    }
  }
}
type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: SectionOutputsIngredientsFormValues) => void;
  section: Record<string, any> | null;
};

const SectionOutputsIngredientsDialogForm = ({
  open,
  onClose,
  section,
  onSubmit,
}: Props) => {
  const formikRef = useRef<FormikProps<SectionOutputsIngredientsFormValues>>(null);

  const handleConfirm = () => {
    if (!formikRef.current) return;
    formikRef.current.submitForm();
  };

return (
  <Dialog open={open} onClose={onClose} fullWidth sx={sx.dialog}>
    <DialogTitle sx={{ p: 0, m: 0, fontSize: 16, fontWeight: 400, lineHeight: 1.375, color: "#7c7c7c" }}>
      Divisez votre section en répartissant les ingrédients dans chaque partie
      et attribuez-leur un nom.
    </DialogTitle>
    <DialogContent sx={{ px: 0 }}>
      <SectionOutputsIngredientsForm ref={formikRef} onSubmit={onSubmit} section={section} />
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