import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getMedicines,
  createMedicine,
  deleteMedicine
} from "../services/medicineService";

import {
  getPatients
} from "../services/patientService";

export default function Medicines() {

  const [medicines, setMedicines] =
    useState([]);

  const [patients, setPatients] =
    useState([]);

  const [formData, setFormData] =
    useState({
      patientId: "",
      medicineName: "",
      dosage: "",
      frequency: "",
      reminderTimes: "",
      instructions: ""
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const meds =
      await getMedicines();

    const pats =
      await getPatients();

    setMedicines(meds);
    setPatients(pats);
  };
  const [editingMedicine,
setEditingMedicine] =
useState(null);

const [modalOpen,
setModalOpen] =
useState(false);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    await createMedicine({
      ...formData,
      reminderTimes:
        formData.reminderTimes.split(
          ","
        )
    });

    loadData();
  };
import MedicineModal
from "../components/MedicineModal";

import {
 updateMedicine
}
from "../services/medicineService";
  const handleDelete =
    async (id) => {
      await deleteMedicine(
        id
      );

      loadData();
    };
const handleEdit =
async (data) => {

 await updateMedicine(
   editingMedicine._id,
   data
 );

 loadData();

 setModalOpen(false);

};
<button
 className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
 onClick={() => {
   setEditingMedicine(
     medicine
   );
   setModalOpen(true);
 }}
>
 Edit
</button>
  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Medicines
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="bg-white shadow p-4 rounded mb-8"
        >

          <div className="grid grid-cols-2 gap-4">

            <select
              className="border p-2"
              value={
                formData.patientId
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  patientId:
                    e.target.value
                })
              }
            >
              <option value="">
                Select Patient
              </option>

              {patients.map(
                (patient) => (
                  <option
                    key={
                      patient._id
                    }
                    value={
                      patient._id
                    }
                  >
                    {
                      patient.name
                    }
                  </option>
                )
              )}
            </select>

            <input
              placeholder="Medicine Name"
              className="border p-2"
              value={
                formData.medicineName
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  medicineName:
                    e.target.value
                })
              }
            />

            <input
              placeholder="Dosage"
              className="border p-2"
              value={
                formData.dosage
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dosage:
                    e.target.value
                })
              }
            />
            <MedicineModal
 isOpen={modalOpen}
 medicine={editingMedicine}
 patients={patients}
 onClose={() =>
   setModalOpen(false)
 }
 onSave={handleEdit}
/>

            <input
              placeholder="Frequency"
              className="border p-2"
              value={
                formData.frequency
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  frequency:
                    e.target.value
                })
              }
            />

            <input
              placeholder="08:00,20:00"
              className="border p-2"
              value={
                formData.reminderTimes
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reminderTimes:
                    e.target.value
                })
              }
            />

          </div>

          <textarea
            placeholder="Instructions"
            className="border p-2 w-full mt-4"
            value={
              formData.instructions
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                instructions:
                  e.target.value
              })
            }
          />

          <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
            Add Medicine
          </button>

        </form>

        <table className="w-full bg-white shadow">

          <thead>
            <tr>
              <th>
                Medicine
              </th>
              <th>
                Dosage
              </th>
              <th>
                Patient
              </th>
              <th>
                Times
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {medicines.map(
              (medicine) => (
                <tr
                  key={
                    medicine._id
                  }
                >
                  <td>
                    {
                      medicine.medicineName
                    }
                  </td>

                  <td>
                    {
                      medicine.dosage
                    }
                  </td>

                  <td>
                    {
                      medicine
                        ?.patientId
                        ?.name
                    }
                  </td>

                  <td>
                    {medicine.reminderTimes?.join(
                      ", "
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleDelete(
                          medicine._id
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