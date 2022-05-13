import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from '../axios'

export default function Home() {
 
  const [url,setUrl]=useState("")

  const handleSubmit=(e)=>{
    console.log('working perfectly........');
    e.preventDefault()
    axios.post('/get/insights',url).then((response)=>{
      console.log(response);
    setUrl("")
    }).catch(err=>console.log(err))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Web Scraper</title>
        <meta name="Web Scraper" content="Application for check the word count of website" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossorigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h3 className='text-center mt-5'>Web Scraper</h3>
        <form onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center mt-3'>
            <input type='text' placeholder='Enter Website URL'value={url} onChange={(e)=>setUrl(e.target.value)} required />
            <button type='submit' className='btn btn-primary'>Get Insights</button>
          </div>
        </form>
      </section>
      <div className='container mt-5'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Domain Name</th>
              <th scope="col">Word Count</th>
              <th scope="col">Favorite</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td><i class="bi bi-heart"></i>
              </td>
              <td><i class="bi bi-x-octagon-fill"></i>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  )
}
