import React, { Component,useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import StudentList from "./components/StudentList";
import DepartmentList from "./components/DepartmentList";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import './custom.css'
import { fetchAll as fetchDepartmentAll } from "./actions/departmentActions";
import { fetchAll } from "./actions/SudentsActions";
const App = ({ fetchAll, fetchDepartmentAll }) => {

  const dispatch = useDispatch();
  
   // fetches data from DB
   useEffect(() => {
     
     fetchAll()
   fetchDepartmentAll()
  }, []);


    return (

      <Layout>

        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/FetchData' component={FetchData} />
        
        <Route path='/Student' component={StudentList} />
        <Route path='/Department' component={DepartmentList} />

      
      </Layout>

    );
  
}


export default connect(null, {
  fetchAll,
  fetchDepartmentAll,
})(App)