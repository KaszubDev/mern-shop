import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    text-align: center;
    width: 100%;
    padding-top: 10px;
    h2 {
      font-size: 30px;
    }
    form {
      max-width: 20%;
      margin: 0 auto;
      input {
        display: block;
        width: 100%;
        margin-bottom: 10px;
        padding: 10px;
      }
    }
    a {
      &:hover {
        text-decoration: underline;
      }
    }
`


function ThankyouScreen(props) {
    return (
        <Container>
            <h2>Thank you</h2>
            <p>Your order has been successfully saved in our database.</p>
        </Container>
    )
}

export default ThankyouScreen