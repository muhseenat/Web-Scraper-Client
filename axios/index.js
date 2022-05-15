//creating axios instance and export it
import axios from 'axios'

export default axios.create({
    baseURL: " https://tkserver.muhseena.tech/api"
})
