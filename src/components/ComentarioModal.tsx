import React, { useEffect, useState } from 'react';
import '../styles/ComentarioModal.css';
import iconImagen from '/public/img/icon-imagen.png';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseConfig.ts';

interface ComentarioModalProps{
    modalComentario: boolean;
    setModalComentario: (open: boolean) => void;
}

interface Comentario {
    id: string;
    previewImage?: string | null;
    title: string;
    text: string;
    rating: number;
  }
  

const ComentarioModal: React.FC<ComentarioModalProps> = ({ modalComentario, setModalComentario}) => {


    const cerrarModalComentario = () => {
        setModalComentario(false);
        document.body.style.overflow = 'auto';
        setFormData({
            image:null,
            previewImage: null,
            rating: 0,
            title: '',
            text: '',
        }); 
    }

    // Para visualizar la imagen en el input 
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
    
        if (file) {
          const allowedExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    
          if (!allowedExtensions.includes(file.type)) {
            setError('Formato no válido. Solo se permiten imágenes JPG, JPEG o PNG.');
            setFormData({ ...formData, image: null, previewImage: null });
            return;
          }
    
          setError(null); // Limpiar errores si el archivo es válido
          const imageUrl = URL.createObjectURL(file);
          setFormData({ ...formData, image: file, previewImage: imageUrl });
        }
      };

      const handleRemoveImage = () => {
        setFormData({ ...formData, image: null, previewImage: null });
      };

      const handleRatingChange = (rating: number) => {
        setFormData({ ...formData, rating });
      };

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          let imageUrl = null;
    
          if (formData.image) {
            imageUrl = await handleFileUpload(formData.image); // Subir imagen
          }
    
          const comentarioData = {
            ...formData,
            previewImage: imageUrl, // Guardar la URL de la imagen subida
          };
    
          const comentariosRef = ref(db, 'comentarios');
          await push(comentariosRef, comentarioData); // Guardar el comentario en Realtime Database
          alert('Comentario agregado correctamente');
          cerrarModalComentario();
        } catch (error) {
          console.error('Error al agregar comentario:', error);
        }
      };

    //   Guardar los datos ingresados
    const [formData, setFormData] = useState({
        image: null as File | null,
        previewImage: null as string | null,
        rating: 0,
        title: '',
        text: '',
      });


      
    // Obtener los comentarios de la base de datos firebase
    const [comentarios, setComentarios] = useState<Comentario[]>([]);

    useEffect(() => {
        const comentariosRef = ref(db, 'comentarios');
        onValue(comentariosRef, (snapshot) => {
          const fetchedComentarios: Comentario[] = [];
          snapshot.forEach((childSnapshot) => {
            fetchedComentarios.push({
              id: childSnapshot.key || '',
              ...childSnapshot.val(),
            });
          });
          setComentarios(fetchedComentarios);
        });
      }, []);

      const handleFileUpload = async (file: File) => {
        const storage = getStorage();
        const fileRef = storageRef(storage, `comentarios/${file.name}`);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      };

    return (
        <>
            <div className={`ventanaComentarioModal ${modalComentario ? 'modalComentarioOpen' : ''}`}>
                <div className='comentarioModalConteiner'>
                    <form action="" onSubmit={handleSubmit} className='comentarioForm'>
                        <label htmlFor="image_uploads" className='comentarioFormLabel'>Imagen</label>
                        <div className='inputComentarioImgContainer'>
                            <input type="file"  name='image_uploads' accept='.jpg, .jpeg, .png' className='inputComentarioImg' onChange={handleFileChange} />         
                            {formData.previewImage ? (
                                <>
                                <img src={formData.previewImage || ''} alt="Vista previa" className='previewImage' />
                                <button type="button" onClick={handleRemoveImage} className="removeButton">x</button>
          
                                </>
                                ): 
                                
                                (
                                    <>
                                        <img src={iconImagen} alt="" />
                                        <p>Ingrese la imagen aquí</p>
                                    </>
                                )}   
                            {error && <p className='errorText'>{error}</p>}                                 
                        </div>
                        
                        <label htmlFor="hola" className='comentarioFormLabel'>Calificación</label>
                        <div className='comentarioEstrellas'>
                            {[...Array(5)].map((_,index)=>(
                                <React.Fragment key={index}>
                                    <input type="radio" name='rating' id={`star${5 - index}`} value={5 - index} checked={formData.rating === 5 - index} onChange={() => handleRatingChange(5 - index)}/>
                                    <label htmlFor={`star${5 - index}`} className='estrella'>★</label>
                                </React.Fragment>
                            ))}
                        </div>

                        <label htmlFor="" className='comentarioFormLabel'>Titulo</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                        
                        <label htmlFor="" className='comentarioFormLabel'>Texto</label>
                        <input type="text" name="text" value={formData.text} onChange={handleInputChange} />

                        <div className='comentarioBotonesForm'>
                            <button type='reset' className='comentarioBotonCancelar' onClick={cerrarModalComentario}>Cancelar</button>
                            <button type='submit' className='comentarioBotonEnviar'>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ComentarioModal;