import React, {useState} from 'react'


const TestOnChangeOnBlur = () => {
  const [text, setText] = useState([])

  const onChange = (event) => { 
    setText(event.target.value)
  }

  const onBlur = (event) => { 
    setText(event.target.value)
  }

  return (
    <div><center>
        <input onChange={onChange} style={{marginTop: 100}}></input>
        <input onBlur={onBlur}></input>
        <br></br>
        {text}
    </center></div>
  )
}

export default TestOnChangeOnBlur;