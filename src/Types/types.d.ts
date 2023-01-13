export interface Users {
  documentIdentity:string;
  password:string;
  phone: string;
  gender: string;
  dateBirth: string;
  codORCID: string;
  disability?: string;
}
export interface Ubigeos {
  id_ubigeo: string;
  nombre_ubigeo: string;
  codigo_ubigeo: string;
  etiqueta_ubigeo: string;
  buscador_ubigeo: string;
  numero_hijos_ubigeo: string;
  nivel_ubigeo: string;
  id_padre_ubigeo: string;
}

export interface Places {
  countryOfBirth: string;
  nacionality: string;
  departamento: string;
  provincia: string;
  distrito: string;
}
export interface Faculty {
  facultad: string;
  escuelas: string;
  modalityStudy: string;
  studyProgram: string;
  admission: string;
  process: string;
}
export interface Carrer {
  id: string;
  name: string;
}

