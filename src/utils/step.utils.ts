/**
 * Recursively collects all components with a `supplierItem` property from the provided step components and their nested prior steps.
 *
 * @param stepComponents - An array of step component objects to search through.
 * @returns An array of components that contain the `supplierItem` property.
 */
export const getAllSupplierItemsFromStepComponentsForSectionOutput = (
  section: Record<string, any>,
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
          section: convertIdToPointer("Section", section.id),
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
  const productionSteps = section.productionSteps;
  if (!Array.isArray(productionSteps) || productionSteps.length === 0) return [];

  const lastStep = productionSteps[productionSteps.length - 1];
  if (!lastStep) return [];

  // if reusable, get the last step from the reusable steps
  if (lastStep.reusable) {
    const reusableSteps = lastStep.step?.productionSteps;
    if (!Array.isArray(reusableSteps) || reusableSteps.length === 0) return [];
    const lastReusableStep = reusableSteps[reusableSteps.length - 1];
    const collectedIngredients = getAllSupplierItemsFromStepComponentsForSectionOutput(section, lastReusableStep?.stepComponents || []);
    return collectedIngredients;
  }

  const collectedIngredients = getAllSupplierItemsFromStepComponentsForSectionOutput(section, lastStep.step?.stepComponents || []);
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
  if (!section || !section.sectionOutputs || section.sectionOutputs.length === 0) {
    const supplierItems = section ? getAllIngredientsFromSection(section) : [];

    return {
      // always 2 outputs by default, one for ingredients and one for empty output
      sectionOutputs: [
        {
          name: "",
          ingredients: supplierItems
        },
        {
          name: "",
          ingredients: []
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