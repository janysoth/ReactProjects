/************************************
 Day 3: Stack Pattern 
        LeetCode #155 Daily Temp
 ***********************************/

const dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // store indices

  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      let prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
};