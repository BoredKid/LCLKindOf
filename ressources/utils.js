const compose = f => g => a => f(g(a));
const K = a => b => a;
const KI = a => b => b;

module.exports = {
  compose,
  K,
  KI,
};
