import '../styles/ComentarioModal.css'
import React from 'react'
import iconSubir from '/public/img/icon-subir.png'

interface comentarioModalProps{
  modalComentario: boolean;
  setModalComentario: (cancelar: boolean) => void;
}


const ComentarioModal: React.FC<comentarioModalProps> = ({modalComentario, setModalComentario}) => {

  const cerrarModalComentario = () => {
    setModalComentario(false);
    document.body.style.overflow = 'auto'
  }



  return (
    <>
      <div className={`ventanaComentario ${modalComentario ? 'ventanaComenOpen' : ''}`}>
        <div className="comentarioModalConteiner">
          <form action="" className='comentarioModalForm'>
            <label htmlFor="">Imagen</label>
            <div className='inputFile'>
              <img src={iconSubir} alt="" />
              <p>Subir imagen</p>
              <input type="file" /> 
            </div>

            <label htmlFor="">Calificación</label>
            <div className='inputRadio' >
            {[...Array(5)].map((_,index)=>(
              <React.Fragment key={index}>
                <input type="radio" name='rating' id={`start${5 - index}`} value={5 - index} />   
                <label htmlFor={`start${5 - index}`} >★</label>
              </React.Fragment>              
            ))}
            </div>
            
            
            <label htmlFor="">Titulo</label>
            <input type="text" />


            <label htmlFor="">Texto</label>
            <input type="text" />

            <div className='botonesComentarioModal'>
              <button type='reset' onClick={cerrarModalComentario}>Cancelar</button>
              <button>Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ComentarioModal;