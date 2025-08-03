# 🎸 Online Guitar Shop – Software Engineer Intern Assignment

This is a 3-page online guitar shop built with **Next.js** and **Apollo Client**. It fetches data from a GraphQL API and allows users to explore guitar brands, models, and detailed specifications.

---

## 📁 Pages Overview

### 🔹 Page 1 – Guitar Brands
- Displays all guitar brands fetched from the API.
- Clicking a brand navigates to Page 2.

### 🔹 Page 2 – Guitar Models
- Displays models for the selected brand.
- Includes:
  - 🔍 Search bar to filter models by name.
  - 🎛 Filter by guitar type.
  - 📄 Pagination (or infinite scroll if bonus added).
- Clicking a model navigates to Page 3.

### 🔹 Page 3 – Guitar Details (Bonus)
- Displays detailed information about the selected guitar in **two tabs**:
  - **Specs Tab**: All specifications of the guitar.
  - **Musicians Tab**: Shows musicians using the guitar (2 at a time, with dots/buttons to load more).

---

## ⚙️ Tech Stack

- **Next.js** (App Router)
- **Apollo Client**
- **GraphQL**
- **CSS Modules**
- Optional: i18n (for language switcher), Infinite scroll

---

## 🚀 Getting Started

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Run the app locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🌐 GraphQL API

- Endpoint: [https://graphql-api-brown.vercel.app/api/graphql](https://graphql-api-brown.vercel.app/api/graphql)

---

## 📄 Project Structure

```
app/
  └── brands/
      └── [brandId]/
          └── models/
              └── [modelId]/
                  └── page.tsx   # Page 3 – Guitar Details
              └── page.tsx       # Page 2 – Guitar Models
  └── page.tsx                   # Page 1 – Guitar Brands

styles/
  └── *.module.css              # CSS Modules for styling

components/
  └── Tabs, MusicianCard, etc.  # Reusable UI components
```

---

## ✅ Requirements Met

- [x] Apollo Client used for all GraphQL queries.
- [x] Search and filter working on models page.
- [x] Tabs implemented for specs and musicians.
- [x] Musicians list paginated (2 at a time).
- [x] Styled using CSS modules.
- [x] Loading and error states handled.
- [x] Optional: Internationalization ready (if added).
- [x] Next.js + App Router used.

---

## 📌 Author & Notes

Feel free to reach out if you need help running the project or reviewing the code.
