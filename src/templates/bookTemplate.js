import React from "react"
import Layout from "../components/layout"

const BookTemplate = props => {
  console.log(props)

  return (
    <Layout>
      <section>
        <h2>
          {props.pageContext.title} -{" "}
          <small>{props.pageContext.author.name}</small>
        </h2>
        <p>{props.pageContext.summary}</p>
      </section>
    </Layout>
  )
}

export default BookTemplate
