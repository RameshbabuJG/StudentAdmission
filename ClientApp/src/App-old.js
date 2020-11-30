import React from "react";
import "./App.css";
// import DepartmentList from "./components/DepartmentList";
import StudentList from "./components/StudentList";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import history from "./history";
import { Router, Route, Switch, Link, Redirect,useLocation } from 'react-router-dom';
const App = (props) => {
   // return (
        
    //     <Router history={history}>
    //     <div>
    //     <Switch>
    //                     <Route path="/" exact component={StudentList} />
    //         {/* <DepartmentList /> */}

    //         </Switch>


           
    //     </div>
    //     </Router>
    // );
  //debugger
//       return (
        
//  <StudentList /> 
        
//       );

      const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const { pathname } = useLocation();  
return(
 <Router history={history}>
    <Provider store={store}>
        <ToastProvider autoDismiss>
            <Container maxWidth="lg">
            <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route path="/" component={StudentList}/>
            <Redirect from="*" to="/" />
            </Switch>
            </Container>
        </ToastProvider>
    </Provider>
     </Router>
);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export default App;
