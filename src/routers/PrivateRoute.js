import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'

export const PrivateRoute = ({  
    isAuthenticated,
    component: Component,  //se renombra con C mayuscula para que no se confunda abajo
    ...rest
}) => {

    // console.log(rest.location.pathname); // ya tengo ahí el pathname entonces no hay necesidad de usar el hook para sacarlo.
    // localStorage.setItem('lastPath', rest.location.pathname);  // en esta aplicacion no necesitamos el localstorage

    return (
        <Route {...rest}
            component={(props) => (
                (isAuthenticated)
                    ? (<Component {...props}/>)
                    : (<Redirect to="/login"/>)
            )}
        
        />

    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
