function removeElements(selector) {
  var number = 0;

  document.querySelectorAll(selector).forEach(function (el) {
    el.remove();
    number++;
  });

  return number;
}

function start() {
  //console.log("PlayShikiApp");

  var numElements = removeElements("#vjs-overlayclip-box");
  numElements += removeElements(".vjs-overlayclip-box-close");

  if (numElements == 0) setTimeout(start, 100);
}

try {
  start();
} catch (e) {
  console.log(e);
}
