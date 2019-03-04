const initialState = [];

export default function selectedDays (state = initialState, action){
    switch (action.type) {
        case 'CLEAR_SELECTED_DATES':
            return [];

        case 'ADD_SELECTED_DATES':
            state.push(action.payload);
            return [...state];
        
        case 'ADD_SELECTED_DATE':
            state.push(action.payload)
            return [...state];

        default:
            return [...state];
    }
}