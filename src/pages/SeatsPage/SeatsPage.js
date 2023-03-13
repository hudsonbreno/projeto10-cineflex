import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SeatsPage({cpf, setCpf, nome, setNome, cadeirasSelecionadas, setCadeirasSelecionadas, setFilme, setDia, setHorario}) {
  
  const [assento, setAssento] = useState("");

  const URL = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
  const navigate = useNavigate()
  
  const params = useParams();

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSession}/seats`
    );

    promise.then((resposta) => setAssento(resposta.data));
  }, []);

  function mudarAssento(lugar){
    if(lugar.isAvailable===false){
      alert("Esse assento não está disponível.")
      return;
    }
    if (cadeirasSelecionadas.includes(lugar)){
      console.log("já selecionado")
    } else{
      setCadeirasSelecionadas([...cadeirasSelecionadas, lugar])
    }
  }

  function SomenteSeCarregarAssento(assento) {
    if (assento==="") {
    } else {
      return (
        <>
          <div>
            <img src={assento.movie.posterURL} alt="poster" />
          </div>
          <div>
            <p>{assento.movie.title}</p>
            <p>
              {assento.day.weekday} - {assento.name}
            </p>
          </div>
        </>
      );
    }
  }

  let local = assento.seats

  function SomenteSeCarregadoLocal(local){
    if(local === undefined) {
    } else{
        return (
            <>
                {local.map((lugar)=> <SeatItem key={lugar.id} data-test="seat" selecionado={cadeirasSelecionadas.includes(lugar)} onClick={()=> mudarAssento(lugar)} disponivel={lugar.isAvailable}>{lugar.name}</SeatItem>)}
            </>
        )
    }
  }

  function formulario(event){
    event.preventDefault(); //impede o redirecionamento
    let idCadeira = cadeirasSelecionadas.map((item)=>item.id)
    let dados= {
            ids: idCadeira,
            name: nome,
            cpf: cpf
          }

    const promise = axios.post(URL, dados)
    promise.then(resposta =>{
      console.log("ta aqui")
      setNome(nome)
      setCpf(cpf)
      setFilme(assento.movie.title)
      setDia(assento.day.date)
      setHorario(assento.name)
      navigate("/sucesso")
    })

    promise.catch(error=>console.log(error))
  }
  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {SomenteSeCarregadoLocal(local)}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle selecionado= { true } />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle disponivel = { true }/>
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle disponivel = {false}/>
          Indisponível
        </CaptionItem>
      </CaptionContainer>


      <FormContainer>
        <form onSubmit={formulario}>
          <h1 htmlFor="name">Nome do Comprador:</h1>
          <input id="name" data-test="client-name" placeholder="Digite seu nome..." onChange={e=>setNome(e.target.value)} required/>
          <h1 htmlFor="cpf">CPF do Comprador:</h1>
          <input id="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" data-test="client-cpf" placeholder="Digite seu CPF..." onChange={e=>setCpf(e.target.value)} required/>
          <button type="submit" data-test="book-seat-btn">
            Reservar Assento(s)
          </button>
        </form>
      </FormContainer>

        <FooterContainer data-test="footer">
            {SomenteSeCarregarAssento(assento)}
        </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid ${(props)=>props.selecionado? "#0E7D71":(props.disponivel?"#7B8B99":"#F7C52B")}; // Essa cor deve mudar
  background-color: ${(props)=>props.selecionado?"#1AAE9E":(props.disponivel?"#C3CFD9":"#FBE192")}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid ${(props)=>props.selecionado?"#0E7D71":(props.disponivel?"#7B8B99":"#F7C52B")}; // Essa cor deve mudar
  background-color: ${(props)=>props.selecionado?"#1AAE9E":(props.disponivel?"#C3CFD9":"#FBE192")}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
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
`;
