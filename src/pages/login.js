import React, { useState } from "react"
import { Link } from "gatsby"
import { useAuth } from "../components/Firebase"

import Layout from "../components/layout"
import SEO from "../components/seo"

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const { firebase } = useAuth()

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
    <Layout>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          value={formValues.email}
          name="email"
          type="email"
          placeholder="your@email.com"
        />
        <input
          onChange={handleInputChange}
          value={formValues.password}
          name="password"
          type="password"
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default LoginPage
