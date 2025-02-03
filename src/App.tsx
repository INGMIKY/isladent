import { useState, useEffect, useRef, ChangeEvent } from 'react';
import './App.css'
import banner from '../public/img/banner.jpg'
import ContactoModal from './components/ContactoModal';
import Servicios from './components/Servicios';
import ServicioModal from './components/ServicioModal';
import cruzRoja from '../public/img/cruz.png';
import UrgenciasModal from './components/UrgenciasModal';
import iconoWhats from '../public/img/icono-whatsapp.png';
import Testimonios from './components/Testimonios';
import ComentarioModal from './components/ComentarioModal';


import foto1 from '../public/img/fotos/foto1.jpg';
import foto2 from '../public/img/fotos/foto2.jpg';
import foto3 from '../public/img/fotos/foto3.jpg';
import foto4 from '../public/img/fotos/foto4.jpg';
import foto5 from '../public/img/fotos/foto5.jpg';
import foto6 from '../public/img/fotos/foto6.jpg';


interface formData{
  nombre: string,
  telefono: string,
}
// import banner from '../src/img/banner.jpg'

function App() {

  // Slider ****************************
  const [currentIndex, setCurrentIndex] = useState(0);


  

  
  const images = [
    // "../public/img/fotos/foto1.jpg", 
    // "../public/img/fotos/foto2.jpg",
    // "../public/img/fotos/foto3.jpg",
    // "../public/img/fotos/foto4.jpg",
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



  // urgencias modal ****************************

  const [modalUrgencias, setModalUrgencias] = useState(false)

  const abrirModalUrgencias = () =>{
    setModalUrgencias(true);
    document.body.style.overflow = 'hidden';
  }




  // Contacto modal ****************************
  const [modalContacto, setModalContacto] = useState(false) 

  const abrirModalContacto = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); 

      // Validación personalizada
    if (!formData.nombre || !formData.telefono) {
      setModalContacto(false);
      return;
    }

    setModalContacto(true);
    document.body.style.overflow = 'hidden';
  }



  // Condicionales - formulario contacto ****************************
  const [formData, setFormData] = useState<formData>({
    nombre:'',
    telefono: '',
  })



  // Mensajes de errors del formulario ****************************
  const [errors, setErrors] = useState({
    mensaje: '',
  });

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    if (e.target.name === 'nombre') {
      if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
        setErrors((prev) => ({ ...prev, mensaje: 'Solo se permiten letras y espacios.' }));
        return;
      }
    }
    
    if (e.target.name === 'telefono') {
      if (!/^\d*$/.test(e.target.value)) {
        setErrors((prev) => ({ ...prev, mensaje: 'Solo se permiten números.' }));
        return;
      }
    }
    
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  // console.log(formdata)



  // Correo electronico - formulario contacto  ****************************
  const form = useRef<HTMLFormElement>(null); 


  // Modal Comentario

  const [modalComentario, setModalComentario] = useState(false)

  const abrirModalComentario = () => {
    setModalComentario(true)
    document.body.style.overflow = 'hidden'
  }

  

  return (
    <>
    
      <nav>
        
      </nav>

      <header>
        <img className='banner-img' src={banner} alt="" />
      </header>

      

      <div className='sectionConteiner'>
          <section className='ubicacion'>
            <h2>Ubicación</h2>
            <span className='textoNota'>Para más información amplie el mapa</span>
            <div className='mapa'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d576.0900973328787!2d-86.95103803892285!3d20.498755663439074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e590f2cf2e8d5%3A0x593c68e33c6797e5!2sClinica%20Dental%20Isladent!5e0!3m2!1ses!2smx!4v1735152738106!5m2!1ses!2smx" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
          </section>

          <section className='horarios'>
            <h2>Horarios</h2>
            <table>
              <thead>
                <th>Día</th>
                <th>Horario</th>
              </thead>
              <tbody>
                <tr>
                  <td>Lunes</td>
                  <td>9:00 - 13:00 y 17:00 - 21:00</td>
                </tr>
                <tr>
                  <td>Martes</td>
                  <td>9:00 - 13:00 y 17:00 - 21:00</td>
                </tr>
                <tr>
                  <td>Miercoles</td>
                  <td>9:00 - 13:00 y 17:00 - 21:00</td>
                </tr>
                <tr>
                  <td>Jueves</td>
                  <td>9:00 - 13:00 y 17:00 - 21:00</td>
                </tr>
                <tr>
                  <td>Viernes</td>
                  <td>9:00 - 13:00 y 17:00 - 21:00</td>
                </tr>
                <tr>
                  <td>Sábado</td>
                  <td>9:00 - 13:00 y 17:00 - 21:00</td>
                </tr>
                <tr>
                  <td>Domingo</td>
                  <td className='campoUrgencias'> <p className='textoUrgencias'>SOLO URGENCIAS </p><img className='imgCruzRoja' src={cruzRoja} alt="" /></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className='sectionUrgencias'>
            <h2 className='tituloUrgencias'>Urgencias via Whatsapp</h2>
            <img className='enlaceUrgencias' src={iconoWhats} alt="Icono de Whatsapp" onClick={abrirModalUrgencias} />
            <span className='enlaceUrgencias' onClick={abrirModalUrgencias}>Presione aquí</span>
          </section>

          <section className='servicios'>
            <h2>Servicios</h2>
            <Servicios />
          </section>
          
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

          <section className='comentarios'>
            <h2 className='comentariosTitulo'>Testimonios</h2>
            
            <Testimonios />
            <div className='addComentarioConteiner'>
                <button className='botonAddComentario' onClick={abrirModalComentario}>Agregar comentario</button>
            </div>
          </section>

          <section className='contacto'>
            <h2>Contacto</h2>
            <form ref={form} onSubmit={abrirModalContacto} className='datosContacto'>
                <div className='mensajeError'>{errors.mensaje && <p className="error">{errors.mensaje}</p>}</div>
                <input type="text" name='nombre' value={formData.nombre} onChange={handleChange} placeholder='Nombre y apellido' required />
                <input type="tel" name='telefono' value={formData.telefono!} onChange={handleChange} placeholder='Teléfono' required/>
                <textarea name='consulta' placeholder='Motivo de consulta' required></textarea>
                <button type='submit'>Enviar</button>
            </form>
          </section>
      </div>

    
      <div className='citasWhats-conteiner'>
        <a className='enlaceCitas' href="https://wa.me/9878697658"><img className='iconoWhats' src={iconoWhats} alt="icono whatsapp" /></a>
        <p className='textoCitas'>Citas</p>
      </div>
      
      

      <footer>
        <p>&copy; 2025 Consultorio Médico. Todos los derechos reservados.</p>
      </footer>

      <ContactoModal modalContacto={modalContacto} setModalContacto={setModalContacto} form={form}/>
      <ServicioModal />
      <UrgenciasModal modalUrgencias={modalUrgencias} setModalUrgencias={setModalUrgencias}/>
      <ComentarioModal />
    </>
  )
}

export default App;
