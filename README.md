# 🍔 FoodReels - Food Delivery App with Hand Gesture Controls

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/luckyChauhan12w/FoodReels)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/luckyChauhan12w/FoodReels)](https://github.com/luckyChauhan12w/FoodReels/stargazers)
[![Forks](https://img.shields.io/github/forks/luckyChauhan12w/FoodReels)](https://github.com/luckyChauhan12w/FoodReels/network)

> A TikTok/Instagram-style food delivery application with AI-powered hand gesture controls using MediaPipe. Swipe through food reels hands-free!

## 🎥 Demo

[![FoodReels Demo](https://ik.imagekit.io/gaxmekqtag/Zomato_Project_Videos/FoodReelVideoDemo.mp4)](https://ik.imagekit.io/gaxmekqtag/Zomato_Project_Videos/FoodReelVideoDemo.mp4)

**[Watch Full Demo Video →](https://ik.imagekit.io/gaxmekqtag/Zomato_Project_Videos/FoodReelVideoDemo.mp4)**

## ✨ Features

### 👋 Hand Gesture Controls
- **Open Palm** - Play video
- **Closed Fist** - Pause video
- **Hand Up** - Scroll to next reel
- **Hand Down** - Scroll to previous reel
- Speed-based gesture detection for intentional movements
- Responsive camera preview (Mobile: 160x140px, Desktop: 280x240px)

### 🎬 Video Reels Experience
- TikTok/Instagram-style vertical video feed
- Auto-play on scroll with Intersection Observer
- Snap scroll behavior for smooth transitions
- Food item metadata display (name, price, restaurant)

### 🔐 Authentication System
- User registration and login
- Food partner authentication
- JWT-based secure authentication
- Protected routes with middleware

### 🍕 Food Partner Features
- Partner registration and profile management
- Video upload functionality for food items
- Partner dashboard for content management
- Food item creation with video and details

### 📱 Responsive Design
- Mobile-first responsive UI
- Optimized for all screen sizes
- Touch and gesture dual support
- Cross-browser compatibility

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **MediaPipe** - Hand tracking and gesture recognition
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
```bash
node >= 14.x
npm >= 6.x
mongodb >= 4.x
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/luckyChauhan12w/FoodReels.git
cd FoodReels
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Environment Setup**

Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/foodreels
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

**Frontend (.env.development)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Frontend (.env.production)**
```env
VITE_API_BASE_URL=https://your-production-api.com/api
```

5. **Run the Application**

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Access the Application**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 📁 Project Structure

```
FoodReels/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   ├── db/               # Database connection
│   │   └── app.js            # Express app setup
│   ├── index.js              # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── pages/            # Page components
    │   │   ├── auth/         # Authentication pages
    │   │   ├── food-partner/ # Partner pages
    │   │   └── general/      # Public pages
    │   ├── hooks/            # Custom React hooks
    │   ├── lib/              # API client
    │   ├── routes/           # Route configuration
    │   └── main.jsx          # App entry point
    └── package.json
```

## 🎯 Key Components

### Hand Gesture Detection (`useHandControls.js`)
```javascript
// Custom hook for MediaPipe hand tracking
- Detects hand landmarks in real-time
- Calculates finger positions and gestures
- Triggers callbacks for play/pause/scroll actions
```

### Video Observer (`useVideoObserver.js`)
```javascript
// Intersection Observer for auto-play
- Monitors video visibility in viewport
- Auto-plays visible videos
- Pauses off-screen videos
```

### Reel Video Component (`ReelVideo.jsx`)
```javascript
// Main video reel component
- Integrates hand gesture controls
- Manages video playback state
- Displays food item information
```

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/register          - User registration
POST /api/auth/login             - User login
POST /api/auth/partner/register  - Partner registration
POST /api/auth/partner/login     - Partner login
```

### Food Items
```
GET    /api/food-items           - Get all food items
POST   /api/food-items           - Create food item (Partner only)
GET    /api/food-items/:id       - Get single food item
PUT    /api/food-items/:id       - Update food item (Partner only)
DELETE /api/food-items/:id       - Delete food item (Partner only)
```

### Food Partners
```
GET    /api/partners/:id         - Get partner profile
PUT    /api/partners/:id         - Update partner profile
```

## 🌟 Features in Detail

### Hand Gesture Recognition
The app uses **MediaPipe Hands** for real-time hand tracking:
- Detects 21 hand landmarks
- Calculates finger distances for gesture recognition
- Speed-based detection to avoid accidental triggers
- Configurable sensitivity and thresholds

### Video Reel System
- Vertical scrolling video feed
- Snap-to-section scroll behavior
- Auto-play when 50% visible
- Muted playback with tap-to-unmute
- Video metadata overlay

### Authentication Flow
- JWT-based stateless authentication
- Separate user and partner roles
- Protected routes for authorized access
- Password hashing with bcrypt

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Good First Issues
- [ ] Add loading skeleton components
- [ ] Implement dark mode
- [ ] Add video caching
- [ ] Write unit tests
- [ ] Improve error handling
- [ ] Add video upload progress indicator
- [ ] Implement like/comment features
- [ ] Add search functionality

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Lucky Chauhan**
- GitHub: [@luckyChauhan12w](https://github.com/luckyChauhan12w)
- LinkedIn: [Lucky Chauhan](https://www.linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- [MediaPipe](https://google.github.io/mediapipe/) - Hand tracking solution
- [MongoDB](https://www.mongodb.com/) - Database
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - CSS framework

## 📊 Project Stats

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/luckyChauhan12w/FoodReels)
![GitHub last commit](https://img.shields.io/github/last-commit/luckyChauhan12w/FoodReels)
![GitHub repo size](https://img.shields.io/github/repo-size/luckyChauhan12w/FoodReels)

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue [here](https://github.com/luckyChauhan12w/FoodReels/issues).

## 📞 Support

If you like this project, please give it a ⭐ on GitHub!

---

**Made with ❤️ by Lucky Chauhan**