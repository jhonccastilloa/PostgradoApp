import "./App.css";
import { useState } from "react";

import FormUser from "./components/FormUser";
import FormPlace from "./components/FormPlace";
import FormFaculty from "./components/FormFaculty";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: any) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const [infoUser, setinfoUser] = useState<{ [key: string]: any } | null>(null);
  const handleQuery = () => {
    const URL = `https://apiunap-production.up.railway.app/api/v1/users/?search=${inputValue}`;

    console.log(URL)
    axios
      .get(URL)
      .then((res) => setinfoUser(res.data))
      .catch((err) => console.log(err));
  };
  console.log(infoUser);
  return (
    <div className="flex justify-center flex-col items-center h-full lg:mt-0 md:mt-0 sm:mt-5 w-screen overflow-y-auto gap-4">
      <div className="consult">
        <input
          type="text"
          className="border-gray-900/70 border-2 lg:mr-4 md:mr-4 sm:mr-0"
          onChange={handleChange}
        />
        <button onClick={handleQuery}>Consultar</button>
      </div>
      {infoUser &&<FormUser infoUser={infoUser} className="container mx-auto w-5/6 md:w-3/5 border-2 p-6" />}
      {infoUser && <FormPlace className="container mx-auto w-5/6 md:w-3/5 border-2 p-}6" />}
      {infoUser && <FormFaculty className="container mx-auto w-5/6 md:w-3/5 border-2 p-6" />}
    </div>
    
  );
}

export default App;
