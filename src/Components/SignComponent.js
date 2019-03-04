import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import { Switch, Route, Link, withRouter} from 'react-router-dom';

import InComponent from "./InComponent";
import UpComponent from "./UpComponent";
import EmailVerificationComponent from "./EmailVerificationComponent";

const NamePageArray = [
    {
        name: "Sign in",
        src: "https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"
    },
    {
        name: "Sign up",
        src: "https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"
    }];


class SignComponent extends Component{

    showIllumination = (item) => {
        if (item.name.toLowerCase() === this.props.currentNamePage.toLowerCase())return "illumination";
    };

    showhover = (item) => {
        for (let i = 0; i < NamePageArray.length; i++) {
            if (NamePageArray[i].name.toLowerCase() === item.name.toLowerCase()) return "hover";
        }
    };

    render (){
        return(
            <div className={'myPage'}>
                <div className={'SideBar'}>
                    <div className={'Header'}>
                        <img src={logo} className="App-logo" alt="logo" />
                        <div >
                            FIT TRAINER
                        </div>
                    </div>
                    <hr/>

                    {NamePageArray.map((item, index) => {
                        return (
                            <div className={"myButton "+ this.showIllumination(item)+" "+this.showhover(item)}
                                 key = {index}
                            >
                                <Link   to={"/"+item.name.toLowerCase()}
                                     className={"link"}>
                                    <div>
                                        <img src={item.src} alt={""}/>
                                        {item.name}
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className={"Component"}>
                    <Switch>
                        <Route exact path="/sign in" component = {InComponent} />
                        <Route exact path="/sign up" component = {UpComponent} />
                        <Route exact path="/email verification" component = {EmailVerificationComponent} />
                    </Switch>
                </div>
            </div>
        );
    }
};


export default withRouter(connect(
    (state) => ({
        currentNamePage: state.currentNamePage,
        usersArray: state.usersArray
    })
)(SignComponent));