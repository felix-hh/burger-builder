import React from "react"
import classes from "./SideDrawer.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Backdrop from "../../UI/Backdrop/Backdrop"

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer]
    props.open? attachedClasses.push(classes.Open) : attachedClasses.push(classes.Close)

    attachedClasses = attachedClasses.join(" ")

    return (
        <React.Fragment>
            <Backdrop show={props.open} cancel={() => props.setClose()}/>
        <div className={attachedClasses}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </React.Fragment>
    )
}

export default SideDrawer