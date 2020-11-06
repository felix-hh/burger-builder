import React from "react"
import Button from "../../UI/Button/Button"
//import classes from "./OrderSummary.module.css"

class OrderSummary extends React.Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((item, index) => {
            return (<li key={item}>
                <span style={{ textTransform: "capitalize" }}>{item}</span> : {this.props.ingredients[item]}
            </li>)
        })

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total price: <strong>${this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType={"Danger"} onClick={() => this.props.cancel()}>CANCEL</Button>
                <Button btnType={"Success"} onClick={this.props.finish}>CONTINUE</Button>
            </React.Fragment>
        )
    }
}

export default OrderSummary