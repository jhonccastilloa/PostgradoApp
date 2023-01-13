import React, { ChangeEvent } from "react";
import { Carrer, Faculty } from "../Types/types";

interface SelectListCarrerProps {
  data: Carrer[];
  title: string;
  getId?: (value: string | null) => void;
  setFacultyData: (value: Faculty) => void;
  facultyData: Faculty;
}
const SelectListCarrer = ({
  data,
  title,
  getId,
  facultyData,
  setFacultyData,
}: SelectListCarrerProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value, selectedIndex } = e.target;
    const titleName = e.target.options[selectedIndex].text;
    if (getId) {
      getId(value);
    }
    setFacultyData({ ...facultyData, [name]: titleName });
  };
  return (
    <div className="size-box">
      <label htmlFor={title} className="capitalize">
        {title}
      </label>
      <select
        name={title}
        id={title}
        onChange={handleChange}
        className="border-gray-900/70 border-2"
      >
        <option value="">Seleccione un {title}</option>
        {data.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectListCarrer;
