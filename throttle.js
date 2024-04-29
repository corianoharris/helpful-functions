/**
 * Throttle functions based on a number of milliseconds
 * @param {function} fn Function to run during a completed timeout
 * @param {number} timing Number of milliseconds to throttle timeout
 */
export function createThrottle(fn, timing) {
  let timeout;

  /**
   * @param {any[]} args 
   */
  return function runThrottledFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), timing);
  };
}
