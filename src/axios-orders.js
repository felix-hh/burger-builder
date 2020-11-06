import Axios from "axios"

const instance = Axios.create({
    baseURL: "https://burger-builder-6b9e7.firebaseio.com/"
})

export default instance