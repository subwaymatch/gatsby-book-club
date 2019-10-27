import React, { useState, useContext } from "react"
import { FirebaseContext } from "../components/Firebase"
import { Form, Input, Button } from "../components/common/"

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const { firebase } = useContext(FirebaseContext)

  function handleSubmit(e) {
    e.preventDefault()

    firebase.login({ email: formValues.email, password: formValues.password })
  }

  function handleInputChange(e) {
    e.persist()

    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={handleInputChange}
          value={formValues.email}
          name="email"
          type="email"
          placeholder="your@email.com"
        />
        <Input
          onChange={handleInputChange}
          value={formValues.password}
          name="password"
          type="password"
          placeholder="password"
        />
        <Button type="submit" block>
          Submit
        </Button>
      </Form>
    </section>
  )
}

export default Login
