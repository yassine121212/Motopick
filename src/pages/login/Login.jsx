import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import logoimg from "../../image/logo.png"
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navitage("/")
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    // <div className="login">
    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="email"
    //       placeholder="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button type="submit">Login</button>
    //     {error && <span>Wrong email or password!</span>}
    //   </form>
    // </div>
    <div className="container-flex">
        <img src={logoimg} alt=" x" />

    <div id="wrapper" >
       <h1>Motopickup</h1>
  <h2>Login page.</h2>
<div class="login-page">
    
  <div class="form" >


    <form class="login-form" onSubmit={handleLogin}>
      <input  type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}/>
      <input  type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}/>
      <button  type="submit">login</button>
    {error && <span>Wrong email or password!</span>}

    </form>
  </div>
</div>
</div>



</div>


  );
};

export default Login;