import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/home/header/nav.js';

/* jshint ignore:start */
export default class Main extends Component {

    render() {
        
        return ( 
                
                <Nav /> 
            );
    }
}

ReactDOM.render(<Main />, document.getElementsByClassName('container')[0]);

/* jshint ignore:end */
