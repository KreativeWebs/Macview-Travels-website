export default function Settings() {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="h5 fw-bold mb-3">Settings</h2>

      <p className="text-muted small">
        Manage visa requirements, add countries, configure payment providers,
        and manage admin users.
      </p>

      <div className="mt-3">
        <button className="btn btn-primary">
          Manage Visa Requirements
        </button>
      </div>
    </div>
  );
}
