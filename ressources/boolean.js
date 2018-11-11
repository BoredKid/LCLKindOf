const bool = a => b => f => f(a)(b);
const T = a => () => a;
const F = () => b => b;

const and = exp1 => exp2 => exp1(exp2)(exp1);
const or = exp1 => exp2 => exp1(exp1)(exp2);
const not = exp => exp(F)(T);

// for testing purpose
const toJsBool = bool(true)(false);
