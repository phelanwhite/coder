// Convert
var arr = {
  0: "value1",
  1: "value2",
  2: "value3",
  length: 3,
};
console.log(Array.from(arr)); // [ 'value1', 'value2', 'value3' ]

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var arr1 = [];
for (const element of arr) {
  arr1.push(element);
}
console.log(arr1); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
console.log([...arr]); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

var arr = {
  0: "value1",
  1: "value2",
  2: "value3",
};
console.log(Object.values(arr)); //[ 'value1', 'value2', 'value3' ]
console.log(Array.prototype.slice.call(arr)); //[ 'value1', 'value2', 'value3' ]
console.log(Object.keys(arr)); //[ '0', '1', '2' ]
console.log("This is as Array".split("")); //['T', 'h', 'i', 's', ' ', 'i', 's', ' ', 'a', 's', ' ', 'A', 'r', 'r', 'a', 'y']
console.log([..."This is as Array"]); //['T', 'h', 'i', 's', ' ', 'i', 's', ' ', 'a', 's', ' ', 'A', 'r', 'r', 'a', 'y']

// reducer
var arr2 = [
  {
    key: "one",
    value: 1,
  },
  {
    key: "two",
    value: 2,
  },
  {
    key: "three",
    value: 3,
  },
];

console.log(
  arr2.reduce((a, b) => {
    return a + b.value;
  }, 0)
); // 6
console.log(
  arr2.reduce((a, b) => {
    a[b.key] = b.value;
    return a;
  }, {})
); // { one: 1, two: 2, three: 3 }

function map(list, fn) {
  return list.reduce((newList, item) => {
    return newList.concat(fn(item));
  }, []);
}
console.log(map(arr2, (n) => n.value * n.value)); //[ 1, 4, 9 ]

// map
var arr3 = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
console.log(
  arr3.map((value, index, array) => {
    return value.value;
  })
); //[ 1, 2, 3, 4 ]

// filter
var arr4 = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
console.log(
  arr4.filter((value, index, array) => {
    return value.value % 2 === 0;
  })
); //[ { value: 2 }, { value: 4 } ]

// sort
var arr5 = [1, 4, 2, 2, 4, 43, 2, 1, 5, 4, "a", "g", "c", "b", "x", "d"];
console.log(arr5.sort()); //[ 1,   1,   2,   2,   2,   4,  4,   4,   43,  5,   'a', 'b', 'c', 'd', 'g', 'x' ]

var arr5 = [`apple`, "banna", "dogs", "cats", "elephants"];
console.log(arr5.sort((a, b) => a.length - b.length)); //[ 'dogs', 'cats', 'apple', 'banna', 'elephants' ]

var arr5 = [1, 4, 2, 2, 4, 43, 2, 1, 5, 4];
console.log(arr5.sort((a, b) => a - b)); //[1, 1, 2, 2,  2, 4, 4, 4, 5, 43]

//forEach
var arr6 = [1, 4, 2, 6];
arr6.forEach((item) => console.log(item)); // 1 4 2 6

// every
console.log(
  arr1.every((value) => {
    return value.key % 2 === 0;
  })
); // false

// some
console.log(
  arr1.some((value) => {
    return value.key % 2 === 0;
  })
); // true

// remove double item
var arr2 = [1, 2, 4, 2, 1, 5, 4, 6, 8, 7, 6, 5];
console.log([...new Set(arr2)]); //[1, 2, 4, 5, 6, 8, 7]

function uniqueArray(arr = []) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}
console.log(uniqueArray(arr2)); //[1, 2, 4, 5, 6, 8, 7]

// compare
function compareArray(arr1, arr2) {
  var isArr1 = Array.isArray(arr1);
  var isArr2 = Array.isArray(arr2);

  if (!isArr1 || !isArr2) return false;

  if (isArr1 !== isArr2) return false;

  if (arr1.length !== arr2.length) return false;

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}
var arr3 = [1, 2, 3, 4, 5, 6, "a"];
var arr4 = [1, 2, 3, 4, 5, 6, "ab"];
console.log(compareArray(arr3, arr4));

// reverse
var arr5 = [2, 1, 3, 4, 5, 6, 4, 3, 2];
console.log(arr5.reverse()); // [2, 3, 4, 6, 5, 4, 3, 1, 2]

// concat
var arr6 = [1, 2, 3];
var arr7 = [4, 5, 6];
console.log(arr6.concat(arr7)); // [ 1, 2, 3, 4, 5, 6 ]
console.log([...arr6, ...arr7]); // [ 1, 2, 3, 4, 5, 6 ]

// search
var arr8 = [1, 2, 3, 4, 5, 6, 4, 3, 3, 2, 1];
console.log(arr8.find((value) => value === 3)); // 3
console.log(arr8.findIndex((value) => value === 3)); // 2

var check = false;
for (let index = 0; index < arr8.length; index++) {
  const element = arr8[index];
  if (element === 3) {
    check = true;
    break;
  }
}
console.log(check); // true

// remove and add element
var arr9 = [1, 2, 3, 4, 5, 6];
arr9.shift();
console.log(arr9); //[ 2, 3, 4, 5, 6 ]
arr9.pop();
console.log(arr9); //[ 2, 3, 4, 5 ]
arr9.splice(1, 2);
console.log(arr9); //[ 2, 5 ]
delete arr9[1];
console.log(arr9); //[ 2, <1 empty item> ]

var arr9 = [1, 2, 3, 4, 5, 6];
arr9.unshift(7);
console.log(arr9); //[7, 1, 2, 3, 4, 5, 6]
arr9.push(8);
console.log(arr9); //[7, 1, 2, 3, 4, 5, 6, 8]
arr9.splice(4, 0, 6, 7, 7);
console.log(arr9); //[7, 1, 2, 3, 6, 7, 7, 4, 5, 6, 8]

// remove element all
var arr9 = [1, 2, 3, 4, 5, 6];
arr9.length = 0;
console.log(arr9); //[]

var arr9 = [1, 2, 3, 4, 5, 6];
arr9.splice(0);
console.log(arr9); //[]

// min max
var arr10 = [1, 2, 3, 5, 6, 7, 8, 5, 3, 2, 22, 11, 21, 25, 30, 14, 16, 3];
console.log(Math.max(...arr10)); //30
console.log(Math.min(...arr10)); //3

var maxValue = arr10[0];
var minValue = arr10[0];
for (var i = 1; i < arr10.length; i++) {
  if (arr10[i] > maxValue) maxValue = arr10[i];
  if (arr10[i] < minValue) minValue = arr10[i];
}
console.log(maxValue); //30
console.log(minValue); //1

console.log(arr10.reduce((pre, cur) => Math.max(pre, cur))); //30

// join
var arr11 = ["Hello", "World!"];
console.log(arr11.join(" ")); //Hello World!
