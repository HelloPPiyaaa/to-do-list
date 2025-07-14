# to-do-list

# Todo App (React + TypeScript)

แอปพลิเคชันจัดการรายการ Todo ที่พัฒนาด้วย React และ TypeScript โดยเชื่อมต่อกับ API สำหรับการทำงาน CRUD ครบถ้วน พร้อมฟีเจอร์แสดงสถานะโหลดและจัดการข้อผิดพลาด

---

## 📌 คุณสมบัติหลัก

- แสดงรายการ Todo จาก API
- เพิ่มรายการ Todo ใหม่
- แก้ไขรายการ Todo
- ลบรายการ Todo
- สลับสถานะ Todo (ทำแล้ว / ยังไม่ทำ)
- กรอง Todo ตามวันที่
- แสดง Todo สำหรับวันนี้ / ยังไม่ทำ / ทำแล้ว

---

## 🗂 โครงสร้างโปรเจกต์

todo-app/
├── Backend/ # json-server
│ └── db.json
├── Frontend/ # React + TypeScript
│ ├── src/
│ │ ├── components/ # ส่วนประกอบ เช่น TodoItem, TodoForm, Type definitions
│ │ ├── pages/ # หน้าจอหลัก เช่น AllTodo.tsx
│ │ ├── services/ # โค้ดเรียก API (todoApi.ts)
│ │ ├── misc/ # ไฟล์ CSS และอื่น ๆ
│ │ └── App.tsx # จุดเริ่มต้นแอป
│ └── package.json
├── README.md # ไฟล์นี้

---

## 💻 วิธีการใช้งาน

### 1. โคลนโปรเจกต์

```bash
git clone https://github.com/your-username/todo-app.git

cd todo-app
```

## ติดตั้ง dependencies และรัน Backend API

cd Backend
npm install
npm run server

## ติดตั้ง dependencies และรัน Frontend

เปิดเทอร์มินัลใหม่ แล้วสั่ง

cd Frontend
npm install
npm start

เปิดเบราว์เซอร์และเข้าใช้งานที่
http://localhost:3000

## ⚙️ รายละเอียดการพัฒนาและเหตุผล

React + TypeScript

- ใช้ React แบบ Functional Components พร้อม Hooks (useState, useEffect) เพื่อความง่ายและประสิทธิภาพในการจัดการ state และ lifecycle
- TypeScript ช่วยเพิ่มความปลอดภัยของโค้ดด้วยการตรวจสอบชนิดข้อมูลตั้งแต่เขียนโค้ด ลดข้อผิดพลาดใน runtime

## การแยก Frontend และ Backend

- แยกส่วน Backend (API server) ออกจาก Frontend ช่วยให้จัดการและพัฒนาแยกกันได้ง่าย
- Backend สามารถเปลี่ยนแปลงหรือพัฒนาต่อได้โดยไม่กระทบ Frontend และกลับกัน
- ใช้ API แบบ RESTful ผ่าน fetch ทำให้เรียนรู้และดูแลรักษาง่าย

## โครงสร้าง Component

- TodoItem รับผิดชอบแสดง Todo แต่ละรายการ พร้อมปุ่มแก้ไข, ลบ, และ toggle สถานะ
- TodoForm ใช้สำหรับสร้างและแก้ไข Todo โดยรองรับทั้งสองกรณี
- TaskSummary แสดงจำนวนของ Todo แต่ละสถานะ
- TimelineCalendar แสดงไทม์ไลน์ของ Todo แต่ละช่วงเวลา แบบปฏิทิน
  -Type เก็บ type ของ user และ todo

## 🛠️ เครื่องมือและไลบรารีที่ใช้

- React 18+
- TypeScript
- React Icons
- Fetch API (built-in)
- json-server
