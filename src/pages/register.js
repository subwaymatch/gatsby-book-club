import React, { useState, useContext } from "react"
import { Form, Input, Button } from "../components/common"
import { FirebaseContext } from "../components/Firebase"

const Register = () => {
  const { firebase } = useContext(FirebaseContext)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  function handleInputChange(e) {
    e.persist()
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (formValues.password === formValues.confirmPassword) {
      firebase.register({
        email: formValues.email,
        password: formValues.password,
      })
    }

    console.log(formValues)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        value={formValues.email}
        onChange={handleInputChange}
        placeholder="your@email.com"
        required
      />
      <Input
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleInputChange}
        placeholder="password"
        required
        minLength={3}
      />
      <Input
        name="confirmPassword"
        type="password"
        value={formValues.confirmPassword}
        onChange={handleInputChange}
        placeholder="confirm password"
        required
        minLength={3}
      />
      <Button type="submit" block>
        Register
      </Button>
    </Form>
  )
}

export default Register
