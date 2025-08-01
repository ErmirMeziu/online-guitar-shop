"use client";

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import styles from "./BrandsPage.module.css";

const GET_GUITAR_BRANDS = gql`
  query GetAllBrands {
    findAllBrands {
      id
      name
      image
    }
  }
`;

export default function BrandsPage() {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_GUITAR_BRANDS);

  if (loading) return <p>Loading guitar brands...</p>;
  if (error) return <p>Error loading brands 😢</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎸 Guitar Brands</h1>
      <div className={styles.brandsGrid}>
        {data.findAllBrands.map((brand: any) => (
          <div
            key={brand.id}
            className={styles.brandCard}
            onClick={() => router.push(`/brands/${brand.id}/models`)}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className={styles.brandImage}
            />
            <p className={styles.brandName}>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
