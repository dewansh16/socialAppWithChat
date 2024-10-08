import Tooltip from 'react-power-tooltip'
import React, { useState } from 'react'



export const BottomLeft = (props)=>{
    return(
        <Tooltip
            show={props.show}
            backgroundColor='#242424'
            hoverBackground='#242424'
            color='#fff'
            hoverColor="#fff"
            position="bottom left"
            arrowAlign='end'
            textBoxWidth='auto'
            padding='8px 10px'
            flat
        >
            <p>{props.text}</p>
        </Tooltip>
    )
}

export const BottomCenter = (props)=>{
    return(
        <Tooltip
        show={props.show}
        backgroundColor='#242424'
        hoverBackground='#242424'
        color='#fff'
        hoverColor="#fff"
        position="bottom center"
        arrowAlign='center'
        textBoxWidth='auto'
        padding='8px 10px'
        flat
        >
            <p>{props.text}</p>
        </Tooltip>
    )
}

export const BottomRight = (props)=>{
    return(
        <Tooltip
        show={props.show}
        backgroundColor='#242424'
        hoverBackground='#242424'
        color='#fff'
        hoverColor="#ff"
        position="bottom right"
        arrowAlign='start'
        textBoxWidth='auto'
        padding='8px 10px'
        flat
        >
            <p>{props.text}</p>
        </Tooltip>
    )
}


