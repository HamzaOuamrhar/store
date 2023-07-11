import React from 'react'
import {Helmet} from 'react-helmet-async'
import {Link, useLocation} from 'react-router-dom'

function Signin() {
  const {search} = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'
  return (
    <div>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <form action="">
          <input type="text" placeholder='email' />
          <input type="password" name="" id="" placeholder='password' />
          <button type='submit'>Sign In</button>
          <div>New customer? <Link to={`/signup?redirect=${redirect}`}>Sign Up</Link></div>
      </form>
    </div>
  )
}

export default Signin