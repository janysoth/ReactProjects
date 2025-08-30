/************************************
 * Day 4: Monotonic Stack Intro 
 *        LeetCode #232
 ***********************************/

// ✅ Solution 1: Two Stacks Approach
class MyQueue {
  constructor() {
    this.stack1 = []; // for enqueue
    this.stack2 = []; // for dequeue
  }

  push(x) {
    this.stack1.push(x); // enqueue always goes to stack1
  }

  pop() {
    if (this.stack2.length === 0) {
      // move elements from stack1 to stack2 to reverse order
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop(); // dequeue
  }

  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1]; // front of queue
  }

  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}

// Example
const q = new MyQueue();
q.push(1);
q.push(2);
console.log(q.peek()); // 1
console.log(q.pop());  // 1
console.log(q.empty()); // false


