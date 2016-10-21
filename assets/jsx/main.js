import styles from './styles.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';

/* jshint ignore:start */
@CSSModules(styles)
export default class Main extends Component {

    render() {
        
        return (
            
            <div styleName='container'>

                <h1> Sup, Momma! </h1>

            </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementsByClassName('container')[0]);

/* jshint ignore:end */
