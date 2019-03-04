const initialState = "";

export default function currentNamePage (state = initialState, action){
    switch (action.type) {
        case "CHANGE_NAME_PAGE":
            return  action.payload;

        default:
            return state;
    }
}