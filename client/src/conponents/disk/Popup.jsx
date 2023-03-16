import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../actions/file";
import styles from './popup.module.css'

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createHandler() {
        dispatch(createDir(currentDir, dirName))
    }

    return (
        <div className={styles.popup} onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
            <div className={styles.popup__content} onClick={(event => event.stopPropagation())}>
                <div className={styles.popup__header}>
                    <div className={styles.popup__title}>Створити нову папку</div>
                    <button className={styles.popup__close} onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                <Input type="text" placeholder="Введіть назву папки..." value={dirName} setValue={setDirName}/>
                <button className={styles.popup__create} onClick={() => createHandler()}>Створити</button>
            </div>
        </div>
    );
};

export default Popup;
