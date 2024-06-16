import React from "react";

const Content=()=>{
    function handlechange(){
        const arr=["earn","grow","give"];
        const i=1
        return arr[i];
    }
    const handleClick=()=>{
        console.log("thanks")
    }
    return(
        <main>        
        <div>lets {handlechange()} money</div>
        <button onClick={handleClick}>subscribe</button>
</main>
    )
}
export default Content