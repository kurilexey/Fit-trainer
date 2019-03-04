const initialState = "";

export default function registrationCode (state = initialState, action){
    switch (action.type) {
        case "CLEAR_REGISTRATION_CODE":
            return  initialState;

        case "ENTRY_REGISTRATION_CODE":
            return  action.payload;

        default:
            return state;
    }
}