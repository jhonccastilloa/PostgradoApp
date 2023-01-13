import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import SelectListCarrer from "./SelectListCarrer";
import { facultades } from "../data/facultades";
import { escuelas } from "../data/escuelas";

import { Carrer, Faculty } from "../Types/types";

const initFacultyValues = {
  facultad: "",
  escuelas: "",
  modalityStudy: "",
  studyProgram: "",
  admission: "",
  process: "",
};
interface props {
  className?: string;
}
const FormFaculty = ({ className }: props) => {
  //send data
  const [facultyData, setFacultyData] = useState<Faculty>(initFacultyValues);
  const handleFaculty = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacultyData({ ...facultyData, [name]: value });
  };

  const hanldeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(facultyData);
  };
  // get Carrer
  const [facuId, setFacuId] = useState<string | null>(null);
  const [dataSchool, setDataSchool] = useState<Carrer[] | null>(null);

  useEffect(() => {
    if (facuId) {
      const filterSchool = Object.entries(escuelas).filter(
        (prov) => prov[0] === facuId
      );

      const result = filterSchool[0][1];
      setDataSchool(result);
    }
  }, [facuId]);
  return (
    <form onSubmit={hanldeSubmit} className={`${className}`}>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 lg:space-x-4 md:space-x-4 sm:space-x-0">
        <SelectListCarrer
          getId={setFacuId}
          data={facultades}
          title={"facultad"}
          facultyData={facultyData}
          setFacultyData={setFacultyData}
        />
        {dataSchool && (
          <SelectListCarrer
            title={"escuelas"}
            data={dataSchool}
            facultyData={facultyData}
            setFacultyData={setFacultyData}
          />
        )}
      </div>
      <div className="size-box">
        <label htmlFor="modalityStudy">Modalidad de Estudio</label>
        <input
          onChange={handleFaculty}
          type="text"
          id="modalityStudy"
          name="modalityStudy"
          className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
        />
      </div>
      <div className="size-box">
        <label htmlFor="studyProgram">Programa de Estudio</label>
        <input
          onChange={handleFaculty}
          type="text"
          id="studyProgram"
          name="studyProgram"
          className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
        />
      </div>
      <div className="size-box">
        <label htmlFor="admission">Modalidad de Admision</label>
        <input
          onChange={handleFaculty}
          type="text"
          id="admission"
          name="admission"
          className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
        />
      </div>
      <div className="size-box">
        <label htmlFor="process">Tipo de Proceso</label>
        <input
          onChange={handleFaculty}
          type="text"
          id="process"
          name="process"
          className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
        />
      </div>
      <button className="bg-cyan-500 w-[100px] rounded-lg mt-5 border-2">
        enviar
      </button>
    </form>
  );
};

export default FormFaculty;
