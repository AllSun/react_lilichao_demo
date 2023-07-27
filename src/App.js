import React, { useEffect, useState ,useMemo} from 'react'

function Child({ data }) {
  useEffect(() => {
    console.log('查询条件：', data)
  }, [data])

  return <div>子组件</div>
}


function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [kw, setKw] = useState('')

  const data = useMemo(() => ({
    name,
    phone
  }), [name, phone])

  return (
    <div className="App">
      <input onChange={(e) => setName(e.target.value)} type="text" placeholder='请输入姓名' />
      <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder='请输入电话' />
      <input onChange={(e) => setKw(e.target.value)} type="text" placeholder='请输入关键词' />
      <Child data={data} />
    </div>
  )
}

export default App
