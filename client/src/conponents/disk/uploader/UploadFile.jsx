import React from 'react';
import styles from './uploadFile.module.css'
import {useDispatch} from 'react-redux';
import {removeUploadFile} from '../../../reducers/uploadReducer';

const UploadFile = ({file}) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.uploadFile}>
            <div className={styles.uploadFile__header}>
                <div className={styles.uploadFile__name}>{file.name}</div>
                <button className={styles.uploadFile__remove} onClick={() => dispatch(removeUploadFile(file.id))}>x</button>
            </div>
            <div className={styles.uploadFile__progress}>
                <div className={styles.uploadFile__bar} style={{width: file.progress + "%"}}></div>
                <div className={styles.uploadFile__percent}>{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;