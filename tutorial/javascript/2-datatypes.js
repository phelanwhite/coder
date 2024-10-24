// String
console.log({
  String: typeof `This is a string`,
  Date: typeof Date(2024, 2, 2),
});

// Number
console.log({
  Number: typeof 55,
});

// Boolean
console.log({
  Boolean: typeof true,
});

// Object
console.log({
  Object: typeof { name: `John Smith` },
  Array: typeof [1, 2, 4, 2, 2],
  Null: typeof null,
  template: typeof /aaa/,
  error: typeof Error(),
});

// Function
console.log({
  Function: typeof function name(params) {},
});

// Undefined
console.log({
  Not_: typeof var1,
});
