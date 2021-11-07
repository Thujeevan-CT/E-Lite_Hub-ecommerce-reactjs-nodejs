export const cartReducer=(state={cartItems : []} , action)=>{

    switch(action.type)
    {
        case 'ADD_TO_CART' : 
        const alreadyexist = state.cartItems.find(item => item.productid == action.payload.productid)

        if(alreadyexist)
        {
            return {
                ...state ,
                cartItems : state.cartItems.map((item) => item.productid == action.payload.productid ? action.payload : item)
            }
        }
        else{
            return {
                ...state ,
                cartItems : [...state.cartItems , action.payload]
         }
        }

        case 'DELETE_FROM_CART' : return{
            ...state,
            cartItems: state.cartItems.filter(item => {return item.productid !== action.payload.productid})
        }

        default : return state
    }
}


