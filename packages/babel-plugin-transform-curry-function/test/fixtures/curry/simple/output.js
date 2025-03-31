function currying(fn) {
  const numParamsRequired = fn.length;
  function curryFactory(params) {
    return function (...args) {
      const newParams = params.concat(args);
      if (newParams.length >= numParamsRequired) {
        return fn(...newParams);
      }
      return curryFactory(newParams);
    };
  }
  return curryFactory([]);
}
const foo = currying(function (a, b, c) {
  const sum = a + b + c;
  return sum;
});
