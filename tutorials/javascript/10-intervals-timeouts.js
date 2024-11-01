function display() {
  console.log(`This is display in the following`);
}

var timeout = setTimeout(() => {
  display();
}, 2 * 1000);
clearTimeout(timeout);

var interval = setInterval(() => {
  display();
}, 2 * 1000);
clearTimeout(interval);
