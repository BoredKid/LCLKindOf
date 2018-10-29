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

const addToArray = newMember => array =>
  addMember(getLargerIndex(array) + 1, newMember)(array);

const deleteByKey = key => dico =>
  dico(
    (currKey, val) => next =>
      key !== currKey
        ? dictionnary(currKey, val)(deleteByKey(key)(next))
        : next,
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
  n > 0
    ? createSimpleArray(n - 1, fn, dictionnary(n - 1, fn(n - 1))(acc))
    : acc;

const createFullArrayFromAcc = acc => val =>
  val ? createFullArrayFromAcc(addToArray(val)(acc)) : acc;

const createFullArray = val => createFullArrayFromAcc(fDictionnary)(val);

const getLastIndex = (array, prevIndex = -1) =>
  array((index, val) => next => getLastIndex(next, index), () => prevIndex);

const getLargerIndex = (array, prevIndex = -1) =>
  array(
    (index, val) => next =>
      getLargerIndex(next, prevIndex > index ? prevIndex : index),
    () => prevIndex
  );

const deleteByIndex = index => array => deleteByKey(index)(array);

const reverse = (array, length = getLength(array)) =>
  array(
    (index, val) => next =>
      dictionnary(length - 1 - index, val)(reverse(next, length)),
    _ => fDictionnary
  );

// test

let newDico = dictionnary(2, "coucou")(dictionnary(1, "salut")(fDictionnary));

newDico = addMember(0, "yo")(newDico);
newDico = addMember(3, "yo")(newDico);
newDico = addMember(4, "yo")(newDico);

foreach(newDico, (key, val) => console.log(key, val));

// let array = createSimpleArray(0, x => x);

console.log(`\n${getLength(newDico)}\n`);

newDico = reverse(newDico);

foreach(newDico, (key, val) => console.log(key, val));

console.log("\ntrue ?", hasValue("coucou")(newDico));
console.log("false ?", hasValue("yo les gens")(newDico));

console.log("\ncount", count("yo")(newDico));

// console.log("\n");

// array = addToArray("new element")(array);

// let array = createFullArray("valeur0")("salut")("ca va ?")("hey")();

// foreach(array, (key, val) => console.log(key, val));
