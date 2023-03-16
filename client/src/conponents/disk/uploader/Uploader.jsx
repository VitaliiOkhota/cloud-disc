import React from 'react';
import styles from './uploader.module.css'
import UploadFile from './UploadFile';
import {useDispatch, useSelector} from 'react-redux';
import {hideUploader} from '../../../reducers/uploadReducer';

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    return ( isVisible &&
        <div className={styles.uploader}>
            <div className={styles.uploader__header}>
                <div className={styles.uploader__title}>Загрузки</div>
                <button className={styles.uploader__close} onClick={() => dispatch(hideUploader())}>x</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file} />
            )}
        </div>
    );
};

export default Uploader;