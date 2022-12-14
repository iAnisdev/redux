const { createStore, bindActionCreators,  applyMiddleware } = require('redux')
const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name: 'Anis',
    email: 'abc@gmail.com',
    job: {
        title: 'Frontend',
        company: 'NFQ'
    }
}

const NAME_UPDATE = 'NAME_UPDATE'
const EMAIL_UPATE = 'EMAIL_UPATE'
const JOB_UPDATE = 'JOB_UPDATE'


function updateName(name) {
    return {
        type: NAME_UPDATE,
        value: name
    }
}

function updateEmail(email) {
    return {
        type: EMAIL_UPATE,
        value: email
    }
}

function updateJob({ title, company }) {
    return {
        type: JOB_UPDATE,
        value: { title, company }
    }
}

function customLoggerMiddleWare (store){
    return function (next){
        return function(action){
            console.log("Action called" , action)
            next(action)
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NAME_UPDATE:
            return produce(state, (draft) => {
                draft.name = action.value
            })
        case EMAIL_UPATE:
            return produce(state, (draft) => {
                draft.email = action.value
            })
        case JOB_UPDATE:
            return produce(state, (draft) => {
                draft.job = action.value
            })
        default:
            return state;
    }
}

const store = createStore(reducer , applyMiddleware(customLoggerMiddleWare))

const actions = bindActionCreators({updateName , updateEmail , updateJob} , store.dispatch)


actions.updateName('Max')
actions.updateEmail('Max@def.com')
actions.updateJob({title: 'fullstack' , company: 'line'})
