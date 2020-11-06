import React, { Component } from "react"
import Burger from "../../components/Burger/Burger"
import Auxiliary from "../../hoc/Auxiliary/Auxiliary"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.4
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4.0,
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }
    componentDidMount() {
        axios.get("/ingredients.json")
            .then(response => {
                this.setState({ ingredients: { ...response.data }, 
                    totalPrice: (
                        Object.keys(response.data).map((item, index, array)=> {
                            return (
                                response.data[item]*INGREDIENT_PRICES[item]
                            )
                        })
                        .reduce((prev, curr) => {return(prev + curr)}, 4)
                    )
                })
            
            })
            .catch(error => {
                this.setState({error: true})
            })
    }
    updatePurchaseableState = (ingredients) => {
        const sum = Object.values(ingredients).reduce((prev, curr) => prev + curr, 0)
        this.setState({ purchaseable: sum >= 1 })
    }
    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }
    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false })
    }

    finishPurchasingHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: { ...this.state.ingredients },
            price: this.state.totalPrice,
            customer: {
                name: "John Smith",
                address: {
                    street: "Testie St",
                    zipcode: 33333,
                    country: "Spain"
                }
            },
            email: "test@test.com",
            deliveryMethod: "fastest",
            timestamp: String(Date.now()) //miliseconds
        }
        axios.post("/orders.json", order)
            .then(response => {
                console.log(response)
                this.setState({ loading: false })
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseableState(updatedIngredients)
    }

    deleteIngredientHandler = type => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            alert("There is no " + type + " to remove")
            return null
        }
        const newCount = oldCount - 1
        const newIngredients = { ...this.state.ingredients }
        newIngredients[type] = newCount
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState({ ingredients: newIngredients, totalPrice: newPrice })
        this.updatePurchaseableState(newIngredients)
    }

    render = () => {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let burger = this.state.ingredients ? (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={type => this.addIngredientHandler(type)}
                    ingredientDeleted={type => this.deleteIngredientHandler(type)}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchasingHandler}
                />
            </React.Fragment>
        ) : <Spinner/>

        burger = this.state.error? <p>Items can't be loaded</p>: burger
        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    cancel={this.cancelPurchasingHandler}>
                    {this.state.loading ? <Spinner /> :
                        <OrderSummary
                            ingredients={this.state.ingredients || {salad:0}}
                            cancel={this.cancelPurchasingHandler}
                            finish={this.finishPurchasingHandler}
                            totalPrice={this.state.totalPrice} />
                    }
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)