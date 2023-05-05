// axios接口的处理
import * as axios from 'axios'
 
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<number>
  }
}
 
 