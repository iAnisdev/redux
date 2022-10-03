const { createStore, bindActionCreators, applyMiddleware } = require('redux')
const { logger } = require('redux-logger')
const ReduxThunk = require('redux-thunk').default
const { produce } = require('immer')
const axios = require('axios')
const initialState = {
    loading: false,
    todos: [],
    error: null
}

const TODOS_REQUESTED = 'TODOS_REQUESTED'
const TODOS_FETCHED = 'TODOS_FETCHED'
const TODOS_ERROR = 'TODOS_ERROR'

const API_URL = 'https://jsonplaceholder.typicode.com'

function TodosRequested() {
    return {
        type: TODOS_REQUESTED
    }
}

function TodosFetched(data) {
    return {
        type: TODOS_FETCHED,
        payload: data
    }
}


function TodosFailed(error) {
    return {
        type: TODOS_ERROR,
        payload: error
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case TODOS_REQUESTED:
            return produce(state, (draft) => {
                draft.loading = true
                draft.error = null
                draft.todos = []
            })

        case TODOS_FETCHED:
            return produce(state, (draft) => {
                draft.loading = false
                draft.error = null
                draft.todos = action.payload
            })


        case TODOS_ERROR:
            return produce(state, (draft) => {
                draft.loading = false
                draft.error = action.payload
                draft.todos = []
            })
    }
}

const fetchTodo = () => {
    console.log('called')
    return (dispatch) => {
        dispatch(TodosRequested)
        axios.get(`${API_URL}/todos`).then((response) => {
            const todos = response.data
            dispatch(TodosFetched(todos))
        }).catch((error) => {
            dispatch(TodosFailed({message: error.message}))
        })
    }
}
// const createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger)(createStore);

const store = createStore(reducer, applyMiddleware(ReduxThunk))

const actions = bindActionCreators({ TodosRequested, TodosFetched, TodosFailed }, store.dispatch)

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
});

store.dispatch(fetchTodo())

// unsubscribe()