// pair
const pair = val => next => f => f(val)(next);

const fPair = val => (_, fn) => fn(val);

// isPair useless
const isPair = seq => fn1 => fn2 => seq(fn1, fn2);

const range = (fst, snd) => (fst === snd ? fPair(fst) : pair(fst)(range(fst + 1, snd)));

const foreach = (seq, fn) => seq(val => next => foreach(next, fn, fn(val)), fn);

const map = (seq, fn) => seq(val => next => pair(fn(val))(map(next, fn)), val => fPair(fn(val)));

const addMember = (seq, newMember) => seq(
    val => next => pair(val)(addMember(next, newMember)),
    val => pair(val)(fPair(newMember)),
  );

const reverse = seq => seq(val => next => addMember(reverse(next), val), val => fPair(val));

// for testing purpose
const jsPairToArray = pairToConvert => pairToConvert(val => next => [val, ...jsPairToArray(next)], val => [val]);

module.exports = {
  pair,
  fPair,
  isPair,
  range,
  foreach,
  map,
  addMember,
  reverse,
  jsPairToArray,
};
