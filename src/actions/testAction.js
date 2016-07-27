import Constants from '../constants';
import Dispatcher from '../dispatcher';

class TestActions {
    static refresh() {
        return Dispatcher.dispatch({
            type: Constants.REFRESH
        });
    }

    static removeTest(key) {
        return Dispatcher.dispatch({
            type: Constants.REMOVE_TEST,
            data: key
        });
    }

    static addTest(key,value) {
        return Dispatcher.dispatch({
            type: Constants.ADD_TEST,
            data: {key:key,value:value}
        });
    }
}

export default TestActions;
