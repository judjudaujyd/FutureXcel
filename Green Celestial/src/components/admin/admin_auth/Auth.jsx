import React, { useState } from "react";
import API_BASE_URL from "../../../config/api";
import email from "/contact/mail.svg";
import pass from "/contact/password.svg";
import name from "/contact/name.svg";
import phone from "/contact/phone.svg";
import "./auth.css";

const Auth = () => {
  const [req_data, set_req] = useState({
    status: '',
    message: '',
    errors: '',
    auth: ''
  });

  // =============FUNCTIONS FOR FADE ALERTS====================
  const show_alert = () => {
    let field = document.querySelector(".float_window");
    let btns = document.querySelectorAll('.btn');

    // Disable all buttons that exist
    btns.forEach(btn => {
      if (btn) btn.disabled = true;
    });

    field.classList.add("view");

    setTimeout(() => {
      field.classList.remove('view');
      // Re-enable all buttons
      btns.forEach(btn => {
        if (btn) btn.disabled = false;
      });
    }, 10000);
  };

  // ===============FUNCTIONS AND STATES FOR SWITCHING FORMS================
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  // =============FUNCTIONS AND STATES FOR LOGIN FORM===============
  const [logForm, setLog] = useState({
    log_mail: '',
    log_pass: ''
  });

  const logFormHandler = (e) => {
    const { name, value } = e.target;
    setLog({ ...logForm, [name]: value });
  };

  // ==============================FUNCTION FOR LOGGING IN A USER==========================
  const handleLogin = async (e) => {
    e.preventDefault();

    const reqOpts = {
      method: "POST",
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mail: logForm.log_mail,
        password: logForm.log_pass
      })
    };

    const request = await fetch(`${API_BASE_URL}/admin/login`, reqOpts).then((res) => {
      set_req({ ...req_data, status: res.status });
      return res.json();
    });

    set_req({ ...req_data, message: request.message, errors: request.error, auth: request.authToken ? request.authToken : false });
    show_alert();

    if (request.authToken) {
      localStorage.setItem("authToken", request.authToken);
      window.location.href = "/dashboard";
    }
  };

  // =================STATES FOR SIGN UP FORM======================
  const [sign, setSign] = useState({
    name: '',
    email: '',
    contact: '',
    password: ''
  });

  const signFormHandler = (e) => {
    const { name, value } = e.target;
    setSign({ ...sign, [name]: value });
  };

  const handleSign = async (e) => {
    e.preventDefault();

    const signOpts = {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: sign.name,
        mail: sign.email,
        password: sign.password,
        contact_no: sign.contact
      })
    };

    const Signrequest = await fetch(`${API_BASE_URL}/admin/create`, signOpts).then((res) => {
      return res.json();
    });

    set_req({ ...req_data, message: Signrequest.message, errors: Signrequest.error, auth: Signrequest.authToken ? Signrequest.authToken : false });
    show_alert();

    if (Signrequest.authToken) {
      localStorage.setItem("authToken", Signrequest.authToken);
      window.location.href = "/dashboard";
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth_inner">
          {/* Branding Panel */}
          <div className="float_para">
            <div className="brand_logo">🌿</div>
            <h2>GREEN CELESTIAL</h2>
            <p>Admin Dashboard - Manage your content, projects, and team with ease</p>
          </div>

          {/* Login Form */}
          {!isSignUp && (
            <div className="auth_left">
              <div className="left_content">
                <h2>Welcome Back</h2>
                <p>Sign in to access your dashboard</p>

                <form onSubmit={handleLogin}>
                  <label htmlFor="log_mail">
                    <img src={email} alt="Email" />
                    Email Address
                  </label>
                  <input
                    id="log_mail"
                    type="email"
                    value={logForm.log_mail}
                    onChange={logFormHandler}
                    name="log_mail"
                    placeholder="admin@greencelestial.com"
                    required
                  />

                  <label htmlFor="log_pass">
                    <img src={pass} alt="Password" />
                    Password
                  </label>
                  <input
                    id="log_pass"
                    type="password"
                    value={logForm.log_pass}
                    onChange={logFormHandler}
                    name="log_pass"
                    placeholder="Enter your password"
                    minLength={8}
                    required
                  />

                  <button type="submit" className="btn" id="log_btn">Log In</button>
                </form>

                <small>
                  Don't have an account?
                  <button onClick={toggleForm}> Request Access</button>
                </small>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          {isSignUp && (
            <div className="auth_right">
              <div className="left_content">
                <h2>Request Access</h2>
                <p>Create an admin account</p>

                <form onSubmit={handleSign}>
                  <label>
                    <img src={name} alt="Name" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={sign.name}
                    name="name"
                    onChange={signFormHandler}
                    placeholder="John Doe"
                    required
                  />

                  <label>
                    <img src={email} alt="Email" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={sign.email}
                    name="email"
                    onChange={signFormHandler}
                    placeholder="john@example.com"
                    required
                  />

                  <label>
                    <img src={phone} alt="Phone" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={sign.contact}
                    name="contact"
                    onChange={signFormHandler}
                    placeholder="+1 234 567 8900"
                    required
                  />

                  <label>
                    <img src={pass} alt="Password" />
                    Password
                  </label>
                  <input
                    type="password"
                    value={sign.password}
                    name="password"
                    onChange={signFormHandler}
                    placeholder="Minimum 8 characters"
                    minLength={8}
                    required
                  />

                  <button type="submit" className="btn">Sign Up</button>
                </form>

                <small>
                  Already have an account?
                  <button onClick={toggleForm}> Sign In</button>
                </small>
              </div>
            </div>
          )}
        </div>

        {/* Alert Messages */}
        <div className="float_window">
          {Array.isArray(req_data.errors)
            ? req_data.errors.map((val, index) => <p key={index}>{val.msg}</p>)
            : <p>{req_data.errors}</p>
          }
          {Array.isArray(req_data.message)
            ? req_data.message.map((val, index) => <p key={index}>{val.msg}</p>)
            : <p>{req_data.message}</p>
          }
        </div>
      </div>
    </>
  );
};

export default Auth;
