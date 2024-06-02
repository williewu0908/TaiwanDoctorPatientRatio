import styles from './Title.module.css';

export default function Title({ ratio }) {
    return (
        <div className={styles.Title}>
            <h1>台灣<i>醫病比</i></h1>
            <hr />
            <h2>
                <p id={styles.nursePatientRatios}>{ratio}</p>
                <p>(每一萬人)</p>
            </h2>
        </div>
    );
};

