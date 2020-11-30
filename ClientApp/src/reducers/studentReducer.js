import { CREATE, UPDATE, DELETE, FETCH_ALL } from "./../actions/Constants";

const initialState = {
    list: [],
    isRender: false
};

export function studentReducer(state = initialState, action) {
    debugger
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                list: [...action.payload][0],
                isRender:[...action.payload][1]
            };
        case CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            };
        case UPDATE:
            return {
                ...state,
                list: state.list.map((x) => x.id === action.payload.id ? action.payload : x
                )
            };
        case DELETE:
            return {
                ...state,
                list: state.list.filter((x) => x.id !== action.payload.id)
            };
        default:
            return state;
    }
}
