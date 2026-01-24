export default function ProductCard(props){

    return(
        <div>
            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <button>Add to Cart</button>
        </div>
    )

} 