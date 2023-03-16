import React, {useEffect} from 'react';
import Navbar from './navbar/Navbar';
import styles from './app.module.css'
import {Redirect, Route, Switch} from 'react-router-dom';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../actions/user';
import Disk from './disk/Disk';
import Profile from './profile/Profile';


function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <div className={styles.app}>
            <Navbar/>
            <div className={styles.wrapper}>
                {!isAuth ?
                    <Switch>
                        <Route path="/registration" component={Registration}/>
                        <Route path="/login" component={Login}/>
                        <Redirect to='/login'/>
                    </Switch>
                    :
                    <Switch>
                        <Route exact path="/" component={Disk}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Redirect to="/"/>
                    </Switch>
                }
            </div>
        </div>
    );
}

export default App;

