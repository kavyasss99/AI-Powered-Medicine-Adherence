import { useState, useEffect } from "react";

export default function MedicineModal({
  isOpen,
  onClose,
  onSave,
  medicine,
  patients
}) {

  const [formData, setFormData] =
    useState({});

  useEffect(() => {

    if (medicine) {

      setFormData({
        ...medicine,
        reminderTimes:
          medicine.reminderTimes?.join(
            ","
          )
      });

    }

  }, [medicine]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      reminderTimes:
        formData.reminderTimes.split(
          ","
        )
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-[600px]">

        <h2 className="text-2xl font-bold mb-4">
          Edit Medicine
        </h2>

        <form onSubmit={handleSubmit}>

          <select
            className="border p-2 w-full mb-3"
            value={formData.patientId}
            onChange={(e) =>
              setFormData({
                ...formData,
                patientId:
                  e.target.value
              })
            }
          >
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
            className="border p-2 w-full mb-3"
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
            className="border p-2 w-full mb-3"
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

          <input
            className="border p-2 w-full mb-3"
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

          <div className="flex gap-2">

            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}