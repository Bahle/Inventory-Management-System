import { ADD_PRODUCT, MODIFY_PRODUCT, ENTER_INFO } from '../constants'
// import { v4 } from 'uuid'

export const addProduct = (id, productId, name, quantity, cost) =>
    ({
        type: ADD_PRODUCT,
        id,
        productId,
        name,
        quantity,
        cost,
        timestamp: new Date().toString()
    })

export const modifyProduct = (id, productId, name, quantity, cost) =>
({
    type: MODIFY_PRODUCT,
    id,
    productId,
    name,
    quantity,
    cost
})

export const enterInfo = (supplier, date, invoice) =>
    ({
        type: ENTER_INFO,
        supplier,
        date,
        invoice
    })