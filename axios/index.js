//creating axios instance and export it
import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:4040/api"
})
