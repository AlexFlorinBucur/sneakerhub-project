export const buildSortUrl = (location, sortOrder) => {
  const currentSearch = location.search;

  const cleanedSearch = currentSearch.replace(/([&?])order=[^&]+(&|$)/, "$1");

  const separator = cleanedSearch ? "&" : "?";

  const newSearch = `${cleanedSearch}${separator}order=${sortOrder}`;

  const finalSearch = newSearch.replace(/&+/g, "&");

  return finalSearch;
};
