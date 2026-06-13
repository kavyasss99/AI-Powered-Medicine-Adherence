export default function AIInsights({
  insights
}) {

  if (!insights)
    return null;

  return (

    <div className="bg-white rounded shadow p-5">

      <h2 className="text-xl font-bold mb-4">
        AI Insights
      </h2>

      <div className="space-y-3">

        <div>
          <strong>
            Adherence Rate:
          </strong>
          {" "}
          {
            insights.adherenceRate
          }
          %
        </div>

        <div>
          <strong>
            Most Missed Medicine:
          </strong>
          {" "}
          {
            insights.mostMissedMedicine
          }
        </div>

        <div>
          <strong>
            Recommendation:
          </strong>

          <p className="mt-2">
            {
              insights.recommendation
            }
          </p>

        </div>

      </div>

    </div>
  );
}