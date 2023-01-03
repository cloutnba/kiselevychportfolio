import Header from "../Header";

function PageWrapper({children}) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    return(
        <>
            <Header cart={cart.length} favorites={favorites.length}/>
            {children}
        </>
    )
}

export default PageWrapper;
