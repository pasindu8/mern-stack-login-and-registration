import React , {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // useNavigate hook එක import කළා
import './Register.css';

const Register = () => {
    const navigate = useNavigate(); // useNavigate initialize කළා

    // Custom alert message state
    const [message, setMessage] = useState('');
    const [showMessageBox, setShowMessageBox] = useState(false);

    // Show custom message box
    const showAlert = (msg) => {
        setMessage(msg);
        setShowMessageBox(true);
    };

    // Close custom message box
    const closeAlert = () => {
        setShowMessageBox(false);
        setMessage('');
    };

    const [user,setUser] = useState({
        name:"",
        email:"",
        password: ""
    })

    const handleChange = e =>{
        const {name,value} = e.target;
        setUser({
            ...user, // spread operator
            [name]:value
        })
    }

    // register function එක
    const register = () => { // egister වෙනුවට register ලෙස නම නිවැරදි කළා
        const {name,email,password} = user;

        if (name && email && password){
            axios.post("http://localhost:5000/Register", user) // Port එක නිවැරදිදැයි පරීක්ෂා කරන්න
                .then(res => {
                    showAlert(res.data.message); // Custom alert භාවිතා කළා
                    // සාර්ථකව register වුණාට පස්සේ login page එකට navigate කරන්න පුළුවන්.
                    if (res.data.success) { // ඔබගේ backend එකෙන් success message එකක් එනවා නම්.
                        navigate("/Login");
                    }
                })
                .catch(err => {
                    console.error("Registration failed:", err);
                    showAlert("Registration failed. Please try again."); // Error message
                });
        }
        else {
            showAlert("Invalid input: Please fill in all fields."); // Custom alert භාවිතා කළා
        }
    }; // function එක මෙතනින් අවසන් වෙනවා.

    return (
        <>
            {/* Custom Message Box */}
            {showMessageBox && (
                <div className="">
                    <div className="">
                        <p className="">{message}</p>
                        <button
                            onClick={closeAlert}
                            className=""
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            <div className="form">
                <div className="heder">
                    Create a new account
                </div><br></br>
                <div className="">
                    <form action="#">
                        <div className="input_field">
                            <input type="text" id="create-account-pseudo" className="" name="name" value={user.name} onChange={handleChange}/>
                            <span></span>
                            <label>Full Name</label>
                        </div>
                        <div className="input_field"> 
                            <input type="email" id="create-account-email-input" className="" name="email" value={user.email} onChange={handleChange}/>
                            <span></span>
                            <label>Email</label>
                        </div>
                        <div className="input_field">
                            <input type="password" id="create-account-password" className="" name="password" value={user.password} onChange={handleChange}/>
                            <span></span>
                            <label>Password</label>
                        </div>
                        <div className="button">
                            <button type="button" className="button_text" onClick={register}>Register</button>
                        </div>
                    </form>
                    <div className="a_tag">
                        Already have an account ?
                    <a href="/Login" onClick={() => navigate("/Login")} className="a_tag_text">Sign in</a>
                    </div> 
                </div>
            </div>
        </>
    );
};

export default Register;