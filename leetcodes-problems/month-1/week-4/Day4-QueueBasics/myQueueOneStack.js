/************************************
 * Day 4: Monotonic Stack Intro 
 *        LeetCode #232
 ***********************************/

// ✅ Solution 2: One Stack + Recursion
class MyQueue {
  constructor() {
    this.stack = [];
  }

  push(x) {
    this.stack.push(x);
  }

  pop() {
    // Remove front element recursively
    const x = this.stack.pop();
    if (this.stack.length === 0) {
      return x; // base: last element is the front
    }
    const res = this.pop(); // recursive call
    this.stack.push(x); // restore stack
    return res;
  }

  peek() {
    const x = this.stack.pop();
    if (this.stack.length === 0) {
      this.stack.push(x); // restore
      return x;
    }
    const res = this.peek();
    this.stack.push(x); // restore stack
    return res;
  }

  empty() {
    return this.stack.length === 0;
  }
}

// Example
const q = new MyQueue();
q.push(1);
q.push(2);
console.log(q.peek()); // 1
console.log(q.pop());  // 1
console.log(q.empty()); // false

