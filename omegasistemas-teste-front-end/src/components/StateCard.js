import { useEffect, useState } from "react";
import "./StateCard.css";

const StateCard = ({ data }) => {
  console.log(data.toLowerCase());
  const [uf, setUf] = useState([]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const covidCases = async () => {
      try {
        const response = await fetch(
          `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${data.toLowerCase()}`,
          {
            method: "GET",
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
    <div className="card">
      <h3>{uf.state}</h3>
      <p>Casos: {uf.cases}</p>
      <p>Mortes: {uf.deaths}</p>
      <p>Suspeitas: {uf.suspects}</p>
      {/* <p>Última consulta: {uf.datetime.split("T")[0]}</p> */}
    </div>
  );
};

export default StateCard;
