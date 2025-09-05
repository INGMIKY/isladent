import cruzRoja from "../imgSrc/cruz.png";

const Horarios = () => {
    return (
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
    )
}

export default Horarios;