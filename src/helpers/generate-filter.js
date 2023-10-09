export const generateFilterObject = (sneakersData) => {
  const brandCounts = {};
  const allCategories = [];
  const allSizes = [];
  const allPrices = [];

  for (const item of sneakersData) {
    const brandName = item.brandName;
    brandCounts[brandName] = (brandCounts[brandName] || 0) + 1;

    allCategories.push(...item.category);
    allSizes.push(item.sizeRange);
    allPrices.push(item.retailPrice);
  }

  const categoryCounts = {};
  for (const category of allCategories) {
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  }

  const sizeCounts = {};
  for (const size of allSizes.flat()) {
    sizeCounts[size] = (sizeCounts[size] || 0) + 1;
  }

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const numberOfIntervals = 10;
  const priceInterval =
    maxPrice - minPrice ? (maxPrice - minPrice) / numberOfIntervals : minPrice;

  const priceCounts = {};
  for (const price of allPrices) {
    const intervalIndex = Math.floor((price - minPrice) / priceInterval);
    const intervalStart = minPrice + intervalIndex * priceInterval;
    const intervalEnd = intervalStart + priceInterval;

    const intervalLabel = `${intervalStart.toFixed(2)}$ - ${intervalEnd.toFixed(
      2
    )}$`;
    priceCounts[intervalLabel] = (priceCounts[intervalLabel] || 0) + 1;
  }

  const brandArray = Object.entries(brandCounts).map(([brandName, count]) => ({
    item: brandName,
    count: count,
  }));

  const categoryArray = Object.entries(categoryCounts).map(
    ([category, count]) => ({
      item: category,
      count: count,
    })
  );

  const sizeArray = Object.entries(sizeCounts)
    .map(([size, count]) => ({ item: size, count: count }))
    .sort((a, b) => a.item - b.item);

  const priceArray = Object.entries(priceCounts)
    .map(([interval, count]) => ({
      item: interval,
      count: count,
    }))
    .sort((a, b) => parseFloat(a.item) - parseFloat(b.item));

  const filterObject = {
    brands: brandArray,
    categories: categoryArray,
    size: sizeArray,
    price: priceArray,
  };

  return filterObject;
};
