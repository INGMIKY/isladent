import { useState } from "react";
import Testimonios from "./Testimonios";
import ComentarioModal from "./ComentarioModal";

const AgregarComentario = () => {


    // Modal Comentario

  const [modalComentario, setModalComentario] = useState(false)

  const abrirModalComentario = () => {
    setModalComentario(true);
    document.body.style.overflow = 'hidden';
  }

    return (
        <>
        <section className='comentarios'>
            <h2 className='comentariosTitulo'>Testimonios</h2>
            
            <Testimonios />
            <div className='addComentarioConteiner'>
                <button className='botonAddComentario' onClick={abrirModalComentario}>Agregar comentario</button>
            </div>
        </section>

        <ComentarioModal modalComentario={modalComentario} setModalComentario={setModalComentario}/>   
        </>
    )
}

export default AgregarComentario;