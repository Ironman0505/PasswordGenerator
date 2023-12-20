import { useState,useRef,useCallback, useEffect } from 'react'


function App() {

  const [length,setLength]=useState(6);
  const [nums,setNums]=useState(false);
  const [chars,setChars]=useState(false);
  const [pwd,setPwd]=useState("");


  const PasswordGen=useCallback(()=>{
    let password=""
    let str=""
    let randomStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(nums)randomStr+="1234567890";
    if(chars)randomStr+="!@#$%^&*(){}[]~`|"
    for(let i=1;i<=length;i++){
      let id=Math.ceil(Math.random()*randomStr.length);
      password+=randomStr.charAt(id);
    }
    setPwd(password)
  },[length,nums,chars])

  const PwdRef=useRef(null);

  const copyText=()=>{
    PwdRef.current?.select();
    // alert("Copied!")
    window.navigator?.clipboard.writeText(pwd);
  }

  useEffect(()=>{
    PasswordGen();
  },[length,nums,chars])

  return (
    < div className='bg-dark text-center mb-2 p-3 text-white' >
    <h3 className='text-primary text-center' >Password Generator</h3>
    <input type='text' placeholder='Password' ref={PwdRef} value={pwd} />

    <button className='btn btn-success btn-sm m-2'  onClick={copyText} >Copy</button>

    <br />
    <input type='range'  value={length} min={4} max={24} defaultValue={6}  onChange={(e)=>setLength(e.target.value)} />
    <label className='mx-2'  >Length({length}) </label>
    <input type='checkbox' onClick={()=>setNums((prev)=>!prev)} />
    <label className='mx-2'>Numbers</label>
    <input type='checkbox' onClick={()=>setChars((prev)=>!prev)} />
    <label className='mx-2'>Characters</label>
    </div>
  )
}

export default App
