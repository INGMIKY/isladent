import './App.css'
import 'react-phone-input-2/lib/style.css'
import banner from '../public/img/banner.jpg'
import Ubicacion from './components/Ubicacion';
import Horarios from './components/Horarios';
import Urgencias from './components/Urgencias';
import iconoWhats from '../public/img/icono-whatsapp.png';
import Servicios from './components/Servicios';
import GaleriaFotos from './components/GaleriaFotos';
import AgregarComentario from './components/AgregarComentario';
import Contacto from './components/Contacto';



// import banner from '../src/img/banner.jpg'

function App() {
  return (
    <div>
      <header>
        <img className='banner-img' src={banner} alt="" />
      </header>

      <div className='sectionConteiner'>
          <Ubicacion />
          <Horarios />
          <Urgencias />  
          <Servicios />
          <GaleriaFotos />
          <AgregarComentario />
          <Contacto />  
      </div>

      {/* Icono de whatsapp fixed */}
      <div className='citasWhats-conteiner'>
        <a className='enlaceCitas' href="https://wa.me/9878697658"><img className='iconoWhats' src={iconoWhats} alt="icono whatsapp" /></a>
        <p className='textoCitas'>Citas</p>
      </div>

      <footer>
        <p>&copy; 2025 Consultorio Médico. Todos los derechos reservados.</p>
      </footer>   
    </div>
  )
}

export default App;
