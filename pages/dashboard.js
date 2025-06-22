import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      const fetchName = async () => {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setDisplayName(data.name || user.email);
        } else {
          setDisplayName(user.email);
        }
      };
      fetchName();
    }
  }, [user, router]);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Welcome, {displayName}</h1>
          </div>
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
              🗘️ View Map
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
    </>
  );
}
