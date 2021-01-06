// import React, { useState } from "react";
// import "./SignUp.css";
// import Login from "./Login";
// import Register from "./Register";
// import { useSpring, animated } from "react-spring";

// function App() {
//   const [registrationFormStatus, setRegistartionFormStatus] = useState(false);

//   const loginProps = useSpring({
//     left: registrationFormStatus ? -500 : 0
//   });

//   const registerProps = useSpring({
//     left: registrationFormStatus ? 0 : 500
//   });

//   const loginBtnProps = useSpring({
//     borderBottom: registrationFormStatus
//       ? "solid 0px transparent"
//       : "solid 2px #1059FF"
//   });
//   const registerBtnProps = useSpring({
//     borderBottom: registrationFormStatus
//       ? "solid 2px #1059FF"
//       : "solid 0px transparent"
//   });
//   function registerClicked() {
//     setRegistartionFormStatus(true);
//   }
//   function loginClicked() {
//     setRegistartionFormStatus(false);
//   }

//   return (
//     <div className="login-register-wrapper">
//       <div className="nav-buttons">
//         <animated.button
//           id="loginBtn"
//           onClick={loginClicked}
//           style={loginBtnProps}
//         >
//           Login
//         </animated.button>
//         <animated.button
//           id="registerBtn"
//           onClick={registerClicked}
//           style={registerBtnProps}
//         >
//           Register
//         </animated.button>
//       </div>

//       <div className="form-group">
//         <animated.form action="" id="loginForm" style={loginProps}>
//           <Login />
//         </animated.form>

//         <animated.form action="" id="registerForm" style={registerProps}>
//           <Register />
//         </animated.form>
//       </div>
//     </div>
//   );
// }
// export default App;
import React, { useState } from "react";
import "./SignUp.css";
import Login from "./Login";
import Register from "./Register";
import { useSpring, animated } from "react-spring";

function SignUp(onLogIn) {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);

  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0
  });

  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 0px transparent"
      : "solid 2px #1059FF"
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #1059FF"
      : "solid 0px transparent"
  });
  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="login-register-wrapper">
  
      <div className="nav-buttons">
        <animated.button
          id="loginBtn"
          onClick={loginClicked}
          style={loginBtnProps}
        >
          Đăng nhập
        </animated.button>
        <animated.button
          id="registerBtn"
          onClick={registerClicked}
          style={registerBtnProps}
        >
          Đăng ký
        </animated.button>
        
      </div>

      <div className="form-group">
        <animated.form action="" id="loginForm" style={loginProps}>
          <Login onLogIn={onLogIn}/>
        </animated.form>

        <animated.form action="" id="registerForm" style={registerProps}>
          <Register />
        </animated.form>
      </div>
    </div>
  );
}
export default SignUp;
