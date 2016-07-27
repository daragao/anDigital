import ReactDOM from 'react-dom';
import React from 'react'; //eslint-disable-line no-unused-vars
import SearchVenue from '../components/anDigital/Search';

$(function() {
    var testDomElem = document.getElementById('anDigital');
    ReactDOM.render(<SearchVenue />, testDomElem);
});

