import { ReactNode, useEffect, useRef, useState } from 'react';
import Cookies from "js-cookie"
import { get, post } from './api/api';
// 定义音频对象的类型
type AudioType = HTMLAudioElement | null;

export type name = {
  api: string | undefined
}
export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const audioRef = useRef<AudioType>(null);
  useEffect(() => {
    audioRef.current = new Audio("https://cdn.jsdelivr.net/gh/Springzilan/bubble@master/public/bubble.wav");
    const bubble = async () => {
      get<any>("/api/bubble").then((res) => {
        allCountUpdate(res.data.data.total)
      })
      get<any>("/api/bubble/" + Cookies.get('user')).then((res) => {
        countUpdate(res.data.data)
        console.log(res.data.data)
      })
      usernameUpdate('')
    }
    bubble()
  }, [refresh]);

  let data: number[] = []
  for (let index = 0; index < 100; index++) {
    data[index] = 0;
  }
  let [array, arrayUpdate] = useState<number[]>(data)
  let [count, countUpdate] = useState<number>(0)
  let [allCount, allCountUpdate] = useState<number>(0)

  const allZero = () => {
    if (array.every(item => item === 1)) {
      arrayUpdate(data)
    }
  }

  const hidden = async (id: number) => {
    if (array[id] == 0) {
      array[id] = 1
      const tmp = array.slice()
      arrayUpdate(tmp)
      allZero()
      audioFlag && audioRef.current?.play()
      countUpdate(count + 1)
      allCountUpdate(allCount + 1)
      await post<any>("/api/bubble/" + Cookies.get('user'), '').then((res) => {
        console.log('12321', res.data.data)
      })
    }
  }

  const bubbles: ReactNode[] = []
  array.forEach((item, index) => { bubbles.push(<div className={Number(item) ? 'hiddens' : 'bubble'} key={index} id={index.toString()} onClick={() => hidden(index)}></div>) })

  const [audioFlag, audioFlagUpdate] = useState(true)
  const [helpstate, helpme] = useState(false)
  const [loginstate, loginUpdate] = useState(false)
  const [username, usernameUpdate] = useState('')
  const [toastmsg, msgUpdata] = useState('')
  const [toaststate, toastUpdata] = useState(false)
  var name = {
    "api": username
  }
  const submit = async () => {
    await post<string>("/api/bubble", name).then((res) => {
      console.log('注册', res.data)
      Cookies.set('user', username)
      console.log(username)
      if (Cookies.get('user')) {
        msgUpdata('登录成功')
        arrayUpdate(data)
        setRefresh(!refresh)
        loginUpdate(false)
        toastUpdata(true)
        setTimeout(() => {
          toastUpdata(false)
        }, 3000)
        console.log('登录成功')
      } else {
        msgUpdata('用户不存在')
        toastUpdata(true)
        setTimeout(() => {
          toastUpdata(false)
        }, 3000)
        console.log('用户不存在')
      }
    })
  }
  const logout = () => {
    Cookies.remove('user')
    msgUpdata('登出成功')
    setRefresh(!refresh)
    loginUpdate(false)
    toastUpdata(true)
    setTimeout(() => {
      toastUpdata(false)
    }, 3000)
    arrayUpdate(data)
  }
  return (
    <>
      <div className="countmain">
        <div className="count">{allCount} / ∞</div>
        <div>
          <div className='count'>{count || 0}</div>
        </div>
      </div>
      <div>
        <div className="bubbles round">
          {bubbles}
        </div>
        <div className='user' onClick={() => {
          loginUpdate(!loginstate)
        }}><img src='https://cdn.jsdelivr.net/gh/Springzilan/bubble@master/public/user.svg' /></div>
      </div>
      <div className='footer'>
        <div className='footer-children'>
          <div className="audio" onClick={() => {
            audioFlagUpdate(!audioFlag)
          }}>
            {
              audioFlag ? <img src='https://cdn.jsdelivr.net/gh/Springzilan/bubble@master/public/audio.svg' /> : <img src='https://cdn.jsdelivr.net/gh/Springzilan/bubble@master/public/unaudio.svg' />
            }
          </div>
          <div className='help' onClick={() => {
            helpme(!helpstate)
          }}><img src='https://cdn.jsdelivr.net/gh/Springzilan/bubble@master/public/help.svg' /></div>
        </div>
      </div>
      <div className='dialog' style={{ display: helpstate ? 'block' : 'none' }}>
        <div className='dialog-w'>
          <div className='close' onClick={() => {
            helpme(!helpstate)
          }}><img src='https://cdn.jsdelivr.net/gh/Springzilan/bubble@master/public/close.svg' /></div>
          <div className='dialog-p'>
            <div className='p-title'>游戏介绍</div>
            <p>捏泡泡游戏，解压小游戏。可以登录，记录泡泡数量</p>
            <ul>
              <li><a href="/web/keyboard-shortcuts"><span>我的网站1</span></a> · </li>
              <li><a href="/web/keyboard-shortcuts"><span>我的网站2</span></a> · </li>
              <li><a href="/web/keyboard-shortcuts"><span>我的网站3</span></a> · </li>
              <li><a href="/web/keyboard-shortcuts"><span>我的网站4</span></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='dialog' style={{ display: loginstate ? 'block' : 'none' }}>
        <div className='dialog-user'>
          <div className='close' onClick={() => {
            loginUpdate(!loginstate)
          }}>
            <img src='https://cdn.jsdelivr.net/gh/Springzilan/bubble@master/public/close.svg' />
          </div>
          <div className='form'>
            {Cookies.get('user') ?
              <><div className='username'>{Cookies.get('user')}</div>
                <button className='login' type='submit' onClick={logout}>登出</button></> :
              <>
                <input className='username' placeholder='用户名' type='text' value={username} onChange={event => usernameUpdate(event.target.value)} />
                <button className='login' type='submit' onClick={submit}>登录</button></>
            }
          </div>
        </div>
      </div>
      <div className='toast' style={{ display: toaststate ? 'block' : 'none' }}>{toastmsg}</div>
    </>
  )
}
