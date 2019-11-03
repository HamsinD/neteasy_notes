import React,{useState} from 'react'
import InputNumber from './input/index'

function App() {
  const [value, setValue] = useState("aaa");
  return (
    <div>
      <InputNumber value={value} onChange={e => {}} />
      <InputNumber defaultValue={value} onChange={e => {}} />
    </div>
  );
}

export default App
