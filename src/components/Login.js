import React, { useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"

// import { useAuth } from "../contexts/AuthContext"

// import { useAppContext } from "../lib/contextLib";

import { Link, useHistory } from "react-router-dom"

import { useFormFields } from "../lib/hooksLib";

import axios from 'axios'

export default function Login() {
  const Background = "https://source.unsplash.com/WEQbe2jBg40/600x1200"
  
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
  
  const history = useHistory()
  // const { userHasAuthenticated } = useAppContext()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function validateForm() {
    return fields.email.length > 5 && fields.password.length > 5;
  }
    
  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    let url = "http://localhost:9000/ping"

    let headers = new Headers();

    headers.set('Authorization', 'Basic ' + Buffer.from(fields.email + ':' + fields.password).toString('base64'));
    
    try {
      setError("")
      // useAuth down below
      await axios.get(url, { headers: headers }, {
        /* mode: 'no-cors',
        method: 'GET',
        headers: { 
          headers,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
        }*/
        auth: { username: fields.email, password: fields.password }
      })

      .then(response => response.json())
      .then(json => console.log(json));
      // userHasAuthenticated(true);
      history.push("/")
    } 
    
    catch { setError("Failed to log in") }

    setLoading(false)
  }

  return (
    <>
      <div className = "container-fluid ps-md-0">
        <div className = "row g-0">
          <div className = "d-none d-md-flex col-md-4 col-lg-6" 
          style = { { 
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          } } ></div>
            <div className = "col-md-8 col-lg-6">
              <div className = "login d-flex align-items-center py-5" style = { { minHeight: "100vh"  } } >
                <div className = "container">
                  <div className = "row">
                    <div className = "col-md-9 col-lg-8 mx-auto">
                      <h2 className = "text-center mb-4">Log In</h2>
                      
                      {error && <Alert variant = "danger"> { error } </Alert>}
                      
                      <Form onSubmit = { handleSubmit } >
                        <Form.Group className = "mb-3" controlId = "email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control autoFocus type = "email" value = { fields.email } onChange = { handleFieldChange } required />
                        </Form.Group>
                        <Form.Group className = "mb-3" controlId = "password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control autoFocus type = "password" value = { fields.password } onChange = { handleFieldChange } required />
                        </Form.Group>
                        <Button loading = { loading } disabled = { !validateForm } className = "btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                        type = "submit" style = { { fontSize: "0.9rem", letterSpacing: "0.05rem", padding: ".75rem 1rem" } } >
                          Log In
                        </Button>
                      </Form>
                      
                      <div className = "w-100 text-center mt-3">
                      <Link to = "/forgot-password">Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

/* import Card from 'react-bootstrap' and include <Card> <Card.Body> after h2 and before ForgotPassword */ 
