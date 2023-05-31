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

export const getAlphabets = (count = 26) => {
  const alphabets = [...Array(count).keys()].map((item) => String.fromCharCode(item + 65));
  return alphabets;
}

export const getNumbers = () => {
  const numbers = [...Array(10).keys()].map((item) => item);
  return numbers;
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

