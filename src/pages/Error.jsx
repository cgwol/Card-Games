import { useEffect, useState } from "react";
import logo from '../assets/templogo.png'

const Error = () => {

    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((time) => time - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if(countdown == 0){
            window.location.assign('/');

        }
    }, [countdown]);

    useEffect(()=> {
        document.body.style.overflow = 'hidden';
    }, []);

    const handleButtonClick = () =>{
        window.location.assign('/');
    };

    return(
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 mb-3">
            <img className="bi me-2" width={256} height={256} role="img" aria-label="cg" src={logo} alt="logo" />
            <h1 className="mb-3">Oops something went wrong</h1>
            <p className="">Redirecting to the Homepage in {countdown}</p>
            <button className="btn btn-primary btn-lg" onClick={handleButtonClick}>Homepage</button>
        </div>
    )
}
export default Error;