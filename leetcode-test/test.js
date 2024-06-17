var titleToNumber = function (columnTitle) {
  const arr = [
    `A`,
    `B`,
    `C`,
    `D`,
    `E`,
    `F`,
    `G`,
    `H`,
    `I`,
    `J`,
    `K`,
    `L`,
    `M`,
    ` N`,
    `O`,
    `P`,
    `Q`,
    `R`,
    `S`,
    `T`,
    `U`,
    `V`,
    `W`,
    `X`,
    `Y`,
    `Z`,
  ];

  let result = 0;
  let index = 0;

  for (let i = 0; i < columnTitle.length; i++) {
    index = arr.findIndex(
      (item) => item.toLowerCase() === columnTitle[i].toLowerCase()
    );

    if (i < columnTitle.length - 1) {
      result = result + 26 * (index + 1);
    } else {
      result = result + index + 1;
      break;
    }
  }

  return result;
};
console.log(titleToNumber("aaa"));
