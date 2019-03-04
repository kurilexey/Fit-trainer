import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import TextFieldsStandartNumber from '../UIComponents/TextFieldsStandartNumber';
import NativeSelects from "../UIComponents/NativeSelects";
import MyButton from '../UIComponents/MyButton';
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

class NewWorkoutComponent extends Component{
    componentWillMount ( ) {
        if (this.props.currentNamePage !== this.namePage) this.props.onChangeNamePage(this.namePage);
    };

    namePage = "New Workout";

    ReadNewExerciseName = (event, index) => {
        for (let i=0; i < this.props.currentEditExercisesRequest.length; i++){
            if (this.props.currentEditExercisesRequest[i].exercisesName === event.target.value) {
                this.props.onFillNewStringWorkout([event.target.value, i, index, this.props.currentEditExercisesRequest[i].measurementType]);
            }
        }
    };

    ReadRepeatsField = (value, index) => {
        this.props.onFillQuantityRepeats([value, index]);
    };

    ReadMeasurementField = (value, index) => {
        this.props.onFillQuantityMeasurements([value, index]);
    };

    showMeasurementType = (target) => {
        if (Object.keys(target).length > 1 && target.numberInList !== undefined ) {
            return <div className={"measurementType"}>{this.props.currentEditExercisesRequest[target.numberInList].measurementType }</div>
        }else return <div className={"measurementType"}>{""}</div>;
    };

    mapComponent = () => {
        if (this.props.currentNewWorkoutRequest.length !== 0){
            return (
                this.props.currentNewWorkoutRequest.map((item, index) => {
                    //console.log({...{["item"+index]:item}})
                    return <div key={index}
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
                        {
                            this.showMeasurementType(item.length > 1 ? this.props.currentEditExercisesRequest[item.numberInList].measurementType : item)
                        }
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
                    }
                )
            ) 
        }
    };

    visibleButtonCreateWorkout = () => {
        if (this.props.currentNewWorkoutRequest.length !== 0){
            return (
                <MyButton   prefix = {"/user/"}
                            ending = {"/dashboard"}
                            background = {'#CD00CD'}
                            label={"CREATE WORKOUT"}
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
                        <MyButton   background = {'#CD00CD'}
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
        currentUserSignInData: state.currentUserSignInData,
        currentNewWorkoutRequest: state.currentNewWorkoutRequest,
        currentEditExercisesRequest: state.currentEditExercisesRequest,
        currentNamePage: state.currentNamePage
    }),

    dispatch => ({
        onFillNewStringWorkout: (data) => {
            const payload = data;
            dispatch ({type: 'FILL_NEW_STRING_WORKOUT', payload})
        },
        onFillQuantityRepeats: (data) => {
            const payload = data;
            dispatch ({type: 'FILL_QUANTITY_REPEATS', payload})
        },
        onFillQuantityMeasurements: (data) => {
            const payload = data;
            dispatch ({type: 'FILL_QUANTITY_MEASUREMENTS', payload})
        },
        onChangeNamePage:(data) => {
            const payload = data;
            dispatch({type: 'CHANGE_NAME_PAGE', payload})
        }
    })
)(NewWorkoutComponent));

