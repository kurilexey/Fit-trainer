import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";

import TextFieldsDense from '../UIComponents/TextFieldsDense';
import TextFieldsPassword from '../UIComponents/TextFieldsPassword';
import MyButton from '../UIComponents/MyButton';
import HeaderComponent from "./HeaderComponent";
import FooterSignComponent from "./FooterSignComponent";

class UpComponent extends Component{
    componentWillMount ( ) {
        if (this.props.currentNamePage !== this.namePage) this.props.onChangeNamePage(this.namePage);
    }
    signUpRequestData = {};
    namePage = "Sign up";

    ReadEmail = (value) => {
        this.signUpRequestData.email = value;
    };

    ReadPass = (value) => {
        this.signUpRequestData.pass = value;
    };

    ReadRepeatPass = (value) => {
        this.signUpRequestData.repeatPass = value;
    };

    render(){
        return(
            <div className={'inComponent'}>
                <HeaderComponent namePage = {this.namePage}/>
                <div className={"signWindow"}>
                    <div className={"signHeader"}>
                        <h3>Sign into Fit Trainer App</h3>
                        <section>Please, enteryour email and password</section>
                    </div>
                    <div className={"signBody"}>
                        <TextFieldsDense reademail={this.ReadEmail}/>
                        <TextFieldsPassword readinput={this.ReadPass}
                                            plaseholder ={"Password"}
                        />
                        <TextFieldsPassword readinput={this.ReadRepeatPass}
                                            plaseholder ={"Repeat Password"}
                        />
                        <MyButton    prefix = {"/email verification"}
                                     ending = {""}
                                     background = {'#CD00CD'}
                                     signuprequestdata = {this.signUpRequestData}
                                     label={this.namePage.toUpperCase()}
                        />
                        <Link   to="/sign in"
                                className={"link"}>
                            alredy have an account? sign-in
                        </Link>
                    </div>
                </div>
                <FooterSignComponent/>
            </div>
        );
    }
};

export default withRouter(connect(
    (state) => ({
        currentNamePage: state.currentNamePage
    }),

    dispatch => ({
        onEntryRequestUp: (data) => {
            const payload = data;
            dispatch ({type: 'ENTRY_REQUEST_UP', payload})
        },
        onChangeNamePage:(data) => {
            const payload = data;
            dispatch({type: 'CHANGE_NAME_PAGE', payload})
        }
    })
)(UpComponent));
