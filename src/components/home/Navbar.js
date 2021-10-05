import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth);

    const logout = () => {
        dispatch(startLogout())
    } 

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid"> 
                <a className="navbar-brand">{name}</a>
                <div className="d-flex">
                    <button className="btn btn-outline-danger" type="button" onClick={logout}>Logout</button>
                </div>
                </div>
            </nav>
        </div>
    )
}
