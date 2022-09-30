const { bindActionCreators } = require('redux')
const redux = require('redux')

const CAKE_ORDERED = 'CAKE_ORDERED'

const CAKE_RESTORED = 'CAKE_RESTORED'

const initialState = {
    noOfCakes: 25
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

const reducer = (state = initialState, action) => {
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


const store = redux.createStore(reducer)


console.log('initial state ', store.getState());

let unsubscriber = store.subscribe(() => {
    console.log('updated state ', store.getState());
});

const actions = bindActionCreators({orderCake , reStockCake} , store.dispatch)

actions.orderCake()
actions.orderCake()
actions.reStockCake(9)
actions.orderCake()
actions.orderCake()

unsubscriber()