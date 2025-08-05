import api from "./api";

//PERSON
export type Person = {
  id: number;
  name: string;
};

export const getPerson = async (): Promise<Person[]> => {
  const response = await api.get<Person[]>("/person");
  return response.data;
};

export const postPerson = async (person: Omit<Person, "id">) => {
  const response = await api.post("/person", person);
  return response.data;
};

export const putPerson = async (id: number, person: Omit<Person, "id">) => {
  const response = await api.put(`/person/${id}`, person);
  return response.data;
};

export const deletePerson = async (id: number) => {
  const response = await api.delete(`/person/${id}`);
  return response.data;
};

//TITLE
export type Title = {
  id: number;
  title: string;
};

export const getTitle = async (): Promise<Title[]> => {
  const response = await api.get<Title[]>("/title");
  if (!response) {
    return [];
  }
  return response.data;
};

export const putTitle = async (id: number, title: Omit<Title, "id">) => {
  const response = await api.put(`/title/${id}`, title);
  return response.data;
};
