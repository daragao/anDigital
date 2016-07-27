import BaseStore from './baseStore';
import Constants from '../constants';
import Dispatcher from '../dispatcher';

class VenueStore extends BaseStore {
    getInitialState() {
        this.state = {};

        //check if geolocation exists
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition((geo) => this.state.geo = geo);
        } else  {
            // just write in the console since it will have london as default
            // location
            console.log('No GeoLocation in this browser! :)');
        }
        return this.state;
    }


    __onDispatch (action) {
        switch (action.type) {

        case Constants.REFRESH:
            this.__emitChange();
            return this.state;

        case Constants.REFRESH_VENUES:
            this.refreshVenues(action.data);
            this.__emitChange();
            return this.state;

        case Constants.SEARCH:
            this.search(action.data);
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

    search(value) {
        let urlBase = 'https://api.foursquare.com/v2/venues/search?';
        let clientId = 'VL44Y2W002XNCQFDA21OZO3MJ5W1NEOI0SDG205POYMXV33O';
        let clientSecret = 'RQRI1NCKW3FALYZAF5KFE0IYMQQXRUQRLOYG1JB5WSZONYAG';
        let paramsObj = {
            client_id: clientId,
            client_secret: clientSecret,
            v: '20160727',
            query: value
        };
        if(this.state.geo) {
            let coords = this.state.geo.coords;
            paramsObj.ll = coords.latitude + ',' + coords.longitude;
        } else {
            paramsObj.near = 'London';
        }
        let params = $.param(paramsObj);
        let url = urlBase + params;
        let searchPromise = $.get(url);
        $.when(searchPromise)
        .then((response) => { //refresh the venue list
            this.state.refreshing = true;
            Dispatcher.dispatch({
                type: Constants.REFRESH_VENUES,
                data: response[0].response.venues
            });
        });
        //console.log('SEARCH:',url);
    }

    refreshVenues(venues) {
        this.state.refreshing = false;
        this.state.venues = venues;
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
const instance = new VenueStore();
export default instance;
