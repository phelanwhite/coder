// LocalStorage
// ================================================================
// set and add
localStorage.setItem("name", "Tran Trung Nghia");
localStorage.name1 = "Tran Trung Nghia";

console.log({
  "name: ": localStorage.getItem("name"),
  "name1: ": localStorage.name1,
});

// length
console.log(localStorage.length);

// remove
localStorage.removeItem("name");
delete localStorage.name1;

console.log({
  "name: ": localStorage.getItem("name"),
  "name1: ": localStorage.name1,
});

//clear
localStorage.setItem("key1", "value1");
localStorage.setItem("key2", "value2");
localStorage.setItem("key3", "value3");
localStorage.setItem("key4", "value4");
console.log(localStorage);
localStorage.clear();
console.log(localStorage);

// SessionStorage
// ================================================================
// set and add
sessionStorage.setItem("name", "Tran Trung Nghia");
sessionStorage.name1 = "Tran Trung Nghia";
console.log({
  "name: ": sessionStorage.getItem("name"),
  "name1: ": sessionStorage.name1,
});

// length
console.log(sessionStorage.length);

// remove
sessionStorage.removeItem("name");
delete sessionStorage.name1;

console.log({
  "name: ": sessionStorage.getItem("name"),
  "name1: ": sessionStorage.name1,
});

// clear
sessionStorage.setItem("key1", "value1");
sessionStorage.setItem("key2", "value2");
sessionStorage.setItem("key3", "value3");
sessionStorage.setItem("key4", "value4");
console.log(sessionStorage);
sessionStorage.clear();
console.log(sessionStorage);
