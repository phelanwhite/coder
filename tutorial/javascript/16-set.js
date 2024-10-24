// create
var set = new Set([1, 2, 3, 4, 5, 6, 1, 2, 3]);
console.log(set); //Set(6) { 1, 2, 3, 4, 5, 6 }

set.add(7).add(8).add(9).add(10);
console.log(set); //Set(10) { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }

// check exist element
console.log(set.has(5)); //true
console.log(set.has(15)); //false

// length
console.log(set.size); //10

// remove
set.delete(5);
console.log(set); //Set(9) { 1, 2, 3, 4, 6, 7, 8, 9, 10 }

// clear
set.clear();
console.log(set); //Set(0) {}

// convert
var set = new Set([1, 2, 3, 4, 5, 6, 1, 2, 3]);
var arr = Array.from(set);
console.log(arr); //[ 1, 2, 3, 4, 5, 6 ]
var arr = [...set];
console.log(arr); //[ 1, 2, 3, 4, 5, 6 ]

// intersection and defference
var arr1 = new Set([1, 2, 3, 4, 5, 6]);
var arr2 = new Set([4, 5, 6, 7, 8, 9, 10]);
var intersection = new Set(Array.from(arr1).filter((x) => arr2.has(x)));
console.log(intersection); //Set(3) { 4, 5, 6 }
var defference = new Set(Array.from(arr1).filter((x) => !arr2.has(x)));
console.log(defference); //Set(3) { 1, 2, 3 }

// loop
var arr1 = new Set([1, 2, 3, 4, 5, 6, 2, 3]);

for (const element of arr1) {
  console.log(element); // 1 2 3 4 5 6
}

arr1.forEach((v1, v2, set) => {
  console.log({ v1, v2 });
});
// { v1: 1, v2: 1 }
// { v1: 2, v2: 2 }
// { v1: 3, v2: 3 }
// { v1: 4, v2: 4 }
// { v1: 5, v2: 5 }
// { v1: 6, v2: 6 }
