import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loading from '../components/share/Loading'
import Home from '../components/Home'
import NavigationBar from '../components/NavigationBar'
import { AuthContext } from '../components/context/AuthContext'

export default function Dashboard() {
    const {authState: {isAuthenticated, authLoading}} = useContext(AuthContext)   
    if(authLoading){
        return (
            <Loading/>
        )
    }

    return (
        <div>
            <Route 
            render={() => isAuthenticated ? (
                <>
                   <NavigationBar/>
                   <Home/>
                </>
            ) : (
                <Redirect to='/login' />
            )
        }
      />
        </div>
    )
}
