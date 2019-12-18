export function getUniqueValuesArray(originalArray: any[]) {
  const result = [];
  originalArray.forEach(v => {
    if (result.indexOf(v) === -1) {
      result.push(v);
    }
  })
  return result;
}

export function concatUniqueValuesArray(arr1: any[], arr2: any[]) {
  const result = arr1.concat(arr2);
  return getUniqueValuesArray(result);
}

/**
 * Merges array of objects concatening arrays instead of overwritting one above other
 * Last object has priority
 */
export function mergeObjects(objects: any[], uniqueArrays: boolean = true) {
  const result: any = {};

  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (result[key]) {
        if (Array.isArray(result[key])) {
          if (uniqueArrays) {
            result[key] = concatUniqueValuesArray(obj[key], result[key]);
          } else {
            result[key] = obj[key];
          }
        } else {
          result[key]
        }
      } else {
        result[key] = obj[key];
      }
    });
  });

  return result;
}
