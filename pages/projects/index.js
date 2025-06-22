import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import withAuth from "@/lib/withAuth";
import Navbar from "../../components/Navbar";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(list);
    };
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Projects</h1>
          <input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 w-full mb-6 rounded border"
          />
          <div className="grid gap-4">
            {filtered.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(ProjectsPage);
