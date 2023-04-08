import { ReactNode, useState } from 'react';

export default function Home() {

  let data: number[] = []
  for (let index = 0; index < 100; index++) {
    data[index] = 0;
  }

  let [array, arrayUpdate] = useState<number[]>(data)
  let [count, countUpdate] = useState(0)
  let [allCount, allUpdate] = useState(1000)
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
      countUpdate(count + 1)
    }
  }

  const bubbles: ReactNode[] = []
  array.forEach((item, index) => { bubbles.push(<div className={Number(item) ? 'hiddens' : 'bubble'} id={index.toString()} onClick={() => hidden(index)}></div>) })

  return (
    <main>
      <div className="countmain">
        <div className="count">{count} / ∞</div>
        <div className='count'>{allCount}</div>
      </div>
      <div className="bubbles round">
        {bubbles}
      </div>
    </main>
  )
}
