import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Ubigeos } from "../Types/types";
import { departamentos } from "../data/departamentos";
import { provincias } from "../data/provincias";
import { distritos } from "../data/distritos";
import SelectList from "./SelectList";
import { Places } from "../Types/types";

const initPlaceValues = {
  countryOfBirth: "",
  nacionality: "",
  departamento: "",
  provincia: "",
  distrito: "",
};
interface props {
  className?: string;
}
const FormPlace = ({ className }: props) => {
  //send data
  const [placeData, setPlaceData] = useState<Places>(initPlaceValues);
  const [errorData, setErrorData] = useState<Places | null>(null);

  const handlePlace = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlaceData({ ...placeData, [name]: value });
  };

  const hanldeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorData(null);
    const error = validateForm();

    const erroFilter = Object.values(error).every((err) => err == "");
    // console.log(erroFilter);

    if (!erroFilter) {
      setErrorData(error);
    } else {
  console.log(placeData)

      console.log("se enviara los datos");
    }
  };
  const validateForm = () => {
    let error: Places = {
      countryOfBirth: "",
      nacionality: "",
      departamento: "",
      provincia: "",
      distrito: "",
    };
    if (!placeData.countryOfBirth) {
      error.countryOfBirth = "No puede dejar el espacio en blanco";
    }
    if (!placeData.nacionality) {
      error.nacionality = "No puede dejar el espacio en blanco";
    }
    if (placeData.departamento.includes("Seleccione")) {
      error.departamento = "Selecione una Opcion";
    }
    if (placeData.provincia.includes("Seleccione") ) {
      error.provincia = "Selecione una Opcion";
    }
    if (placeData.distrito.includes("Seleccione") ) {
      error.distrito = "Selecione una Opcion";
    }
    // console.log(error);
    return error;
  };
  // get Ubigeos
  const [depId, setDepId] = useState<string | null>(null);
  const [provId, setProvId] = useState<string | null>(null);
  const [dataProv, setDataProv] = useState<Ubigeos[] | null>(null);
  const [dataDist, setDataDist] = useState<Ubigeos[] | null>(null);

  useEffect(() => {
    if (depId) {
      const filterProvincias = Object.entries(provincias).filter(
        (prov) => prov[0] === depId
      );

      const result = filterProvincias[0][1];
      setDataProv(result);
      setDataDist(null);
    }
  }, [depId]);
  useEffect(() => {
    if (provId) {
      const filterDistritos = Object.entries(distritos).filter(
        (dist) => dist[0] === provId
      );

      const result = filterDistritos[0][1];
      console.log(result);
      setDataDist(result);
    }
  }, [provId]);


  return (
    <form
      className={`${className}`}
      // className="flex flex-col border-2 p-6 lg:w-[800px] md:w-[500px] sm:w-[350px] y-[50%]"
      onSubmit={hanldeSubmit}
    >
      <div className="size-row">
        <div className="size-box">
          <label htmlFor="countryOfBirth">Pais de Nacimiento</label>
          <input
            onChange={handlePlace}
            type="text"
            id="countryOfBirth"
            name="countryOfBirth"
            className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
          />
          {errorData?.countryOfBirth && (
            <p className="text-red-600">{errorData.countryOfBirth}</p>
          )}
        </div>
        <div className="size-box">
          <label htmlFor="nacionality">Nacionalidad</label>
          <input
            onChange={handlePlace}
            type="text"
            id="nacionality"
            name="nacionality"
            className="border-gray-900/70 border-2 "
          />
          {errorData?.nacionality && (
            <p className="text-red-600">{errorData.nacionality}</p>
          )}
        </div>
      </div>
      <h2 className=" text-xl">Ubicacion de su residencia actual</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 lg:space-x-4 md:space-x-4 sm:space-x-0">
        <SelectList
          getId={setDepId}
          title={"departamento"}
          data={departamentos}
          setPlaceData={setPlaceData}
          placeData={placeData}
          error={errorData ? errorData.departamento : ""}
        />
        {/* {errorData?.departamento && (
          <p className="text-red-600">{errorData.departamento}</p>
        )} */}

        {dataProv && (
          <SelectList
            getId={setProvId}
            title={"provincia"}
            data={dataProv}
            setPlaceData={setPlaceData}
            placeData={placeData}
          error={errorData ? errorData.provincia : ""}

          />
        )}

        {dataDist && (
          <SelectList
            title={"distrito"}
            data={dataDist}
            setPlaceData={setPlaceData}
            placeData={placeData}
          error={errorData ? errorData.distrito : ""}

          />
        )}
      </div>
      <button>enviar datos</button>
    </form>
  );
};

export default FormPlace;
