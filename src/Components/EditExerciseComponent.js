import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import TextFieldsStandart from '../UIComponents/TextFieldsStandart';
import TextFieldsSelectNative from '../UIComponents/TextFieldsSelectNative';
import MyButton from '../UIComponents/MyButton';
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

class EditExerciseComponent extends Component{
    componentWillMount ( ) {
        if (this.props.currentNamePage !== this.namePage) this.props.onChangeNamePage(this.namePage);
    };

    namePage = "Edit Exercises";

    ReadEditExerciseName = (value, index) => {
        this.props.onChangeEditExerciseName([value, index]);
    };
    
    ReadEditMeasurementType = (value, index) => {
        this.props.onChangeEditMeasurementType([value, index]);
    };

    render(){
        return(
            <div className={'inComponent'}>
                <HeaderComponent namePage = {this.namePage}
                                 username = {this.props.currentUserSignInData.email}
                />
                <div className={"signWindow"}>
                    <div className={"signHeader"}>
                        <h3>{this.namePage}</h3>
                    </div>
                    <div className={"signBody"}>
                        <div className={'blockStrings'}>
                            {
                                this.props.currentEditExercisesRequest.map((item, index) => {
                                    //console.log({...{["item"+index]:item}})
                                    return (
                                        <div key={index}
                                                className={"stringData"}>
                                            <TextFieldsStandart     onreadfield={(event) => this.ReadEditExerciseName(event, index)}
                                                                    value = {item.exercisesName}
                                                                    placeholder={"Exercise Name"}
                                            />
                                            <TextFieldsSelectNative onreadfield={(event) => this.ReadEditMeasurementType(event, index)}
                                                                    value = {item.measurementType}
                                                                    placeholder = {"Measurement Type"}
                                            />
                                            <MyButton   index = {index}
                                                        namebutton = {"top"}
                                                        background = {'#00C5CD'}
                                                        imgsrc = {"https://img.icons8.com/ultraviolet/24/000000/up.png"}
                                            />
                                            <MyButton   index = {index}
                                                        namebutton = {"bottom"}
                                                        background = {'#00C5CD'}
                                                        imgsrc = {"https://img.icons8.com/ultraviolet/24/000000/down.png"}
                                            />
                                            <MyButton   namebutton = {"delete"}
                                                        index = {index}
                                                        background = {'#FFD700'}
                                                        imgsrc = {"https://img.icons8.com/ultraviolet/24/000000/delete-sign.png"}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <MyButton   prefix = {"/user/"}
                                    ending = {"/dashboard"}
                                    background = {'#CD00CD'}
                                    label={this.namePage.toUpperCase()}
                        />
                    </div>
                </div>
                <FooterComponent/>
            </div>
        );
    }
}


export default withRouter(connect(
    (state) => ({
        currentEditExercisesRequest: state.currentEditExercisesRequest,
        currentNamePage: state.currentNamePage,
        currentUserSignInData: state.currentUserSignInData
    }),

    dispatch => ({
        onChangeEditExerciseName: (data) => {
            const payload = data;
            dispatch ({type: 'CHANGE_EDIT_EXERCISE_NAME', payload})
        },
        onChangeEditMeasurementType: (data) => {
            const payload = data;
            dispatch ({type: 'CHANGE_EDIT_MEASUREMENT_TYPE', payload})
        },
        onChangeNamePage:(data) => {
            const payload = data;
            dispatch({type: 'CHANGE_NAME_PAGE', payload})
        }
    })
)(EditExerciseComponent));