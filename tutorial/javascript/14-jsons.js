var var1 = {
  name: `test`,
  age: 18,
  address: `Ha Noi`,
};

var var1_json = JSON.stringify(var1);
console.log(var1_json); //{"name":"test","age":18,"address":"Ha Noi"}

var var1_parse = JSON.parse(var1_json);
console.log(var1_parse); //{ name: 'test', age: 18, address: 'Ha Noi' }
