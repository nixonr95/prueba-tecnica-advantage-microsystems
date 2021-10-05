import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { propiedadReducer } from "./propiedadesReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    propiedades: propiedadReducer
})