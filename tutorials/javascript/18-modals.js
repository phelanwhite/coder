// Alert
var btn1 = document.createElement("button");
btn1.innerHTML = `onclick show Alert`;
btn1.onclick = () => window.alert(`This is a Alert`);
document.body.appendChild(btn1);

// confirm
var btn2 = document.createElement("button");
btn2.innerHTML = `onclick show Confirm`;
btn2.onclick = () => window.confirm(`This is a Confirm`);
document.body.appendChild(btn2);

// prompt
var btn3 = document.createElement("button");
btn3.innerHTML = `onclick show Prompt`;
var div3 = document.createElement("div");
btn3.onclick = () => {
  div3.innerHTML = window.prompt(`This is a Confirm`);
};
document.body.appendChild(btn3);
document.body.appendChild(div3);

// print
var btn4 = document.createElement("button");
btn4.innerHTML = `onclick show Print`;
btn4.onclick = () => window.print();
document.body.appendChild(btn4);
