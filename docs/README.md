# In production

- The True Fit libraries should be called on every PDP.

# USE

- Add "worldwidegolfqa.wwg-truefit": "0.x" in manifest.json under dependencies
- in JSONC file add "true-fit"

# wwg-truefit

- End Point '/v0/get-product-details?skuIds=123422,11231,123432' , sku Id is query parameter which takes multiple comma separated sku ids

- Component react/TrueFit.tsx loads the true-fit scripts in dom and inject widget under a class className="tfc-fitness-products"


![imgpsh_fullsize_anim](https://github.com/trikatechnologies/wwg-truefit/assets/135600269/debdf295-73a6-4232-939d-1800890d6315)
