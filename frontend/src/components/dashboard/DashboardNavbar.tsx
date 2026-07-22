import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="mb-8 flex items-center justify-between rounded-3xl bg-white p-6 shadow">
      <h1 className="text-3xl font-bold text-violet-600">
        EMOFI
      </h1>

      <div className="flex gap-3">
        <Link to="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>

        <Link to="/history">
          <Button variant="outline">History</Button>
        </Link>

        <Link to="/analytics">
    <Button variant="outline">Analytics</Button>
</Link>
<Link to="/profile">
    <Button variant="outline">Profile</Button>
</Link>

        <Button
          variant="destructive"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}