import Swal from "sweetalert2";
import { types } from "../types/types";
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const startLogin = (email, password) =>{
    return async (dispatch) => {

        const parametros = {
            IDClient: "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
            ServiceName: "AdminService",
            WSToken: "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
            MethodHash: "com.advantage.bean.account.WorkSession_loguinUsuarioWS_String_String",
            ArgumentList: [
              email,
              password
            ]
          
        }
    
        axios.post(baseUrl, parametros,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then(data => {
                const name = data.data.DataBeanProperties.ObjectValue.DataBeanProperties.Account.DataBeanProperties.Name1 + ' ' +
                             data.data.DataBeanProperties.ObjectValue.DataBeanProperties.Account.DataBeanProperties.Name2  + ' ' +
                             data.data.DataBeanProperties.ObjectValue.DataBeanProperties.Account.DataBeanProperties.Surname1  + ' ' +
                             data.data.DataBeanProperties.ObjectValue.DataBeanProperties.Account.DataBeanProperties.Surname2;
                if(data.data.DataBeanProperties.ObjectValue.DataBeanProperties.IDAccount) {
                    Swal.fire('Ok', data.data.DataBeanProperties.ObjectValue.DataBeanProperties.msg, 'success');
                    localStorage.setItem('uid', data.data.DataBeanProperties.ObjectValue.DataBeanProperties.IDAccount);
                    localStorage.setItem('name', name);
                    dispatch(login({
                                uid: data.data.DataBeanProperties.ObjectValue.DataBeanProperties.IDAccount,
                                name
                            }))
                } else {
                    Swal.fire('Error', data.data.DataBeanProperties.ObjectValue.DataBeanProperties.msg, 'error');
                }
            })
            .catch(error=> console.log(error))
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        if(localStorage.getItem('uid')) {
            dispatch(login({
                        uid: localStorage.getItem('uid'),
                        name: localStorage.getItem('name')
                    }))
        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({type: types.authCheckingFinish});

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () =>{
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({type: types.authLogout});