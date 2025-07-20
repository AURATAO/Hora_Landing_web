# Hora Mission Matching Landing Web (Local Dev)

This project includes:

- ⚛️ React frontend (Vite) → in `/Hora`
- 🦦 Go backend server → in `/backend`
- 🔐 PocketBase as lightweight backend DB → in `/pocketbase`

---

## 💻 Local Development

1. Start PocketBase:

```bash
cd pocketbase
./pocketbase serve
Start Go backend:

bash
Copy
Edit
cd backend
go run main.go
Start React frontend:

bash
Copy
Edit
cd Hora
npm install
npm run dev

Visit http://localhost:5173 to test the form
```

# backend/.env.example

EMAIL_FROM=your_email@gmail.com
EMAIL_TO=team@example.com
EMAIL_PASS=your_app_password
