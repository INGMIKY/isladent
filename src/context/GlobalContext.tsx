import { createContext, useState, ReactNode } from "react";

interface GlobalContextProps{
    modalServicio: boolean;
    setModalServicio: (open: boolean) => void;
    servicioSeleccionado: servicioProps | null;
    setServicioSeleccionado: (servicio: servicioProps | null) => void;
}

interface servicioProps{
    id: number,
    titulo: string,
    texto: string;
}



export const GlobalContext = createContext<GlobalContextProps | null>(null); // Se crea el contexto

interface GlobalContextProviderProps{
    children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({children}) =>{
    const [modalServicio, setModalServicio] = useState(false);
    const [servicioSeleccionado, setServicioSeleccionado] = useState<servicioProps | null>(null)
    
    
    

    return(
        <GlobalContext.Provider value={{ modalServicio, setModalServicio, servicioSeleccionado, setServicioSeleccionado}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;