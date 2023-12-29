import { ADD_PRODUCT, MODIFY_PRODUCT, ENTER_INFO } from '../constants'
// import { v4 } from 'uuid'

export const addProduct = (id, productId, name, quantity, markUp) =>
    ({
        type: ADD_PRODUCT,
        id,
        productId,
        name,
        quantity,
        markUp,
        timestamp: new Date().toString()
    })

export const modifyProduct = (id, productId, name, quantity, markUp) =>
({
    type: MODIFY_PRODUCT,
    id,
    productId,
    name,
    quantity,
    markUp
})

export const enterInfo = (destination, date) =>
    ({
        type: ENTER_INFO,
        destination,
        date
    })