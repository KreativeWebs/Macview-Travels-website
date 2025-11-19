import { NavLink } from "react-router-dom";

export default function Sidebar({ open }) {
  const menu = [
    { name: "Dashboard", path: "", icon: "fa-solid fa-house" },
    { name: "Visa Requests", path: "visa", icon: "fa-solid fa-passport" },
    {
      name: "Flight Bookings",
      path: "flights",
      icon: "fa-solid fa-plane-departure",
    },
    {
      name: "Hotel Bookings",
      path: "hotels",
      icon: "fa-solid fa-hotel",
    },
    { name: "Packages", path: "packages", icon: "fa-solid fa-suitcase" },
    {
      name: "Package Bookings",
      path: "package-bookings",
      icon: "fa-solid fa-shopping-cart",
    },
    { name: "Transfers", path: "transfers", icon: "fa-solid fa-car" },
    {
      name: "Visa Requirements",
      path: "visa-requirements",
      icon: "fa-solid fa-file-alt",
    },
    {
      name: "Create Newsletter",
      path: "createnewsletter",
      icon: "fa-solid fa-envelope-open",
    },
    {
      name: "Subscribers",
      path: "viewnewsletter",
      icon: "fa-solid fa-users",
    },
    { name: "Settings", path: "settings", icon: "fa-solid fa-gear" },
  ];

  return (
    <div
      className=" d-flex flex-column"
      style={{
        width: open ? "220px" : "70px",
        transition: "0.3s",
        minHeight: "100vh",
        backgroundColor: "transparent",
      }}
    >
      <nav className="mt-2">
        {menu.map((m) => {
          // Use absolute admin paths to avoid relative navigation like "/admin/visa/settings"
          const link = m.path ? `/admin/${m.path}` : "/admin";
          return (
            <NavLink
              key={m.path}
              to={link}
              end
              className={({ isActive }) =>
                `d-flex align-items-center p-2 text-decoration-none mb-1 sidebar-link ${
                  isActive ? "active-item" : ""
                }`
              }
              style={{ transition: "0.3s", marginTop: "10px" }}
            >
              <i
                className={`${m.icon}`}
                style={{
                  width: "45px",
                  textAlign: "center",
                  fontSize: "18px",
                  marginRight: open ? "10px" : "0",
                }}
              />
              {open && <span>{m.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <style>
        {`
          /* default (inactive item) */
          .sidebar-link {
            color: #5e5858ff;
            background: transparent;
          }

           .sidebar-link i {
            color: #175aa1;
            background: transparent;
          }

          /* remove hover background on inactive items */
          .sidebar-link:hover {
            background: transparent;
            color: #175aa1;
          }

          /* active menu item */
          .active-item {
            background: #f1741e !important;
            color: #fff !important;
            border-radius: 0 !important; /* no rounded edges */
          }

          .active-item i {
            color: #fff !important;
          }
        `}
      </style>
    </div>
  );
}
