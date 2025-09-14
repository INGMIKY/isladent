import estrella from '/public/img/fotos/estrella.png';
import { useState, useEffect} from 'react';
import { db } from '../firebase';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

import fc1 from '/public/img/fotos/fc1.png';

interface testimoniosProps{
  id: string;
  img?: string;
  rating: number;
  titulo: string;
  comentario: string;
}




// console.log(dataComentarios);

const Testimonios = () =>{

    const [activeIndex, setActiveIndex] = useState(0)

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? dataComentarios.length - 1 : prevIndex - 1
        );
      };
    
      const handleNext = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === dataComentarios.length - 1 ? 0 : prevIndex + 1
        );
      };


  // Obtener comentarios de la base de datos 

  const [dataComentarios, setDataComentarios] = useState<testimoniosProps[]>([]);
  

  // const getComments = async () => {
  //   try{
  //     const response = await fetch('https://isladent-backend-production.up.railway.app/api/comentarios');
  //     const result = await response.json();

  //     const formattedData = result.map((comentario: any) => ({
  //       ...comentario,
  //       rating: parseInt(comentario.rating, 10) || 0, // Convertir a número o usar 0 si es inválido
  //     }));

  //     setDataComentarios(formattedData);
  //   }catch(error){
  //     console.log('Hubo con error al rescatar datos de la base de datos',error);
  //   }
  // };

  const getComments = () => {
    try{
      const newQuery = query(collection(db,'testimonios'), orderBy("createdAt", "desc"));

      const unsubcribe = onSnapshot(newQuery, (querySnapshot)=>{
          const currentComments: testimoniosProps[] = [];
          querySnapshot.forEach(item => {

            const data = item.data() as {titulo: string; comentario:string; rating:number; }

            currentComments.push({id: item.id, ...data})
          })
          setDataComentarios(currentComments)
      })
      return unsubcribe;
    }catch(error){
      console.error('Hubo un error al conectarse a la db', error)
    }
  }

  useEffect(()=>{
    getComments();
  },[])
    
  // console.log(dataComentarios)

    return (
        <>
    <div className="comentariosConteiner">
      <div
        className="comentariosSlider"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`, // Desplaza el slider según el índice activo
        }}
      >
        {dataComentarios.map((testimonio, index) => (
          <div className="comentariosSlide" key={index}>
            <div className="comentariosImagen">
              <img src={`${testimonio.img ? `https://isladent-backend-production.up.railway.app${testimonio.img}` : fc1}`} alt="" />
            </div>
            <div className="comentariosTestimonio">
              <div className="comentariosEstrellas">
                {[...Array(testimonio.rating)].map((_,index)=>(
                  <img src={estrella} key={index} alt="" />
                ))}
              </div>
              <h3 className="comentariosTitulo">{testimonio.titulo}</h3>
              <p className="comentariosTexto">{testimonio.comentario}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="comentariosControles">
      <button onClick={handlePrev}>⟵</button>
      <div className="comentariosPuntos">
        {dataComentarios.map((_, index) => (
          <span
            key={index}
            className={`punto ${index === activeIndex ? 'activo' : ''}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
      <button onClick={handleNext}>⟶</button>
    </div>



  </>
    );
}

export default Testimonios;