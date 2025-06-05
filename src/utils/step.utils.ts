
/**
 * Recursively collects all components with a `supplierItem` property from the provided step components and their nested prior steps.
 *
 * @param stepComponents - An array of step component objects to search through.
 * @returns An array of components that contain the `supplierItem` property.
 */
export const getAllSupplierItemsFromStepComponents = (
  stepComponents: Record<string, any>[] = []
): Record<string, any>[] => {
  const supplierItems: Record<string, any>[] = [];

  const traverse = (components: Record<string, any>[], priorStepsIndex?: string) => {
    for (const component of components) {
      if (component.supplierItem) {
        const values: Record<string, any> = {
          netWeight: component.netWeight,
          supplierItem: { name: component.supplierItem.name },
          stepComponentIndex: component.index,
        };
        if (priorStepsIndex) {
          values.priorStepsIndex = priorStepsIndex;
        }
        supplierItems.push(values);
      }
      if (component.priorSteps && component.priorSteps.stepComponents) {
        traverse(component.priorSteps.stepComponents, component.priorSteps.index);
      }
    }
  };

  traverse(stepComponents);

  return supplierItems;
};

/**
 * Retrieves all ingredients from the last production step of a given section.
 *
 * This function accesses the `productionSteps` array within the provided `section` object,
 * extracts the last step, and collects all supplier items (ingredients) from its step components.
 * If there are no production steps or the last step is undefined, it returns an empty array.
 *
 * @param section - An object representing a section, expected to contain a `productionSteps` array.
 * @returns An array of ingredient objects collected from the last production step's components.
 */
export const getAllIngredientsFromSection = (section: Record<string, any>) => {
  const lastStep = section.productionSteps?.[section.productionSteps.length - 1]
  if (!lastStep) return []

  const stepComponents = lastStep.step?.stepComponents || []
  
  const collectedIngredients: Record<string, any>[] = getAllSupplierItemsFromStepComponents(stepComponents)

  return collectedIngredients
}

/**
 * Generates the initial form values for section outputs and their ingredients.
 *
 * it initializes the form with a single output containing all ingredients from the section (if available).
 * Otherwise, it returns the existing `sectionOutputs` from the section.
 *
 * @param section - The section object containing outputs and ingredients, or null.
 */
export const getSectionOutputsIngredientsFormInitialValues = (section: Record<string, any> | null) => {
  if (!section || !section.sectionOutputs || section.sectionOutputs.length === 0) {
    const supplierItems = section ? getAllIngredientsFromSection(section) : [];

    return {
      sectionOutputs: [
        {
          name: "",
          ingredients: supplierItems
        }
      ]
    };
  }
  return {
    sectionOutputs: section.sectionOutputs
  } 
}