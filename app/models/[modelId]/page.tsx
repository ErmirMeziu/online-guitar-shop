"use client";

import { gql, useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";

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
        key
        value
      }
      musicians {
        id
        name
        image
      }
    }
  }
`;

export default function ModelDetailsPage() {
  const pathname = usePathname(); // e.g., /models/123
  const modelId = pathname.split("/")[2];

  // Since your models page URL doesn't include brandId, you can
  // optionally pass an empty string or handle it differently.
  const brandId = ""; 

  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
  });

  if (loading) return <p>Loading model details...</p>;
  if (error) return <p>Error loading model details 😢</p>;

  const model = data.findUniqueModel;

  if (!model) return <p>Model not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{model.name}</h1>
      <img src={model.image} alt={model.name} style={{ maxWidth: 300 }} />
      <p>{model.description}</p>
      <p>Price: ${model.price}</p>
      <p>Type: {model.type}</p>

      <h2>Specifications</h2>
      <ul>
        {model.specs.map((spec: any) => (
          <li key={spec.key}>
            <strong>{spec.key}:</strong> {spec.value}
          </li>
        ))}
      </ul>

      <h2>Musicians Using This Guitar</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {model.musicians.map((musician: any) => (
          <li key={musician.id} style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src={musician.image}
              alt={musician.name}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <span>{musician.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
