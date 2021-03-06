'use strict';

// let's not pollute global namespace
var utils = {};

utils.post = function (url, data, cb) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4) cb(req.responseText);
    };
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded; charset=utf-8');
    req.send(data);
};

utils.showResult = function (data, inputElem) {
    inputElem.value = document.location.host + '/' + data;
};

utils.preventDefault = function (e) {
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
};

