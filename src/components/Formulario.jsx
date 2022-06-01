import styled from '@emotion/styled'
import useSelectorMonedas from '../hooks/useSelectorMonedas'
import Error from './Error'
import { monedas } from '../data/monedas'
import { useEffect, useState } from 'react'



const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7a7dfe;
    }
`


const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectorMonedas('Elige Tú Moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectorMonedas('Elige Tú Criptomoneda', criptos)



    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCriptos(arrayCriptos)

        }
        consultarApi()

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([moneda, criptomoneda].includes('')) {
            setError(true)

            return
        }
        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {
                error && <Error>Todos los campos son obligatorios</Error>
            }
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit
                    type="submit"
                    value="Cotizar"
                />

            </form>
        </>
    )
}

export default Formulario