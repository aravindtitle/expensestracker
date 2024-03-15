import React, { useState } from 'react'

const Greeting = () => {
    const[changedText,setChangedText]=useState(false);
    function changeHandler(){
        setChangedText(true);
    }
  return (
    <div>
       {!changedText && <p>It is good to see you!</p>}
        {changedText && <p>Changes!</p>}
        <button onClick={changeHandler}>Change Text!</button>
    </div>
  )
}

export default Greeting