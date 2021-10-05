import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'

export const PublicRoute = ({  
    isAuthenticated,
    component: Component,  //se renombra con C mayuscula para que no se confunda abajo
    ...rest
}) => {
    return (
        <Route {...rest}
            component={(props) => (
                (!isAuthenticated)
                    ? (<Component {...props}/>)
                    : (<Redirect to="/"/>)
            )}
        
        />

    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}