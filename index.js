const { createStore, bindActionCreators, combineReducers, applyMiddleware } = require('redux')
const logger  = require('redux-logger')
const CAKE_ORDERED = 'CAKE_ORDERED'

const CAKE_RESTORED = 'CAKE_RESTORED'

const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'

const ICE_CREAMRE_RESTORED = 'ICE_CREAMRE_RESTORED'

const CakeInitialState = {
    noOfCakes: 25
}


const iceCreamnitialState = {
    noOfIceCream: 25
}

function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

function reStockCake(quantity) {
    return {
        type: CAKE_RESTORED,
        quantity: quantity
    }
}


function orderIceCream() {
    return {
        type: ICE_CREAM_ORDERED,
        quantity: 1
    }
}

function reStockIceCream(quantity) {
    return {
        type: ICE_CREAMRE_RESTORED,
        quantity: quantity
    }
}

const cakeReducer = (state = CakeInitialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                noOfCakes: state.noOfCakes - action.quantity
            }
        case CAKE_RESTORED:
            return {
                ...state,
                noOfCakes: state.noOfCakes + action.quantity
            }
        default:
            return state
    }

}

const iceCreamReducer = (state = iceCreamnitialState, action) => {
    switch (action.type) {
        case ICE_CREAM_ORDERED:
            return {
                ...state,
                noOfIceCream: state.noOfIceCream - action.quantity
            }
        case ICE_CREAMRE_RESTORED:
            return {
                ...state,
                noOfIceCream: state.noOfIceCream + action.quantity
            }
        default:
            return state
    }

}


const store = createStore(combineReducers({
    cake: cakeReducer,
    icecream: iceCreamReducer
}) , applyMiddleware(logger.createLogger()))


const actions = bindActionCreators({ orderCake, reStockCake, orderIceCream, reStockIceCream }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.reStockCake(9)
actions.orderCake()
actions.orderCake()
actions.orderIceCream()
actions.orderIceCream()
actions.reStockIceCream(5)
actions.orderIceCream()
actions.orderIceCream()