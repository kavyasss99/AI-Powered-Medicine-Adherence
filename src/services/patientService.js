import api from "../api";

export const getPatients = async () => {
  const res = await api.get("/patients");
  return res.data;
};

export const createPatient = async (data) => {
  const res = await api.post("/patients", data);
  return res.data;
};

export const updatePatient = async (id, data) => {
  const res = await api.put(`/patients/${id}`, data);
  return res.data;
};

export const deletePatient = async (id) => {
  const res = await api.delete(`/patients/${id}`);
  return res.data;
};
export const updatePatient =
  async (id, data) => {
    const res =
      await api.put(
        `/patients/${id}`,
        data
      );

    return res.data;
  };