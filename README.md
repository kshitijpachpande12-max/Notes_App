# Notes App

A simple full-stack notes application I built using React, Node.js, Express, and MongoDB.

The app lets you create, view, edit, and delete notes.

## Features

* Create notes
* View notes
* Edit notes
* Delete notes
* View individual notes
* Simple and responsive UI

## Tech used

**Frontend**

* React
* Vite
* Tailwind CSS
* DaisyUI
* Axios
* React Router
* React Hot Toast

**Backend**

* Node.js
* Express
* MongoDB
* Mongoose

## Project structure

```text
Notes/
├── Backend/
├── Frontend/
├── .gitignore
└── README.md
```

## Running the project

Clone the repository:

```bash
git clone https://github.com/kshitijpachpande12-max/Notes_App
```

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder with your MongoDB connection string.

Then start the backend:

```bash
npm run dev
```

### Frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Note

The `.env` file is not included in the repository because it contains private configuration such as the MongoDB connection string.

## Future improvements

* User authentication
* Search notes
* Categories/tags
* Pin important notes
* Better UI and animations

## Author

Kshitij Pachpande
