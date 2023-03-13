import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useState } from "react"

export default function App() {
    const [ cpf, setCpf ] =useState("")
    const [ nome, setNome ] =useState("")
    const [ cadeirasSelecionadas, setCadeirasSelecionadas ] = useState([])
    const [ filme, setFilme ] = useState("")
    const [ horario, setHorario ] = useState("")
    const [ dia, setDia ] = useState("")

    return (
        <>
            <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>

            <Routes>
                <Route path="/" element= {<HomePage/>} /> 
                <Route path="/sessoes/:idItems" element={<SessionsPage />} />
                <Route path="/assentos/:idSession" element={
                <SeatsPage cpf={cpf} setCpf={setCpf}
                 nome={nome} setNome={setNome}
                 cadeirasSelecionadas={cadeirasSelecionadas} setCadeirasSelecionadas={setCadeirasSelecionadas}
                 filme={filme} setFilme={setFilme}
                 dia={dia} setDia={setDia}
                 horario={horario} setHorario={setHorario}/>} /> 
                <Route path="sucesso" element={
                <SuccessPage cpf={cpf} setCpf={setCpf}
                 nome={nome} setNome={setNome}
                 cadeirasSelecionadas={cadeirasSelecionadas} setCadeirasSelecionadas={setCadeirasSelecionadas}
                 filme={filme} setFilme={setFilme}
                 dia={dia} setDia={setDia}
                 horario={horario} setHorario={setHorario} />} /> 
            </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
