import { useState, useEffect } from "react";
import "./GeneralInfo.css"

const GeneralInfo = () => {
  const [brStates, setBrStates] = useState([]);
  const [stateMaxCases, setStateMaxCases] = useState([]);
  const [stateMaxDeaths, setStateMaxDeaths] = useState([]);
  const [stateMaxSuspects, setStateMaxSuspects] = useState([]);

  {/*API's consumption for getting all states's information about covid */}
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const covidStates = async () => {
      try {
        const response = await fetch(
          "https://covid19-brazil-api.now.sh/api/report/v1",
          {
            method: "GET",
            signal: controller.signal,
          }
        );
        const responseData = await response.json();
        mounted && setBrStates(responseData?.data);
      } catch (error) {
        console.log(error);
      }
    };
    covidStates();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  {/*Listing object to find , respectively: max cases state, max deaths state and max suspects state */}
  useEffect(() => {
    const maxCases = [...brStates].sort((a, b) => b.cases - a.cases);
    const maxDeaths = [...brStates].sort((a, b) => b.deaths - a.deaths);
    const maxSuspects = [...brStates].sort((a, b) => b.suspects - a.suspects);
    setStateMaxCases(maxCases[0]);
    setStateMaxDeaths(maxDeaths[0]);
    setStateMaxSuspects(maxSuspects[0]);
  }, [brStates]);

  return (
    <div className="main-general">
      <h2>Informações gerais</h2>
      <p>
        Estado com maior número de casos: {stateMaxCases?.state} -{" "}
        {stateMaxCases?.cases} casos
      </p>
      <p>
        Estado com maior número de mortes: {stateMaxDeaths?.state} -{" "}
        {stateMaxDeaths?.deaths} mortes
      </p>
      <p>
        Estado com maior número de suspeitos: {stateMaxSuspects?.state} -{" "}
        {stateMaxSuspects?.suspects} suspeitos
      </p>
    </div>
  );
};

export default GeneralInfo;
