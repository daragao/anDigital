import React from 'react'; //eslint-disable-line no-unused-vars
//import ClassNames from 'classnames';

import {BaseComponent ,BaseComponentController} from '../common/Base';

class VenuesTable extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        let venues = (nextProps.venues || []).map((v) => ({
            id: v.id,
            name: v.name
        }));
        this.setState({ venues: venues });
    }

    renderTableRow(venue) {
        let row = [
            this.renderTD(venue.id, {props:{key:'id-'+venue.id}}),
            this.renderTD(venue.name, {props:{key:'name-'+venue.id}})
        ];
        return <tr key={'row-'+venue.id}>{row}</tr>
    }

    renderTable(venues) {
        let header = <thead key="header"><tr><th>id</th><th>name</th></tr></thead>
        let rows = venues.map((v) => this.renderTableRow(v));
        let tbody = <tbody key="venues">{rows}</tbody>
        let table = <table>{[header,tbody]}</table>
        return table;
    }

    render() {
        if(!this.state) return <div></div>;
        let table = this.renderTable(this.state.venues);
        let colElem = this.renderCol(table);
        let rowElem = this.renderRow(colElem);
        return rowElem;
    }
}

export default VenuesTable;
