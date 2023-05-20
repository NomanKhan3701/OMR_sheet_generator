export const updateObject = (oldObject, updatedProperties) => {
  const updated = {
    ...oldObject,
    ...updatedProperties,
  };
  return updated;
};

export const randomInRange = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

export const splitArray = (arr, pos) =>
  arr.length > pos ? [...arr.splice(0, pos)] : [...arr];

export const isObject = (obj) =>
  obj && typeof obj === "object" && !Array.isArray(obj);
export const isObjectEmpty = (obj) =>
  obj &&
  typeof obj === "object" &&
  !Array.isArray(obj) &&
  Object.keys(obj).length === 0;

