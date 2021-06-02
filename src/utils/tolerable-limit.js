/**
 * Returns true if vitamins in a basket would exceed any tolerable upper limits
 * 
 * @param {Array.<Object>} basket - Products in current basket
 * @param {Object} product - Product to be added
 * @param {Array.<Object>} tolerableUpperLimits - List of tolerable upper limits
 */
export const hasTolerableLimit = (basket, product, tolerableUpperLimits) => {
    let localBasket = [...basket];
    localBasket.push(product);

    const nutrientsArray = nutrients(localBasket);
    const nutrientTotalObject = nutrientTotal(nutrientsArray);
    const localBasketKeys = Object.keys(nutrientTotalObject);

    for (let i = 0; i < tolerableUpperLimits.length; i++) {
        if (localBasketKeys.includes(tolerableUpperLimits[i].id) &&
            nutrientTotalObject[tolerableUpperLimits[i].id] > tolerableUpperLimits[i].amount) {
            return true;
        }
    }
    return false;
}

/**
 * Returns an array of objects with vitamin and amount key value pairs
 * 
 * @param {Array.<Object>} localBasket - Object with the current basket and new product to be added
 */
const nutrients = (localBasket) => {
    let nutrients = [];

    localBasket.forEach(basketItem => {
        basketItem.nutrients.forEach(nutrient => {
            let vitamin = Object.entries(nutrient).reduce((newObj, [key, value]) => {
                if (typeof value !== 'number') {
                    newObj[value] = nutrient.amount;
                }
                return newObj;
            }, {});
            nutrients = [...nutrients, vitamin]
        });
    });
    return nutrients;
}

/**
 * Returns an object of nutrient and nutrient total key value pairs
 * 
 * @param {Array.<Object>} nutrients - Array of objects with vitamin and amount key value pairs
 */
const nutrientTotal = (nutrients) => {
    let nutrientTotal = {};

    nutrients.forEach(nutrient => {
        Object.entries(nutrient).reduce((newObj, [key, value]) => {
            if (nutrientTotal[key] === undefined) {
                nutrientTotal[key] = value;
            } else {
                nutrientTotal[key] = nutrientTotal[key] + value;
            }
            return newObj;
        }, {});
    });
    return nutrientTotal;
}