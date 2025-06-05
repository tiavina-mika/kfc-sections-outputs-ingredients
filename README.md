[See the site](https://mika-kfc-sections-outputs-ingredients.netlify.app/)
[See the live code source](https://stackblitz.com/~/github.com/tiavina-mika/kfc-sections-outputs-ingredients)


---

## Context

We want to allow separating preparations from a section and transferring parts of a section (such as sauces) into other sections.  
This ticket aims to open the modal for separation by ingredient.

⚠️ This ticket should be developed on a new branch ⚠️

## Business Case

We have cooked meat in a sauce (which itself contains tomatoes, onions, herbs). Now we are removing the meat from the sauce.

Test recipe:  
https://kfc.preprod.foodcheri.com/products/recipe/productionSteps/GL4qUeOG8x

## Solution

After selecting "divide by ingredients" in the previous modal, open the following modal.

**Modal label:** Divide your section by distributing the ingredients into each part and assigning them a name.

- You can add a new part.
- Part names are editable text inputs.
- You can drag and drop ingredients from one part to another.
- If a part has no ingredients, display a "skeleton" instead.
- All parts can be deleted except the first two.

Figma

**Focus: Ingredients**  
Display all supplierItems contained in the last ProductionStep of the section.  
These supplierItems may or may not be part of priorSteps (the example recipe contains both cases).  
Note: In this modal, we only need their name, but when saving, we will also need their net weight (weight at the output of the section's last step).