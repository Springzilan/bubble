import { ReactNode, useEffect, useRef, useState } from 'react';

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

  return (
    <main>
      <div className="countmain">
        <div className="count">{allCount} / ∞</div>
        <div className='count'>{count}</div>
      </div>
      <div className="bubbles round">
        {bubbles}
      </div>
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
          <div className='dialog-p'>游戏介绍</div>
        </div>
      </div>
    </main>
  )
}
