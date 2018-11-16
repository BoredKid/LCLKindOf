const dico = require('./dictionnary');

// Array
const createSimpleArray = (n, fn = () => 0, acc = dico.fDictionnary) => (n > 0
    ? createSimpleArray(n - 1, fn, dico.dictionnary(n - 1, fn(n - 1))(acc))
    : acc);

const getLargerIndex = (array, prevIndex = -1) => array(
  index => next => getLargerIndex(next, prevIndex > index ? prevIndex : index),
  () => prevIndex,
);

const addToArray = newMember => array => dico.addMember(getLargerIndex(array) + 1, newMember)(array);

const createFullArrayFromAcc = acc => val => (val ? createFullArrayFromAcc(addToArray(val)(acc)) : acc);

const createFullArray = val => createFullArrayFromAcc(dico.fDictionnary)(val);

// const getLastIndex = (array, prevIndex = -1) =>
//     array((index, val) => next => getLastIndex(next, index), () => prevIndex);

const getLowerIndex = (array, prevIndex = -1) => array(
  index => next => getLowerIndex(
    next,
    prevIndex < index && prevIndex >= 0 ? prevIndex : index,
  ),
  () => prevIndex,
);

const deleteByIndex = index => array => dico.deleteByKey(index)(array);

const reverse = (array, length = dico.getLength(array)) => array(
  (index, val) => next => dico.dictionnary(length - 1 - index, val)(reverse(next, length)),
  () => dico.fDictionnary,
);

const concat = array1 => array2 => array2(
  (_, val) => next => concat(addToArray(val)(array1))(next),
  () => array1,
);

const reduce = array => (fn, acc) => array((_, val) => next => reduce(next)(fn, fn(acc, val)), () => acc);

const reduceRight = array => (fn, acc) => reduce(reverse(array))(fn, acc);

const deleteNthLastElements = num => array => (num > 0
    ? deleteNthLastElements(num - 1)(
    deleteByIndex(getLargerIndex(array))(array),
  )
    : array);

const deleteNthFirstElements = num => array => reverse(deleteNthLastElements(num)(reverse(array)));

const makeSubArray = array => (
  firstIndex = 0,
  lastIndex = getLargerIndex(array),
) => deleteNthFirstElements(firstIndex - getLowerIndex(array))(
  deleteNthLastElements(getLargerIndex(array) - lastIndex)(array),
);

const affectAtIndex = index => value => array => dico.addMember(index, value)(deleteByIndex(index)(array));

// test

const array1 = createFullArray(1)(2)(3)(5)(4)(7)(10)(20)(1)(1)(2)();

// array = affectAtIndex(2)(300)(array);

dico.foreach(array1, (key, val) => console.log(key, val));

console.log('\n\n');

// array1 = deleteNthFirstElements(3)(array1);

const array2 = makeSubArray(array1)(1, 3);

dico.foreach(array2, (key, val) => console.log(key, val));

dico.foreach(array2, (key, val) => console.log(key, val));

module.exports = {
  createSimpleArray,
  getLargerIndex,
  addToArray,
  createFullArray,
  getLowerIndex,
  deleteByIndex,
  reverse,
  concat,
  reduce,
  reduceRight,
  makeSubArray,
  affectAtIndex,
};
