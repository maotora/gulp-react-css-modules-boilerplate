import React, { Component } from 'react';
import styles from './styles.styl';
import CSSModules from 'react-css-modules';
import { Grid, Cell } from 'radium-grid';

/* jshint ignore:start */

export default class Nav extends Component {
    render() {
        return (
            
            <Container>
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
            </Container>

        )
    };
}

class Container extends Component {
    
    render() {
        return (
            
            <div>
                {this.props.children}
            </div>
        );
    }
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
