import React from 'react'
import "../../../utils/styles/global.css";

function Button(props) {
    return (
        <button className="button secondary" onClick={props.onClick} >{props.text}</button>

    )
};
export default Button;