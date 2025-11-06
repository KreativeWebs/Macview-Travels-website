export default function SearchBox() {
  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        style={{ width: "280px" }}
        placeholder="Search clients, bookings..."
      />
    </div>
  );
}
