import ClassNames from 'classnames';
import React from 'react';

export class BaseComponent extends React.Component {

    renderDiv(elem,optionalArgs={}) {
        var props = optionalArgs.props || {};
        var classNames = ClassNames(optionalArgs.appendClass);
        return <div {...props} className={classNames}>{elem}</div>;
    }

    renderTD(elem,optionalArgs={}) {
        var props = optionalArgs.props || {};
        var classNames = ClassNames(optionalArgs.appendClass);
        return <td {...props} className={classNames}>{elem}</td>;
    }

    renderRow(elem,optionalArgs={}) {
        optionalArgs.appendClass = ClassNames(optionalArgs.appendClass,'row');
        return this.renderDiv(elem,optionalArgs);
    }

    renderCol(elem,optionalArgs={}) {
        var size = optionalArgs.size || 12;
        var classes = optionalArgs.classes;
        var sizeClass = 'large-'+size;
        var columnsClass = 'columns';
        optionalArgs.appendClass = ClassNames(classes,sizeClass,columnsClass);
        return this.renderDiv(elem,optionalArgs);
    }
}

export class BaseComponentController extends BaseComponent {

    constructor(store) {
        Array.prototype.shift.apply(arguments);//remove the first argument
        super(...arguments);
        // replaceState() is deprecated so need to force changes!!!
        this.store = store;
        this.state = { storeState: this.getStoreState()};
    }

    getStoreState() {
        return this.store.getState();
    }

    _onChange() {
        this.setState({ storeState: this.getStoreState()});
    }

    componentDidMount() {
        this.removeListener = this.store.addListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        if(this.removeListenerFunc) {
            this.removeListener();
        }
    }

}
