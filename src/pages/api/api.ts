import axios from "axios";

const inst = axios.create({
    baseURL: " https://apirec.borber.top"
})

export const  post = async <T>(url: string, api: any) => {
    return await inst.post<T>(url, api, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const  get = async <T>(url: string) => {
    return await inst.get<T>(url, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}