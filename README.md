# 📚 Library Management System

A simple **Library Management System** built with **Node.js**, **Express.js**, **MongoDB**, and **EJS** following the **MVC architecture**. Supports book cover image uploads via **Multer** and a responsive UI with **Bootstrap 5**.

---

## 🖥️ Screenshots

| Dashboard | Books | Members |
|-----------|-------|---------|
| Total books & members stats | Add, edit, delete, search books | Add, edit, delete, search members |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| EJS | Templating engine (Views) |
| Bootstrap 5 | Responsive UI |
| Multer | File/image upload |
| Method-Override | PUT & DELETE from HTML forms |
| Nodemon | Auto-restart during development |

---

## 📁 Folder Structure

```
library-management/
├── app.js                        ← Entry point, server setup
├── db.js                         ← MongoDB connection
├── package.json                  ← Project dependencies
├── uploads/                      ← Uploaded book cover images (auto-created)
│   └── (images stored here)
├── public/                       ← Static assets
│   ├── css/
│   │   └── style.css             ← Custom styles
│   ├── js/                       ← Custom scripts
│   └── images/                   ← Static images
├── Controller/
│   ├── bookController.js         ← Book CRUD + Search + Image Upload logic
│   ├── memberController.js       ← Member CRUD + Search logic
│   └── dashboardController.js    ← Dashboard stats (total books, members)
├── Middleware/
│   └── upload.js                 ← Multer config for image uploads
├── Model/
│   ├── Book.js                   ← Book schema (title, author, isbn, coverImage...)
│   └── Member.js                 ← Member schema (name, email, mobile, address...)
├── Routes/
│   ├── bookRoutes.js             ← /books routes + upload middleware
│   ├── memberRoutes.js           ← /members routes
│   └── dashboardRoutes.js        ← / (home/dashboard) route
├── Views/
│   ├── dashboard.ejs             ← Home page with stats
│   ├── partials/
│   │   ├── header.ejs            ← Navbar + Bootstrap CDN links
│   │   └── footer.ejs            ← Bootstrap JS + closing tags
│   ├── books/
│   │   ├── index.ejs             ← View all books + search
│   │   ├── add.ejs               ← Add book form with image upload
│   │   ├── edit.ejs              ← Edit book form with image preview
│   │   └── details.ejs           ← Single book detail page (optional)
│   └── members/
│       ├── index.ejs             ← View all members + search
│       ├── add.ejs               ← Add member form
│       └── edit.ejs              ← Edit member form
└── README.md
```

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Community Server)
- [VS Code](https://code.visualstudio.com/)

---

## 🚀 How to Run (Step by Step)

### Step 1 — Clone or Download the Project

Download and unzip the project, or clone it:

```bash
git clone <your-repo-url>
cd library-management
```

### Step 2 — Open in VS Code

```
File → Open Folder → select the library-management folder
```

### Step 3 — Install Dependencies

Open the VS Code terminal (`Ctrl + ~`) and run:

```bash
npm install
```

### Step 4 — Start MongoDB

Open a **separate terminal** and start MongoDB:

```bash
# Windows
mongod

# Mac / Linux
sudo systemctl start mongod
```

> MongoDB will create a database called `libraryDB` automatically on first run.

### Step 5 — Start the Server

Back in VS Code terminal:

```bash
npm run dev
```

You should see:

```
Server is running on http://localhost:4000
MongoDB Connected to libraryDB
```

### Step 6 — Open in Browser

Go to → **http://localhost:4000**

---

## 📌 Available Routes

### Dashboard
| URL | Description |
|-----|-------------|
| `GET /` | Dashboard — total books & members |

### Books
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/books` | View all books (+ search by title) |
| GET | `/books/add` | Add new book form |
| POST | `/books/add` | Submit new book |
| GET | `/books/edit/:id` | Edit book form |
| PUT | `/books/edit/:id` | Update book |
| DELETE | `/books/delete/:id` | Delete book |

### Members
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/members` | View all members (+ search by name) |
| GET | `/members/add` | Add new member form |
| POST | `/members/add` | Submit new member |
| GET | `/members/edit/:id` | Edit member form |
| PUT | `/members/edit/:id` | Update member |
| DELETE | `/members/delete/:id` | Delete member |

---

## 📦 npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Start | `npm start` | Run with Node.js |
| Dev | `npm run dev` | Run with Nodemon (auto-restart) |

---

## 🔧 Configuration

The MongoDB connection string is in `db.js`:

```js
mongoose.connect("mongodb://localhost:27017/libraryDB")
```

To use a different database name, change `libraryDB` to your preferred name.

---

## ✅ Features

- ✔️ Add, View, Edit, Delete Books
- ✔️ Add, View, Edit, Delete Members
- ✔️ Search Books by Title
- ✔️ Search Members by Name
- ✔️ Book Cover Image Upload (Multer)
- ✔️ Dashboard with Total Books & Members
- ✔️ Success & Error Alerts
- ✔️ Responsive UI with Bootstrap 5
- ✔️ Proper MVC Architecture

---

## 🖼️ Book Cover Image Upload (Multer)

This section explains how image uploading works end to end.

### How it works

```
User uploads file  →  Multer saves to uploads/1719500000000.jpg
                   →  req.file.filename = "1719500000000.jpg"
                   →  Saved in MongoDB as coverImage: "1719500000000.jpg"

Browser requests   →  GET /uploads/1719500000000.jpg
                   →  express.static serves file from uploads/ folder
                   →  Image displays in <img src="/uploads/1719500000000.jpg">
```

---

### 1. `app.js` — Serve the uploads folder as static

```js
app.use('/uploads', express.static('uploads'));

// Auto-create uploads folder if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
```

---

### 2. `Middleware/upload.js` — Multer config

```js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
        // saves as: 1719500000000.jpg
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
```

---

### 3. `Model/Book.js` — Add `coverImage` field

```js
coverImage: {
    type: String,
    default: 'default.jpg'   // fallback if no image uploaded
}
```

---

### 4. `Controller/bookController.js` — Save filename from multer

```js
const addBook = async (req, res) => {
    const coverImage = req.file ? req.file.filename : 'default.jpg';

    await Book.create({
        ...req.body,
        coverImage   // saves "1719500000000.jpg" to DB
    });
    res.redirect('/books?success=Book added successfully');
};
```

---

### 5. `Routes/bookRoutes.js` — Attach upload middleware

```js
const upload = require('../Middleware/upload');

router.post('/add', upload.single('coverImage'), addBook);
router.put('/edit/:id', upload.single('coverImage'), updateBook);
```

---

### 6. `Views/books/add.ejs` — Form must have `enctype`

```html
<form action="/books/add" method="POST" enctype="multipart/form-data">
    ...
    <input type="file" name="coverImage" class="form-control" accept="image/*">
    ...
</form>
```

---

### 7. `Views/books/index.ejs` — Display the image

```html
<img src="/uploads/<%= book.coverImage %>"
     alt="<%= book.title %>"
     width="60" height="80"
     style="object-fit: cover; border-radius: 4px;"
     onerror="this.src='/uploads/default.jpg'">
```

---

### 8. `Views/books/edit.ejs` — Show current image + allow replace

```html
<!-- Show current image -->
<% if (book.coverImage) { %>
    <img src="/uploads/<%= book.coverImage %>"
         alt="Current Cover"
         width="80" height="100"
         style="object-fit: cover; border-radius: 6px;">
    <p class="text-muted small mt-1">Current cover image</p>
<% } %>

<!-- Upload new image (optional) -->
<input type="file" name="coverImage" class="form-control" accept="image/*">
<small class="text-muted">Leave empty to keep current image</small>
```

> **Image src pattern:** `/uploads/<%= book.coverImage %>` — this is the path used in every EJS view to display a book's cover image.

---

## 👨‍💻 Author

Built as a project using Node.js MVC architecture.