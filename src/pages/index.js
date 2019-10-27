import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import BookItem from "../components/BookItem"

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
  return (
    <section>
      {props.data.allBook.edges.map(edge => (
        <BookItem
          key={edge.node.id}
          bookCover={edge.node.localImage.childImageSharp.fixed}
          bookTitle={edge.node.title}
          bookSummary={edge.node.summary}
          authorName={edge.node.author.name}
        >
          <LinkButton>
            <Link to={`/book/${edge.node.id}`}>Join conversation</Link>
          </LinkButton>
        </BookItem>
      ))}
    </section>
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
          localImage {
            childImageSharp {
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          author {
            name
          }
        }
      }
    }
  }
`

export default IndexPage
