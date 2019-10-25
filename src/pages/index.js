import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = props => {
  console.log(props)
  return (
    <Layout>
      {props.data.allBook.edges.map(edge => (
        <div key={edge.node.id}>
          <h2>
            {edge.node.title} - <small>{edge.node.author.name}</small>
          </h2>
          <div>{edge.node.summary}</div>
          <Link to={`/book/${edge.node.id}`}>Join conversation</Link>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  {
    allBook {
      edges {
        node {
          title
          summary
          id
          author {
            name
          }
        }
      }
    }
  }
`

export default IndexPage
