import { FETCH_DEPARTMENT_CREATE, FETCH_DEPARTMENT_UPDATE, FETCH_DEPARTMENT_DELETE, FETCH_DEPARTMENT_ALL } from "./Constants";
import api from "./../services/api";

function formatData(data) {
    return ({
        ...data,
        allowedAdmissionCount: parseInt(data.allowedAdmissionCount ? data.allowedAdmissionCount : 0)
        

    });
}

export function fetchAll() {
    
    return (dispatch) => {
        api.department()
            .fetchAll()
            .then((response) => {
                dispatch({
                    type: FETCH_DEPARTMENT_ALL,
                    payload: [response.data,true]
                });
            })
            .catch((err) => console.log(err));
    };
}

export function create(data, onSuccess) {
    return (dispatch) => {
        data = formatData(data);
        api.department()
            .create(data)
            .then((response) => {
                dispatch({
                    type: FETCH_DEPARTMENT_CREATE,
                    payload: response.data
                });
                onSuccess();
            })
            .catch((err) => console.log(err));
    };
}

export function update(id, data, onSuccess) {
    return (dispatch) => {
        data = formatData(data);
        api.department()
            .update(id, data)
            .then((response) => {
                dispatch({
                    type: FETCH_DEPARTMENT_UPDATE,
                    payload: { id, ...data }
                });
                onSuccess();
            })
            .catch((err) => console.log(err));
    };
}

export function Delete(id, onSuccess) {
    return (dispatch) => {
        api.department()
            .delete(id)
            .then((response) => {
                dispatch({
                    type: FETCH_DEPARTMENT_DELETE,
                    payload: id
                });
                onSuccess();
            })
            .catch((err) => console.log(err));
    };
}
