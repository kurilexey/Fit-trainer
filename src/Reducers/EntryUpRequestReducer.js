const initialState = {
    email:"",
    pass: "",
    id: "",
    singleRegistrationCode: ""
};

export default function currntUserSignUpData (state = initialState, action){
    switch (action.type) {
        case "CLEAR_USERS_UP":
            return  initialState;

        case "ENTRY_REQUEST_UP":
            return  action.payload;

        default:
            return state;
    }
}