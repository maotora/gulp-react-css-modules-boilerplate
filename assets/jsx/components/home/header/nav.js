import React, { Component } from 'react';
import styles from './styles.styl';
import CSSModules from 'react-css-modules';

/* jshint ignore:start */

@CSSModules(styles)
export default class Nav extends Component {
    render() {
        return (
            
            <div styleName='container'>

                <h1> Sup, Momma! </h1>

            </div>
        )
    };
}
/* jshint ignore:end */
