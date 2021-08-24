import React, { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const Background = "https://source.unsplash.com/WEQbe2jBg40/600x1200"
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

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
                  <Form.Group className = "mb-3" id = "email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = "email" ref = { emailRef } required />
                  </Form.Group>
                  <Form.Group className = "mb-3" id = "password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type = "password" ref = { passwordRef } required />
                  </Form.Group>
                  <Button disabled={loading} className = "btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
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
