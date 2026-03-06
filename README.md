# 🖥️ WHS Frontend (Warehouse Management System)

A modern B2B Warehouse Management System UI built using **Next.js + TypeScript**, designed for fast, scalable, and API-driven warehouse operations. The frontend connects directly to the live WHS backend API to manage inventory, warehouses, and staff in real time.

# 🌐 Live Application

**Frontend:** [https://inwex.tech/](https://inwex.tech/)

The system is fully operational and accessible publicly.

# ⚡ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | React framework for server/client rendering |
| **TypeScript** | Static typing for maintainable code |
| **TailwindCSS** | Utility-first styling |
| **shadcn/ui** | Accessible and reusable UI components |
| **Lucide Icons** | Clean modern icons |
| **Recharts** | Data visualization for dashboard |
| **Context API** | Global state management |
| **Sonner** | Toast notifications |
| **Vercel** | Frontend hosting & deployment |

---

# 🧩 Core Application Modules

The frontend is divided into several feature-based modules:

* **📊 Dashboard:** Displays analytics, low stock alerts, and warehouse insights.
* **📦 Inventory:** Product listing, creation, updates, and management.
* **🏢 Warehouses:** Manage physical locations and warehouse information.
* **👥 Staff:** Manage employees and role assignments.
* **🔐 Authentication:** Login system with secure token handling.

---

# 🔐 Authentication System

Authentication uses token-based login powered by **Knox** on the backend.

### 🔄 Authentication Flow:
1. User logs in with email + password.
2. Backend returns a unique authentication token.
3. Token is stored in the client session.
4. All subsequent API requests include the token in the header:

`Authorization: Token <user_token>`

---

# 👥 Role-Based Interface (RBAC)

The UI dynamically adjusts features based on the user role returned by the API.

| Role | Interface Permissions |
| :--- | :--- |
| **Admin** | Full system control & configuration |
| **Business** | Manage warehouses and employees |
| **Manager** | Manage inventory and staff tasks |
| **Warehouse Staff** | Update inventory and warehouse actions |

---

# 📊 Dashboard & Analytics

The dashboard provides a visual overview of warehouse health using **Recharts** for interactive visualization. Key metrics include:
* Total inventory statistics
* Low stock warnings & automated alerts
* Inventory distribution across locations
* Real-time warehouse insights

---

# 🔎 Search & Filtering System

The application includes high-performance filtering components used across all modules:
* **Text Search:** Instant lookup for products or staff.
* **Category Filters:** Sort by warehouse, status, or type.
* **Real-time Updates:** UI filters dynamically without page reloads.

---

# 🧠 State Management

Global application data is managed using the **React Context API**, keeping the app lightweight and scalable without the overhead of Redux.

| Context | Purpose |
| :--- | :--- |
| `AuthContext` | Handles user sessions and authentication state |
| `ProductContext` | Manages inventory data and CRUD operations |
| `WarehouseContext` | Stores and updates warehouse information |
| `StaffContext` | Manages employee data and actions |
| `DashboardContext` | Handles global statistics and analytics |

---

# 🚀 Deployment

The frontend is deployed using **Vercel**, enabling:
* **CI/CD:** Automatic deployment on every push.
* **Global CDN:** Fast delivery to any location.
* **Serverless:** Scalable edge rendering for high performance.

---

# 📌 Project Goal

WHS aims to provide a scalable warehouse management platform for B2B businesses by combining a powerful backend API with a modern, high-performance frontend experience.
