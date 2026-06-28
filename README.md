# TaskFlow OS

A production-quality full-stack MERN application that serves as a premium task management operating system. Inspired by the aesthetics of Linear, Notion, and Arc Browser, TaskFlow OS delivers a fast, beautiful, and highly interactive user experience.

## ✨ Features

- **Dual Views**: Seamlessly switch between List View and Kanban Board.
- **Advanced Filtering & Sorting**: Filter tasks by status, priority, and category. Sort by date, priority, and newest/oldest.
- **Command Palette**: Press `Ctrl+K` anywhere to quickly navigate, add tasks, or switch views.
- **Real-Time Search**: Instantaneous search across task titles and descriptions.
- **Premium Design**: Dark mode by default, glassmorphism UI, bento-grid layouts, and smooth Framer Motion microinteractions.
- **Responsive Architecture**: Fully optimized for desktop, tablet, and mobile devices.
- **Beautiful Empty States**: Motivational text and clean illustrations when no tasks are present.
- **Toast Notifications**: Elegant success and error notifications.
- **Full CRUD Support**: Create, Read, Update, and Delete tasks efficiently.

## 🏗 Architecture

**Frontend Stack (React 19 + Vite)**:
- **Styling**: TailwindCSS for utility-first styling and theming.
- **Animations**: Framer Motion for card entrances, modal transitions, and drag effects.
- **State Management & Data Fetching**: Custom hooks (`useTasks`) combined with Axios.
- **Icons**: Lucide React for consistent, crisp iconography.
- **Notifications**: React Hot Toast.

**Backend Stack (Node.js + Express.js)**:
- **Database**: MongoDB Atlas and Mongoose for object modeling.
- **Validation**: Express Validator for robust API request validation.
- **Middleware**: Custom error handling and standard CORS setup.

## 🚀 Installation & Local Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB server)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/taskflow-os.git
cd taskflow-os
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window and navigate to the project root:
```bash
npm install
```

Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api/tasks
```

Start the Vite development server:
```bash
npm run dev
```

## 🌍 Deployment Instructions

### Deploying the Backend to Render
1. Push your code to a GitHub repository.
2. Log into [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend` (if you split the repo) or customize the build command if in a monorepo.
5. Set Build Command: `npm install`
6. Set Start Command: `npm start`
7. Add the environment variables (`PORT`, `MONGO_URI`, `CLIENT_URL` pointing to your deployed frontend).

### Deploying the Frontend to Vercel
1. Log into [Vercel](https://vercel.com) and click **Add New Project**.
2. Import the GitHub repository.
3. Framework Preset should automatically detect **Vite**.
4. Set the Build Command: `npm run build`
5. Add the environment variable: `VITE_API_URL` pointing to your Render backend URL.
6. Click **Deploy**.

## 📸 Screenshots

*(Replace these placeholder links with actual screenshots of your application)*

| Dashboard View | Kanban View |
|:---:|:---:|
| ![Dashboard Placeholder](https://via.placeholder.com/600x400/0A0A0A/FFFFFF?text=Dashboard+List+View) | ![Kanban Placeholder](https://via.placeholder.com/600x400/0A0A0A/FFFFFF?text=Kanban+Board+View) |

| Command Palette | Add Task Modal |
|:---:|:---:|
| ![Command Palette Placeholder](https://via.placeholder.com/600x400/0A0A0A/FFFFFF?text=Command+Palette) | ![Modal Placeholder](https://via.placeholder.com/600x400/0A0A0A/FFFFFF?text=Add+Task+Modal) |

---
*TaskFlow OS - Built with precision and care.*
