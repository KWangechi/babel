function currying(fn) {
  const numParamsRequired = fn.length;
  function curryFactory(params) {
    return function (...args) {
      const newParams = params.concat(args);
      if (newParams.length >= numParamsRequired) {
        return fn(...newParams);
      }
      return curryFactory(newParams);
    }
  }
  return curryFactory([]);
}

function @@ foo(a, b, c){
  return a + b + c;
}

expect(foo(1, 2, 3)).toBe(6);
expect(foo(1)(2, 3)).toBe(6);
expect(foo(1, 2)(3)).toBe(6);
expect(foo(1)(2)(3)).toBe(6);
