// enabled cookie
if (!navigator.cookieEnabled) {
  console.log(`Cookie is not enabled`);
}
// add and setting
var cookie_name = `cookie`;
var cookie_value = `Hello world`;
var cookie_path = `foo/bar`;
var cookie_expires = new Date(Date.now() + 60000).toUTCString();
document.cookie +=
  cookie_name +
  "=" +
  cookie_value +
  "; expires=" +
  cookie_expires +
  "; path=" +
  cookie_path;

// reading
function getCookie(cookie = "") {
  var arr = cookie.split(", ");
  console.log(arr);
}

getCookie(document.cookie);

// remove
var expiry = new Date();
expiry.setTime(expiry.getTime() - 3600);
document.cookie =
  cookie_name + "=; expires=" + expiry.toUTCString() + "; path=/";
