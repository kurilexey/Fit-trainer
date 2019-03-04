const initialState = [];

export default function currentEditExercisesRequest (state = initialState, action){
    switch (action.type) {
        case "CLEAR_EXERCISES":
            return [];

        case "SET_EXERCISES":
            if (action.payload !== undefined) return [...action.payload];
            else return [];


        case "CHANGE_EDIT_EXERCISE_NAME":
            state[action.payload[1]].exercisesName = action.payload[0];
            return [...state];

        case 'CHANGE_EDIT_MEASUREMENT_TYPE':
            state[action.payload[1]].measurementType = action.payload[0];
            return [...state];

        case "CLICK_BUTTON_EDIT_EXERCISES":
            switch (action.payload[0]) {
                case "top":
                    if (action.payload[1] > 0){
                        [state[action.payload[1]-1], state[action.payload[1]]]=[state[action.payload[1]], state[action.payload[1]-1]];
                    };
                    break;

                case "bottom":
                    if (action.payload[1] < state.length-1){
                        [state[action.payload[1]], state[action.payload[1]+1]]=[state[action.payload[1]+1], state[action.payload[1]]];
                    };
                    break;

                case "delete":
                    state.splice(action.payload[1], 1);
                    break;

                default:
                    return state;
            }
            return [...state];

        case 'ADD_NEW_EXERCISE':
            return [...state, action.payload];

        default:
            return [...state];
    }
}