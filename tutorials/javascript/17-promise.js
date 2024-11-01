var x = 10;

// create
var promise = new Promise(function (resolve, reject) {
  if (x < 10) resolve(`x<10`);
  else reject(`x>=10`);
});

// using
promise
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.log(err);
  }); // x>=10

var resolve = (value, time) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(value), time)
  );
};
// Promise.all
Promise.all([resolve(1, 1000), resolve(2, 2000), resolve(3, 3000)])
  .then((values) => {
    console.log({ values });
  })
  .catch((err) => {
    console.log(err);
  }); //{ values: [ 1, 2, 3 ] }

// Promise.race
Promise.race([resolve(1, 4000), resolve(2, 2000), resolve(3, 3000)])
  .then((values) => {
    console.log({ values });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log(`finally`);
  });
//{ values: 2 }
//finally

// async await
function uploadImage(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.addEventListener("load", (e) => resolve(img));
    img.src = url;
  });
}

(async () => {
  try {
    var url = `http://example.com/images.png`;
    var img = await uploadImage(url);
    console.log({ img });
  } catch (error) {
    console.log(error);
  }
})();
