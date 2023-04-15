import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { connect } from 'react-redux';

const productTableFluxApi = createApi({
    reducerPath: 'productTableFlux',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:9090/reporting/router' 
    }),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        fetchAllProductTableFlux: builder.query({
            providesTags: ['AllProductTableFlux'],
            query: () => ({
                url: '/multiplication-table/mono/',
                method: 'GET'
            }),
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
                console.log('onCacheEntryAdded : ' + arg);
                const ws = new WebSocket('ws://localhost:9090/reporting/webflux/multiplication-table');
                try {
                    await cacheDataLoaded;

                    const listener = (event) => {
                        const data = JSON.parse(event.data);
                        console.log('onCacheEntryAdded : ' + data);
                       return updateCachedData((draft) => {
                            draft.push(data);
                        });
                    }

                    ws.addEventListener('message', listener);
                } catch (error) {
                    console.error(error);
            }
            await cacheEntryRemoved;
            console.log('onCacheEntryRemoved : ' + arg);

            ws.close();
        }
        }),
        fetchAllProductTableSSEFlux: builder.query({
            providesTags: ['AllProductTableSSEFlux'],
            queryFn() {
                return {data: []}
            },
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
                console.log('onCacheEntryAdded Flux : ' + arg + new Date());
                const es = new EventSource('http://localhost:9090/reporting/router/multiplication-table');
                try {
                    await cacheDataLoaded;
                    console.log('onCacheEntryAdded Flux : register listener ' + new Date());
                    es.addEventListener('message', (event) => {
                        console.log('onCacheEntryAdded Flux listener ::: ' + JSON.stringify(event.data) + new Date());
                        const data = JSON.parse(event.data);
                        return updateCachedData((draft) => {
                            draft.push(data);
                        });
                    });
                    es.addEventListener('open', ev => { console.log('onCacheEntryAdded Flux open : ' + ev.eventPhase +  new Date() + ' data : ' + JSON.stringify(ev.data));});
                    
                    es.addEventListener('error', ev => { 
                        console.log('onCacheEntryAdded Flux error : ' + ev.eventPhase + ' : msg : ' + ev.data);
                        if(ev.eventPhase === 2) {
                            console.log('Closing SSE : ' + ev.eventPhase);
                            es.close();
                        }
                    });
                    console.log('onCacheEntryAdded Flux : registered listener');
                    //es.close();
                } catch (error) {
                    console.error(error);
                }
                await cacheEntryRemoved;
                console.log('onCacheEntryRemoved Flux : ' + arg);

                es.close();

            }
        }),
    }),
});

export const { useFetchAllProductTableFluxQuery, useFetchAllProductTableSSEFluxQuery } = productTableFluxApi;
export { productTableFluxApi };