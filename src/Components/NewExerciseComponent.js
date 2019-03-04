import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import TextFieldsStandart from '../UIComponents/TextFieldsStandart';
import TextFieldsSelectNative from '../UIComponents/TextFieldsSelectNative';
import MyButton from '../UIComponents/MyButton';
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

class NewExerciseComponent extends Component {
    componentWillMount ( ) {
        if (this.props.currentNamePage !== this.namePage) this.props.onChangeNamePage(this.namePage);
    };

    newExerciseRequestData = {};
    namePage = "New Exercise";

    ReadExerciseName = (value) => {
        this.newExerciseRequestData.exercisesName = value;
        this.newExerciseRequestData.measurementType = this.newExerciseRequestData.measurementType || 'meters';
    };

    ReadMeasurementType = (value) => {
        this.newExerciseRequestData.measurementType = value;
    };

    render(){
        return(
            <div className={'inComponent'}>
                <HeaderComponent namePage = {this.namePage}
                                 username = {this.props.currentUserSignInData.email}
                />
                <div className={"signWindow"}>
                    <div className={"signHeader"}>
                        <h3>Create new exercise</h3>
                        <section>Please, add a new exercise name and measurement measurement type</section>
                    </div>
                    <div className={"signBody"}>
                        <TextFieldsStandart onreadfield={this.ReadExerciseName}
                                            placeholder={"Exercise Name"}
                        />
                        <TextFieldsSelectNative onreadfield={this.ReadMeasurementType}
                                                placeholder ={"Measurement Type"}
                        />
                        <MyButton   prefix = {"/user/"}
                                    ending = {"/dashboard"}
                                    background = {'#CD00CD'}
                                    label={"CREATE EXERCISE"}
                                    newexerciserequestdata = {this.newExerciseRequestData}
                        />
                    </div>
                </div>
                <FooterComponent/>
            </div>
        );
    }
};


export default withRouter(connect(
    (state) => ({
        currentNamePage: state.currentNamePage,
        currentUserSignInData: state.currentUserSignInData
    }),

    dispatch => ({
        onChangeNamePage:(data) => {
            const payload = data;
            dispatch({type: 'CHANGE_NAME_PAGE', payload})
        }
    })
)(NewExerciseComponent));