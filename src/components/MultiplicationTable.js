import { useFetchAllProductTableQuery, useFetchAllProductTableFluxQuery, useFetchAllProductTableSSEFluxQuery } from "../store";
function MultiplicationTable() {

    let content;
    //const { data, error, isLoading } = useFetchAllProductTableQuery();
    const { currentData, error, isLoading } = useFetchAllProductTableSSEFluxQuery();

    console.log(currentData, error, isLoading);
    
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (error) {
        content = <div>Error: {error.message}</div>;
    } else if (currentData) {
        content = (
            <div>
                <div>data: {JSON.stringify(currentData)}</div>
            </div>
        );
    }

    //const  result = useFetchAllProductTableFluxQuery();

    //console.log("Flux => ", result, result.data, result.error, result.isLoading);

    //const  result1 = useFetchAllProductTableSSEFluxQuery();

    //console.log("Flux SSE => ", result1, result1.data, result1.error, result1.isLoading);

    return (
        <>
            <div>MultiplicationTable</div>
            <div>{content}</div>
        </>
    );
}

export default MultiplicationTable;