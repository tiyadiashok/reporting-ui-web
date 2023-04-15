import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productTableApi = createApi({
    reducerPath: 'productTable',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:9090/reporting/router' 
    }),
    endpoints: (builder) => ({
        fetchAllProductTable: builder.query({
            providesTags: ['AllProductTable'],
            query: () => ({
                url: '/multiplication-table/mono/',
                method: 'GET'
            })
        }),
    }),
});

export const { useFetchAllProductTableQuery } = productTableApi;
export { productTableApi };