import estrella from '/public/img/fotos/estrella.png';
import { useState, useEffect} from 'react';

import fc1 from '/public/img/fotos/fc1.png';
// import fc2 from '/public/img/fotos/fc2.jpg';
// import fc3 from '/public/img/fotos/fc3.jpg';

// const testimonios = [
//     {
//         imagen: `${fc1}`,
//         titulo: 'Excelente servicio',
//         texto: 'La verdad me encontraba muy nervioso por ser la primera vez en acudir, sin embargo, el personal se encarga de relajarte y hacerte sentir súper cómodo. La atención brindada por los profesionales, Javier Alvarez y el doctor José Alfredo fue muy atenta y respetuosa.'
//     },
//     {
//         imagen: `${fc2}`,
//         titulo: 'Un cambio transformador',
//         texto: 'La experiencia fue increíble. Llegué con múltiples problemas dentales y salí con una sonrisa completamente renovada. El equipo médico mostró una precisión y profesionalismo que me dejaron completamente impresionado.'
//     },
//     {
//         imagen: `${fc3}`,
//         titulo: 'Más allá de mis expectativas',
//         texto: 'No solo resolvieron mi problema dental, sino que me educaron sobre el cuidado y mantenimiento. La atención personalizada y el compromiso con mi salud bucal fueron excepcionales. Definitivamente mi nueva clínica de cabecera.'
//     },
        
    
// ]

interface testimoniosProps{
  img: string;
  rating: number;
  titulo: string;
  texto: string;
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
  

  const getComments = async () => {
    try{
      const response = await fetch('https://isladent-backend.onrender.com/api/comentarios');
      const result = await response.json();

      const formattedData = result.map((comentario: any) => ({
        ...comentario,
        rating: parseInt(comentario.rating, 10) || 0, // Convertir a número o usar 0 si es inválido
      }));

      setDataComentarios(formattedData);
    }catch(error){
      console.log('Hubo con error al rescatar datos de la base de datos',error);
    }
  };

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
              <img src={`${testimonio.img ? `http://isladent-backend.onrender.com${testimonio.img}` : fc1}`} alt="" />
            </div>
            <div className="comentariosTestimonio">
              <div className="comentariosEstrellas">
                {[...Array(testimonio.rating)].map((_,index)=>(
                  <img src={estrella} key={index} alt="" />
                ))}
              </div>
              <h3 className="comentariosTitulo">{testimonio.titulo}</h3>
              <p className="comentariosTexto">{testimonio.texto}</p>
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