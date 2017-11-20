import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import algorithmInput from './algorithm-input'
import questions from './questions'
import categories from './categories'
import difficulties from './difficulties'
import testResult from './testResult'


const reducer = combineReducers({ user, algorithmInput, questions, categories, testResult, difficulties })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './algorithm-input'
export * from './questions'
export * from './categories'
export * from './testResult'
export * from './difficulties'

