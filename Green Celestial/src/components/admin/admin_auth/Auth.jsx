import React, { useState } from "react";
import email from "/contact/mail.svg";
import pass from "/contact/password.svg";
import name from "/contact/name.svg";
import phone from "/contact/phone.svg";
import "./auth.css";

const Auth = () => {
  const [req_data , set_req] = useState({
    status : '',
    message : '',
    errors : '',
    auth : ''
  })

  // =============FUNCTIONS FOR FADE ALERTS====================
  const show_alert = () => {
    let feild = document.querySelector(".float_window");
    let btns = document.querySelectorAll('.btn');
    btns[0].disabled = true;
    btns[1].disabled = true;
    feild.classList.add("view");

    setTimeout(() => {
      feild.classList.remove('view');
      btns[0].disabled = false;
      btns[1].disabled = false;
    },10000);
    
  }

  // ===============FUNCTIONS AND STATES FOR SWITCHING FORMS================
  const [view,setView] = useState('50%');
  const [visible,setVisible] = useState({
    left : 'block',
    right : 'none'
  });
  const changeForm = () => {
    view == '0' ? setView('50%') : setView('0');

    if(view !== '0'){
      setVisible({
        left : 'none',
        right : 'block'
      });
    }else{
      setVisible({
        left : 'block',
        right : 'none'
      });
    }

  }

  // =============FUNCTIONS AND STATES FOR LOGIN FORM===============
  const [logForm,setLog] = useState({
    log_mail : '',
    log_pass : ''
  });

  const logFormHandler = (e) => {
    const {name , value} = e.target;
    setLog({...logForm, [name] : value});
  }

  // ==============================FUNCTION FOR LOGINING IN A USER==========================
  const handleLogin = async(e) => {
    e.preventDefault();

    // ==============CREATING REQUEST HEADERS==============================
    const reqOpts = {
      method : "POST",
      cache: 'no-store',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        mail : logForm.log_mail,
        password : logForm.log_pass
      })
    };

    // =================POSTING A REQUEST FOR LOGINING IN USER===========================
    const request = await fetch('http://localhost:8000/admin/login',reqOpts).then((res) => {
      set_req({...req_data,status : res.status});
      // console.log(res.headers);
      return res.json();
  });
    
  // ==============SETING NEW VALUES TO STATE=======================
    set_req({...req_data,message : request.message,errors : request.error ,auth : request.authToken ? request.authToken : false});
    show_alert();
    if(request.authToken){
      
      localStorage.setItem("authToken",request.authToken);
      window.location.href = "/dashboard";
    }
  }

  // =================STATES FOR SIGN UP FORM======================
  const [sign,setSign] = useState({
    name : '',
    email : '',
    contact : '',
    password : ''
  })

  const signFormHandler = (e) => {
    const {name , value} = e.target;
    setSign({...sign,[name] : value});
  }

  const handleSign = async (e) => {
    e.preventDefault();

    const signOpts = {
      method : 'POST',
      cache: 'no-store',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        name : sign.name,
        mail : sign.email,
        password : sign.password,
        contact_no : sign.contact
      })
    }

    const Signrequest = await fetch('http://localhost:8000/admin/create',signOpts).then((res) => {
      return res.json();
    })

    set_req({...req_data,message : Signrequest.message,errors : Signrequest.error ,auth : Signrequest.authToken ? Signrequest.authToken : false});
    show_alert();

    if(Signrequest.authToken){
      
      localStorage.setItem("authToken",request.authToken);
      window.location.href = "https://youtube.com";
    }


  }


  return (
    <>
    {/* ================START OF AUTH DIV================== */}
      <div className="auth">

        {/* =============START OF AUTH INNER============== */}
        <div className="auth_inner">

          {/* ===========START OF AUTH LEFT============== */}
          <div className="auth_left" style={{display : visible.left}}>
            <div className="left_content">
              <h2>LOGIN</h2>
              <form onSubmit={handleLogin}>
                <label htmlFor="log_mail">
                  <img src={email} />
                  Email
                </label>
                <input id="log_mail" type="text" value={logForm.email} onChange={logFormHandler} name="log_mail" required/>
                <label htmlFor="log_pass">
                  <img src={pass} />
                  Password
                </label>
                <input id="log_pass" type="password" value={logForm.password} onChange={logFormHandler} name="log_pass" min={8} required/>

                <button type="submit" className="btn" id="log_btn">LOG IN</button>
              </form>
              <small>Don't Have An Account ? ,<button onClick={() => changeForm()}>Request Access</button></small>
            </div>
          </div>
          {/* ==============END OF AUTH LEFT============== */}

          {/* =============START OF AUTH RIGHT============ */}
          <div className="auth_right" style={{display : visible.right}}>
            <div className="left_content">
              <h2>SIGN UP</h2>
              <form onSubmit={handleSign}>
                <label>
                  <img src={name} />
                  Name
                </label>
                <input type="text" value={sign.name} name="name" onChange={signFormHandler}/>

                <label>
                  <img src={email} />
                  Email
                </label>
                <input type="text" value={sign.email} name="email" onChange={signFormHandler} />

                <label>
                  <img src={phone} />
                  Contact
                </label>
                <input type="text" value={sign.contact} name="contact" onChange={signFormHandler} />
                
                <label>
                  <img src={pass} />
                  Password
                </label>
                <input type="text" value={sign.password} name="password" onChange={signFormHandler} />

                <button type="submit" className="btn">SIGN UP</button>
              </form>
              <small>Already Have An Account ? <button onClick={() => changeForm()}>CLICK HERE</button></small>
            </div>
          </div>

          {/* =============END OF AUTH RIGHT============ */}

          {/* ============START OF FLOAT PARA============ */}
          <div className="float_para" style={{left : view}}>
            <h2>WELCOME TO GREEN CELESTIAL</h2>
            <p>THIS WEB WAS DEVELOPED AND DESIGNED BY DARK_KNIGHT</p>
          </div>
        
        {/* ==============END OF FLOAT PARA============== */}

        </div>
        {/* ==============END OF AUTH INNER================ */}
        
        <div className="float_window">
          {
            Array.isArray(req_data.errors) ? req_data.errors.map((val,index) => { return <p key={index}>{val.msg}</p> }) : <p>{req_data.errors}</p>
          }
          {
            Array.isArray(req_data.message) ? req_data.message.map((val,index) => { return <p key={index}>{val.msg}</p> }) : <p>{req_data.message}</p>
          }
        </div>
      </div>
      {/* ==========END OF AUTH DIV===================== */}
    </>
  );
};

export default Auth;
