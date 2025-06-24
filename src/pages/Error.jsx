import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Error = () => {

    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((time) => time - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        if(countdown == 0){
            window.location.assign('/');

        }
    }, [countdown]);

    const handleButtonClick = () =>{
        window.location.assign('/');
    };

    return(
        <div className="error-con">
            <h1 className="error-h1">Oops something went wrong</h1>
            <p className="error-p">Redirecting to the Homepage in {countdown}</p>
            <button onClick={handleButtonClick}>Goto Homepage</button>
        </div>
    )
}
export default Error;