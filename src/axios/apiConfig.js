// axios 요청이 들어가는 모든 모듈
import axios from "axios"
import { getCookie } from "../cookie/Cookie"

// 인스턴스
const instance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL
})

// jwt 토큰 인스턴스
const jwtInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {

    }
})

// TODO access 키 환경변수로 빼기
// kakao Rest API 요청 인스턴스
const kakaoInstance = axios.create({
    baseURL: process.env.REACT_APP_KAKAO_URL,
    headers: {
        Authorization: process.env.REACT_APP_KAKAO_KEY,
    }
})

// JYS TODO 토큰 처리해주기
/* 응답 */
jwtInstance.interceptors.response.use(
    function(response){
        return response
    },
    function(error){
        return Promise.reject(error)
    },
)

/* 요청 */
jwtInstance.interceptors.request.use((config) => {
    if (config.headers === undefined) return;
    const token = getCookie("token");  
    config.headers["ACCESS_KEY"] = `${token}`;
    return config;
});

export { jwtInstance, kakaoInstance }
export default instance