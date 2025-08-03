"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import styles from "./ModelDetailsPage.module.css";
import { useState } from "react";

const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      description
      image
      price
      type
      specs {
        bodyWood
        bridge
        pickups
      }
      musicians {
        bands
        musicianImage
        name
      }
    }
  }
`;

export default function ModelDetailsPage() {
  const params = useParams();

  const brandId = String(params.brandId);
  const modelId = String(params.modelId);

  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
    skip: !brandId || !modelId,
  });

  const [activeTab, setActiveTab] = useState("specs");

  const [musicianPage, setMusicianPage] = useState(0);
  const MUSICIANS_PER_PAGE = 2;

  if (loading) return <p>Loading model details...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.findUniqueModel) return <p>Model not found</p>;

  const model = data.findUniqueModel;
  const musicians = model.musicians || [];

  const startIdx = musicianPage * MUSICIANS_PER_PAGE;
  const endIdx = startIdx + MUSICIANS_PER_PAGE;
  const pagedMusicians = musicians.slice(startIdx, endIdx);

  const totalPages = Math.ceil(musicians.length / MUSICIANS_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={model.image} alt={model.name} className={styles.image} />
        <div>
          <h1 className={styles.title}>{model.name}</h1>
          <p className={styles.details}>
            <strong>Price:</strong> ${model.price} <br />
            <strong>Type:</strong> {model.type}
          </p>
        </div>
      </div>

      <div>
        <button
          onClick={() => setActiveTab("specs")}
          disabled={activeTab === "specs"}
          className={activeTab === "specs" ? styles.activeTab : ""}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab("musicians")}
          disabled={activeTab === "musicians"}
          className={activeTab === "musicians" ? styles.activeTab : ""}
        >
          Musicians
        </button>
      </div>

      {activeTab === "specs" && (
        <>
          <h2 className={styles.sectionTitle}>Specifications</h2>
          <ul className={styles.specList}>
            <li>
              <strong>Body Wood:</strong> {model.specs.bodyWood}
            </li>
            <li>
              <strong>Bridge:</strong> {model.specs.bridge}
            </li>
            <li>
              <strong>Pickups:</strong> {model.specs.pickups}
            </li>
          </ul>
        </>
      )}

      {activeTab === "musicians" && (
        <>
          <h2 className={styles.sectionTitle}>Musicians</h2>
          {pagedMusicians.length > 0 ? (
            pagedMusicians.map((m) => (
              <div key={m.name} className={styles.musician}>
                <img
                  src={m.musicianImage}
                  alt={m.name}
                  className={styles.musicianImage}
                />
                <div className={styles.musicianInfo}>
                  <h4>{m.name}</h4>
                  <p>
                    <strong>Bands:</strong> {m.bands.join(", ")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No musicians found for this model.</p>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMusicianPage(idx)}
                  className={musicianPage === idx ? styles.activeDot : ""}
                >
                  ●
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <p className={styles.description}>{model.description}</p>
    </div>
  );
}
