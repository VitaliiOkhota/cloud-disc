import React, {useState} from 'react';
import styles from './navbar.module.css';
import Logo from '../../asets/img/header-logo.svg';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../reducers/userReducer';
import {getFiles, searchFiles} from '../../actions/file';
import {showLoader} from '../../reducers/appReducer';
import avatarLogo from '../../asets/img/avatar.svg';
import {API_URL} from '../../config';

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 500, e.target.value))
        } else  {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.container}>
                    <img src={Logo} alt="logo-icon" className={styles.navbar__logo}/>
                    <div className={styles.navbar__header}>CLOUD DISC</div>
                    {isAuth && <input type="text"
                                      value={searchName}
                                      onChange={e => searchChangeHandler(e)}
                                      className={styles.navbar__search}
                                      placeholder="Пошук файлів..."/>}
                    {!isAuth && <div className={styles.navbar__login}><NavLink to="/login">Вхід</NavLink></div> }
                    {!isAuth && <div className={styles.navbar__registration}><NavLink to="/registration">Реєстрація</NavLink></div> }
                    {isAuth && <div className={styles.navbar__login} onClick={() => dispatch(logout())}>Вихід</div> }
                    {isAuth && <NavLink to='/profile'>
                        <img className={styles.navbar__avatar} src={avatar} alt="avatar"/>
                    </NavLink>}
                </div>
            </div>
        </>

    );
};

export default Navbar;