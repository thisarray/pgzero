/*
 * JavaScript assert methods based on Python's unit testing framework.
 */
const test = (function () {
  function deepEqual(first, second) {
    if (first === second) {
      return true;
    }
    if ((first == null) || (second == null) ||
        (typeof first !== 'object') || (typeof second !== 'object')) {
      return false;
    }
    let firstKeys = Object.keys(first),
        secondKeys = Object.keys(second);
    if (firstKeys.length !== secondKeys.length) {
      return false;
    }
    for (const key of firstKeys) {
      if (secondKeys.includes(key)) {
        if (!deepEqual(first[key], second[key])) {
          return false;
        }
      }
      else {
        return false;
      }
    }

    // If all tests pass, then first and second appear equal
    return true;
  }

  function assertArrayEqual(first, second) {
    if (first.length < second.length) {
      console.assert(false, `Second contains ${ second.length - first.length } additional elements.`);
      return false;
    }
    else if (first.length > second.length) {
      console.assert(false, `First contains ${ first.length - second.length } additional elements.`);
      return false;
    }
    for (let i = 0; i < first.length; i++) {
      if (!deepEqual(first[i], second[i])) {
        console.assert(false, `First differing element ${ i }`);
        return false;
      }
    }
    return true;
  }

  function assertObjectEqual(first, second) {
    let firstKeys = Object.keys(first),
        secondKeys = Object.keys(second);
    if (firstKeys.length !== secondKeys.length) {
      console.assert(false, `Second object does not have the same number of properties!`);
      return false;
    }
    for (const key of firstKeys) {
      if (secondKeys.includes(key)) {
        if (!deepEqual(first[key], second[key])) {
          console.assert(false, `Property ${ key } differ!`);
          return false;
        }
      }
      else {
        console.assert(false, `Second object missing ${ key } property!`);
        return false;
      }
    }
    return true;
  }

  return {
    assertEqual(first, second, msg) {
      if (msg == null) {
        msg = 'values do not compare equal!';
      }
      if (typeof first === 'object') {
        if (Array.isArray(first)) {
          if (Array.isArray(second)) {
            return assertArrayEqual(first, second);
          }
          else {
            // second is not an Array
            console.assert(false, msg);
            return false;
          }
        }
        else {
          return assertObjectEqual(first, second);
        }
      }
      else {
        if (!deepEqual(first, second)) {
          console.assert(false, msg);
          return false;
        }
      }
      return true;
    },
    assertTrue(expr, msg) {
      if (msg == null) {
        msg = 'expr is not true';
      }
      console.assert(expr, msg);
      return expr;
    },
    assertFalse(expr, msg) {
      if (msg == null) {
        msg = 'expr is not false';
      }
      console.assert(!expr, msg);
      return (!expr);
    },
    assertIs(first, second, msg) {
      if (msg == null) {
        msg = 'first is not second';
      }
      let result = first === second;
      console.assert(result, msg);
      return result;
    },
    assertIsNot(first, second, msg) {
      if (msg == null) {
        msg = 'unexpectedly identical';
      }
      let result = first !== second;
      console.assert(result, msg);
      return result;
    },
    assertRaises() {
      try {
        arguments[1](...arguments.slice(2));
        console.assert(false, 'Error not thrown.');
      }
      catch (error) {
        console.assert(error instanceof arguments[0], 'Error of wrong type thrown.');
        return true;
      }
      return false;
    },
    main() {
      // Run all global test functions
      for (const name of Object.getOwnPropertyNames(window)) {
        if (name.startsWith('test_')) {
          console.group(name);
          window[name]();
          console.groupEnd();
        }
      }
    }
  }
})();
