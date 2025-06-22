import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import withAuth from "@/lib/withAuth";
import Image from "next/image";
import Navbar from "../../components/Navbar";

function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [section, setSection] = useState("images");

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const docRef = doc(db, "projects", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setProject(snap.data());
      }
    };
    fetch();
  }, [id]);

  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
          <div className="mb-4 space-x-4">
            <button
              onClick={() => setSection("images")}
              className={`px-4 py-2 rounded ${
                section === "images"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setSection("videos")}
              className={`px-4 py-2 rounded ${
                section === "videos"
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              Videos
            </button>
          </div>

          {section === "images" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images?.length > 0 ? (
                project.images.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={`Project Image ${idx + 1}`}
                    width={400}
                    height={300}
                    className="rounded shadow"
                    style={{ height: "auto" }}
                  />
                ))
              ) : (
                <p>No images available.</p>
              )}
            </div>
          )}

          {section === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.videos?.length > 0 ? (
                project.videos.map((src, idx) => (
                  <div key={idx} className="aspect-video w-full">
                    <iframe
                      src={src.replace("/shorts/", "/embed/")}
                      title={`Project Video ${idx + 1}`}
                      className="w-full h-full rounded shadow"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))
              ) : (
                <p>No videos available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default withAuth(ProjectDetails);
