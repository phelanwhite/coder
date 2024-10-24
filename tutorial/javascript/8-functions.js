function foo() {
  console.log(`foo`);
}
const bar = () => {
  console.log(`bar`);
};
foo(); // foo
bar(); // bar

function display(name = "John") {
  console.log(`this is ${name}`);
}
display(); //this is John
display("Minh"); //this is Minh

// call apply bin
var obj = {
  a: 0,
  b: 0,
  set: function (a, b) {
    this.a = a;
    this.b = b;
  },
};

var obj1 = {};
obj.set.call(obj1, 2, 3);
console.log(obj1); //{ a: 2, b: 3 }
obj.set.apply(obj1, [2, 3]);
console.log(obj1); //{ a: 2, b: 3 }

var obj2 = { name: `John` };
function showName(label) {
  console.log(label + " : " + this.name);
}
var showStudent = showName.bind(obj2);
showStudent(`Hello`); //Hello : John
