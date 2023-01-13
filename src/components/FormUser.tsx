import React, { useState, ChangeEvent, FormEvent } from "react";
import { Users } from "../Types/types";
import axios from "axios";

interface props {
  className?: string;
  infoUser: { [key: string]: any };
}
const FormUser = ({ className, infoUser }: props) => {
  const initValuesUsers = {
    documentIdentity: infoUser.documentIdentity || "",
    password: "",
    phone: "",
    gender: "Masculino",
    dateBirth: "",
    codORCID: "",
    disability: "",
  };
  const [userData, setUserData] = useState<Users>(initValuesUsers);
  const [errorData, setErrorData] = useState<Users | null>(null);

  const [checked, setChecked] = useState(false);
  const handleUser = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorData(null);
    const error = validateBirthForm();

    const erroFilter = Object.values(error).every((err) => err == "");
    console.log(erroFilter);

    if (!erroFilter) {
      setErrorData(error);
    } else {
      setUserData({ ...userData, documentIdentity: infoUser.documentIdentity });
      console.log("se enviara los datos");
      console.log(userData);
      const URL = `https://apiunap-production.up.railway.app/api/v1/users`;
      axios
        .post(URL, userData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const validateBirthForm = () => {
    let error: Users = {
      documentIdentity: "",
      password: "",
      phone: "",
      gender: "",
      dateBirth: "",
      codORCID: "",
      disability: "",
    };

    if (!userData.phone) {
      error.phone = "No puede dejar el espacio en blanco";
    }
    if (!userData.dateBirth) {
      error.dateBirth = "No puede dejar el espacio en blanco";
    }
    if (!userData.codORCID) {
      error.codORCID = "No puede dejar el espacio en blanco";
    }
    if (!userData.password) {
      error.password = "No puede dejar el espacio en blanco";
    }

    if (!userData.disability && checked) {
      error.disability = "No puede dejar el espacio en blanco";
    }
    return error;
  };

  // console.log(errorData);

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className}`}
      //   className="flex flex-col border-2 p-6 lg:w-[800px] md:w-[500px] sm:w-[350px] y-[50%]"
    >
      <div className="size-row">
        <div className="size-box">
          <label htmlFor="name">Nombres</label>
          <input
            onChange={handleUser}
            type="text"
            id="name"
            name="name"
            className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
            value={infoUser?.firstName}
            disabled
          />
        </div>
        <div className="size-box">
          <label htmlFor="lastNames">Apellidos</label>
          <input
            onChange={handleUser}
            type="text"
            id="lastNames"
            name="lastNames"
            className="border-gray-900/70 border-2"
            value={infoUser?.lastName}
            disabled
          />
        </div>
      </div>

      <div className="size-row">
        <div className="size-box">
          <label htmlFor="phone">Celular</label>
          <input
            onChange={handleUser}
            type="number"
            id="phone"
            name="phone"
            className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
          />
          {errorData?.phone && (
            <p className="text-red-600">{errorData.phone}</p>
          )}
        </div>
        <div className="size-box">
          <label htmlFor="gender">Sexo</label>
          <div className=" flex space-x-4">
            <div className=" space-x-2">
              <input
                onChange={handleUser}
                type="radio"
                id="gender1"
                name="gender"
                value="male"
                className="border-2"
                defaultChecked
              />
              <label htmlFor="gender1" className="text-sm">
                Masculino
              </label>
            </div>

            <div className=" space-x-2">
              <input
                onChange={handleUser}
                type="radio"
                id="gender2"
                name="gender"
                value="famale"
                className="border-2"
              />
              <label htmlFor="gender2" className="text-sm">
                Femenino
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="size-row">
        <div className="size-box">
          <label htmlFor="dateBirth">Fecha de Nacimiento</label>
          <input
            onChange={handleUser}
            type="date"
            id="dateBirth"
            name="dateBirth"
            className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
          />
          {errorData?.dateBirth && (
            <p className="text-red-600">{errorData.dateBirth}</p>
          )}
        </div>
        <div className="size-box">
          <label htmlFor="codORCID">Codigo Orcid</label>
          <input
            onChange={handleUser}
            type="text"
            id="codORCID"
            name="codORCID"
            className="border-gray-900/70 border-2"
          />
          {errorData?.codORCID && (
            <p className="text-red-600">{errorData.codORCID}</p>
          )}
        </div>
      </div>

      <div className="size-row">
        <div className="size-box">
          <label htmlFor="typeDocument">Tipo de Documento</label>
          <select
            name="typeDocument"
            id="typeDocument"
            onChange={handleUser}
            className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
            disabled
          >
            <option defaultValue="">Seleccione un Documento</option>
            <option
              defaultValue="PASSPORT"
              selected={infoUser?.typeIdentity == "PASSPORT"}
            >
              Carnet de Pasaporte
            </option>
            <option
              defaultValue="DNI"
              selected={infoUser?.typeIdentity == "DNI"}
            >
              DNI
            </option>
          </select>
        </div>
        <div className="size-box">
          <label htmlFor="NroDocument">Numero de Documento</label>
          <input
            onChange={handleUser}
            type="number"
            id="NroDocument"
            name="NroDocument"
            className="border-gray-900/70 border-2"
            value={infoUser?.documentIdentity}
            disabled
          />
        </div>
      </div>

      <div className="size-row">
        <div className="">
          <label htmlFor="disability">Discapacidad</label>
          <div className="space-x-2">
            <input
              onChange={handleUserCheck}
              type="checkbox"
              id="disability"
              name="disability"
              className="border-gray-900/70 border-2"
            />
          </div>
        </div>
        {checked && (
          <div className="flex items-end">
            <input
              onChange={handleUser}
              type="text"
              id="disability"
              name="disability"
              className="border-gray-900/70 border-2 h-[30px] lg:w-full md:w-full sm:w-full "
            />
            {errorData?.disability && (
              <p className="text-red-600">{errorData.disability}</p>
            )}
          </div>
        )}
        <div className="size-box">
          <label htmlFor="password">Contraseña</label>
          <input
            onChange={handleUser}
            type="password"
            id="password"
            name="password"
            className="border-gray-900/70 border-2"
          />
          {errorData?.password && (
            <p className="text-red-600">{errorData.password}</p>
          )}
        </div>
      </div>
      <button className="bg-cyan-500 w-[100px] rounded-lg mt-5 border-2">
        enviar
      </button>
    </form>
  );
};

export default FormUser;
