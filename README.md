This is an excellent, well-structured README\! The concept of hand gesture control for a food reel app is genuinely unique and compelling.

Here is a redesigned version, focusing on a more polished, marketing-friendly, and slightly condensed flow, while keeping all the critical technical and installation details easily accessible.

---

# 🍽️ FoodReels - Hand Gesture Controlled Food Delivery App

## The Future of Browsing: Hands-Free Food Reels

[](https://foodreels-rw3e.onrender.com)
[](https://github.com/luckyChauhan12w/FoodReels/stargazers)
[](https://www.google.com/search?q=LICENSE)
[](https://github.com/luckyChauhan12w/FoodReels)

---

## 🎬 Core Concept: Demo Video

FoodReels combines the addictive vertical feed experience of TikTok/Instagram with cutting-edge, **AI-powered hand gesture controls** for a truly hands-free experience.

| Feature           | Gesture        | Action                            |
| :---------------- | :------------- | :-------------------------------- |
| **Play**          | 👋 Open Palm   | Starts video playback             |
| **Pause**         | ✊ Closed Fist | Pauses video playback             |
| **Next Reel**     | 👆 Hand Up     | Scrolls to the next food reel     |
| **Previous Reel** | 👇 Hand Down   | Scrolls to the previous food reel |

[](https://ik.imagekit.io/gaxmekqtag/Zomato_Project_Videos/FoodReelVideoDemo.mp4)

**[▶️ Watch the Full Demo Video](https://ik.imagekit.io/gaxmekqtag/Zomato_Project_Videos/FoodReelVideoDemo.mp4)**

---

## ✨ Standout Features

### 👋 AI-Powered Hand Gesture Controls

- **MediaPipe Integration:** Uses the advanced MediaPipe Hands model for robust, real-time hand tracking.
- **Intelligent Detection:** Implements speed-based detection to differentiate intentional swipes from accidental movements.
- **Camera Preview:** Responsive and non-intrusive camera view on both desktop and mobile.

### 🎥 Modern Video Reel Experience

- **Auto-Play Feed:** Vertical, snap-scroll feed with automatic playback using the **Intersection Observer API**.
- **Metadata Overlay:** Displays food item details (name, price, restaurant) directly on the reel.

### 🛡️ Secure & Scalable Backend

- **Dual Authentication:** Separate, JWT-secured authentication systems for **Users** and **Food Partners**.
- **Full CRUD for Partners:** Dedicated Partner Dashboard to upload videos and manage food item details.

### 📱 Responsive Design

- Built with a **mobile-first** approach using **TailwindCSS** for a seamless experience on all devices.

---

## 💻 Tech Stack Deep Dive

| Layer         | Technology               | Key Features                                          |
| :------------ | :----------------------- | :---------------------------------------------------- |
| **Frontend**  | **React & Vite**         | Fast development, modular components.                 |
| **AI/Vision** | **MediaPipe**            | Real-time Hand Tracking and gesture logic.            |
| **Styling**   | **TailwindCSS**          | Utility-first, highly responsive UI.                  |
| **Backend**   | **Node.js & Express.js** | High-performance, unopinionated server environment.   |
| **Database**  | **MongoDB & Mongoose**   | Flexible, NoSQL database with robust object modeling. |
| **Security**  | **JWT & bcrypt**         | Stateless authentication and secure password hashing. |

### 🛠️ Key Components

| Component             | Function                                                                  |
| :-------------------- | :------------------------------------------------------------------------ |
| `useHandControls.js`  | Custom hook managing MediaPipe hand tracking and gesture detection logic. |
| `useVideoObserver.js` | Custom hook leveraging Intersection Observer for auto-play/pause logic.   |
| `ReelVideo.jsx`       | Component integrating all video controls, gestures, and metadata display. |

---

## 🚀 Quick Start & Installation

### Prerequisites

- `node >= 14.x`
- `npm >= 6.x`
- `mongodb >= 4.x`

### 1\. Clone & Setup

```bash
git clone https://github.com/luckyChauhan12w/FoodReels.git
cd FoodReels
```

### 2\. Install Dependencies

```bash
# Install Backend
cd backend && npm install

# Install Frontend
cd ../frontend && npm install
```

### 3\. Environment Configuration

Create the necessary `.env` files with your settings:

| File                        | Key Variables                                 |
| :-------------------------- | :-------------------------------------------- |
| `backend/.env`              | `PORT`, `MONGODB_URI`, `JWT_SECRET`           |
| `frontend/.env.development` | `VITE_API_BASE_URL=http://localhost:5000/api` |

### 4\. Run the Application

| Terminal                  | Command                      | Access                  |
| :------------------------ | :--------------------------- | :---------------------- |
| **Terminal 1 (Backend)**  | `cd backend && npm start`    | `http://localhost:5000` |
| **Terminal 2 (Frontend)** | `cd frontend && npm run dev` | `http://localhost:5173` |

---

## 📂 Project Structure Overview

```
FoodReels/
├── backend/
│   ├── src/
│   │   ├── controllers/  # API logic
│   │   ├── models/       # Database schemas
│   │   ├── routes/       # Express endpoints
│   └── ...
│
└── frontend/
    ├── src/
    │   ├── components/   # UI components
    │   ├── pages/        # Main views (Auth, Partner, General)
    │   ├── hooks/        # useHandControls, useVideoObserver, etc.
    └── ...
```

---

## 🤝 Contribution & Support

Contributions are highly encouraged\! Feel free to pick up an open issue or suggest a new feature.

### Good First Issues

- Implement a loading skeleton component.
- Add a dark mode toggle.
- Improve video caching strategies.
- Implement a "Like" and "Comment" system.

<!-- end list -->

1.  Fork the repo (`https://github.com/luckyChauhan12w/FoodReels/fork`)
2.  Create your feature branch (`git checkout -b feature/new-gesture`)
3.  Commit your changes (`git commit -m 'Feat: Added new gesture control'`)
4.  Push to the branch (`git push origin feature/new-gesture`)
5.  Open a Pull Request\!

---

## 📝 License & Author

This project is licensed under the **MIT License**.

Made with ❤️ by **Lucky Chauhan**

- GitHub: [@luckyChauhan12w](https://github.com/luckyChauhan12w)
- LinkedIn: [Lucky Chauhan](https://www.linkedin.com/in/luckychauhandev/)

**If you found this project helpful or inspiring, please give it a star on GitHub\! ⭐**
