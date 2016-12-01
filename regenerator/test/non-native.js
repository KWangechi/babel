// These tests run only in translation, not in native Node.

var assert = require("assert");
var shared = require("./shared.js");
var Symbol = shared.Symbol;
var check = shared.check;
var assertAlreadyFinished = shared.assertAlreadyFinished;

describe("@@iterator", function() {
  it("is defined on Generator.prototype and returns this", function() {
    function *gen(){}
    var iterator = gen();
    assert.ok(!iterator.hasOwnProperty(Symbol.iterator));
    assert.ok(!Object.getPrototypeOf(iterator).hasOwnProperty(Symbol.iterator));
    assert.ok(Object.getPrototypeOf(
      Object.getPrototypeOf(iterator)
    ).hasOwnProperty(Symbol.iterator));
    assert.strictEqual(iterator[Symbol.iterator](), iterator);
  });
});

describe("throw", function() {
  it("should complete throwing generator", function() {
    function *gen(x) {
      throw 1;
    }

    var u = gen();

    try {
      u.next();
    } catch (err) {
      assert.strictEqual(err, 1);
    }

    assertAlreadyFinished(u);
  });

  it("should complete yielding/throwing generator", function () {
    function *gen(x) {
      yield 2;
      throw 1;
    }

    var u = gen();

    u.next();

    try {
      u.throw(2);
    } catch (err) {
      assert.strictEqual(err, 2);
    }

    assertAlreadyFinished(u);
  });
});

describe("completed generator", function() {
  function *gen() {
    return "ALL DONE";
  }

  it("should refuse to resume", function() {
    var g = gen();

    assert.deepEqual(g.next(), {
      value: "ALL DONE", done: true
    });

    assertAlreadyFinished(g);
  });
});

describe("delegate yield", function() {
  it("should support any iterable argument", function() {
    function *gen() {
      yield 0;
      yield* [
        yield "one",
        yield "two",
        yield "three"
      ];
      yield 5;
    }

    check(gen(), [0, "one", "two", "three", 2, 3, 4, 5]);

    function *string() {
      return yield* "asdf";
    }

    check(string(), ["a", "s", "d", "f"]);
  });
});

describe("generator return method", function() {
  it("should work with newborn generators", function() {
    function *gen() {
      yield 0;
    }

    var g = gen();

    assert.deepEqual(g.return("argument"), {
      value: "argument",
      done: true
    });

    assertAlreadyFinished(g);
  });

  it("should behave as if generator actually returned", function() {
    var executedFinally = false;

    function *gen() {
      try {
        yield 0;
      } catch (err) {
        assert.ok(false, "should not have executed the catch handler");
      } finally {
        executedFinally = true;
      }
    }

    var g = gen();
    assert.deepEqual(g.next(), { value: 0, done: false });

    assert.deepEqual(g.return("argument"), {
      value: "argument",
      done: true
    });

    assert.strictEqual(executedFinally, true);
    assertAlreadyFinished(g);
  });

  it("should return both delegate and delegator", function() {
    var checkpoints = [];

    function* callee(errorToThrow) {
      try {
        yield 1;
        yield 2;
      } finally {
        checkpoints.push("callee finally");
        if (errorToThrow) {
          throw errorToThrow;
        }
      }
    }

    function* caller(errorToThrow) {
      try {
        yield 0;
        yield* callee(errorToThrow);
        yield 3;
      } finally {
        checkpoints.push("caller finally");
      }
    }

    var g1 = caller();

    assert.deepEqual(g1.next(), { value: 0, done: false });
    assert.deepEqual(g1.next(), { value: 1, done: false });

    assert.deepEqual(g1.return(-1), { value: -1, done: true });
    assert.deepEqual(checkpoints, [
      "callee finally",
      "caller finally"
    ]);

    var error = new Error("thrown from callee");
    var g2 = caller(error);

    assert.deepEqual(g2.next(), { value: 0, done: false });
    assert.deepEqual(g2.next(), { value: 1, done: false });

    try {
      g2.return(-1);
      assert.ok(false, "should have thrown an exception");
    } catch (thrown) {
      assert.strictEqual(thrown, error);
    }

    assert.deepEqual(checkpoints, [
      "callee finally",
      "caller finally",
      "callee finally",
      "caller finally"
    ]);
  });
});
