import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto,
    gastos,
    setGastos,
}) => {
    presupuesto = Number(presupuesto)
    
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    const [percentage, SetPercentage] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            SetPercentage(nuevoPorcentaje)  
        }, 1000);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('Desea resetear presupuesto y gastos?')

        if (resultado) {
            setGastos([])
            setPresupuesto('')
            setIsValidPresupuesto(false)
        }
    }
    

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
            <CircularProgressbar 
                value={percentage} 
                text={`${percentage}%`} 
                styles={buildStyles({
                    pathColor: percentage > 100 ? '#dc2626' : '#3b82f6',
                    textColor: percentage > 100 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                  })}
            />
            </div>

            <div className='contenido-presupuesto'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>

                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
