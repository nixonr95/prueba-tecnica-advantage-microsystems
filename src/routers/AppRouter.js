import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from '../components/auth/LoginScreen';
import { HomeScreen } from "../components/home/HomeScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { uid} = useSelector(state => state.auth);

    useEffect(() => {  
        dispatch(startChecking())  //renueva el token
    }, [dispatch]);


    return (
        <Router>
        <div>
          <Switch>
            <PublicRoute isAuthenticated={!!uid} exact path="/login" component={LoginScreen}/>
            <PrivateRoute isAuthenticated={!!uid} exact path="/" component={HomeScreen}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </Router>
    )
}
