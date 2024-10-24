// create
var hello = `Hello my world`;
var intString = String(32);
var converToString1 = String(true);
var converToString2 = String(null);
var converToString3 = (3652).toString();
var converToString4 = false.toString();
var converToString5 = {}.toString();

console.log({
  hello,
  intString,
  converToString1,
  converToString2,
  converToString3,
  converToString4,
  converToString5,
});

// concat
var foo = `Foo`;
var bar = `Bar`;
console.log(foo + " " + bar); // Foo Bar
console.log(foo.concat(bar)); // FooBar

var string = `String`;
var number = 32;
var boolean = true;
console.log(string + number + boolean); // String32true

// teample
var palce = `World`;
var greet = `Hello ${palce}`;
console.log({ greet }); // Hello World

// reverse
function reverseString(string) {
  return string.split("").reverse().join("");
}
console.log(reverseString(`String`)); // gnirtS

// compare
var str1 = `String`;
var str2 = `String`;
var str3 = `String1`;
console.log(str1.localeCompare(str2)); // 0
console.log(str1.localeCompare(str3)); // -1
console.log(str3.localeCompare(str1)); // 1

// index string
var string = `String`;
console.log(str1.charAt(2)); // r
console.log(str1[2]); // r

// word counter
function wordCounter(string = "") {
  var wom = string.match(/\S+/g);
  return {
    characterNoSpaces: string.replace(/\s+/g, "").length,
    characters: string.length,
    words: wom ? wom.length : 0,
    lines: string.split(/\r*\n/).length,
  };
}
console.log(wordCounter("string  ddd  sss  ")); // { characterNoSpaces: 12, characters: 18, words: 3, lines: 1 }

// trim
var str1 = `   This is a string  `;
console.log(str1.trim()); // This is a string
console.log(str1.trimStart()); // This is a string
console.log(str1.trimEnd()); //    This is a string

// splitting
var s = `one, two, three, four, five`;
console.log(s.split(", ")); // [ 'one', 'two', 'three', 'four', 'five' ]

// slice
var s = `0123456789abcdefgh`;
console.log(s.slice(0, 5)); //01234
console.log(s.slice(10)); //abcdefgh
console.log(s.slice(5, 8)); //567

// character code
console.log("s".charCodeAt());

// find and repalce
var str = `Hello, world`;
console.log(str.indexOf(`o`)); //4
console.log(str.lastIndexOf(`o`)); //8
console.log(str.includes(`llo`)); //true

console.log(str.replace(`Hello`, `Bye`)); //Bye, world

// upper case ans lower case
var str = `Hello, world`;
console.log(str.toUpperCase()); //HELLO, WORLD
console.log(str.toLowerCase()); //hello, world

// repeat
var str = `Hello, world!`;
console.log(str.repeat(3)); //Hello, world!Hello, world!Hello, world!
console.log(str.repeat(0)); //
