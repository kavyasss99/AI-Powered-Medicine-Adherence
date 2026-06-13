import { useState, useEffect } from "react";

export default function PatientModal({
  isOpen,
  onClose,
  onSave,
  patient
}) {
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
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-[600px]">

        <h2 className="text-2xl font-bold mb-4">
          Edit Patient
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-3">

            <input
              value={formData.name}
              placeholder="Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
              className="border p-2"
            />

            <input
              value={formData.age}
              placeholder="Age"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age: e.target.value
                })
              }
              className="border p-2"
            />

            <input
              value={formData.gender}
              placeholder="Gender"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e.target.value
                })
              }
              className="border p-2"
            />

            <input
              value={
                formData.telegramChatId
              }
              placeholder="Telegram ID"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  telegramChatId:
                    e.target.value
                })
              }
              className="border p-2"
            />

          </div>

          <textarea
            className="border p-2 w-full mt-3"
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

          <div className="flex gap-2 mt-4">

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
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