import React, { useContext } from "react"
import { graphql } from "gatsby"
import { FirebaseContext } from "../components/Firebase"
import BookItem from "../components/BookItem"
import { BookComments } from "../components/common"

const BookTemplate = props => {
  console.log(props.data)

  const { firebase } = useContext(FirebaseContext)

  return (
    <section>
      <BookItem
        bookCover={props.data.book.localImage.childImageSharp.fixed}
        authorName={props.data.book.author.name}
        bookTitle={props.data.book.title}
        bookSummary={props.data.book.summary}
      />
      {!!firebase && (
        <BookComments firebase={firebase} bookId={props.data.book.id} />
      )}
    </section>
  )
}

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: { eq: $bookId }) {
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
`

export default BookTemplate
