import React, {useState} from 'react';
import styles from './authorization.module.css'
import Input from '../../utils/input/Input';
import {registration} from '../../actions/user';

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className={styles.authorization}>

            <div className={styles.authorization__header}>Реєстрація</div>

            <Input value={email}
                   setValue={setEmail}
                   type="text"
                   placeholder="Введіть email..."/>
            <Input value={password}
                   setValue={setPassword}
                   type="password"
                   placeholder="Введіть пароль..."/>

            <button className={styles.authorization__btn}
                    onClick={() => registration(email, password)}>
                Реєстрація
            </button>

        </div>
    );
};

export default Registration;