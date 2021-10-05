import Swal from "sweetalert2";
import { types } from "../types/types";
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const propiedadStartLoading = () => {
    return async (dispatch) => {

        const propiedades = [];

        const parametros = {
            "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
            "ServiceName": "AdminService",
            "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
            "MethodHash": "java.util.List_getPropiedadesCatalogPorPropiedad_String_Object_Number",
            "ArgumentList": [
              null,
              null,
              null
            ]          
        }

        axios.post(baseUrl, parametros,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then(data => {
                data.data.DataBeanProperties.ObjectValue.forEach(element => {
                    propiedades.push({
                        Nombre: element.DataBeanProperties.Nombre,
                        Valor:  element.DataBeanProperties.Valor,
                        Descripcion: element.DataBeanProperties.Descripcion,
                        IDPropiedades: element.DataBeanProperties.IDPropiedades,
                        Atributo: element.DataBeanProperties.Atributo
                    })
                });
                dispatch(propiedadLoaded(propiedades))
            })
            .catch(error => console.log(error))

    } 
}

const propiedadLoaded = (propiedades) => ({
    type: types.propiedadesLoad,
    payload: propiedades
})

export const propiedadStartUpdate = (propiedad) => {
    return async (dispatch) => {
        const parametros = {
                IDClient: "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
                ServiceName: "AdminService",
                WSToken: "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
                MethodHash:   "com.admin.bean.Propiedades_updatePropiedades_com.admin.bean.Propiedades",
                ArgumentList: [
                  {
                    DataBeanProperties: {
                    Nombre: propiedad.Nombre,
                    Valor: propiedad.Valor,
                    Descripcion: propiedad.Descripcion,
                    IDPropiedades: propiedad.IDPropiedades,
                    Atributo: propiedad.Atributo,
                    },
                    DataBeanName: "com.admin.bean.Propiedades"
                  }
                ]              
        }

        axios.post(baseUrl, parametros,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then(data => {
                dispatch(propiedadStartLoading());
                Swal.fire('Ok', 'Registro actualizado', 'success')
            })
            .catch(error => Swal.fire('Error', 'error', 'error') )
    }
}

export const propiedadStartCreate = (propiedad) => {
    return async (dispatch) => {
        const parametros = {
            IDClient: "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
            ServiceName: "AdminService",
            WSToken: "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
            MethodHash:   "com.admin.bean.Propiedades_updatePropiedades_com.admin.bean.Propiedades",
            ArgumentList: [
              {
                DataBeanProperties: {
                Nombre: propiedad.Nombre,
                Valor: propiedad.Valor,
                Descripcion: propiedad.Descripcion,
                IDPropiedades: propiedad.IDPropiedades,
                Atributo: propiedad.Atributo,
                },
                DataBeanName: "com.admin.bean.Propiedades"
              }
            ]              
    }

    axios.post(baseUrl, parametros,
        {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then(data => {
            dispatch(propiedadStartLoading());
            Swal.fire('Ok', 'Registro creado', 'success')
        })
        .catch(error => Swal.fire('Error', 'error', 'error') )
    }
}

export const propiedadStartDelete = (id) => {
    return async (dispatch) => {
        const parametros = {
            IDClient: "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
            ServiceName: "AdminService",
            WSToken: "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
            MethodHash: "boolean_deletePropiedades_Number",
            ArgumentList: [
              id
            ] 
        }

        axios.post(baseUrl, parametros,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            .then(data => {
                dispatch(propiedadStartLoading());
                Swal.fire('Ok', 'Registro eliminado', 'success')
            })
            .catch(error => Swal.fire('Error', 'error', 'error') )
    }
}