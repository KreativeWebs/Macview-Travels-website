import { useEffect, useState } from "react";
import adminAxios from "../../api/adminAxios";
import { toast } from "react-toastify";

export default function AdminNewsletterSubscribers() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await adminAxios.get("/newsletter/subscribers");
        setSubscribers(res.data);
      } catch (error) {
        toast.error("Failed to load subscribers");
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div className="card">
      <div className="card-header"><h4>Newsletter Subscribers</h4></div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed At</th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((s) => (
              <tr key={s._id}>
                <td>{s.email}</td>
                <td>{new Date(s.subscribedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
