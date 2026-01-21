# מדריך הרצת הפרויקט

## דרישות מוקדמות

- **Node.js** (גרסה 18 ומעלה)
- **npm**

---

## 🚀 הרצת הבקאנד

```bash
cd backend
npm install
npm run dev
```

השרת ירוץ על `http://localhost:3000`

**הערה:** ודא שקובץ `backend/.env` מכיל את המשתנים:
- `PORT=3000`
- `SUPABASE_URL=your_supabase_url`
- `SUPABASE_KEY=your_supabase_key`

---

## 🎨 הרצת הפרונט

```bash
cd frontend
npm install
npm start
```

האפליקציה תרוץ על `http://localhost:4200`

---

## 🔧 הרצת שני השרתים יחד

**טרמינל 1:**
```bash
cd backend && npm run dev
```

**טרמינל 2:**
```bash
cd frontend && npm start
```

---

## 📝 הערות

- הבקאנד מוגדר לקבל בקשות מ-`http://localhost:4200` בלבד
- אם יש שגיאת CORS, ודא ששני השרתים רצים על הפורטים הנכונים
