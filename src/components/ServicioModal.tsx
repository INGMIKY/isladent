import { useContext } from 'react';
import '../styles/ServicioModal.css';
import { GlobalContext } from '../context/GlobalContext';



const ServicioModal= () =>{

    

    const {modalServicio, setModalServicio} = useContext(GlobalContext) ?? {}; //operador de encadenamiento opcional

    const cerrarServicioModal = () =>{
        if(setModalServicio){
            setModalServicio(false);
            document.body.style.overflow = 'auto';
        }else{
            console.error('El contaxto no está inicializando correctamente');
        }
    }

    // Extración del globalContext - servicioSeleccionado
    const {servicioSeleccionado} = useContext(GlobalContext) ?? {};
    
    return (
        <>
            <div className={`ventanaServicioModal ${modalServicio ? 'servicioModalOpen' : ''}`}>

                <div className='servicioModalConteiner'>
                    <h3 className='tituloServicioModal'>{servicioSeleccionado?.titulo}</h3>
                    <p className='textoServicioModal'>{servicioSeleccionado?.texto}</p>
                    <button className='botonCancelarServicio' onClick={cerrarServicioModal}>Cerrar</button>
                </div>
            </div>
        </>
    );
}

export default ServicioModal;