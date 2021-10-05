import React from 'react'
import { startLogin } from '../../actions/auth';
import {useForm} from '../../hooks/useForm'
import { useDispatch } from 'react-redux';
import './login.css'

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        Email: 'Kevin.zarate@advantage.com.co',
        Password: '12345678Amc*'
    });

    const {Email, Password} = formLoginValues;

    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch(startLogin(Email, Password));
    }


    return (
        <div>
            <div className="container login-container">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 login-form-1">
                        <h3>Iniciar sesión</h3>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo"
                                    name="Email"
                                    value={Email}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="Password"
                                    value={Password}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input 
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login" 
                                />
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    )
}
