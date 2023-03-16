import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFiles, uploadFile} from '../../actions/file';
import styles from './disk.module.css'
import FileList from './fileList/FileList';
import Popup from './Popup';
import {setCurrentDir, setFileView, setPopupDisplay} from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';
import './loader.css';

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const loader = useSelector(state => state.app.loader)
    const dirStack = useSelector(state => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('default')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'));
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    if (loader) {
        return (
            <div className="loader">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }



    return ( !dragEnter ?
        <div className={styles.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className={styles.disk__btn}>
                <button className={styles.disk__back} onClick={() => backClickHandler()}>Назад</button>
                <button className={styles.disk__create} onClick={() => showPopupHandler()}>Створити папку</button>
                <div className={styles.disk__upload}>
                    <label htmlFor="styles.disk__input" className={styles.disk__label}>Завантажити файл</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__input" className={styles.disk__input}/>
                </div>
                <select value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className={styles.disk__select}>
                    <option disabled value="default">Сортувати по</option>
                    <option value="name">По імені</option>
                    <option value="type">По типу</option>
                    <option value="date">По даті</option>
                </select>
                <button className={styles.disk__plate} onClick={() => dispatch(setFileView('plate'))}/>
                <button className={styles.disk__list} onClick={() => dispatch(setFileView('list'))}/>
            </div>
            <FileList/>
            <Popup/>
            <Uploader/>
        </div>
            :
            <div className={styles.drop__area} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетягніть файли сюди
            </div>
    );
};

export default Disk;

