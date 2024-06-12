// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
// addToCart : [],
// count : 1,
// isLoading : false,
// isError : false
// }

// const cartSlice = createSlice({
//     name : "cart",
//     initialState,
//     reducers:{
        
//         addCart : (state,action)=>{
//             if (state.addToCart.length === 0) {
//                 state.addToCart.push(action.payload)
//             } else {
//                 const indexNum = state.addToCart.findIndex((p)=>{
//                     if (p.id === action.payload.id) {
//                         return true
//                     }
//                 });
//                 console.log("indexNum of addtocart",indexNum);
//                 if (indexNum == -1) {
//                     state.addToCart.push(action.payload)
//                 }
//             }
//         },
//         removeAddToCart :(state,action)=>{
//             state.addToCart = state.addToCart.filter((prod)=>{
//                 prod.id !== action.payload.id
//             })
//         },
//         // updateQuantity :(state,action)=>{
//         //     const {id,quantity} = action.payload
//         //     const productToUptoDate = state.addToCart.find(product=>product.id === id)
//         //     if (productToUptoDate) {
//         //         productToUptoDate.quantity = quantity
//         //     }
//         // },
//         cartIncrement : (state,action)=>{
//             const indexNum = state.addToCart.findIndex((p)=>{
//                 if (p.id === action.payload) {
//                     return true
//                 }
//             });
//             console.log("indexNum of cartIncrement",indexNum);
//             if (indexNum === -1) {
//                 state.count = ++state.count
//                 console.log(state.count);
//             }
//         },
//         cartDecrement : (state,action)=>{
//             const indexNum = state.addToCart.findIndex((p)=>{
//                 if (p.id === action.payload) {
//                     return true
//                 }
//             })
//             if (indexNum === -1) {
//             state.count = --state.count
//             console.log(state.count);
//             }
//         }
//     }


// })

// const {actions,reducer} = cartSlice;
// export const {addCart,removeAddToCart,cartIncrement,cartDecrement}= actions

// export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addToCart: [],
  isLoading: false,
  isError: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      console.log(action.payload.data._id)
      const existingProductIndex = state.addToCart.findIndex(
        (p) => p.data._id === action.payload.data._idx
      );
      console.log(existingProductIndex)
      if (existingProductIndex === -1) {
        // If the product is not in the cart, add it with count = 1
        state.addToCart.push({ ...action.payload, count: 1 });
      } else {
        // If the product is already in the cart, increment its count
        state.addToCart[existingProductIndex].count += 1;
      }
    },
    removeAddToCart: (state, action) => {
      console.log(action.payload)
      state.addToCart = state.addToCart.filter(
        (prod) => prod.data._id !== action.payload._id
      );
    },
    cartIncrement: (state, action) => {
      const product = state.addToCart.find((p) => p.data._id === action.payload);
      if (product) {
        product.count += 1;
      }
    },
    cartDecrement: (state, action) => {
      const product = state.addToCart.find((p) => p.data._id === action.payload);
      if (product && product.count > 1) {
        console.log(product.count)
        product.count -= 1;
      }
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addCart, removeAddToCart, cartIncrement, cartDecrement } = actions;

export default reducer;