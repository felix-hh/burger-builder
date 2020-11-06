import React from "react"
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => (
            {showSideDrawer: !prevState.showSideDrawer}
        ))
    }
    render() { 
        return (
        <React.Fragment>
            <Toolbar 
            toggleSideDrawer={this.sideDrawerToggleHandler}/>
            <SideDrawer 
            open={this.state.showSideDrawer} 
            setClose={() => this.sideDrawerClosedHandler()}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
        )
    }
}

export default Layout