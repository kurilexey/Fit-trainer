import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import firebase from 'firebase';
import {config} from '../Data/data';
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


const styles = theme => ({
    root: {
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: "2rem",
        padding: '0 1.5rem',
        margin: '1.5rem 0.3rem'
    },
});

function MyButton(props) {
    const HandleClick =  () => {
        let data;
        switch (props.label) {
            case "SIGN IN":
                data = props.signinrequestdata;
                if (data.email === undefined || data.pass === undefined || data.email === "" || data.pass === "") {
                    alert("Please fill all the fields");
                }else {
                    let userIsAvailable = false;
                    props.usersArray.forEach((item, index)=> {
                        if (data.email === item.email && data.pass === item.password){
                            userIsAvailable = true;
                            props.history.push(props.prefix+item.email+props.ending);
                            props.onEntryRequest({...item, id:index});
                        }
                    });
                    if (!userIsAvailable)alert("You entered incorrectly e-mail or password");
                }
                break;

            case "SIGN UP":
                let singleRegistrationCode = Math.floor(Math.random()*Math.pow(10, 10));
                data = props.signuprequestdata;
                if (data.email === undefined || data.pass === undefined || data.repeatPass === undefined || data.email === "" || data.repeatPass === "" || data.pass === "") alert("Please fill all the fields");
                else if (data.repeatPass !== data.pass) alert("Passwords do not match");
                else {
                    console.log(singleRegistrationCode);
                    props.onEntryRequestUp({
                        email: data.email,
                        pass: data.pass,
                        id: data.length,
                        singleRegistrationCode: singleRegistrationCode
                    });
                    props.history.push(props.prefix);
                }
                break;

            case "EMAIL VERIFICATION":
                if (+props.currentUserSignUpData.singleRegistrationCode === +props.registrationCode){
                    firebase.database().ref("/").child(props.usersArray.length).set({
                        email: props.currentUserSignUpData.email,
                        password: props.currentUserSignUpData.pass,
                        id: props.usersArray.length
                    });
                    props.history.push(props.prefix);
                    props.onClearRegistrationCode();
                }
                break;

            case "CREATE EXERCISE":
                props.onNewExerciseRequest(props.newexerciserequestdata);
                props.onAddNewExerciseRequest(props.newexerciserequestdata);
                props.history.push(props.prefix+props.currentUserSignInData.email+props.ending);
                firebase.database().ref("/").child(props.currentUserSignInData.id).child("exercises").child(props.currentEditExercisesRequest.length).set(props.newexerciserequestdata);

                break;

            case "EDIT EXERCISES":
                props.history.push(props.prefix+props.currentUserSignInData.email+props.ending);
                firebase.database().ref("/").child(props.currentUserSignInData.id).child("exercises").set (props.currentEditExercisesRequest);

                break;

            case "ADD EXERCISE":
                if (props.currentNamePage === "New Workout")props.onAddNewStringWorkout(props.currentNewWorkoutRequest);
                if (props.currentNamePage === "Edit Workout"){
                    props.onAddNewStringExercise(props.numberinorder);
                }
                break;

            case "CREATE WORKOUT":
                props.onCreateWorkout([props.selectDate, props.currentNewWorkoutRequest]);
                props.history.push(props.prefix+props.currentUserSignInData.email+props.ending);
                firebase.database().ref("/").child(props.currentUserSignInData.id.toString()).child("workouts").child(props.currentWorkoutWithDate.length).set ({
                    exercises: props.currentNewWorkoutRequest,
                    date: props.selectDate,
                    id: props.currentEditExercisesRequest.length
                });
                props.onClearNewWorkout();
                break;

            case "UPDATE WORKOUT":
                props.onSaveWorkout(props.currentWorkoutWithDate);
                props.history.push(props.prefix+props.currentUserSignInData.email+props.ending);
                firebase.database().ref("/").child(props.currentUserSignInData.id).child("workouts").set (props.currentWorkoutWithDate);
                break;

            default:
                break;
        };

        switch (props.currentNamePage) {

            case "Edit Exercises":
                props.onClickButtonEE([props.namebutton, props.index]);
                break;

            case "New Workout":
                props.onClickButtonNW([props.namebutton, props.index]);
                break;

            case "Edit Workout":
                props.onClickButtonEW([props.namebutton, props.index, props.numberinorder]);
                break;

            default:
                break;
        };
    };

    return (
        <Button className={classNames(props.classes.root, props.className)}
                style = {{backgroundColor: props.background}}
                onClick = {(event) => {HandleClick(event) }}
        >
            {(props.label !== undefined) ? props.label : "" + (props.imgsrc !== undefined) ? <img src={props.imgsrc} alt={props.alttext}/> : ""}
        </Button>
    );
}

MyButton.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withRouter(connect(
    (state) => ({
        currentUserSignInData: state.currentUserSignInData,
        currentUserSignUpData: state.currentUserSignUpData,
        usersArray: state.usersArray,
        registrationCode: state.registrationCode,
        currentEditExercisesRequest: state.currentEditExercisesRequest,
        currentNewWorkoutRequest: state.currentNewWorkoutRequest,
        currentNamePage: state.currentNamePage,
        selectDate: state.selectDate,
        currentWorkoutWithDate: state.currentWorkoutWithDate,

    }),

    dispatch => ({
        onEntryRequest: (data) => {
            const payload = data;
            dispatch ({type: 'ENTRY_REQUEST', payload})
        },
        onEntryRequestUp: (data) => {
            const payload = data;
            dispatch ({type: 'ENTRY_REQUEST_UP', payload})
        },
        onClearRegistrationCode:() => {
            dispatch({type: 'CLEAR_REGISTRATION_CODE'})
        },
        onNewExerciseRequest: (data) => {
            const payload = data;
            dispatch ({type: 'NEW_EXERCISE_REQUEST', payload})
        },
        onAddNewExerciseRequest: (data) => {
            const payload = data;
            dispatch ({type: 'ADD_NEW_EXERCISE', payload})
        },
        onClickButtonEE: (data) => {
            const payload = data;
            dispatch ({type: 'CLICK_BUTTON_EDIT_EXERCISES', payload})
        },
        onClickButtonNW: (data) => {
            const payload = data;
            dispatch ({type: 'CLICK_BUTTON_NEW_WORKOUT', payload})
        },
        onClickButtonEW: (data) => {
            const payload = data;
            dispatch ({type: 'CLICK_BUTTON_EDIT_WORKOUT', payload})
        },
        onAddNewStringWorkout: (data) => {
            const payload = data;
            dispatch ({type: 'ADD_NEW_STRING_NEW_WORKOUT', payload})
        },
        onAddNewStringExercise: (data)=> {
            const payload = data;
            dispatch ({type: 'ADD_NEW_STRING_EXERCISE', payload})
        },
        onCreateWorkout:(data) => {
            const payload = data;
            dispatch ({type: 'CREATE_NEW_WORKOUT', payload})
        },
        onClearNewWorkout:(data) => {
            const payload = data;
            dispatch ({type: 'CLEAR_NEW_WORKOUT', payload})
        },
        onSaveWorkout: (data)=> {
            const payload = data;
            dispatch ({type: 'SAVE_WORKOUT', payload})
        },
    })
)(withStyles(styles)(MyButton)));
