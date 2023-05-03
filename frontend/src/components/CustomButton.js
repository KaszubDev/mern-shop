import styled from 'styled-components';
import React from "react";

const Button = styled.button.attrs(props => ({
    onClick: props.onClick
}))`
  display: inline-block;
  cursor: pointer;
    background-color: #000;
    border: 1px solid #000;
    padding: 10px 15px;
    margin-top: 20px;
    border-radius: 50px;
    color: #fff;
    transition: all .25s ease-in-out;
    &:hover {
        background-color: #fff;
        color: #000;
    }
`

function CustomButton(props) {
    return (
        <Button onClick={props.onClick}>
            {props.text}
        </Button>
    )
}

export default CustomButton