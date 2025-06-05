type Ingredient = {
  supplierItem: {
    objectId: string;
    name: string;
  };
  netWeight?: number;
};

export type SectionOutputsIngredientsFormValues = {
  sectionOutputs: {
    name: string;
    ingredients: Ingredient[];
  }[];
};