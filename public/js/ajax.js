'use strict';

function POST(url, data, callback) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function () {
    if (req.readyState === 4) callback(req.responseText);
  };

  req.open('POST', url, true);
  req.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded; charset=utf-8');
  req.send(data);
}

function showResult(data, inputElementId) {
  var el = document.getElementById(inputElementId);
  el.value = document.URL + data;
}

function preventDef(event) {
  if (event.preventDefault) event.preventDefault();
  event.returnValue = false;
}

function checkIfUrl(s) {
  // this just checks "string dot chars"
  if (/\S+\.[a-zA-Z]+/.test(s)) {
    // assume http://
    s = (/^https?:\/\//.test(s)) ? s : 'http://' + s;
    return s;
  }
  return false;
}

