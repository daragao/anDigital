import BaseStore from './baseStore';
import Constants from '../constants';

class TestStore extends BaseStore {
    __onDispatch (action) {
        switch (action.type) {

        case Constants.REFRESH:
            this.__emitChange();
            return this.state;

        case Constants.ADD_TEST:
            this.addTest(action.data.key,action.data.value);
            this.__emitChange();
            return this.state;

        case Constants.REMOVE_TEST:
            this.removeTest(action.data);
            this.__emitChange();
            return this.state;


        default:
            return this.state;
        }
    }


    addTest(key,value) {
        this.state[key] = value;
        return value;
    }

    removeTest(key) {
        var value = this.state[key];
        delete this.state[key];
        return value;
    }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
const instance = new TestStore();
export default instance;
