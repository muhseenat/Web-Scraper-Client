import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Scraper</title>
        <meta name="Web Scraper" content="Application for check the word count of website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

    </div>
  )
}
