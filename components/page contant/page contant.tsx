import styles from './page.module.css';

// interface PageProps {}

export default function PageContent() {
    return (
        <section className={styles.page}>
            <div
                className={`${styles.pageSection} ${styles.pageLeftSection}`}></div>
            <div
                className={`${styles.pageSection} ${styles.pageMidSection}`}></div>
            <div
                className={`${styles.pageSection} ${styles.pageRightSection}`}></div>
        </section>
    );
}
