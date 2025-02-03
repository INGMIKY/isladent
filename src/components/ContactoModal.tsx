import '../styles/ContactoModal.css';
import advertencia from '/public/img/advertencia.png'
import confirmacion from '/public/img/acuerdo.png'
import emailjs from '@emailjs/browser';
import { RefObject, useState } from 'react';


interface ContactoModalProps{
    modalContacto: boolean;
    setModalContacto: (cancelar:boolean) => void;
    form: RefObject<HTMLFormElement>;
}

const ContactoModal: React.FC<ContactoModalProps> = ({ modalContacto, setModalContacto, form}) =>{

    const cerrarModalContacto = () =>{
        setModalContacto(false)
        document.body.style.overflow = 'auto';
        setModalStep(1);
        window.location.reload()
    }

    const [modalStep, setModalStep] = useState(1)

    const avanzarModal = () =>{
        setModalStep((prevStep) => prevStep + 1);
    }

    

    const sendEmail = () =>{
        if (!form.current) return;

        emailjs.sendForm('service_vmz9wpb','template_eb059s7',form.current,{
            publicKey: 'DgCkoSTZ0kClqV4aP',
        })
        .then(
            ()=>{
            console.log('Formulario enviado correctamente');
            avanzarModal();
            // form.current.reset();
            },
            (error)=>{
            console.log('Ha ocurrido un error al enviar el formulario',error.text);
            },
        );
    }

    return (
        <>
            <div className={`ventanaModal ${modalContacto == true ? 'ventanaModalAbrir' : ''}`}>
                <div className='contactoModalContainer'>
                    {modalStep === 1 && (
                        <>
                            <img src={advertencia} alt="Confirmacion" />
                            <h2 className='contactoModalMensaje'>¿Estas seguro?</h2>
                            <div className='contactoModalBotonesC'>
                                <button className='botonCancelarContacto' onClick={cerrarModalContacto}>Cancelar</button>
                                <button className='botonEnviarContacto' onClick={sendEmail}>Sí, enviar</button>
                            </div>
                        </>
                    )}
                    {modalStep === 2 && (
                        <>
                            <img src={confirmacion} alt="Confirmacion" />
                            <h2 className="contactoModalMensaje">Mensaje enviado</h2>
                            <p>Tu consulta ha sido enviada con éxito. ¡Gracias por contactarnos!</p>
                            <div className="contactoModalBotonesC">
                                <button className="botonCancelarContacto2" onClick={cerrarModalContacto}>
                                    Cerrar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            
        </>
    );
}

export default ContactoModal;