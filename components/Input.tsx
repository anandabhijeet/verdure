import React from 'react'

interface InputProps {
    placeholder?:string,
    value?:string,
    type?:string,
    disabled?:boolean,
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}


const Input:React.FC<InputProps> =({
    placeholder,
    value,
    type,
    disabled,
    onChange
})=> {
  return (
    <input className='px-3 py-2 my-3' type={type} disabled={disabled} onChange={onChange} value={value} placeholder={placeholder}
     style={{all:'unset', border:'2px solid #fff', width:'100%', borderRadius:'8px', color:'#fff', boxSizing:'border-box'}}
     />
  )
}

export default Input
