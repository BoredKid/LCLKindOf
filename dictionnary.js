// dictionnary
const dictionnary = (key, val) => next => f => f(key, val)(next);
const fDictionnary = (_, fn) => fn();

const addMember = (newKey, newVal) => dico =>
    dico(
        (key, val) => next =>
        dictionnary(key, val)(addMember(newKey, newVal)(next)),
        () => dictionnary(newKey, newVal)(fDictionnary)
    );

const getLength = (array, acc = 0) =>
    array(() => next => getLength(next, acc + 1), () => acc);

const deleteByKey = key => dico =>
    dico(
        (currKey, val) => next =>
        key !== currKey ?
        dictionnary(currKey, val)(deleteByKey(key)(next)) :
        next,
        _ => fDictionnary
    );

const foreach = (seq, fn) =>
    seq((key, val) => next => foreach(next, fn, fn(key, val)), _ => _);

const map = (seq, fn) =>
    seq(
        (key, val) => next => dictionnary(key, fn(val))(map(next, fn)),
        _ => fDictionnary
    );

const hasValue = val => dico =>
    dico(
        (key, currVal) => next => (val === currVal ? true : hasValue(val)(next)),
        _ => false
    );

const count = val => dico =>
    dico(
        (key, currVal) => next => (currVal === val ? 1 : 0) + count(val)(next),
        _ => 0
    );

// Array
const createSimpleArray = (n, fn = x => 0, acc = fDictionnary) =>
    n > 0 ?
    createSimpleArray(n - 1, fn, dictionnary(n - 1, fn(n - 1))(acc)) :
    acc;

const createFullArrayFromAcc = acc => val =>
    val ? createFullArrayFromAcc(addToArray(val)(acc)) : acc;

const createFullArray = val => createFullArrayFromAcc(fDictionnary)(val);

// const getLastIndex = (array, prevIndex = -1) =>
//     array((index, val) => next => getLastIndex(next, index), () => prevIndex);

const getLargerIndex = (array, prevIndex = -1) =>
    array(
        (index, val) => next =>
        getLargerIndex(next, prevIndex > index ? prevIndex : index),
        () => prevIndex
    );

const getLowerIndex = (array, prevIndex = -1) =>
    array(
        (index, val) => next =>
        getLowerIndex(next, prevIndex < index && prevIndex >= 0 ? prevIndex : index),
        () => prevIndex
    );

const addToArray = newMember => array =>
    addMember(getLargerIndex(array) + 1, newMember)(array);

const deleteByIndex = index => array => deleteByKey(index)(array);

const reverse = (array, length = getLength(array)) =>
    array(
        (index, val) => next =>
        dictionnary(length - 1 - index, val)(reverse(next, length)),
        _ => fDictionnary
    );

const concat = array1 => array2 =>
    array2(
        (index, val) => next => concat(addToArray(val)(array1))(next),
        _ => array1
    );

const reduce = array => (fn, acc) =>
    array((index, val) => next => reduce(next)(fn, fn(acc, val)), _ => acc);

const reduceRight = array => (fn, acc) =>
    reduce(reverse(array))(fn, acc);

const deleteNthLastElements = num => array =>
    num > 0 ? deleteNthLastElements(num - 1)(deleteByIndex(getLargerIndex(array))(array)) : array;

const deleteNthFirstElements = num => array =>
    reverse(deleteNthLastElements(num)(reverse(array)));

const makeSubArray = array => (firstIndex = 0, lastIndex = getLargerIndex(array)) =>
    deleteNthFirstElements(firstIndex - getLowerIndex(array))(deleteNthLastElements(getLargerIndex(array) - lastIndex)(array));

const affectAtIndex = index => value => array => addMember(index, value)(deleteByIndex(index)(array));

// test


let array1 = createFullArray(1)(2)(3)(5)(4)(7)(10)(20)(1)(1)(2)();

// array = affectAtIndex(2)(300)(array);

foreach(array1, (key, val) => console.log(key, val));

console.log('\n\n');

//array1 = deleteNthFirstElements(3)(array1);

let array2 = makeSubArray(array1)(1, 3);

foreach(array2, (key, val) => console.log(key, val));