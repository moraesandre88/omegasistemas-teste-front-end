import { useEffect, useState } from "react";
import StateCard from "./components/StateCard";

import "./App.css"

function App() {
  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState("")

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const brStates = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
          {
            method: "GET",
            signal: controller.signal,
          }
        );
        const responseData = await response.json();
        mounted && setStateData(responseData)
      } catch (error) {
        console.log(error);
      }
    };
    brStates();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);


  const handleChange = (ev) => {
    setSelectedState(ev.target.value)
    console.log(selectedState);
  };

  return (
    <div className="main">
      <div className="wrapper">
        <h1>Casos de Covid no Brasil</h1>
        <form>
          <label>Escolha o estado: </label>
          <select value={selectedState} onChange={handleChange}>
            <option value="">-</option>
            {stateData.map((item, index) => (
              <option value={item.sigla} key={index}>{item.nome}</option>
            ))};
          </select>
        </form>
      </div>
      <div className="card-wrapper">
        <StateCard data={selectedState}/>
      </div>   
    </div>
  );
}

export default App;
