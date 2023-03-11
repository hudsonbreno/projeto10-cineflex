import styled from "styled-components"
import { Link } from "react-router-dom"
import axios from "axios"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function SessionsPage() {

    const [filme, setFilme] = useState([])

    const params = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${params.idItems}/showtimes`)

        promise.then(resposta => setFilme(resposta.data))
    }, []);

    if (filme == undefined) {
        return (console.log("carregando"))
    }

    let diasDaSemana = filme.days

    console.log(diasDaSemana)

    function SomenteSePreenchido() {
        if (diasDaSemana === undefined) {
        } else {
            return (
                diasDaSemana.map((dia) =>
                    <SessionContainer>
                        {dia.weekday}-{dia.date}
                        <ButtonsContainer>
                            <button><Link to="/success">{dia.showtimes[0].name}</Link></button>
                            <button><Link to="/success">{dia.showtimes[1].name}</Link></button>
                        </ButtonsContainer>
                    </SessionContainer>              

                ))
        }
    }
    return (
        <PageContainer>
            Selecione o horário
            <div>
                    {SomenteSePreenchido(diasDaSemana)}
                    {/* Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button><Link to="/success">14:00</Link></button>
                        <button><Link to="/success">15:00</Link></button>
                    </ButtonsContainer> */}
            </div>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`