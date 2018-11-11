// dictionnary
const dictionnary = (key, val) => next => f => f(key, val)(next);
const fDictionnary = (_, fn) => fn();

const addMember = (newKey, newVal) => dico => dico(
  (key, val) => next => dictionnary(key, val)(addMember(newKey, newVal)(next)),
  () => dictionnary(newKey, newVal)(fDictionnary),
);

const getLength = (array, acc = 0) => array(() => next => getLength(next, acc + 1), () => acc);

const deleteByKey = key => dico => dico(
  (currKey, val) => next => (
    key !== currKey ? dictionnary(currKey, val)(deleteByKey(key)(next)) : next
  ),
  () => fDictionnary,
);

const foreach = (seq, fn) => seq((key, val) => next => foreach(next, fn, fn(key, val)), _ => _);

const map = (seq, fn) => seq(
  (key, val) => next => dictionnary(key, fn(val))(map(next, fn)),
  () => fDictionnary,
);

const hasValue = val => dico => dico(
  (key, currVal) => next => (val === currVal ? true : hasValue(val)(next)),
  () => false,
);

const count = val => dico => dico(
  (key, currVal) => next => (currVal === val ? 1 : 0) + count(val)(next),
  () => 0,
);


module.exports = {
  dictionnary,
  fDictionnary,
  addMember,
  getLength,
  deleteByKey,
  foreach,
  hasValue,
  map,
  count,
};
