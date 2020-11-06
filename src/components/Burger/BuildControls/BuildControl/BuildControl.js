import classes from "./BuildControl.module.css"
import React from "react"

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.deleted}
            disabled={props.disabled}>
            Less
        </button>
        <button
            className={classes.More}
            onClick={props.added}
            >
            More
        </button>
    </div>
)

export default BuildControl