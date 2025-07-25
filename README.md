# 📚 Minimal Library Management System

A responsive and minimalist Library Management System built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, **Express.js**, and **MongoDB**. It allows users to manage books, borrow them, and view a summarized report — all without authentication.

---

## 🚀 Features

### ✅ Public Routes (No Authentication)
- All functionalities are accessible publicly.

### 📘 Book Management
- **View All Books** in a table format.
- **Add New Book** with required details.
- **Edit Book** information (title, copies, etc.).
- **Delete Book** with confirmation.
- **Borrow Book** with due date & quantity selection.

### 📦 Borrow System
- Borrow a selected book using a simple form.
- Quantity validation ensures it doesn’t exceed available copies.
- Updates book availability automatically.

### 📊 Borrow Summary
- Aggregated summary of borrowed books.
- Displays: **Book Title**, **ISBN**, **Total Quantity Borrowed**.

---

## 📂 Pages

| Route               | Description                                 |
|--------------------|---------------------------------------------|
| `/books`           | View all books with Edit/Delete/Borrow      |
| `/create-book`     | Add new book                                |
| `/edit-book/:id`   | Edit existing book                          |
| `/borrow/:bookId`  | Borrow a book                               |
| `/borrow-summary`  | View borrowed books summary                 |

---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Frontend    | React, TypeScript, Tailwind CSS          |
| State Mgmt  | Redux Toolkit, RTK Query                 |
| Backend     | Node.js, Express.js                     |
| Database    | MongoDB (Mongoose)                      |

---

## 📦 Backend Overview

### 📚 Book Model
\`\`\`ts
{
  title: string,
  author: string,
  genre: string,
  isbn: string,
  description: string,
  copies: number,
  available: boolean
}
\`\`\`

### 🔄 Borrow Model
\`\`\`ts
{
  book: ObjectId (ref: Book),
  quantity: number,
  dueDate: string
}
\`\`\`

### API Routes
| Method | Route            | Description            |
|--------|------------------|------------------------|
| GET    | `/books`         | Get all books          |
| GET    | `/books/:id`     | Get book by ID         |
| POST   | `/books`         | Create book            |
| PUT    | `/books/:id`     | Update book            |
| DELETE | `/books/:id`     | Delete book            |
| POST   | `/borrow`        | Borrow a book          |
| GET    | `/borrow`        | Get borrow summary     |

---

## 🎨 UI/UX

- **Minimal & Clean** interface using Tailwind CSS.
- **Responsive** across mobile, tablet, and desktop.
- **Toast notifications** for success/error feedback.
- **Optimistic UI** for better user experience.

---


---

## 📦 Installation & Setup

### 🔧 Backend

\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

### 💻 Frontend

\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

Ensure MongoDB is running locally or provide a connection string in your \`.env\`.

---

## 🔗 Deployment Links

- **Frontend Live**: [https://library-management-zeta-three.vercel.app]
- **Backend Live**: [https://library-project-eta.vercel.app/]

---

## 📁 Folder Structure (Client)

\`\`\`
src/
├── components/
├── pages/
│   ├── books/
│   ├── borrow/
├── redux/
│   ├── features/
│   └── store.ts
├── types/
└── App.tsx
\`\`\`

---

