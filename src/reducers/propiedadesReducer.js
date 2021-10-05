import { types } from '../types/types';

const initialState = {
    propiedades: [],
    activePropiedad: null
}

export const propiedadReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.propiedadesLoad:
            return {
                ...state,
                propiedades: [...action.payload]
            }
    
        default:
            return state;
    }
}