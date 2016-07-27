import React from 'react'; //eslint-disable-line no-unused-vars
//import ClassNames from 'classnames';

import {BaseComponent ,BaseComponentController} from '../common/Base';
//import TestAction from '../../actions/testAction';
import TestStore from '../../stores/testStore';

class TestItem extends BaseComponent {
    render() {
        return <div></div>;
    }
}


class Test extends BaseComponentController {
    constructor() {
        super(TestStore,...arguments);
    }

    render() {
        return <div><TestItem/> TEST</div>;
    }
}

export default Test;
