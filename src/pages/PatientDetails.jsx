import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../api";

import StatsCard from "../components/StatsCard";

import LoadingSpinner from "../components/LoadingSpinner";

export default function PatientDetails() {

  const { id } = useParams();

  const [patient, setPatient] =
    useState(null);

  const [medicines, setMedicines] =
    useState([]);

  const [records, setRecords] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPatientData();
  }, []);

  const loadPatientData =
    async () => {

      try {

        const patientRes =
          await api.get(
            `/patients/${id}`
          );

        const medicineRes =
          await api.get(
            "/medicines"
          );

        const adherenceRes =
          await api.get(
            `/adherence/patient/${id}`
          );

        const statsRes =
          await api.get(
            `/adherence/stats/${id}`
          );

        setPatient(
          patientRes.data
        );

        setMedicines(
          medicineRes.data.filter(
            (medicine) =>
              medicine.patientId?._id ===
              id
          )
        );

        setRecords(
          adherenceRes.data
        );

        setStats(
          statsRes.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading)
    return <LoadingSpinner />;

  return (
    <>
      <Navbar />

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Patient Details
        </h1>

        {/* Patient Info */}

        <div className="bg-white rounded shadow p-5 mb-6">

          <h2 className="text-2xl font-bold mb-4">
            {patient.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <strong>Age:</strong>
              {" "}
              {patient.age}
            </div>

            <div>
              <strong>Gender:</strong>
              {" "}
              {patient.gender}
            </div>

            <div>
              <strong>
                Telegram ID:
              </strong>
              {" "}
              {
                patient.telegramChatId
              }
            </div>

            <div>
              <strong>
                Emergency Contact:
              </strong>
              {" "}
              {
                patient.emergencyContact
              }
            </div>

          </div>

          <div className="mt-4">

            <strong>
              Medical Notes:
            </strong>

            <p className="mt-2">
              {
                patient.medicalNotes
              }
            </p>

          </div>

        </div>

        {/* Statistics */}

        {stats && (

          <div className="grid md:grid-cols-4 gap-4 mb-6">

            <StatsCard
              title="Total Doses"
              value={
                stats.totalDoses
              }
              icon="💊"
              color="blue"
            />

            <StatsCard
              title="Taken"
              value={stats.taken}
              icon="✅"
              color="green"
            />

            <StatsCard
              title="Missed"
              value={stats.missed}
              icon="❌"
              color="red"
            />

            <StatsCard
              title="Adherence %"
              value={`${stats.adherencePercentage}%`}
              icon="📈"
              color="yellow"
            />

          </div>

        )}

        {/* Medicines */}

        <div className="bg-white rounded shadow p-5 mb-6">

          <h2 className="text-xl font-bold mb-4">
            Medicines
          </h2>

          {medicines.length === 0 ? (

            <p>
              No medicines assigned.
            </p>

          ) : (

            <ul className="space-y-3">

              {medicines.map(
                (medicine) => (

                  <li
                    key={
                      medicine._id
                    }
                    className="border rounded p-3"
                  >

                    <div className="font-semibold">
                      {
                        medicine.medicineName
                      }
                    </div>

                    <div>
                      Dosage:
                      {" "}
                      {
                        medicine.dosage
                      }
                    </div>

                    <div>
                      Frequency:
                      {" "}
                      {
                        medicine.frequency
                      }
                    </div>

                    <div>
                      Reminder:
                      {" "}
                      {medicine.reminderTimes?.join(
                        ", "
                      )}
                    </div>

                  </li>

                )
              )}

            </ul>

          )}

        </div>

        {/* Recent Activity */}

        <div className="bg-white rounded shadow p-5">

          <h2 className="text-xl font-bold mb-4">
            Recent Activity
          </h2>

          {records.length === 0 ? (

            <p>
              No activity found.
            </p>

          ) : (

            <div className="space-y-3">

              {records
                .slice(0, 10)
                .map(
                  (
                    record
                  ) => (

                    <div
                      key={
                        record._id
                      }
                      className="border p-3 rounded"
                    >

                      <div>
                        <strong>
                          {
                            record
                              ?.medicineId
                              ?.medicineName
                          }
                        </strong>
                      </div>

                      <div>
                        Status:
                        {" "}
                        {
                          record.status
                        }
                      </div>

                      <div>
                        Scheduled:
                        {" "}
                        {new Date(
                          record.scheduledTime
                        ).toLocaleString()}
                      </div>

                    </div>

                  )
                )}

            </div>

          )}

        </div>

      </div>
    </>
  );
}