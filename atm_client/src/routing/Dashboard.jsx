import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import Home from '../screens/Home'
import NavigationBar from '../components/NavigationBar'
import { useSelector } from 'react-redux'

export default function Dashboard() {
    const auth = useSelector(state => state.auth)

    if (auth?.authLoading) return <Loading />

    const routers = () => {
        if (!auth?.isAuthenticated) return <Redirect to='/login' />
        return (
            <>
                <NavigationBar />
                <Home />
            </>
        )
    }

    return (
        <Route render={routers} />
    )
}
