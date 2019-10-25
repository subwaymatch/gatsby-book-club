import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import BookItem from "../components/BookItem"
import Image from "../components/image"
import SEO from "../components/seo"

const LinkButton = styled.div`
  text-align: right;

  a {
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      background: indigo;
    }
  }
`

const IndexPage = props => {
  console.log(props)
  return (
    <Layout>
      {props.data.allBook.edges.map(edge => (
        <BookItem
          key={edge.node.id}
          bookTitle={edge.node.title}
          bookSummary={edge.node.summary}
          authorName={edge.node.author.name}
        >
          <LinkButton>
            <Link to={`/book/${edge.node.id}`}>Join conversation</Link>
          </LinkButton>
        </BookItem>
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
