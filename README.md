🧠 Bells Notes

Bells Notes is a modern student productivity web app built to help students organize notes, track academic tasks, and stay focused — designed with simplicity, speed, and dark-mode aesthetics in mind.

🚀 Live Demo: bellsnotes.vercel.app

📸 Preview

🛠️ Tech Stack
Frontend	Backend	Deployment
HTML5, CSS3, JavaScript (Vanilla JS)	Supabase (Auth & Database)	Vercel
✨ Features

🗒️ Create, edit, and delete notes

🔐 User authentication (Supabase)

🌗 Light/Dark theme toggle

🧭 Clean and responsive dashboard UI

💾 Auto-save and real-time updates

⚡ Fast, mobile-friendly interface

📂 Project Structure
BellsNotes/
│
├── index.html
├── /assets
│   ├── /css
│   │   ├── style.css
│   └── /js
│       ├── app.js
│       ├── supabase.js
│
└── README.md

⚙️ Setup Instructions

Clone the repository

git clone https://github.com/your-username/bells-notes.git
cd bells-notes


Open the project
You can open index.html directly in your browser or use a live server.

Configure Supabase

Create a new Supabase project

Copy your API URL and anon key

Paste them into supabase.js:

const SUPABASE_URL = "https://your-project-url.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


Deploy

Push your code to GitHub

Connect the repo to Vercel for automatic deployment

🌍 Environment Variables
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key

🧑‍💻 Author

Michael Omale
Frontend Developer & UI/UX Designer
📧 frontenddevmike@gmail.com

🌐 Portfolio

📜 License

This project is licensed under the MIT License — feel free to use and modify it.

Would you like me to format it for GitHub (Markdown) with badges (like HTML, JS, CSS, Supabase icons) and emoji sections, or keep it simple and minimal?

You said:
yh html css js,  notes and pq, theme toggle and search
ChatGPT said:

Perfect 🔥 Thanks, Michael.
Since Bells Notes is built with HTML, CSS, and JavaScript — and features notes, past questions (PQs), theme toggle, and search, here’s a clean, professional GitHub-ready README.md for your project.

You can copy this directly into your repo 👇

# 🧠 Bells Notes

**Bells Notes** is a modern, lightweight web app designed for **Bells University of Technology** students.  
It helps students **organize notes, access past questions (PQs)**, and switch seamlessly between **light and dark modes**, all within a fast, responsive interface.

> 🚀 Live Demo: [bellsnotes.vercel.app](https://bellsnotes.vercel.app)

---

## 📸 Preview
![Bells Notes Preview](./preview.png)

---

## 🛠️ Tech Stack

| Tech | Description |
|------|--------------|
| **HTML5** | Structure and semantic layout |
| **CSS3** | Responsive design, animations, and theming |
| **JavaScript (Vanilla JS)** | Dynamic features, theme toggle, and search functionality |

---

## ✨ Features

- 🗒️ **Notes Manager** – Create, view, and organize course notes easily  
- 📚 **Past Questions (PQs)** – Access PQs sorted by course or semester  
- 🌗 **Theme Toggle** – Switch between light and dark modes instantly  
- 🔍 **Search Bar** – Quickly find notes or PQs by title or keyword  
- 📱 **Responsive UI** – Works perfectly on mobile, tablet, and desktop  
- ⚡ **Fast Performance** – Lightweight and optimized for speed  

---

## 📂 Folder Structure



BellsNotes/
│
├── index.html
├── /assets
│ ├── /css
│ │ └── style.css
│ ├── /js
│ │ ├── app.js
│ │ ├── theme.js
│ │ └── search.js
│ ├── /images
│ └── /icons
│
└── README.md


---

## ⚙️ Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bells-notes.git
   cd bells-notes


Open the project

Launch index.html directly in your browser

Or use VS Code’s Live Server extension for real-time reloading

Explore

Toggle the theme (🌙/☀️)

Use the search bar to filter notes or PQs

View your saved notes and documents

🌍 Deployment

This project is hosted on Vercel for fast and reliable access.
You can deploy updates easily by linking your GitHub repo to Vercel.

🧑‍💻 Author

Michael Omale
Frontend Developer & UI/UX Designer
📧 frontenddevmike@gmail.com

🌐 Portfolio

📜 License

This project is licensed under the MIT License — free to use, modify, and share.

❤️ Acknowledgements

Built with dedication for Bells University students

Designed and developed by OCM Devs (Cortex)

Inspired by the need for smarter study tools
