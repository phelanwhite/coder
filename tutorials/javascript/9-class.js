class MyClass {
  constructor(name) {
    this.name = name;
  }
  set_name(name) {
    this.name = name;
  }
  get_name() {
    return this.name;
  }
  display() {
    console.log(`My name is ` + this.name);
  }
  static get myProperty() {
    return `myProperty`;
  }
  static myMethod() {
    return `myMethod`;
  }
}
var myPerson = new MyClass(`John`);
myPerson.display(); //My name is John
console.log(MyClass.myProperty); //myProperty
console.log(MyClass.myMethod()); //myMethod

class SubClass extends MyClass {
  constructor(name) {
    super(name);
  }
}
var myPerson = new SubClass(`John`);
myPerson.display(); //My name is John
myPerson.set_name(`Hoa`);
console.log(myPerson.get_name()); //Hoa

class Class1 {
  constructor(name) {
    this._name = name;
  }
  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
}

var myClass1 = new Class1(`Minh`);
console.log(myClass1.name); //Minh
myClass1.name = "Toan";
console.log(myClass1.name); //Toan
