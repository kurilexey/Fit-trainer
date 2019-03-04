const initialState = [];

export default function currentWorkoutWithDate (state = initialState, action){

    const rewriteId = (arr) => {
        arr.forEach((item, index)=> item.id = index);
    };

    switch (action.type) {
        case "CLEAR_WORKOUT":
            return  [];

        case "SET_WORKOUTS":
            if (action.payload !== undefined) return [...action.payload];
            else return [];

        case "CREATE_NEW_WORKOUT":
            return  [...state, {id: state.length, date: action.payload[0], exercises: action.payload[1]}];

        case "ADD_NEW_STRING_EDIT_WORKOUT":
            return  [...state, {id: state.length}];

        case "CHANGE_NAME_AND_TYPE":
            state[action.payload[2]].exercises[action.payload[1]].exercisesName = action.payload[0];
            state[action.payload[2]].exercises[action.payload[1]].measurementType = action.payload[3];
            state[action.payload[2]].exercises[action.payload[1]].numberInList = +action.payload[4];
            return  [...state];

        case "CHANGE_REPEATS":
            +action.payload[0] <= 1 ? state[action.payload[2]].exercises[action.payload[1]].repeats = +1 : state[action.payload[2]].exercises[action.payload[1]].repeats = +action.payload[0];
            return  [...state];
        
        case "CHANGE_MEASUREMENTS":
            +action.payload[0] <= 1 ? state[action.payload[2]].exercises[action.payload[1]].measurements = +1 : state[action.payload[2]].exercises[action.payload[1]].measurements = +action.payload[0];
            return  [...state];

        case "CLICK_BUTTON_EDIT_WORKOUT":

            switch (action.payload[0]) {

                case "top":
                    if (action.payload[1] > 0){
                        [state[action.payload[2]].exercises[action.payload[1]-1], state[action.payload[2]].exercises[action.payload[1]]]=[state[action.payload[2]].exercises[action.payload[1]],state[action.payload[2]].exercises[action.payload[1]-1]];
                    };
                    break;

                case "bottom":
                    if (action.payload[1] < state[action.payload[2]].exercises.length-1){
                        [state[action.payload[2]].exercises[action.payload[1]], state[action.payload[2]].exercises[action.payload[1]+1]]=[state[action.payload[2]].exercises[action.payload[1]+1],state[action.payload[2]].exercises[action.payload[1]]];
                    };
                    break;

                case "delete":
                    state[action.payload[2]].exercises.splice(action.payload[1], 1);
                    break;

                default:
                    return state;
            };
            rewriteId(state[action.payload[2]].exercises);
            return [...state];

        case "ADD_NEW_STRING_EXERCISE":
            //console.log(state);
            state[action.payload].exercises.push({
                id: state.length-1,
                exercisesName: "",
                measurementType: "",
                measurements: 1,
                repeats: 1
            });
            return  [...state];

        case "SAVE_WORKOUT":
            return  [...state];

        case "ADD_WORKOUT":
            state[state.length-1].date = action.payload[0];
            state[state.length-1].exercises = action.payload[1];
            return  [...state];
                        
        default:
            return [...state];
    }
}