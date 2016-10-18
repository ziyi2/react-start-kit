import CONST from '../constants/actionType'

export default function counter(state = 0, action) {
    switch (action.type) {
        case CONST.INCREMENT_COUNTER:
            return state + 1;
        case CONST.DECREMENT_COUNTER:
            return state - 1;
        default:
            return state
    }
}

