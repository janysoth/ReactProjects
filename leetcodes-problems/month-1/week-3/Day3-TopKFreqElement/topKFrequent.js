// 🔍 Problem: Top K Frequent Elements (#347)

/*
✅ Goal:
Learn to store and sort frequency data using:
1. Sorting by frequency array
2. Bucket sort for O(n) performance
*/

// 🧠 Concept:
// - Use a Map to store frequency counts
// - Sort entries OR use bucket sort

// --------------------------------------
// Version 1 – Sort by Frequency (O(n log n))
function topKFrequent(nums, k) {
  const freqMap = new Map();

  // Count frequencies
  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Sort by frequency and take top k
  return [...freqMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(entry => entry[0]);
}

// --------------------------------------
// Version 2 – Bucket Sort (O(n))
function topKFrequentBucket(nums, k) {
  const freqMap = new Map();

  // Count frequencies
  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Create buckets
  const buckets = Array(nums.length + 1).fill().map(() => []);
  for (let [num, freq] of freqMap.entries()) {
    buckets[freq].push(num);
  }

  // Gather top k from highest frequency bucket downwards
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}

// --------------------------------------
// Reusable Generic Function
function getTopKFrequent(arr, k) {
  const freqMap = new Map();

  for (let item of arr) {
    freqMap.set(item, (freqMap.get(item) || 0) + 1);
  }

  const buckets = Array(arr.length + 1).fill().map(() => []);
  for (let [item, freq] of freqMap.entries()) {
    buckets[freq].push(item);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}

// --------------------------------------
// 🧪 Test Cases
console.log("Sort version:", topKFrequent([1, 1, 1, 2, 2, 3], 2));       // [1, 2]
console.log("Bucket version:", topKFrequentBucket([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log("Generic:", getTopKFrequent(["apple", "banana", "apple", "orange", "banana", "apple"], 2)); // ["apple", "banana"]


// 🌍 Real-World Analogy:

function topKPlayedSongs(plays, k) {
  const freqMap = new Map();

  // Count frequency of each song
  for (let song of plays) {
    freqMap.set(song, (freqMap.get(song) || 0) + 1);
  }

  // Create buckets: index = frequency, value = list of songs
  const buckets = Array(plays.length + 1).fill().map(() => []);
  for (let [song, freq] of freqMap.entries()) {
    buckets[freq].push(song);
  }

  // Collect top k from highest frequency down
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}

// 🧪 Test it
const songs = [
  "Shape of You", "Blinding Lights", "Shape of You",
  "Levitating", "Shape of You", "Blinding Lights",
  "Peaches", "Levitating", "Blinding Lights"
];

console.log(topKPlayedSongs(songs, 2)); // ["Shape of You", "Blinding Lights"]