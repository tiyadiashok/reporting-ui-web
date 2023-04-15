import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { multiplicationFormReducer, changeMultiplicand, changeLimit } from "./slices/multiplicationFormSlice";
import { searchMultiplicandReducer, changeSearchMultiplicand } from "./slices/searchMultiplicandSlice";
import { productTableApi } from "./apis/productTableApi";
import { productTableFluxApi } from "./apis/productTableFluxApi";

export const store = configureStore({
    reducer: {
        multiplicationForm: multiplicationFormReducer,
        searchMultiplicand: searchMultiplicandReducer,
        [productTableApi.reducerPath]: productTableApi.reducer,
        [productTableFluxApi.reducerPath]: productTableFluxApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(productTableApi.middleware)
    .concat(productTableFluxApi.middleware)
});

setupListeners(store.dispatch);

export { useFetchAllProductTableQuery } from "./apis/productTableApi";
export { useFetchAllProductTableFluxQuery , useFetchAllProductTableSSEFluxQuery} from "./apis/productTableFluxApi";
export { changeMultiplicand, changeLimit, changeSearchMultiplicand };