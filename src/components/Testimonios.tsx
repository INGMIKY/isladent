import estrella from '/public/img/fotos/estrella.png';
import { useState} from 'react';

import fc1 from '/public/img/fotos/fc1.png';
import fc2 from '/public/img/fotos/fc2.jpg';
import fc3 from '/public/img/fotos/fc3.jpg';

const testimonios = [
    {
        imagen: `${fc1}`,
        titulo: 'Excelente servicio',
        texto: 'La verdad me encontraba muy nervioso por ser la primera vez en acudir, sin embargo, el personal se encarga de relajarte y hacerte sentir súper cómodo. La atención brindada por los profesionales, Javier Alvarez y el doctor José Alfredo fue muy atenta y respetuosa.'
    },
    {
        imagen: `${fc2}`,
        titulo: 'Un cambio transformador',
        texto: 'La experiencia fue increíble. Llegué con múltiples problemas dentales y salí con una sonrisa completamente renovada. El equipo médico mostró una precisión y profesionalismo que me dejaron completamente impresionado.'
    },
    {
        imagen: `${fc3}`,
        titulo: 'Más allá de mis expectativas',
        texto: 'No solo resolvieron mi problema dental, sino que me educaron sobre el cuidado y mantenimiento. La atención personalizada y el compromiso con mi salud bucal fueron excepcionales. Definitivamente mi nueva clínica de cabecera.'
    },
        
    
]



const Testimonios = () =>{

    const [activeIndex, setActiveIndex] = useState(0)

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
        );
      };
    
      const handleNext = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === testimonios.length - 1 ? 0 : prevIndex + 1
        );
      };


    

    return (
        <>
    <div className="comentariosConteiner">
      <div
        className="comentariosSlider"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`, // Desplaza el slider según el índice activo
        }}
      >
        {testimonios.map((testimonio, index) => (
          <div className="comentariosSlide" key={index}>
            <div className="comentariosImagen">
              <img src={testimonio.imagen} alt="" />
            </div>
            <div className="comentariosTestimonio">
              <div className="comentariosEstrellas">
                {[...Array(5)].map((_,index)=>(
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
        {testimonios.map((_, index) => (
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