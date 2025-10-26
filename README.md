# 💾 SnipMate — Code Snippet Manager

### 🚀 Overview
**SnipMate** is a full-stack web application that allows developers to **save, organize, and search their code snippets** securely and efficiently.  
It eliminates the hassle of digging through old files or chats to find reusable code — helping developers stay productive and organized.

---

### 💡 Problem Statement
Developers often need to reuse small code blocks (API calls, regex patterns, UI components) but waste time locating them across projects.  
Existing solutions are either **complex, unstructured, or lack instant access.**

**SnipMate** solves this by offering a **personal, searchable, and secure code snippet vault** with real-time updates and seamless cross-device access.

---

### 🎯 Objective
To create a **lightweight, intuitive, and responsive snippet management system** that:
- Stores and categorizes snippets with tags
- Supports instant search and filtering
- Provides secure user authentication
- Enables copy-to-clipboard and quick editing

---

### 🧩 Key Features
- 🔐 **User Authentication:** Secure JWT-based login and signup with session management.  
- 🧠 **Dynamic Search:** Real-time snippet filtering by title, tag, or language using React Hooks.  
- ⚡ **Instant Updates:** No page reloads — all operations happen dynamically through REST APIs.  
- 📋 **Clipboard Copy:** One-click copy of any snippet for rapid reuse.  
- 📱 **Responsive UI:** Built with React and modern CSS for 100% mobile compatibility.  
- 🗂️ **Organized Dashboard:** View, create, edit, and delete snippets in a clean and intuitive layout.  

---

### 🏗️ Tech Stack
**Frontend:** React.js, JavaScript, CSS, react-icons  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT, bcrypt  
**API Testing:** Postman  
**Version Control:** Git, GitHub  

---

### ⚙️ Architecture Overview
1. **Frontend:** React app manages snippet state and communicates with backend via REST APIs.  
2. **Backend:** Express.js routes handle CRUD operations for snippets and authentication.  
3. **Database:** MongoDB stores users and their associated snippets with metadata and tags.  
4. **Security:** JWT tokens and bcrypt ensure user data protection and access control.

---

### 📸 Demo
<img width="1364" height="595" alt="Capture3" src="https://github.com/user-attachments/assets/8e41bae8-26d6-4570-a3c2-5971a6a7e4a9" />
<img width="1361" height="604" alt="Capture2" src="https://github.com/user-attachments/assets/e249bb53-88a4-4051-9d29-91a48e9d71b1" />
<img width="1353" height="607" alt="Capture1" src="https://github.com/user-attachments/assets/f20ceb76-4883-4719-8877-bffe36cbdbee" />

