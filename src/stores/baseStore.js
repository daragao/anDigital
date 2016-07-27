import {Store} from 'flux/utils';
import Dispatcher from '../dispatcher';

class BaseStore extends Store {
    constructor() {
        super(Dispatcher);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {};
    }

    getState() {
        const state = this.state;
        return state;
    }
}

export default BaseStore;
