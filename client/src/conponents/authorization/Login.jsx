import React, {useState} from 'react';
import styles from './authorization.module.css'
import Input from '../../utils/input/Input';
import {useDispatch} from 'react-redux';
import {login} from '../../actions/user';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    return (
        <div className={styles.authorization}>

            <div className={styles.authorization__header}>Вхід</div>

            <Input value={email}
                   setValue={setEmail}
                   type="text"
                   placeholder="Введіть email..."/>
            <Input value={password}
                   setValue={setPassword}
                   type="password"
                   placeholder="Введіть пароль..."/>

            <button className={styles.authorization__btn}
                    onClick={() => dispatch(login(email, password))}>
                Ввійти
            </button>

        </div>
    );
};

export default Login;