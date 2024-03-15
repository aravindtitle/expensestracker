import React, { useEffect, useState } from 'react'

const Async = () => {
    const [post,setPost]=useState([]);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res=>res.json())
        .then(data=>setPost(data))
    },[])
    console.log(post)
  return <>
  <ul>
    {
        post.map((item,index)=>{return <li key={index} style={{border:'1px solid gray'
        ,textAlign:'center'
        , alignItems:'center',
        borderRadius:'10px',
        listStyle:'none',
        margin:'5px',
        padding:'5px'
        }}>
            <p>{item.title}</p>
        </li>})
    }
  </ul>
  </>
}

export default Async