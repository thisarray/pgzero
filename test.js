/*
 * Test functions modeled after the Python unit testing framework.
 */
const test = (function () {
  function assertArrayEqual(first, second) {
    if (first.length < second.length) {
      console.assert(false, `Second contains ${ second.length - first.length } additional elements.`);
    }
    else if (first.length > second.length) {
      console.assert(false, `First contains ${ first.length - second.length } additional elements.`);
    }
    for (let i = 0; i < first.length; i++) {
      console.assert(first[i] === second[i], `First differing element ${ i }`);
    }
  }
  function assertObjectEqual(first, second) {
    for (const key of Reflect.ownKeys(first)) {
      let name = key.toString();
      if (Reflect.has(second, key)) {
        console.assert(Reflect.get(first, key) === Reflect.get(second, key),
                       `Property ${ name } differ!`);
      }
      else {
        console.assert(false, `Second object missing ${ name } property!`);
      }
    }
  }

  return {
    assertEqual(first, second, msg) {
      if (msg == null) {
        msg = 'values do not compare equal!';
      }
      if (typeof first === 'object') {
        if (Array.isArray(first)) {
          if (Array.isArray(second)) {
            assertArrayEqual(first, second);
          }
          else {
            // second is not an Array
            console.assert(false, msg);
          }
        }
        else {
          assertObjectEqual(first, second);
        }
      }
      else {
        console.assert(first === second, msg);
      }
    },
    assertTrue(expr, msg) {
      if (msg == null) {
        msg = 'expr is not true';
      }
      console.assert(expr, msg);
    },
    assertFalse(expr, msg) {
      if (msg == null) {
        msg = 'expr is not false';
      }
      console.assert(!expr, msg);
    },
    assertIs(first, second, msg) {
      if (msg == null) {
        msg = 'first is not second';
      }
      console.assert(first === second, msg);
    },
    assertIsNot(first, second, msg) {
      if (msg == null) {
        msg = 'unexpectedly identical';
      }
      console.assert(first !== second, msg);
    },
    main() {
      // Run all global test functions
      for (const key of Reflect.ownKeys(window)) {
        let name = key.toString();
        if (name.startsWith('test_')) {
          console.group(name);
          window[key]();
          console.groupEnd();
        }
      }
    }
  }
})();
