import Constants from '../constants';
import Dispatcher from '../dispatcher';

class AnDigitalActions {
    static refresh() {
        return Dispatcher.dispatch({
            type: Constants.REFRESH
        });
    }

    static search(value) {
        return Dispatcher.dispatch({
            type: Constants.SEARCH,
            data: value
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

export default AnDigitalActions;
