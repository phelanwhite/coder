// if
// else if
// else
var number = 3;
if (number < 6) {
  console.log(`${number}<6`);
} else if (number < 10) {
  console.log(`${number}<10`);
} else {
  console.log(`${number}>=10`);
} // 3<6

//
var number = 12;
number < 10 ? console.log(`${number}<10`) : console.log(`${number}>=10`); //12>=10

// switch case

var number = 5;
switch (number) {
  case 1:
    console.log(`number=${number}`);
    break;
  case 2:
    console.log(`number=${number}`);
    break;

  case 3:
  case 4:
  case 5:
  case 6:
    console.log(`${number} <=6`);
    break;
  default:
    console.log(`number=${number}`);
    break;
} //5 <=6
