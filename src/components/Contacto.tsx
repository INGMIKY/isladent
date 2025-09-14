import { useState, ChangeEvent, useRef } from "react";
import ContactoModal from "./ContactoModal";
import PhoneInput from 'react-phone-input-2'


interface formData{
  nombre: string,
  correo: string,
  telefono: string,
  lada: string;
  consulta: string,
}

const Contacto = () => {
    
    // Condicionales - formulario contacto ****************************
    const [formData, setFormData] = useState<formData>({
      nombre:'',
      correo: '',
      telefono: '',
      lada: '',
      consulta: '',
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
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

    // Mensajes de errors del formulario ****************************
    const [errors, setErrors] = useState({
        mensaje: '',
    });




    // Contacto modal ****************************
    const [modalContacto, setModalContacto] = useState(false) 
  
    const abrirModalContacto = (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault(); 
  
        // Validación personalizada
      if (!formData.nombre || !formData.telefono) {
        setModalContacto(false);
        return;
      }
  
      enviarWhatsApp();
      // setModalContacto(true);
      document.body.style.overflow = 'hidden';
    }


    // Correo electronico - formulario contacto  ****************************
    const form = useRef<HTMLFormElement>(null); 

    const enviarWhatsApp = () => {
      const numeroDestino = "529871033407"; 
      const mensaje = `
      Nuevo contacto desde la web:

      Nombre: ${formData.nombre}
      Correo: ${formData.correo}
      Teléfono: ${formData.telefono}
      Consulta: ${formData.consulta}
      `;

      const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank"); 
    };

    return (
        <>   
        <section className='contacto'>
            <h2>Contacto</h2>
            <form ref={form} onSubmit={abrirModalContacto} className='datosContacto'>
                <div className='mensajeError'>{errors.mensaje && <p className="error">{errors.mensaje}</p>}</div>
                <input type="text" name='nombre' value={formData.nombre} onChange={handleChange} placeholder='Nombre y apellido' required />
                <input type="text" name='correo' value={formData.correo} onChange={handleChange} placeholder='Correo' required />
                <input type="hidden" name="lada" value={`+${(formData.telefono || '').slice(0,2)}`} />
                
                <PhoneInput
                country=""
                value={formData.telefono}
                onChange={(value) => {
                    setFormData({
                    ...formData,
                    telefono: value,           // número completo con lada
                    // lada: `+${country.dialCode ?? ''}`, // opcional si guardas la lada
                    });
                }}
                inputClass="inputTelefono"
                dropdownClass="prueba"
                inputProps={{
                    name: 'telefono',  
                    required: true,
                    autoComplete: 'tel'
,                   Placeholder: 'Telefono'
                }}
                enableLongNumbers
                />
                {/* <input type="tel" name='telefono' value={formData.telefono!} onChange={handleChange} placeholder='Teléfono' required/> */}
                <textarea name='consulta' value={formData.consulta} onChange={handleChange} placeholder='Motivo de consulta' required></textarea>
                <button type='submit'>Enviar</button>
            </form>
        </section>
        <ContactoModal modalContacto={modalContacto} setModalContacto={setModalContacto} form={form}/>
        </>
    )
}

export default Contacto;