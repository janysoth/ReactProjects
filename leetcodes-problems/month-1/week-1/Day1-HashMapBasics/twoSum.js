// ✅ Day 1 – Two Sum
function twoSum(numbers, target) {
  const map = new Map();

  for (let i = 0; i < numbers.length; i++) {
    let complement = target - numbers[i];

    if (map.has(complement))
      return [map.get(complement), i];

    map.set(numbers[i], i);
  }

  return null;
}

// Alternative Using Object: 
function twoSum2(numbers, target) {
  const map = {};

  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];

    if (complement in map)
      return [map[complement], i];

    map[numbers[i]] = i;
  }

  return null;
}

/** 🏦 Real-World Analogy **/

// 🍔 💳 Food Court Analogy
const findLunchCombo = (prices, giftCardAmount) => {
  const seenPrices = new Map();

  for (let i = 0; i < prices.length; i++) {
    const currentPrice = prices[i];
    const neededPrice = giftCardAmount - currentPrice;

    if (seenPrices.has(neededPrice))
      return [seenPrices.get(neededPrice), i];

    seenPrices.set(currentPrice, i);
  }

  return null;
};

const menuPrices = [4, 6, 3, 7];
const giftCard = 10;

const combo = findLunchCombo(menuPrices, giftCard);
console.log(combo);


// 🍱 Full Menu Combo Finder (Real-World Two Sum Simulation)
function findMenuCombo(menu, giftCardAmount) {
  const priceToIndex = new Map(); // price → index

  for (let i = 0; i < menu.length; i++) {
    const currentItem = menu[i];
    const neededPrice = giftCardAmount - currentItem.price;

    if (priceToIndex.has(neededPrice)) {
      const firstIndex = priceToIndex.get(neededPrice);
      const secondIndex = i;

      const item1 = menu[firstIndex];
      const item2 = menu[secondIndex];
      const total = item1.price + item2.price;

      const message = `🎉 Combo Found!: ${item1.name} ($${item1.price}) + ${item2.name} ($${item2.price}) = Total: $${total}`;

      const indicesMessage = `Indices: [${firstIndex}, ${secondIndex}]`;

      return [message, indicesMessage];
    }

    priceToIndex.set(currentItem.price, i);
  }

  // ❌ Display when no match is found
  console.log("❌ No combo found within gift card amount.");
  return null;
}

const menu = [
  { name: "Burger", price: 4 },
  { name: "Fries", price: 6 },
  { name: "Soda", price: 3 },
  { name: "Salad", price: 7 },
];

findMenuCombo(menu, giftCard);

console.log(findMenuCombo(menu, giftCard));