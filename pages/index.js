import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from '../axios'

export default function Home() {
 
  const [url,setUrl]=useState("")
const [insights,setInsights]=useState([{
  _id:Date.now(),
  url:"abcd.com",
  wordCount:10,
  favorite:false
},{
  _id:Date.now(),
  url:"abcd.com",
  wordCount:10,
  favorite:true
}])

useEffect(()=>{
  axios.get('/posts/get/insights').then((response)=>{
    setInsights(response.data)
  }).catch(err=>console.log(err))
},[])

  const handleSubmit=(e)=>{
    console.log('working perfectly........');
    e.preventDefault()
    axios.post('/posts/create/insights',url).then((response)=>{
      console.log(response);
      setInsights([...insights,response.data])
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
      {insights.length?( <table class="table">
          <thead>
            <tr>
              <th scope="col">Domain Name</th>
              <th scope="col">Word Count</th>
              <th scope="col">Favorite</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          
            {insights.map((i)=>(
              <tr key={i._id}>
              <th scope="row">{i.url}</th>
              <td>{i.wordCount}</td>
              <td><i className={`bi bi-heart${i.favorite?'-fill':''}`} style={{color:"red"}}></i>
              </td>
              <td><i className="bi bi-x-octagon-fill"></i>
              </td>
            </tr>
            ))}
          
            
          </tbody>
        </table>
         ):<div className='container'><h2>No data found</h2></div>} 
      </div>
    </div>
  )
}
