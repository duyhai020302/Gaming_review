import {useState} from "react";
//import { validate } from "../../../api/models/User";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function validateEmail(value){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(value.match(emailRegex)){
            setEmail(value);
            return true;
        }else{
            alert("Invalid Email");
            return false;
        }
    };
    async function register(ev){
        //prevent html to redirect from the register page(default behaviour of html)
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
        });
        if(response.status === 200){
            alert('registration successful');
        }else{
            alert('registration failed')
            }
    }
    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
                placeholder="Username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" 
                placeholder="Password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}/>
            <button>Register</button>
        </form>
    );
}