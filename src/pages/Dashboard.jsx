import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../api";
import StatsCard
from "../components/StatsCard";

export default function Dashboard() {
  const [stats, setStats] =
    useState({
      totalDoses: 0,
      taken: 0,
      missed: 0,
      adherencePercentage: 0
    });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      try {
        const patients =
          await api.get(
            "/patients"
          );

        if (
          !patients.data.length
        )
          return;

        const patientId =
          patients.data[0]._id;

        const response =
          await api.get(
            `/dashboard/${patientId}`
          );

        setStats(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white shadow rounded p-4">
            <h3 className="text-gray-500">
              Total Doses
            </h3>

            <p className="text-3xl font-bold">
              {
                stats.totalDoses
              }
            </p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="text-gray-500">
              Taken
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {stats.taken}
            </p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="text-gray-500">
              Missed
            </h3>

            <p className="text-3xl font-bold text-red-600">
              {
                stats.missed
              }
            </p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="text-gray-500">
              Adherence %
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              {
                stats.adherencePercentage
              }
              %
            </p>
          </div>

        </div>

        <div className="mt-8 flex gap-4">

          <a
            href="/patients"
            className="bg-blue-500 text-white px-6 py-3 rounded"
          >
            Manage Patients
          </a>

          <a
            href="/medicines"
            className="bg-green-500 text-white px-6 py-3 rounded"
          >
            Manage Medicines
          </a>

        </div>
      </div>
    </>
  );
}