// given functions
const Pair = a => b => f => f(a)(b);

const First = pair => pair(a => b => a);

const Second = pair => pair(a => b => b);

// my function
const Range = (a, b) => (a === b - 1 ? Pair(a)(b) : Pair(a)(Range(a + 1, b)));

const Foreach = (numbers, fn) => {
  fn(First(numbers));
  typeof Second(numbers) === "function"
    ? Foreach(Second(numbers), fn)
    : fn(Second(numbers));
};

const Map = (numbers, fn) => {
  return Pair(fn(First(numbers)))(
    typeof Second(numbers) !== "function"
      ? fn(Second(numbers))
      : Map(Second(numbers), fn)
  );
};

// inutile
const lastMember = numbers => {
  return typeof Second(numbers) === "function"
    ? lastMember(Second(numbers))
    : Second(numbers);
};

// inutile
const deleteLastMember = numbers => {
  return typeof Second(Second(numbers)) === "function"
    ? Pair(First(numbers))(deleteLastMember(Second(numbers)))
    : Pair(First(numbers))(First(Second(numbers)));
};

const addMember = (numbers, newMember) => {
  return typeof Second(numbers) === "function"
    ? Pair(First(numbers))(addMember(Second(numbers), newMember))
    : Pair(First(numbers))(Pair(Second(numbers))(newMember));
};

const Reverse = numbers => {
  return typeof Second(numbers) === "function"
    ? addMember(Reverse(Second(numbers)), First(numbers))
    : Pair(Second(numbers))(First(numbers));
};

// pour tester
const jsPairToArray = Pair => {
  let first;
  let second;

  // if (typeof First(Pair) === "function") {
  //   first = jsPairToArray(First(Pair));
  // } else {
  //   first = First(Pair);
  // }

  first = First(Pair);

  if (typeof Second(Pair) === "function") {
    second = jsPairToArray(Second(Pair));
  } else {
    second = Second(Pair);
  }

  return (typeof first === typeof [] ? first : [first]).concat(second);
};

// script
let numbers = Range(1, 10);
numbers = Map(numbers, function(n) {
  return n * n;
});
console.log(jsPairToArray(numbers));
numbers = Reverse(numbers);
console.log(jsPairToArray(numbers));
Foreach(numbers, console.log);

// console.log(jsPairToArray(addMember(Range(1, 11), 12)));
