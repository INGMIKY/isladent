const Ubicacion = () => {
    return (
        <section className='ubicacion'>
            <h2>Ubicación</h2>
            <span className='textoNota'>Para más información amplie el mapa</span>
            <div className='mapa'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d576.0900973328787!2d-86.95103803892285!3d20.498755663439074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e590f2cf2e8d5%3A0x593c68e33c6797e5!2sClinica%20Dental%20Isladent!5e0!3m2!1ses!2smx!4v1735152738106!5m2!1ses!2smx" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
        </section>
    )
}

export default Ubicacion;