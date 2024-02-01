import { useEffect, useState } from "react";
import "./StateCard.css";

const StateCard = ({ data }) => {
  const [uf, setUf] = useState({});

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const covidCases = async () => {
      try {
        const response = await fetch(
          `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${data.toLowerCase()}`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );
        const responseData = await response.json();
        mounted && setUf(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    covidCases();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [data]);

  return (
    <>
      {data ? (
        <div className="card">
          <div className="flag-wrapper">
            <img
              src={`https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${data.toUpperCase()}.png`}
              alt="state-flag"
              width={"30"}
              height={"30"}
            />
            <h3>{uf.state}</h3>
          </div>
          <p>Casos: {uf.cases}</p>
          <p>Mortes: {uf.deaths}</p>
          <p>Suspeitas: {uf.suspects}</p>
        </div>
      ) : (
        <h2>Olá, seja bem-vindo(a). Aqui você pode consultar os casos de covid 19 por estado</h2>
      )}
    </>
  );
};

export default StateCard;
