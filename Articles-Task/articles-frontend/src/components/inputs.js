import React from 'react';
import DateTimePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";
export default function inputs(props) {
    const {values} = props;

  
    return (
        <>
        <div>
                <div className="container-fluid pt-5 bg-dark pb-5 mb-5" style={{paddingLeft: 150 }}>
                
                <div className="row">
                 <div className="col-md-4">
                 </div>
                 <div className="col-md-8">
                    <input className="w-25 ml-2" type="text" name="author"  value={values.author} placeholder="Author" onChange={(e)=>props.onChange(e)}  />
                    <input className="w-25 ml-2" type="text" name="subject" value={values.subject} placeholder="Subject" onChange={(e)=>props.onChange(e)} />
                {/* <Moment className=" ml-2 mt-2 bg-light pt-1 pb-1"   name="createdAt" value={values.createdAt} dateFormat="Pp" selected={props.selected} onChange={(e)=>props.onHandleChange(e)} /> */}
                        <DateTimePicker  className=" ml-2 bg-light"  onChange={(e)=>props.onHandleChange(e)}  value={props.date ||values.createdAt} />
                </div>
                 
              </div>
              
            </div>
              
            </div>
            
        </>
    )
}
