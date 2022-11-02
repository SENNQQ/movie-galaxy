import React, {FC} from 'react';
import styles from './loading.module.scss';

/**
 * Компонент загрузки страницы*/
const Loading: FC = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;