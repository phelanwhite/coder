// create
var date = new Date(`5/11/2025`);
console.log(date); //2025-05-10T17:00:00.000Z
console.log(date.toString()); //Sun May 11 2025 00:00:00 GMT+0700 (Indochina Time)
console.log(date.toTimeString()); //00:00:00 GMT+0700 (Indochina Time)
console.log(date.toDateString()); //Sun May 11 2025
console.log(date.toUTCString()); //Sat, 10 May 2025 17:00:00 GMT
console.log(date.toISOString()); //2025-05-10T17:00:00.000Z
console.log(date.toLocaleDateString()); //5/11/2025

//format
var date = new Date(`5/11/2025`).toLocaleDateString(`vn-VN`, {
  day: "2-digit",
  month: "short",
  year: "2-digit",
});
console.log(date); //May 11, 25

//different
var date1 = new Date();
var date2 = new Date(date1.valueOf() + 11111);
console.log(date1 - date2); //-11111
console.log(date1 < date2); //true
