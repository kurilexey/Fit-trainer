const initialState = {
    ExerciseName:"",
    MeasurementType: ""
};

export default function currentNewExerciseRequest (state = initialState, action){
    switch (action.type) {
        case "CLEAR_NEW_EXERCISE":
            return  initialState;

        case "NEW_EXERCISE_REQUEST":
            return  action.payload;

        default:
            return state;
    }
}