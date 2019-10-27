import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { Input, Button } from "../common"

const CommentListItem = styled.div`
  > strong {
    font-size: 80%;
    color: #666;
  }

  border-bottom: 1px solid #ddd;
  padding: 4px 0;
`

const CommentForm = styled.form`
  display: flex;
  margin-top: 32px;

  ${Input} {
    margin-right: 8px;
    margin-top: auto;
    margin-bottom: auto;
  }

  ${Button} {
    margin: auto 0;
  }
`

export const BookComments = ({ firebase, bookId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: snapshot => {
        console.log(snapshot)
        const snapshotComments = []

        snapshot.forEach(doc =>
          snapshotComments.push({
            id: doc.id,
            ...doc.data(),
          })
        )

        setComments(snapshotComments)
      },
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return (
    <div>
      <CommentForm>
        <Input type="text" />
        <Button>Post Comment</Button>
      </CommentForm>
      {comments.map(comment => (
        <CommentListItem key={comment.id}>
          <strong>{comment.username}</strong>
          <div>{comment.text}</div>
        </CommentListItem>
      ))}
    </div>
  )
}
