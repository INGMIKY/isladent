import '../styles/UrgenciasModal.css'
import advertencia from '/public/img/advertencia.png'
import React from 'react';

interface UrgenciasModalProps{
    modalUrgencias: boolean;
    setModalUrgencias: (open:boolean) => void;
}

const UrgenciasModal: React.FC<UrgenciasModalProps> = ({modalUrgencias, setModalUrgencias}) => {

    const cerrarModalUrgencias = () =>{
        setModalUrgencias(false)
        document.body.style.overflow = 'auto';
    }

    return (
        <>
            <div className={`ventanaUrgenciasModal ${modalUrgencias ? 'modalUrgenciasOpen' : ''}`}>
                <div className='urgenciasModalConteiner'>
                    <img src={advertencia} alt="Icono de advertencia" />
                    <h3>¿Estas seguro?</h3>
                    <p>Solamente para urgencias</p>
                    <div className='urgenciasBotonesConteiner'>
                        <button className='botonUrgenciasCancelar' onClick={cerrarModalUrgencias}>Cerrar</button>
                        <button className='botonUrgenciasAceptar'><a href="https://wa.me/9871120305" className='enlaceUrgencias'>Seguir</a></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UrgenciasModal;