import axios from 'axios'
import { setValidationCustomResult, setValidationResult } from './index'

/**
 * ACTION TYPES
 */
const ALGORITHM_VALIDATION_INPUT = 'ALGORITHM_VALIDATION_INPUT'

/**
 * INITIAL STATE
 */
const defaultInput = ''

/**
 * ACTION CREATORS
 */
export const getAlgorithmValidationInput = input => ({ type: ALGORITHM_VALIDATION_INPUT, input })

/**
 * THUNK CREATORS
 */
export const postAlgorithmValidationInput = (submission, user) => {
    return function thunk(dispatch) {
        return axios
            .post(`/api/algorithm-validation/${submission.language}`, {
                submission,
                user
            })
            .then(res => {
                const results = res.data
                return Promise.all([
                    new Promise(resolve => {
                        resolve(dispatch(setValidationResult(results.rawOutput)))
                    }),
                    new Promise(resolve => {
                        resolve(dispatch(setValidationCustomResult(results.testCasesArr)))
                    })
                ]).then(() => {
                    return results.testCasesArr
                })
            })
            .catch(console.error)
    }
}


/**
 * REDUCER
 */
export default function (state = defaultInput, action) {
    let newState = Object.assign('', state)
    switch (action.type) {
        case ALGORITHM_VALIDATION_INPUT:
            newState = action.input
            return newState

        default:
            return state
    }
}
