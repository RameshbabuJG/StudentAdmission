import {FETCH_DEPARTMENT_CREATE, FETCH_DEPARTMENT_UPDATE, FETCH_DEPARTMENT_DELETE, FETCH_DEPARTMENT_ALL } from "./../actions/Constants";

const initialState = {
    departmentlist: [],
    status: false
};

export function departmentReducer(state = initialState, action) {
    
    switch (action.type) {
        case FETCH_DEPARTMENT_ALL:
            return {
                ...state,
                departmentlist: [...action.payload][0],
                status: [...action.payload][1]
            };
        case FETCH_DEPARTMENT_CREATE:
            return {
                ...state,
                departmentlist: [...state.departmentlist, action.payload]
            };
        case FETCH_DEPARTMENT_UPDATE:
            return {
                ...state,
                departmentlist: state.departmentlist.map((x) => x.id === action.payload.id ? action.payload : x
                )
            };
        case FETCH_DEPARTMENT_DELETE:
            return {
                ...state,
                departmentlist: state.departmentlist.filter((x) => x.id !== action.payload.id)
            };

        default:
            return state;
    }
}
