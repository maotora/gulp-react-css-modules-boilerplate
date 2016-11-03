import React, { Component } from 'react';
import styles from './styles.styl';
import CSSModules from 'react-css-modules';
import ReactGridLayout from 'react-grid-layout';

/* jshint ignore:start */

export default class Nav extends Component {
    render() {

		 var layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 2, y: 0, w: 1, h: 2, static: true},
            {i: 'c', x: 4, y: 0, w: 1, h: 2, static: true},
            {i: 'd', x: 6, y: 0, w: 1, h: 2, static: true},
            {i: 'e', x: 8, y: 0, w: 1, h: 2, static: true}
        ];

        return (
            
            <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200} margin={[1, 1]} >
                <Div divStyle="navItem" key="a" href="/">
                    Home
                </Div>
                <Div divStyle="navItem" key="b" href="blog">
                    Blog
                </Div>
                <Div divStyle="navItem" key="c" href="about">
                    About
                </Div>
                <Div divStyle="navItem" key="d" href="media">
                    Media
                </Div>
                <Div divStyle="navItem" key="e" href="contact">
                    Contacts
                </Div>

            </ReactGridLayout>
        )
    };
}

@CSSModules(styles)
class Div extends Component {
    
    render() {

        return (
            
            <div styleName={this.props.divStyle} >
                <a href={this.props.href}> {this.props.children} </a>
            </div>
        );
    }
}

@CSSModules(styles)
class Button extends Component {
    
    render() {
        
        return (
            <button styleName={this.props.buttonStyle}> 
                {this.props.children}
            </button>
        );
    }
}

/* jshint ignore:end */
