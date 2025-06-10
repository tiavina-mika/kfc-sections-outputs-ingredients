/**
 * Recursively collects all components with a `supplierItem` property from the provided step components and their nested prior steps.
 *
 * @param stepComponents - An array of step component objects to search through.
 * @returns An array of components that contain the `supplierItem` property.
 */
export const getAllSupplierItemsFromStepComponentsForSectionOutput = (
  stepComponents: Record<string, any>[] = []
): Record<string, any>[] => {
  const supplierItems: Record<string, any>[] = [];

  const traverse = (components: Record<string, any>[], priorStepsIndex?: string) => {
    for (const component of components) {
      if (component.supplierItem) {
        const values: Record<string, any> = {
          netWeight: component.netWeight,
          supplierItem: { name: component.supplierItem.name, objectId: component.supplierItem.id },
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
 * Gets the last production step from a section.
 * It may return the last step directly or the last step from reusable steps if the last step is reusable.
 * @param section 
 * @returns 
 */
const getSectionLastStep = (section: Record<string, any>): Record<string, any> | null => {
  const productionSteps = section.productionSteps || [];

  if (productionSteps.length === 0) return null;

  const lastStep = productionSteps[productionSteps.length - 1];

  // if reusable, get the last step from the reusable steps
  if (lastStep?.reusable) {
    const reusableSteps = lastStep.step?.productionSteps || [];
    if (reusableSteps.length === 0) return null;
    const lastReusableStep = reusableSteps[reusableSteps.length - 1];
    return lastReusableStep
  }

  return lastStep?.step || null;
}

/**
 * Retrieves all ingredients from the last production step of a given section.
 *
 * This function accesses the `productionSteps` array within the provided `section` object,
 * extracts the last step, and collects all supplier items (ingredients) from its step components.
 * If there are no production steps or the last step is undefined, it returns an empty array.
 *
 * @param lastStep - The last production step object from which to collect ingredients.
 * @returns An array of ingredient objects collected from the last production step's components.
 */
export const getAllIngredientsFromSection = (lastStep: Record<string, any> | null): Record<string, any>[] => {
  const collectedIngredients = getAllSupplierItemsFromStepComponentsForSectionOutput(lastStep?.stepComponents || []);
  return collectedIngredients;
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
  if (!section) {
    return { sectionOutputs: [] };
  }

  if (!section.sectionOutputs || section.sectionOutputs.length === 0) {
    const lastStep = getSectionLastStep(section);

    const supplierItems = section ? getAllIngredientsFromSection(lastStep) : [];
    const sectionPointer = section ? convertIdToPointer("Section", section.id) : null;
    const stepPointer = lastStep ? convertIdToPointer("ProductionStep", lastStep.id) : null;
    const type = "ingredient";

    return {
      // always 2 outputs by default, one for ingredients and one for empty output
      sectionOutputs: [
        {
          name: "",
          ingredients: supplierItems,
          section: sectionPointer,
          productionStep: stepPointer,
          type
        },
        {
          name: "",
          ingredients: [],
          section: sectionPointer,
          productionStep: stepPointer,
          type
        }
      ]
    };
  }
  return {
    sectionOutputs: section.sectionOutputs
  } 
}

export const convertIdToPointer = (className: string, id: string) => {
	return {
		__type: "Pointer",
		className,
		objectId: id
	}
}