import { ReactNode, use, useEffect, useRef, useState } from 'react';

import Cookies from "js-cookie"
// 定义音频对象的类型
type AudioType = HTMLAudioElement | null;

export default function Home() {

  const audioRef = useRef<AudioType>(null);
  useEffect(() => {
    audioRef.current = new Audio("/bubble.wav");
  }, []);

  let data: number[] = []
  for (let index = 0; index < 100; index++) {
    data[index] = 0;
  }

  let [array, arrayUpdate] = useState<number[]>(data)
  let [count, countUpdate] = useState(0)
  let [allCount, allCountUpdate] = useState(1000)

  const allZero = () => {
    if (array.every(item => item === 1)) {
      arrayUpdate(data)
    }
  }

  const hidden = (id: number) => {
    if (array[id] == 0) {
      array[id] = 1
      const tmp = array.slice()
      arrayUpdate(tmp)
      allZero()
      audioFlag && audioRef.current?.play()
      countUpdate(count + 1)
      allCountUpdate(allCount + 1)
    }
  }

  const bubbles: ReactNode[] = []
  array.forEach((item, index) => { bubbles.push(<div className={Number(item) ? 'hiddens' : 'bubble'} id={index.toString()} onClick={() => hidden(index)}></div>) })

  const [audioFlag, audioFlagUpdate] = useState(true)
  const [helpstate, helpme] = useState(false)
  const [loginstate, loginUpdate] = useState(false)
  const [username, usernameUpdate] = useState('')
  const [toastmsg, msgUpdata] = useState('')
  const [toaststate, toastUpdata] = useState(false)
  let showToast = function (msg: string) {
    // let x = document.getElementById("snackbar");
    // x.className = "show";
    // setTimeout(function () {
    //   x.className = x.className.replace("show", "");
    // }, 3000);
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "width:80px; background:#000; opacity:0.6; height: 40px; line-height: 40px; color:#fff; line-height:30px; text-align:center; border-radius:4px; margin: auto; z-index:999999;";
    document.body.appendChild(m);
    setTimeout(function () {
      var d = 0.5;
      m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
      m.style.opacity = '0';
      setTimeout(function () { document.body.removeChild(m) }, d * 1000);
    }, 3000);
  };
  const submit = () => {
    Cookies.set('user', username)
    console.log(username)
    if (Cookies.get('user')) {
      msgUpdata('登录成功')
      toastUpdata(true)
      loginUpdate(false)
      setTimeout(() => {
        toastUpdata(false)
      }, 3000)
      // showToast('登录成功')
      console.log('登录成功')
    } else {
      msgUpdata('用户不存在')
      toastUpdata(true)
      setTimeout(() => {
        toastUpdata(false)
      }, 3000)
      console.log('用户不存在')
    }
  }



  return (
    <main>
      <div className="countmain">
        <div className="count">{allCount} / ∞</div>
        <div>
          <div className='count'>{count}</div>
        </div>
      </div>
      <div>
        <div className="bubbles round">
          {bubbles}
        </div>
        <div className='user' onClick={() => {
          loginUpdate(!loginstate)
        }}><img src='/user.svg' /></div></div>
      <div className='footer'>
        <div className='footer-children'>
          <div className="audio" onClick={() => {
            audioFlagUpdate(!audioFlag)
          }}>
            {
              audioFlag ? <img src='/audio.svg' /> : <img src='/unaudio.svg' />
            }
          </div>
          <div className='help' onClick={() => {
            helpme(!helpstate)
          }}><img src='/help.svg' /></div>
        </div>
      </div>
      <div className='dialog' style={{ display: helpstate ? 'block' : 'none' }}>
        <div className='dialog-w'>
          <div className='close' onClick={() => {
            helpme(!helpstate)
          }}><img src='/close.svg' /></div>
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
            <img src='/close.svg' />
          </div>
          <div className='form'>
            <input className='username' placeholder='用户名' type='text' value={username} onChange={event => usernameUpdate(event.target.value)} />
            <button className='login' type='submit' onClick={submit}>登录</button>
          </div>
        </div>
      </div>
      <div className='toast' style={{ display: toaststate ? 'block' : 'none' }}>{toastmsg}</div>
    </main>
  )
}
