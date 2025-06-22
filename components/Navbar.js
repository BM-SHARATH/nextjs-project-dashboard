import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setDisplayName(snap.data().name);
        } else {
          setDisplayName(user.email);
        }
      };
      fetch();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link href="/projects" className="text-blue-600 hover:underline">
          Projects
        </Link>
        <Link href="/map" className="text-blue-600 hover:underline">
          Map
        </Link>
        <Link href="/charts" className="text-blue-600 hover:underline">
          Charts
        </Link>
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-semibold">{displayName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
