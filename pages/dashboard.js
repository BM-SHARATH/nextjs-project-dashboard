import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import withAuth from "@/lib/withAuth";

function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
        <p className="mb-4">
          You are logged in as: <strong>{user?.email}</strong>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/projects"
            className="p-4 bg-white rounded shadow hover:shadow-md"
          >
            📁 View Projects
          </a>
          <a
            href="/map"
            className="p-4 bg-white rounded shadow hover:shadow-md"
          >
            🗺️ View Map
          </a>
          <a
            href="/charts"
            className="p-4 bg-white rounded shadow hover:shadow-md"
          >
            📊 View Charts
          </a>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);
