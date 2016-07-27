import React from 'react'; //eslint-disable-line no-unused-vars
//import ClassNames from 'classnames';

import {BaseComponent ,BaseComponentController} from '../common/Base';
import AnDigitalActions from '../../actions/anDigitalActions';
import VenueStore from '../../stores/anDigitalStore';

import VenuesTable from './VenuesTable';

class SearchBox extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {search: ''};
        this.delayTimer = undefined;
    }

    change(event) {
        let value = event.target.value;
        clearTimeout(this.delayTimer);
        this.setState({ value: value });
        this.delayTimer = undefined;
        if(Boolean(value))
            this.delayTimer = setTimeout(() => AnDigitalActions.search(value),500);

    }

    renderSearchBox() {
        let searchBoxElem = <input type="text" onChange={this.change.bind(this)}
            placeholder="Search Venue"></input>
        return searchBoxElem;
    }

    render() {
        let colElem = this.renderCol(this.renderSearchBox());
        let rowElem = this.renderRow(colElem);
        return rowElem;
    }
}


class SearchVenue extends BaseComponentController {
    constructor() {
        super(VenueStore,...arguments);
    }

    render() {
        let storeState = this.getStoreState();
        let venues = <div>REFRESHING</div>
        if(!storeState.refreshing && storeState.venues) {
            venues = <VenuesTable venues={storeState.venues} />
        }
        return <div><SearchBox/>{venues}</div>;
    }
}

export default SearchVenue;
