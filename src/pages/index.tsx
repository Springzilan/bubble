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
      audioRef.current?.play()
      countUpdate(count + 1)
      allCountUpdate(allCount + 1)
    }
  }

  const bubbles: ReactNode[] = []
  array.forEach((item, index) => { bubbles.push(<div className={Number(item) ? 'hiddens' : 'bubble'} id={index.toString()} onClick={() => hidden(index)}></div>) })

  const [audioFlag, audioFlagUpdate] = useState(true)


  return (
    <main>
      <div className="countmain">
        <div className="count">{allCount} / ∞</div>
        <div className='count'>{count}</div>
      </div>
      <div className="bubbles round">
        {bubbles}
      </div>
      <div onClick={() => {
        audioFlagUpdate(!audioFlag)
      }}>
        {
          audioFlag ? <img src='/audio.svg' width={100} /> : <img src='/unaudio.svg' width={100} />
        }
      </div>
    </main>
  )
}
