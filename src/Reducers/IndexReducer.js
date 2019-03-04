import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import currentUserSignInData from "./EntryInRequestReducer";
import currentUserSignUpData from "./EntryUpRequestReducer";
import currentNewExerciseRequest from "./NewExerciseRequestReducer";
import currentEditExercisesRequest from "./EditExercisesReducer";
import currentNewWorkoutRequest from "./NewWorkoutReducer";
import currentWorkoutWithDate from "./EditWorkoutReducer";
import selectedDays from "./SelectedDaysReducer";
import selectDate from "./SelectDateReducer";
import currentNamePage from "./NamePageReducer";
import usersArray from "./EntryUsersArrayreducer";
import registrationCode from "./EntryRegistrationCodeReducer";

export default combineReducers ({
    routing: routerReducer,
    currentUserSignInData,
    currentUserSignUpData,
    currentNewExerciseRequest,
    currentEditExercisesRequest,
    currentNewWorkoutRequest,
    currentWorkoutWithDate,
    selectedDays,
    selectDate,
    currentNamePage,
    usersArray,
    registrationCode
})