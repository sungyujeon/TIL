// Leetcode no.231
// Power of Two

var isPowerOfTwo = function(n) {
  if (n <= 0) return false
  
  return (n & (n-1)) === 0
}