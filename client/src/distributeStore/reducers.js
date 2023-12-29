import { ADD_PRODUCT, MODIFY_PRODUCT, ENTER_INFO } from '../constants';

export const product = (state = {}, action) => {
    console.log('comparing: ' + state.id + ' with ' + action.id + ' => ' + (state.id !== action.id));

    switch (action.type) {
        case ADD_PRODUCT:
            return {
                id: action.id,
                productId: action.productId,
                name: action.name,
                quantity: action.quantity,
                markUp: action.markUp,
                timestamp: action.timestamp
            }
        case MODIFY_PRODUCT:
            return (state.id !== action.id) ?
	        	state :
	        	{
		        	...state,
                    productId: action.productId,
		        	name: action.name,
	                quantity: action.quantity,
	                markUp: action.markUp
	        	}
        default :
            return state
    }
}

export const products = (state = [], action) => {
    switch (action.type) {
        case ADD_PRODUCT :
            return [
                ...state,
                product({}, action)
            ]
        case MODIFY_PRODUCT:
        	return state.map(
        		p => product(p, action)
        	)
        default:
            return state
    }
}

export const info = (state = {}, action) => {
    switch (action.type) {
        case ENTER_INFO:
            return {
            	date: action.date,
            	destination: action.destination
            }
        default :
            return state
    }
}