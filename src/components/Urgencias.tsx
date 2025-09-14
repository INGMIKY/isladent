import { useState } from "react";
import iconoWhats from '/public/img/icono-whatsapp.png';
import UrgenciasModal from "./UrgenciasModal";


const Urgencias = () => {

    // urgencias modal ****************************
    
      const [modalUrgencias, setModalUrgencias] = useState(false)
    
      const abrirModalUrgencias = () =>{
        setModalUrgencias(true);
        document.body.style.overflow = 'hidden';
      }

    return (
        <>   
             <section className='sectionUrgencias'>
                <h2 className='tituloUrgencias'>Urgencias via Whatsapp</h2>
                <img className='enlaceUrgencias' src={iconoWhats} alt="Icono de Whatsapp" onClick={abrirModalUrgencias} />
                <span className='enlaceUrgencias' onClick={abrirModalUrgencias}>Presione aquí</span>
            </section>

            <UrgenciasModal modalUrgencias={modalUrgencias} setModalUrgencias={setModalUrgencias}/>
        </>
    )
}

export default Urgencias;