import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import TextFieldsStandartNumber from '../UIComponents/TextFieldsStandartNumber';
import MyButton from '../UIComponents/MyButton';
import NativeSelects from "../UIComponents/NativeSelects";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

class EditWorkautComponent extends Component {
    componentWillMount ( ) {
        if (this.props.currentNamePage !== this.namePage) this.props.onChangeNamePage(this.namePage);
        this.props.currentWorkoutWithDate.forEach((item, index) => {
            if (item.date === this.props.selectDate) {
                this.numberInOrder=index;
                this.target = this.props.currentWorkoutWithDate[this.numberInOrder].exercises;
            }
        });
    };

    namePage = "Edit Workout";
    numberInOrder="";
    target = "";

    ReadNewExerciseName = (event, index) => {
        for (let i=0; i < this.props.currentEditExercisesRequest.length; i++){
            if (this.props.currentEditExercisesRequest[i].exercisesName === event.target.value) {
                this.props.onChangeNameAndType([event.target.value, index, this.numberInOrder, this.props.currentEditExercisesRequest[i].measurementType, i]);
            };
        };
    };

    ReadRepeatsField = (value, index) => {
        this.props.onChangeRepeats([value, index, this.numberInOrder]);
    };

    ReadMeasurementField = (value, index) => {
        this.props.onChangeMeasurements([value, index, this.numberInOrder]);
    };

    mapComponent = () => {
        if (this.target.length !== 0){
            //console.log([...this.target]);
            return (
                this.target.map((item, index) => {
                    //console.log({...{["item"+index]:item.exercisesName}});
                    return (
                        <div key={index}
                            className={"stringData"}>
                            <NativeSelects
                                            onreadfield={(event) => this.ReadNewExerciseName(event, index)}
                                            value = {item.exercisesName || "Entered some exercise, pleace."}
                                            placeholder={"Exercise Name"}
                                            data = {this.props.currentEditExercisesRequest}
                            />
                            <TextFieldsStandartNumber
                                                    onreadfield={(event) => this.ReadRepeatsField(event, index)}
                                                    value = {item.repeats || "1"}
                                                    placeholder={"Repeats"}
                            /> 
                            <TextFieldsStandartNumber
                                                    onreadfield={(event) => this.ReadMeasurementField(event, index)}
                                                    value = {item.measurements || "1"}
                                                    placeholder={"Measurement"}
                            />
                            <div className={"measurementType"}>
                                {item.measurementType}
                            </div>
                            <MyButton   index = {index}
                                        namebutton = {"top"}
                                        background = {'#00C5CD'}
                                        imgsrc = {"https://img.icons8.com/ultraviolet/24/000000/up.png"}
                                        numberinorder = {this.numberInOrder}
                            />
                            <MyButton   index = {index}
                                        namebutton = {"bottom"}
                                        background = {'#00C5CD'}
                                        imgsrc = {"https://img.icons8.com/ultraviolet/24/000000/down.png"}
                                        numberinorder = {this.numberInOrder}
                            />
                            <MyButton   namebutton = {"delete"}
                                        index = {index}
                                        background = {'#FFD700'}
                                        imgsrc = {"https://img.icons8.com/ultraviolet/24/000000/delete-sign.png"}
                                        numberinorder = {this.numberInOrder}
                            />
                        </div>
                    )
                })
                 
            ) 
        }
    };

    visibleButtonCreateWorkout = () => {
        if (this.target.length !== 0){
            return (
                <MyButton   prefix = {"/user/"}
                            ending = {"/dashboard"}
                            background = {'#CD00CD'}
                            label={"UPDATE WORKOUT"}
                />
            )
        }
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
                        <MyButton   numberinorder = {this.numberInOrder}
                                    prefix = {"/user/"}
                                    ending = {"/dashboard"}
                                    background = {'#CD00CD'}
                                    label={"ADD EXERCISE"}
                        />
                        <div className={'blockStrings'}>
                            {this.mapComponent()}
                        </div>
                        {this.visibleButtonCreateWorkout()}
                    </div>
                </div>
                <FooterComponent/>
            </div>
        );
    }
};


export default withRouter(connect(
    (state) => ({
        currentNewWorkoutRequest: state.currentNewWorkoutRequest,
        currentUserSignInData: state.currentUserSignInData,
        currentEditExercisesRequest: state.currentEditExercisesRequest,
        currentWorkoutWithDate: state.currentWorkoutWithDate,
        selectDate: state.selectDate,
        currentNamePage: state.currentNamePage
    }),

    dispatch => ({
        onAddNewStringWorkout: (data) => {
            const payload = data;
            dispatch ({type: 'ADD_NEW_STRING_EDIT_WORKOUT', payload})
        },
        onChangeNameAndType: (data) => {
            const payload = data;
            dispatch ({type: 'CHANGE_NAME_AND_TYPE', payload})
        },
        onChangeRepeats: (data) => {
            const payload = data;
            dispatch ({type: 'CHANGE_REPEATS', payload})
        },
        onChangeMeasurements: (data) => {
            const payload = data;
            dispatch ({type: 'CHANGE_MEASUREMENTS', payload})
        },
        onAddNewStringExercise: (data)=> {
            const payload = data;
            dispatch ({type: 'ADD_NEW_STRING_EXERCISE', payload})
        },

        onChangeNamePage:(data) => {
            const payload = data;
            dispatch({type: 'CHANGE_NAME_PAGE', payload})
        }
    })
)(EditWorkautComponent));