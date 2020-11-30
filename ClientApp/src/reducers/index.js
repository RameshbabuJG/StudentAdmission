
import { studentReducer } from "./studentReducer";
import { departmentReducer } from "./departmentReducer";

//const rootReducer = combineReducers({ studentReducer, departmentReducer });
export const reducers = ({ list:studentReducer, departmentlist:departmentReducer });

