import * as actionType from "./actionType";

export function login(payload) {
    return {
        type: actionType.LOGIN,
        payload: payload,
    };
}

export function remove() {
    return {
        type: actionType.LOGOUT,
        payload: {},
    };
}

export function token(payload) {
    return {
        type: actionType.TOKEN,
        payload: payload,
    };
}
