import ReactDOM from 'react-dom';
import React from 'react'; //eslint-disable-line no-unused-vars
import Test from '../components/test/Test';

$(function() {
    var testDomElem = document.getElementById('test');
    ReactDOM.render(<Test />, testDomElem);
});

