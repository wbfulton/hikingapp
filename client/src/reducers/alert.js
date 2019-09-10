import { SET_ALERT, REMOVE_ALERT} from '../actions/types';
// holds these objects
const initialState = [];

// sets state of alert according to action called
// payload can be anything we send in
export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT: // returns state array + payload
            return [...state, payload];
        case REMOVE_ALERT: // removes specified alert
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}