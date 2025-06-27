import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import කරලා තියෙනවා හරි
import './Login.css';

const Login = ({setLoginUser}) => {
    const navigate = useNavigate(); // useNavigate hook එක නිවැරදිව initialize කරලා තියෙනවා.

    const [user,setUser] = useState({
        email:"", // username වෙනුවට email කියලා තිබ්බොත් හොඳයි, ෆෝම් එකේ input name "email" නිසා.
        password: ""
    })

    const handleChange = e =>{
        const {name,value} = e.target
        setUser({
            ...user, // spread operator
            [name]:value
        })
    }

    const login = () => {
        axios.post("http://localhost:5000/Login", user)
            .then(res => {
                alert(res.data.message);
                setLoginUser(res.data.user);
                navigate("/"); // මෙතන navigate("/") කියලා වෙනස් කළා
            })
            .catch(err => {
                // error handling එකක් දාන එක හොඳයි
                console.error("Login failed:", err);
                alert("Login failed. Please check your credentials and try again.");
            });
    }

    return (
        <>
            <div className="form">
                <div className="heder">
                    Login To Your Account
                </div><br></br>
                <div className="">
                    <form action="#" autoComplete="off">
                        
                        <div className="input_field">
                            <input type="text" id="sign-in-email" className="" name="email" value={user.email} onChange={handleChange} placeholder="Your email"/>
                            <span></span>
                            <label>Email</label>
                        </div>
                        
                        <div className="input_field">
                            <input type="password" id="sign-in-password" className="" name="password" value={user.password} onChange={handleChange} placeholder="Your password"/>
                            <span></span>
                            <label>Password</label>
                        </div>
                       
                            <div className="a_forgot">
                                <a href="/Login" className="a_tag_text">Forgot Your Password?</a>
                            </div>

                        <div className="button">
                            <button type="button" className="button_text" onClick={login}>Login</button>
                        </div>
                    </form>
                </div>
                <div className="a_tag">
                    <a href="/Register" className="a_tag_text" onClick={() => navigate("/Register")}>You don&#x27;t have an account?</a>
                </div>
            </div>
        </>
    )
}
export default Login;