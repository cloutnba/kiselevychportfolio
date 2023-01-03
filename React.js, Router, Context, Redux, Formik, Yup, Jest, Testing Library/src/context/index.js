import {createContext, useState} from "react";


export const ItemContext = createContext({});

const ItemProvider = ({children}) => {
    const [isColumn, setIsColumn] = useState(false);

    const toggleIsColumn = () => setIsColumn(!isColumn);

    return (
        <ItemContext.Provider value={{isColumn, toggleIsColumn}}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemProvider;
