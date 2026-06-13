import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  getPatients,
  createPatient,
  deletePatient
} from "../services/patientService";

export default function Patients() {

  const [patients, setPatients] = useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      age: "",
      gender: "",
      telegramChatId: "",
      caregiverTelegramChatId: "",
      emergencyContact: "",
      medicalNotes: ""
    });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };
const [editingPatient,
setEditingPatient] =
useState(null);

const [modalOpen,
setModalOpen] =
useState(false);

import PatientModal
from "../components/PatientModal";

import {
  updatePatient
}
from "../services/patientService";

const handleEdit =
async (data) => {

  await updatePatient(
    editingPatient._id,
    data
  );

  fetchPatients();

  setModalOpen(false);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    await createPatient(formData);

    setFormData({
      name: "",
      age: "",
      gender: "",
      telegramChatId: "",
      caregiverTelegramChatId: "",
      emergencyContact: "",
      medicalNotes: ""
    });

    fetchPatients();
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete patient?"
      )
    )
      return;

    await deletePatient(id);

    fetchPatients();
  };
<button
  onClick={() => {
    setEditingPatient(patient);
    setModalOpen(true);
  }}
  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
>
  Edit
</button>
  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Patients
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-4 rounded mb-8"
        >

          <div className="grid grid-cols-2 gap-4">

            <input
              placeholder="Name"
              className="border p-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name:
                    e.target.value
                })
              }
            />

            <input
              placeholder="Age"
              className="border p-2"
              value={formData.age}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age:
                    e.target.value
                })
              }
            />

            <input
              placeholder="Gender"
              className="border p-2"
              value={
                formData.gender
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender:
                    e.target.value
                })
              }
            />

            <input
              placeholder="Telegram Chat ID"
              className="border p-2"
              value={
                formData.telegramChatId
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  telegramChatId:
                    e.target.value
                })
              }
            />

            <input
              placeholder="Caregiver Telegram ID"
              className="border p-2"
              value={
                formData.caregiverTelegramChatId
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  caregiverTelegramChatId:
                    e.target.value
                })
              }
            />

            <input
              placeholder="Emergency Contact"
              className="border p-2"
              value={
                formData.emergencyContact
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyContact:
                    e.target.value
                })
              }
            />

          </div>

          <textarea
            placeholder="Medical Notes"
            className="border p-2 w-full mt-4"
            value={
              formData.medicalNotes
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                medicalNotes:
                  e.target.value
              })
            }
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Add Patient
          </button>

        </form>

        <table className="w-full bg-white shadow">

          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Telegram</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {patients.map(
              (patient) => (
                <tr
                  key={
                    patient._id
                  }
                >
                  <td>
                    {
                      patient.name
                    }
                  </td>

                  <td>
                    {
                      patient.age
                    }
                  </td>

                  <td>
                    {
                      patient.telegramChatId
                    }
                  </td>

                  <td>
                    <PatientModal
  isOpen={modalOpen}
  patient={editingPatient}
  onClose={() =>
    setModalOpen(false)
  }
  onSave={handleEdit}
/>
                    <button
                      onClick={() =>
                        handleDelete(
                          patient._id
                        )
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    </>
  );
}