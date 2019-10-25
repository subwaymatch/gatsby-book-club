import React from "react"
import Layout from "../components/layout"
import BookItem from "../components/BookItem"

const BookTemplate = props => {
  console.log(props)

  return (
    <Layout>
      <BookItem
        authorName={props.pageContext.author.name}
        bookTitle={props.pageContext.title}
        bookSummary={props.pageContext.summary}
      />
    </Layout>
  )
}

export default BookTemplate
