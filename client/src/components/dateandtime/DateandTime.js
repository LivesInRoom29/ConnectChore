import  React, { useState , useEffect } from 'react'
// Bootstrap components
import Container from 'react-bootstrap/Container';
// Local CSS
import "../dashboard/Dashboard.css";
import "../../App.css";


export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <>
        <Container>
            <div className="dateandtime">It's currently {date.toLocaleTimeString()} on {date.toLocaleDateString()}</div>
        </Container>
        </>
    )
}

export default DateTime;