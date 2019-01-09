const initialState = {
    loginDetails: {
        name: '',
        role: []
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loginDetails: action.payload
            };
        default:
            return state;
    }
}