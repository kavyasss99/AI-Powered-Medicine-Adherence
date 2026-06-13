export default function ConfirmDeleteModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px]">

        <h2 className="text-xl font-bold mb-3">
          {title}
        </h2>

        <p className="text-gray-600 mb-5">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="
              px-4 py-2
              rounded
              bg-gray-300
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2
              rounded
              bg-red-500
              text-white
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}