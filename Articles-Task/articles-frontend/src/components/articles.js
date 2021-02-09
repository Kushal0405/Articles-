import React from 'react';
export default function Articles(props) {

  
    
    return (
        <>
        
        <textarea name="article" style={{width:"600px",height:"500px"}} type="text"  value={props.values} onChange={(e)=>props.onChange(e)} />
 
        
        
        </>
    )
}
