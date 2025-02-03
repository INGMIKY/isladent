import '../styles/ComentarioModal.css'
import React from 'react'
import iconImg from '/public/img/icon-imagen.png'
import iconSubir from '/public/img/icon-subir.png'

const ComentarioModal = () => {
  return (
    <>
      <div className="ventanaComentario">
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
            {[...Array(5)].map((_,i)=>(
              <React.Fragment key={i}>
                <input type="radio" name='rating' />   
                <label htmlFor="">★</label>
              </React.Fragment>              
            ))}
            </div>
            
            
            <label htmlFor="">Titulo</label>
            <input type="text" />


            <label htmlFor="">Texto</label>
            <input type="text" />
          </form>
        </div>
      </div>
    </>
  )
}

export default ComentarioModal;