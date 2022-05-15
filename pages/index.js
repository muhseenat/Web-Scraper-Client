import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from '../axios'

export default function Home() {

  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [insights, setInsights] = useState([])

  //INTIALLY FETCHING DATA
  useEffect(() => {
    axios.get('/insights/get').then((response) => {
      setInsights(response.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [])

  //HANDLE SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/insights/create', { url }).then((response) => {
      console.log(response);
      setInsights([...insights, response.data])
      setUrl("")
    }).catch(err => {
      setUrl("")
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000)
      console.log(err)
    })
  }

  //HANDLE UPDATE FUNCTION
  const handleUpdate = (id) => {
    axios.put(`/insights/update/${id}`).then((response) => {
      setInsights(insights.map((i) => i._id == id ? { ...i, favorite: !i.favorite } : i))
    }).catch(err => console.log(err))
  }

  //HANDLE DELETE FUNCTION
  const handleDelete = (id) => {
    if (confirm("Are you sure?"))
      axios.delete(`/insights/delete/${id}`).then((response) => {
        setInsights(insights.filter((i) => i._id != id))
      }).catch(err => { console.log(err) })
  }


  return (
    <div className={styles.container}>
      {/* HEAD SECTION */}
      <Head>
        <title>Web Scraper</title>
        <meta name="Web Scraper" content="Application for check the word count of website" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* SUBMITION SECTION START */}
      <section>
        <h3 className='text-center mt-5'>Web Scraper</h3>
        <form onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center mt-3'>
            <input type='text' placeholder='Enter Website URL' value={url} onChange={(e) => setUrl(e.target.value)} required />
            <button type='submit' className='btn btn-primary'>Get Insights</button>
          </div>
        </form>
        {error && <p className='text-center text-danger mt-3'>URL NOT FOUND</p>}
      </section>
      {/* SUBMITION SECTION  END*/}


      {/* TABLE SECTION START */}
      <div className='container mt-5 '>
        {loading && <div className="spinner-border" role="status">
        </div>}
        {insights.length > 0 && (<table className="table">
          <thead>
            <tr>
              <th scope="col">Domain Name</th>
              <th scope="col">Word Count</th>
              <th scope="col">Web Links</th>
              <th scope="col">Media Links</th>
              <th scope="col">Favorite</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {insights.map((i) => (
              <tr key={i._id}>
                <th scope="row">{i.url}</th>
                <td>{i.wordCount}</td>
                <td>{i.webLinks.map((i, index) => {
                  if (index < 5) {
                    return <p>{i}</p>
                  } else if (index == 6) {
                    return <p>...</p>
                  }
                  else {
                    return false;
                  }
                })}</td>
                <td>{i.mediaLinks.map((i, index) => {
                  if (index < 5) {
                    return <p>{i}</p>
                  } else if (index == 6) {
                    return <p>...</p>
                  }
                  else {
                    return false;
                  }
                })}</td>
                <td><i onClick={() => handleUpdate(i._id)} className={`bi bi-heart${i.favorite ? '-fill' : ''}`} style={{ color: "red" }}></i>
                </td>
                <td><i onClick={() => handleDelete(i._id)} className="bi bi-x-octagon-fill"></i>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
        )}
        {!loading && insights.length == 0 && <div className='container'><h2>No data found</h2></div>}
      </div>
      {/* TABLE SECTION END */}

    </div>
  )
}
