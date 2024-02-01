import { useEffect, useState } from "react";
import StateCard from "./components/StateCard";
import GeneralInfo from "./components/GeneralInfo";

import "./App.css"

function App() {
  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState("")

  {/*API's consumption for generating states name and defining then on stateData variable */}
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
        {/*Card's component for rendering state's info */}
        <StateCard data={selectedState}/>
        {/*Component with main infos*/}
        <GeneralInfo/>
      </div>   
    </div>
  );
}

export default App;
