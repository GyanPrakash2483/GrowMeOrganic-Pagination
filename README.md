
# GrowMeOrganic Pagination

A React + TypeScript application that displays artwork data from the Art Institute of Chicago API with **custom checkbox selection**, and **PrimeReact DataTable** integration. Built for a React internship assignment with all constraints and checks fulfilled.

##  Demo

Live URL: https://growmeorganicpgn.netlify.app


##  Features

-  **Vite + React + TypeScript** setup
-  **PrimeReact DataTable** for grid rendering
-  **Server-side pagination** using the `page` query param
-  **Row selection with checkboxes**
-  **Custom selection control panel** using an overlay and input number
-  **Selection persists across pagination**
-  Displays fields: `title`, `place_of_origin`, `artist_display`, `inscriptions`, `date_start`, `date_end`
-  **Graceful fallback** for missing data
-  Styled with TailwindCSS + PrimeReact theme

## 🛠️ Technologies Used

- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [PrimeReact](https://primereact.org/datatable/)
- [TailwindCSS](https://tailwindcss.com/)
- [Art Institute of Chicago API](https://api.artic.edu/api/v1/artworks)

## 📦 Setup & Installation

### Prerequisites

- Node.js
- npm, yarn or pnpm

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/GyanPrakash2483/GrowMeOrganic-Pagination
cd GrowMeOrganic-Pagination
```

2. **Install dependencies**

```bash
npm install
```

3. **Run locally**

```bash
npm run dev
```

4. Visit `http://localhost:5173` in your browser.


## 📊 Pagination Logic
- API endpoint:  
  `https://api.artic.edu/api/v1/artworks?page=<pageNumber>`
- On each page change:
  - A new API call is made.
  - No data is cached across pages to **prevent memory overflow** (per assignment instructions).


## ✅ Row Selection Logic

- Checkbox selection per row using `<Column selectionMode="multiple" />`
- Custom selection panel:
  - Opens via a dropdown icon.
  - Lets user input how many rows to auto-select from current page.
- Selection is **persisted across pages** using a shared `selections` state.

## 🧪 Assignment Requirements Met

✅ Vite + TypeScript used  
✅ PrimeReact DataTable used  
✅ Server-side pagination  
✅ Selection panel with persistence  
✅ No data cache across pages  
✅ Deployed (non-Vercel platform)  
✅ Clean codebase, all fields rendered