const initialState = {
    token: "",
    isAuth: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            state = {isAuth: true, token: action.payload.token};
            return state;
        case "LOGOUT": 
            state = initialState;
            return state; 
        default:
            return state; 
    }
}

export default AuthReducer