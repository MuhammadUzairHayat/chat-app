// import React from 'react'
import { useState } from 'react'
import assets from '../../assets/assets'
import './Login.css'

const Login = () => {
  
  const [formState, setFormState] = useState('Sign Up')

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className='logo' />
      <form action="" className="login-form">
        <div className="login-input-div">
        <h2 className='login-head'>{formState}</h2>
        {formState === 'Sign Up' ? <input className='login-input' type="text" placeholder='Enter Username' />: ""}
        <input className='login-input' type="email" placeholder='Enter Email' />
        <input className='login-input' type="password" placeholder='Enter Password' />
        </div>
        <button type="submit" className='login-button'>{formState}</button>
        <div className="login-terms">
            <input type="checkbox" id="agree" name="agree" />
            <label htmlFor="agree">I agree to the Terms and Conditions</label>
        </div>
        <p className="login-forgot">{formState === 'Sign Up' ? 'Already have an account.' : 'If you have no account.'} <span onClick={()=> formState === 'Sign Up' ? setFormState('Sign In') : setFormState('Sign Up')}>{formState === 'Sign Up' ? 'Sign In' : 'Sign Up'}</span></p>
      </form>
    </div>
  )

}

export default Login
