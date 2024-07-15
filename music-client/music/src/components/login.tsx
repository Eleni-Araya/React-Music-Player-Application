import React, { useState, FormEvent } from 'react'
import logo from '../Images/logo.jpg'
import '../login.css'
import userService from '../apis/services/login.service'
import { useNavigate } from 'react-router-dom'


export default function LoginComp() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remeberPassword, setRemebrPassword] = useState(false)

  const navigate = useNavigate()

  const logIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await userService.login({
        username,
        password
      });

      const token = response.data.accessToken;

      if (response.status === 200) {
        sessionStorage.setItem("token", token);
        navigate('/music')
      } else {
        console.log("LogIn failed", response.data);
        alert("Re-check your username and Password!");
      }
      if (!token) {
        navigate('/login');
        return;
      }
    } catch (e) {
      alert("Incorrect Password/username! try Again");
    }
  };
  return (
    <form onSubmit={logIn}>
      <div className="form-container">
        <img src={logo} alt="" className='images' />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control form-input"
          id="inputEmail4"
          placeholder="User name"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control form-input"
          id="inputPassword4"
          placeholder="Password"
          required
        />
        {/* <label style={{ marginLeft: '40%', fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={remeberPassword}
            onChange={(e) => setRemebrPassword(e.target.checked)}
          />
          Remember Password
        </label> */}
      </div>
      {/* <div className="col-md-6"></div> */}
      <div className="col-12" style={{ marginLeft: '7%' }}>
        <button type="submit" className="btn btn-primary btn-signin" style={{ marginTop: '0px' }}>
          Sign in
        </button>
      </div>
    </form>
  )
}
