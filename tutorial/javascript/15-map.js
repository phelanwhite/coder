//create
var map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
  [4, "four"],
  [5, "five"],
  [6, "six"],
  [7, "seven"],
  [8, "eight"],
  [9, "nine"],
  [10, "ten"],
]);
console.log(map);
// Map(10) {
//     1 => 'one',
//     2 => 'two',
//     3 => 'three',
//     4 => 'four',
//     5 => 'five',
//     6 => 'six',
//     7 => 'seven',
//     8 => 'eight',
//     9 => 'nine',
//     10 => 'ten'
//   }

console.log(map.get(6)); //six
console.log(map.size); //10

// =================================================
// delete
map.delete(5);
console.log(map);
// Map(9) {
//     1 => 'one',
//     2 => 'two',
//     3 => 'three',
//     4 => 'four',
//     6 => 'six',
//     7 => 'seven',
//     8 => 'eight',
//     9 => 'nine',
//     10 => 'ten'
//   }

// check key exists in a map

// =================================================
// loop
for (const element of map) {
  console.log(element);
}
// [ 1, 'one' ]
// [ 2, 'two' ]
// [ 3, 'three' ]
// [ 4, 'four' ]
// [ 6, 'six' ]
// [ 7, 'seven' ]
// [ 8, 'eight' ]
// [ 9, 'nine' ]
// [ 10, 'ten' ]

map.forEach((value, key, map) => {
  console.log({ value, key });
});
// { value: 'one', key: 1 }
// { value: 'two', key: 2 }
// { value: 'three', key: 3 }
// { value: 'four', key: 4 }
// { value: 'six', key: 6 }
// { value: 'seven', key: 7 }
// { value: 'eight', key: 8 }
// { value: 'nine', key: 9 }
// { value: 'ten', key: 10 }

// =================================================
// check exist element
console.log(map.has(5)); //false
console.log(map.has(2)); //true

// =================================================
// clear
map.clear();
console.log(map); //Map(0) {}
