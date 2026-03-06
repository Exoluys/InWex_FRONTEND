🖥 WHS Frontend (Warehouse Management System)

A modern B2B Warehouse Management System UI built using Next.js + TypeScript, designed for fast, scalable, and API-driven warehouse operations.

The frontend connects directly to the live WHS backend API to manage inventory, warehouses, and staff in real time.

🌐 Live Application

Frontend
➡ https://inwex.tech/

The system is fully operational and accessible publicly.

⚡ Tech Stack
Technology	Purpose
Next.js (App Router)	React framework for server/client rendering
TypeScript	Static typing for maintainable code
TailwindCSS	Utility-first styling
shadcn/ui	Accessible and reusable UI components
Lucide Icons	Clean modern icons
Recharts	Data visualization for dashboard
Context API	Global state management
Sonner	Toast notifications
Vercel	Frontend hosting & deployment

🧩 Core Application Modules

The frontend is divided into several feature-based modules.

Module	Description
Dashboard	Displays analytics, low stock alerts, and warehouse insights
Inventory	Product listing, creation, updates, and management
Warehouses	Manage warehouses and warehouse information
Staff	Manage employees and staff assignments
Authentication	Login system with token authentication

🔐 Authentication System

Authentication uses token-based login powered by Knox from the backend.

Flow:

1️⃣ User logs in with email + password
2️⃣ Backend returns authentication token
3️⃣ Token stored in client session
4️⃣ All API requests include the token

Example header used by the frontend:

Authorization: Token <user_token>

This allows secure communication with protected backend APIs.

👥 Role-Based Interface

The frontend dynamically adjusts UI features depending on the user role returned by the backend.

Role	Interface Permissions
Admin	Full system control
Business	Manage warehouses and employees
Manager	Manage inventory and staff
Warehouse Staff	Update inventory and perform warehouse tasks

The UI hides or shows features depending on the role flags returned by the API.

📦 Inventory Interface

The inventory module provides tools to manage warehouse products.

Features:

• View product inventory
• Add new products
• Update product information
• Delete products
• Search and filter products

📊 Dashboard Analytics

The dashboard provides a visual overview of warehouse activity.

Displayed information includes:

• Total inventory statistics
• Low stock warnings
• Inventory distribution charts
• Warehouse insights

Charts are built using Recharts for interactive visualization.

🔎 Search & Filtering System

The application includes reusable search and filtering components.

Capabilities:

• Text search
• Category filters
• Real-time UI filtering
• Reusable across multiple modules

This allows users to quickly locate inventory items, warehouses, or staff.

🧠 State Management

Global application data is managed using React Context API.

Contexts used in the application:

Context	Purpose
AuthContext	Authentication and user session
ProductContext	Inventory state and operations
WarehouseContext	Warehouse data management
StaffContext	Staff data and actions
DashboardContext	Dashboard statistics and analytics

This approach keeps the application lightweight and scalable without Redux.

🔔 Notification System

User feedback is provided using toast notifications.

Examples include:

• Product added successfully
• Inventory updated
• Error loading data
• Staff member created

Notifications ensure users receive immediate feedback on actions.

🎨 UI Design

The interface focuses on clean, responsive, and professional design.

Key UI characteristics:

• Fully responsive layout
• Modern dashboard style
• Accessible components via shadcn/ui
• Consistent color system
• Smooth user interactions

The goal is to provide enterprise-grade usability for warehouse operations.

🚀 Deployment

The frontend is deployed using Vercel, enabling:

• Automatic CI/CD deployment
• Fast global CDN delivery
• Serverless edge rendering
• Zero-downtime updates

Every push to the repository automatically updates the live application.

📌 Project Goal

WHS aims to provide a scalable warehouse management platform for B2B businesses, combining:

• Powerful backend APIs
• Modern frontend experience
• Role-based access control
• Real-time warehouse insights
