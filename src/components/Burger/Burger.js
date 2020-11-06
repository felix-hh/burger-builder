import React from "react"
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return [...Array(props.ingredients[igKey])].map(
                (_, i) => <BurgerIngredient key={igKey + i} type={igKey} />
            )
        })
    transformedIngredients = transformedIngredients.reduce((prev, curr) => {
        return prev.concat(curr)
    }, []) //This is just to flatten the array of arrays. Easy to check if empty. 

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger