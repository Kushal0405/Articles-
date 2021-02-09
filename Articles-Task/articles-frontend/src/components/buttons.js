import React from 'react'

export default function buttons(props) {
    return (
        <>
            <div className="container-fluid ">
                <div className="btn-group float-right " role="group">
                  <button className="btn btn-outline-primary  mr-5" onClick={(e)=>props._share}>Share</button>
                  <input type="Submit"  className="btn btn-outline-success  mr-5" onClick={(e,data,isUpdate)=>props.onClick(e,data,isUpdate) } value="Save"/>
                  <button  className="btn btn-outline-danger  mr-5" onClick={(e)=>props.onHandleDelete(e)}>Delete</button>
                </div>
            </div>
        </>
    )
}
