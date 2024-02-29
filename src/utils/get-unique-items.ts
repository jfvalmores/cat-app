/**
 * Generates unique list of objects based on the given key
 * @param list1 Exising list items
 * @param list2 List of items we want to append to the existing list
 * @param key Identifier for unique items
 * @returns Unique list based on key
 */
const getUniqueItems = (list1: { [key: string]: unknown }[], list2: { [key: string]: unknown }[], key = 'id') => {
  // Return the list to add if the existing list is empty
  if (!list1.length) {
    return list2;
  }

  // Get keys for both lists
  const keys1 = list1.map((item1) => item1[key]);
  const keys2 = list2.map((item2) => item2[key]);
  // Get the new keys to add
  const newKeys = keys2.filter((k2) => !keys1.includes(k2));
  if (newKeys.length) {
    // Let's add the new items on the existing list
    const result = [...list1];
    newKeys.forEach((newKey) => {
      const found = list2.find((item2) => item2[key] === newKey);
      if (found) {
        result.push(found);
      }
    });
    return result;
  }

  return list1;
};

export default getUniqueItems;
