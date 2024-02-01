import { useEffect, useState } from "react";
import StateCard from "./components/StateCard";

import "./App.css"

function App() {
  const [stateData, setStateData] = useState([]);
  const [stateName, setStateName] = useState([]);
  const [stateUf, setStateUf] = useState([])
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

  useEffect(() => {
    stateData.map((item) => (
      setStateName((prev) => [...prev, item.nome])
    ))
  }, [stateData]);

  useEffect(() => {
    stateData.map((item) => (
      setStateUf((prev) => [...prev, item.sigla])
    ))
  }, [stateData]);

  console.log(stateUf)

  const handleChange = (ev) => {
    setSelectedState(ev.target.value)
    console.log(selectedState);
  };

  return (
    <div>
      <div>
        <h1>Casos de Covid no Brasil</h1>
        <form>
          <label>Escolha o estado:</label>
          <select value={selectedState} onChange={handleChange}>
            {/* <option value="">Estado...</option> */}
            {stateName.map((item, index) => (
              <option value={stateUf[index]} key={index}>{item}</option>
            ))}
          </select>
        </form>
      </div>
      
      <hr />
      <div className="card-wrapper">
        <StateCard data={selectedState}/>
      </div>
      
    </div>
  );
}

export default App;
