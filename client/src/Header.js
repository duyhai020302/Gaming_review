import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad} from '@fortawesome/free-solid-svg-icons';
import { faLightbulb} from '@fortawesome/free-solid-svg-icons';
import './App.css';

export default function Header(){
    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile',{
            credentials:'include',
        }).then(response => {
            response.json().then(userInfo =>{
                setUserInfo(userInfo);
            });
        });
    },[]);

    function logout(){
        fetch('http://localhost:4000/logout',{
            credentials:'include',
            method:'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;
    const logo = <FontAwesomeIcon icon={faGamepad} />
    const bulb = <FontAwesomeIcon icon={faLightbulb} />
    const [darkMode, setDarkMode] = useState(false);
    const toggleTheme=()=>{
        setDarkMode(!darkMode);
    };
    useEffect(()=>{
        document.body.className = darkMode ? 'dark' : 'light';
        document.documentElement.style.setProperty('--author-color',
    darkMode ? 'var(--author-color-dark)' : 'var(--author-color-light)'
  );
}, [darkMode]);
    return(
        <header>
            <Link to="/" className="logo">{logo} OVERPAD</Link>
            <nav>
                {username &&(
                    <>
                        <span>Hello, {username}</span>
                        <Link to='/create'>Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                <Link onClick={toggleTheme}>
                    {bulb}
                    </Link>
            </nav>
        </header>
    );
}