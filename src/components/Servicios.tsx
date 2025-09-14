import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ServicioModal from "./ServicioModal";

interface serviciosProps{
    id: number,
    titulo: string,
    texto: string,
}

const Servicios = () =>{
    
    const servicios = [
        {
            id: 1,
            titulo: 'Odontologia integral',
            texto: 'Brinda atención dental completa, desde la prevención hasta el tratamiento de problemas bucales, adaptándose a las necesidades específicas de cada paciente.',
        },
        {
            id: 2,
            titulo: 'Medicina familiar',
            texto: 'Brinda atención médica continua para toda la familia, enfocándose en la prevención y tratamiento de enfermedades comunes, considerando el contexto familiar y social del paciente.',
        },
        {
            id: 3,
            titulo: 'Medicina general',
            texto: 'Ofrece diagnóstico y tratamiento de enfermedades comunes, realizando evaluaciones básicas de salud y derivando a especialistas cuando es necesario.',
        },
        {
            id: 4,
            titulo: 'Nutrición',
            texto: 'Brinda atención y orientación personalizada sobre la alimentación saludable, diseñando planes nutricionales según las necesidades específicas de cada persona para mantener o mejorar su salud a través de una dieta balanceada.',
        },
        {
            id: 5,
            titulo: 'Fisioterapía',
            texto: 'Brinda tratamiento y rehabilitación física mediante técnicas especializadas y ejercicios terapéuticos para recuperar la movilidad, aliviar el dolor y mejorar la función corporal en pacientes con lesiones o problemas musculares.',
        }
    ];

    
    const { setModalServicio } = useContext(GlobalContext) ?? {};

    const abrirServicioModal = (servicios:serviciosProps) =>{
        if(setModalServicio){
            setModalServicio(true);
            document.body.style.overflow = 'hidden';
            if(setServicioSeleccionado){
                setServicioSeleccionado(servicios)

            }else{
                console.error('Hubo un problema con conectarse con context');
            }
        }else{
            console.error('El contexto no está inicializando correctamente');
        };
        
    };
    
    // console.log(modalServicio)
    
    // Saber que servicio fue seleccionado
    
    const { setServicioSeleccionado} = useContext(GlobalContext) ?? {};
    // console.log(servicioSeleccionado);



    return (
        <>    
            <section className="servicios">
                <h2>Servicios</h2>
                <div className='listaServicios'>
                    {servicios.map((servicios)=>(
                        <div className="servicio" key={servicios.id} onClick={()=>abrirServicioModal(servicios)}>{servicios.titulo}</div>
                    ))}
                </div>       
            </section>

            <ServicioModal />
        </>
    );
}

export default Servicios;