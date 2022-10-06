import * as actionType from "./actionType";

const initialState = {
    value: {},
};

function login(state, payload) {
    return (state.value = payload);
}

function logout(state, payload) {
    return (state.value = payload);
}

function token(state, payload = {}) {
    return (state.token = payload);
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.LOGIN:
            return login(state, action.payload);

        case actionType.LOGIN:
            return logout(state, action.payload);

        case actionType.TOKEN:
            return token(state, action.payload);

        default:
            break;
    }
}

export default rootReducer;
