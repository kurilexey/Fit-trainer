const initialState = "";

export default function selectDate (state = initialState, action){
    switch (action.type) {
        case 'CLEAR_SELECT_DATE':
            return initialState;

        case 'SELECT_DATE':
            return action.payload;

        default:
            return state;
    }
}