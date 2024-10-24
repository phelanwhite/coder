var root = document.querySelector(`#root`);

// file input
var inputFile = document.createElement("input");
inputFile.setAttribute("type", "file");
inputFile.setAttribute("multiple", true);
root.appendChild(inputFile);

// view file
inputFile.addEventListener("change", (e) => {
  var files = Array.from(e.target.files);
  checkDouble(files);
});

// check double
var checkDouble = (files = []) => {
  var results = [];
  for (const element of files) {
    // check size
    if (results.findIndex((value) => value?.size !== element.size)) {
      results.push(element);
    } else {
      continue;
    }
  }

  render(results);
};

// render
var render = (files = []) => {
  var container = document.createElement("div");
  container.setAttribute("class", "container");
  files.forEach((file) => {
    var divCard = document.createElement("div");
    var img = document.createElement("img");
    var divName = document.createElement("div");
    var divSize = document.createElement("div");
    var divType = document.createElement("div");

    divName.innerHTML = file?.name;
    divSize.innerHTML = file?.size;
    divType.innerHTML = file?.type;
    img.src = URL.createObjectURL(file);

    divCard.setAttribute("class", "card");
    divCard.appendChild(img);
    divCard.appendChild(divName);
    divCard.appendChild(divSize);
    divCard.appendChild(divType);

    container.appendChild(divCard);
  });
  root.appendChild(container);
};
