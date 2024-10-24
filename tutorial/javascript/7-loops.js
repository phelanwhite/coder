var arr1 = [
  {
    key: 1,
    value: 10,
  },
  {
    key: 2,
    value: 20,
  },
  {
    key: 3,
    value: 30,
  },
];

// for
for (var i = 0; i < arr1.length; i++) {
  console.log(arr1[i].key);
} // 1 2 3

// while
var i = 0;
while (i < 3) {
  console.log(arr1[i]?.key);
  i++;
} // 1 2 3

var i = 101;
do {
  console.log(i);
  i--;
} while (i > 99); // 101 100

// for in
for (const key in arr1) {
  console.log(key);
} // 0 1 2

// for of
for (const element of arr1) {
  console.log(element.value);
} // 10 20 30

// Object.keys()
for (const element of arr1.keys()) {
  console.log(element);
} // 0 1 2

// set
var arr2 = [1, 3, 5, 4, 3, 2];
var arr3 = new Set(arr2);
console.log(arr3); // Set(5) { 1, 3, 5, 4, 2 }
var arr4 = new Map().set(`a`, 1).set(`b`, 2).set(`c`, 3).set(`d`, 4);
console.log(arr4); //Map(4) { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }

var arr5 = [1, 2, 3, 4];
// continue
for (let index = 0; index < arr5.length; index++) {
  if (arr5[index] === 3) continue;
  console.log(arr5[index]);
} // 1 2 4
// break
for (let index = 0; index < arr5.length; index++) {
  if (arr5[index] === 3) break;
  console.log(arr5[index]);
} // 1 2
