import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = () => {
    if (localStorage.getItem('token')) {
        return localStorage.getItem("token")
    }
    else {
        return false
    }
}

const PrivetRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated() ? (<Component {...props} />) : (<Redirect to={{
        pathname: "/",
    }}
    />
    )
    } />
)

export default PrivetRouter