import { useEffect, useState } from 'react';
import foto1 from '/img/fotos/foto1.jpg';
import foto2 from '/img/fotos/foto2.jpg';
import foto3 from '/img/fotos/foto3.jpg';
import foto4 from '/img/fotos/foto4.jpg';
import foto5 from '/img/fotos/foto5.jpg';
import foto6 from '/img/fotos/foto6.jpg';

const GaleriaFotos = () => {
    // Slider ****************************
  const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
    foto1,
    foto2,
    foto3,
    foto4,
    foto5,
    foto6
  ];

    // Cambiar imágenes automáticamente cada 3 segundos
      useEffect(() => {
        const interval = setInterval(() => {
          nextSlide();
        }, 3000); // Cambia cada 3 segundos
        return () => clearInterval(interval); // Limpia el intervalo
      }, [currentIndex]);
    
      const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      };
    
      const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      };

    return (
        <section className="fotos">
            <h2>Galería de fotos</h2>
            <div className="sliderContainer">
              <div className="slider">
                <div
                  className="slider-wrapper"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {images.map((img, index) => (
                    <img key={index} src={img} alt={`Foto ${index + 1}`} />
                  ))}
                </div>
                <div className="controls">
                  <button className="prev" onClick={prevSlide}>
                    ❮
                  </button>
                  <button className="next" onClick={nextSlide}>
                    ❯
                  </button>
                </div>
              </div>
            </div>      
        </section>
    )
}

export default GaleriaFotos;