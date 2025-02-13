import '../styles/ComentarioModal.css'
import React, { ChangeEvent, useState } from 'react'
import iconSubir from '/public/img/icon-subir.png'

interface comentarioModalProps{
  modalComentario: boolean;
  setModalComentario: (cancelar: boolean) => void;
}

interface formDataValues{
  imagen: File | null;
  rating: number;
  titulo: string;
  texto: string;
}

const ComentarioModal: React.FC<comentarioModalProps> = ({modalComentario, setModalComentario}) => {

  const cerrarModalComentario = () => {
    setModalComentario(false);
    document.body.style.overflow = 'auto'
  }

  // visualizar imagen en el input
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [errorImage, setErrorImage] = useState<string | null>(null)

  const handleChangeImage = (e:ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file){

      const extensionesPermitidas = ['image/jpeg','image/png','image/jpg'];

      if(!extensionesPermitidas.includes(file.type)){
        setErrorImage('Formato no valido. Solo se permiten imágenes JPG, JPEG o PNG');
        setPreviewImage(null);
        return;
      }

      setErrorImage(null); //Si el formato es valido
      const image = URL.createObjectURL(file);
      setPreviewImage(image);
      setFormData((prevData) => ({
        ...prevData,
        imagen: file,
      }));
    }
  }

  const quitarImagen = () => {
    setPreviewImage(null)
    setErrorImage(null)
    setFormData((prevData) => ({
      ...prevData,
      imagen: null,
    }));
  }

  const [formData, setFormData] = useState<formDataValues>({
    imagen: null,
    rating: 0,
    titulo: '',
    texto: ''
  })
  // console.log(formData.imagen)

  // Guardar datos del formulario 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData,
      [e.target.name]:[e.target.value]
    })
  }

  const handleRatingChange = (value: number) => {
    setFormData({
      ...formData,
      rating: value,
    });
  }


  // Enviar datos a la base de datos
  const postComments = async () => {
    // e: FormEvent<HTMLFormElement>
    // e.preventDefault()

    // Creamos un objeto vacio (FormData() es una funcion) para construir conjunto de pares clave/valor para enviar datos de formulario, especialmente para archivos
    const formDataToSend = new FormData();
    if(formData.imagen){
      formDataToSend.append("imagen", formData.imagen);
    }
    formDataToSend.append("rating", String(formData.rating));
    formDataToSend.append("titulo", formData.titulo);
    formDataToSend.append("texto", formData.texto);

    try{
      const response = await fetch('https://isladent-backend.onrender.com/api/comentarios',{
        method: 'POST',
        body : formDataToSend,
      });

      if(!response.ok){
        console.log('Hubo un error al conectarse con el servidor');
        
      }

      console.log('Formulario enviado con exito al servidor');

      // Cerrar modal al enviar el formulario 
      // cerrarModalComentario();
      // setFormData({
      //   ...formData,
      //   imagen: null,
      //   rating: 0,
      //   titulo: '',
      //   texto: '',

      // })

    }catch(error){
      console.error('Hubo un error al enviar el formulario a la base de datos', error);
    }
  }

  return (
    <>
      <div className={`ventanaComentario ${modalComentario ? 'ventanaComenOpen' : ''}`}>
        <div className="comentarioModalConteiner">
          <form action="" className='comentarioModalForm' onSubmit={postComments}>
            <label htmlFor="">Imagen (opcional)</label>
            <div className='inputFile'>
              <input type="file" onChange={handleChangeImage}/> 
              {previewImage ?
              <>
                <img src={previewImage} className='imgPreview' alt="" /> 
                <button className='btnQuitImage' onClick={quitarImagen}>X</button>
              </> :
              <>
                <img src={iconSubir} alt="" className='iconSubirImage' />
                <p>Subir imagen</p>             
              </>}
               {errorImage && <p className='errorText'>{errorImage}</p>}
            </div>

            <label htmlFor="">Calificación</label>
            <div className='inputRadio' >
            {[...Array(5)].map((_,index)=>(
              <React.Fragment key={index} >
                <input type="radio" name='rating' id={`start${5 - index}`} value={5 - index} onChange={()=>handleRatingChange(5 - index)} required/>   
                <label htmlFor={`start${5 - index}`} >★</label>
              </React.Fragment>              
            ))}
            </div>
            
            
            <label htmlFor="">Titulo</label>
            <input type="text" name='titulo' value={formData.titulo} onChange={handleChange} required/>


            <label htmlFor="">Texto</label>
            <input type="text" name='texto' value={formData.texto} onChange={handleChange} required/>

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