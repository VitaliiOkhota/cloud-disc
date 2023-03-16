import React from 'react';
import styles from './file.module.css';
import dirLogo from '../../../../asets/img/filefolder.svg'
import fileLogo from '../../../../asets/img/Vector.svg'
import {useDispatch, useSelector} from 'react-redux';
import {pushToStack, setCurrentDir} from '../../../../reducers/fileReducer';
import {deleteFile, downloadFile} from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)
    function openDirHandler(file) {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (fileView === 'list') {
        return (
            <div className={styles.file} onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={styles.file__img}/>
                <div className={styles.file__name}>{file.name}</div>
                <div className={styles.file__date}>{file.date.slice(0,10)}</div>
                <div className={styles.file__size}>{sizeFormat(file.size)}</div>
                {file.type !== 'dir' && <button className={`${styles.file__btn} ${styles.btn__download}`} onClick={(e) => downloadClickHandler(e)}>download</button>}
                <button className={`${styles.file__btn} ${styles.btn__delete}`} onClick={(e) => deleteClickHandler(e)}>delete</button>
            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className={styles.filePlate} onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={styles.filePlate__img}/>
                <div className={styles.filePlate__name}>{file.name}</div>
                <div className={styles.filePlate__bt}>
                    {file.type !== 'dir' && <button className={`${styles.filePlate__btn} ${styles.btnPlate__download}`} onClick={(e) => downloadClickHandler(e)}>download</button>}
                    <button className={`${styles.filePlate__btn} ${styles.btnPlate__delete}`} onClick={(e) => deleteClickHandler(e)}>delete</button>
                </div>

            </div>
        );
    }

};

export default File;