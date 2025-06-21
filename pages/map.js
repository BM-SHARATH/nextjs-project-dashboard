import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "next/router";
import withAuth from "@/lib/withAuth";

function MapPage() {
  const mapRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const loadMap = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const features = projects.map((project) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(project.coords)),
          name: project.name,
        });
        feature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scale: 0.05,
            }),
          })
        );
        feature.setId(project.id);
        return feature;
      });

      const vectorLayer = new VectorLayer({
        source: new VectorSource({ features }),
      });

      const map = new Map({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() }), vectorLayer],
        view: new View({
          center: fromLonLat([77.5946, 12.9716]),
          zoom: 5,
        }),
      });

      map.on("singleclick", function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (feature) {
          const id = feature.getId();
          if (id) {
            router.push(`/projects/${id}`);
          }
        });
      });
    };

    loadMap();
  }, [router]);

  return <div ref={mapRef} className="w-full h-screen" />;
}
export default withAuth(MapPage);
