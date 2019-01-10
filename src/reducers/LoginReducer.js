import {userConstants} from '../constants';

const initialState = {
    loginDetails: {
        name: '',
        role: []
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loginDetails: action.payload,
            };
        default:
            return state;
    }
}