import { CREATE, UPDATE, DELETE, FETCH_ALL } from "./Constants";
import api from "./../services/api";
import axios from 'axios'
function formatData(data) {
    return ({
        ...data,
        age: parseInt(data.age ? data.age : 0),
        tutionFees: parseInt(data.tutionFees ? data.tutionFees : 0)
        

    });
}

export function fetchAll() {
    
    return (dispatch) => {
        api.student()
            .fetchAll()
            .then((response) => {
                dispatch({
                    
                    type: FETCH_ALL,
                    payload: [response.data,true]
                });
 
            })
            .catch((err) => console.log(err));
            
           
    };

}
// gets cities from server/DB
// export const fetchAll = () => async dispatch => {
//     try {
//       //setLoading()
//       const res = await axios({
//         method: 'get',
//         url: '/students',
//         baseURL: 'http://localhost:58776/api/',
//         responseType: 'json'
//       })
//       const data = await res.data
  
//       dispatch({
//         type: FETCH_ALL,
//         payload: [data, true]
//       })
//     } catch (error) {
//       dispatch({
       
//         payload: error
//       })
//     }
//   }


  
export function create(data, onSuccess) {
    return (dispatch) => {
        data = formatData(data);
        api.student()
            .create(data)
            .then((response) => {
                dispatch({
                    type: CREATE,
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
        api.student()
            .update(id, data)
            .then((response) => {
                dispatch({
                    type: UPDATE,
                    payload: { id, ...data }
                });
                onSuccess();
            })
            .catch((err) => console.log(err));
    };
}

export function Delete(id, onSuccess) {
    return (dispatch) => {
        api.student()
            .delete(id)
            .then((response) => {
                dispatch({
                    type: DELETE,
                    payload: id
                });
                onSuccess();
            })
            .catch((err) => console.log(err));
    };
}
