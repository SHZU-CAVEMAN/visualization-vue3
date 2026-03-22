import axios from "axios";

const request = axios.create({
    baseURL:'https://api.imooc-web.lgdsunday.club/api',
    timeout:3000
})
request.interceptors.request.use(
    (config)=>{
        config.headers.icode = "hellosunday"
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

request.interceptors.response.use((Response)=>{
    const {success,message,data} = Response.data
    //console.log("Response",Response)
    if(success){
        return data
    }else{
        return Promise.reject(new Error(message))
    }
})


export default request