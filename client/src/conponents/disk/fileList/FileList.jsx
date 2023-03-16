import React from 'react'
import styles from './fileList.module.css'
import './fileanimation.css'
import {useSelector} from 'react-redux';
import File from './file/File';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const FileList = () => {

    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.files.view)

    if(files.length === 0) {
        return (
            <div className={styles.not_files}>Файли не знайдені</div>
        )
    }

    if (fileView === 'plate') {
        return (
            <div className={styles.filePlate}>
                    {files.map(file =>
                        <File key={file._id} file={file}/>
                    )}
            </div>
        );
    }

    if (fileView === 'list') {
        return (
            <div className={styles.fileList}>
                <div className={styles.fileList__header}>
                    <div className={styles.fileList__name}>Назва</div>
                    <div className={styles.fileList__date}>Дата</div>
                    <div className={styles.fileList__size}>Розмір</div>
                </div>
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            exit={false}
                            classNames='file'
                        >
                            <File  file={file} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    }


};

export default FileList;