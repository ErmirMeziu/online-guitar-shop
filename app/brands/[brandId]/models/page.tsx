"use client";

import { gql, useQuery } from "@apollo/client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./ModelsPage.module.css";

const GET_BRAND_MODELS = gql`
  query GetBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
      description
    }
  }
`;

export default function ModelsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const brandId = pathname.split("/")[2];

  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data } = useQuery(GET_BRAND_MODELS, {
    variables: { id: brandId, sortBy: { field: "name", order: "ASC" } },
  });

  if (loading) return <p>Loading models...</p>;
  if (error) return <p>Error loading models 😢</p>;

  const filteredModels = data.findBrandModels.filter((model: any) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
  <div className={styles.container}>
    <h1 className={styles.title}>Guitar Models for Brand {brandId}</h1>

    <input
      type="text"
      placeholder="Search models..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.searchInput}
    />

    <div className={styles.modelGrid}>
      {filteredModels.map((model: any) => (
        <div
          key={model.id}
          className={styles.modelCard}
          onClick={() => router.push(`/brands/${brandId}/models/${model.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              router.push(`/brands/${brandId}/models/${model.id}`);
            }
          }}
        >
          <div className={styles.modelImageWrapper}>
            <img
              src={model.image && model.image.startsWith("http") ? model.image : "/placeholder-guitar.png"}
              alt={model.name}
              className={styles.modelImage}
              loading="lazy"
            />
          </div>
          <div className={styles.modelContent}>
            <h3 className={styles.modelName}>{model.name}</h3>
            <p className={styles.modelType}>{model.type}</p>
            <p className={styles.modelDescription}>{model.description}</p>
            <p className={styles.modelPrice}>${model.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
