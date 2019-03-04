import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import TextFieldDisabled from '../UIComponents/TextFieldDisabled';
import TextField from '../UIComponents/TextFieldsStandart';
import MyButton from '../UIComponents/MyButton';
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

class EmailVerificationComponent extends Component{
    componentWillMount ( ) {
        if (this.props.currentNamePage !== this.namePage) this.props.onChangeNamePage(this.namePage);
    }

    namePage = "Email verification";

    ReadField = (value) => {
        this.props.onEntryRegistrationCode(value);
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
                        <TextFieldDisabled defaultvalue ={this.props.currentUserSignUpData.email}/>
                        <TextField placeholder={"VerificationCode"} onreadfield={this.ReadField}/>
                        <MyButton  prefix = {"/sign in"}
                                   ending = {""}
                                   background = {'#CD00CD'}
                                   label={this.namePage.toUpperCase()}
                        />
                        <Link   to="/sign in"
                                className={"link"}>
                            alredy have an account? sign-in
                        </Link>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        );
    }
};


export default connect(
    (state) => ({
        currentUserSignUpData: state.currentUserSignUpData,
        currentNamePage: state.currentNamePage
    }),
    dispatch => ({
        onChangeNamePage:(data) => {
            const payload = data;
            dispatch({type: 'CHANGE_NAME_PAGE', payload})
        },
        onEntryRegistrationCode:(data) => {
            const payload = data;
            dispatch({type: 'ENTRY_REGISTRATION_CODE', payload})
        }
    })
)(EmailVerificationComponent);
