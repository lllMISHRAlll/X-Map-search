# 🌍 X Map

A React-based frontend for a full-stack location search and map interface with authentication and search history management.

![Demo Screenshot]() _(Add screenshot path here)_

## ✨ Key Features

### 🔐 Authentication

- Email/password signup and login
- Google OAuth login
- Forgot password flow with email verification
- JWT-based session management

### 🗺️ Location Search

- Interactive Google Maps integration
- Search bar with auto-suggestions
- Toggleable search history sidebar
- History item management (view/delete)

### 🧩 Code Architecture

- Modular component structure
- HOC-based route protection (`withAuth`)
- CSS Modules for scoped styling
- Centralized route configuration

---

## 🚀 Tech Stack

| Category          | Technologies Used        |
| ----------------- | ------------------------ |
| **Frontend**      | React.js, CSS Modules    |
| **Maps**          | `@react-google-maps/api` |
| **Routing**       | React Router DOM         |
| **HTTP Client**   | Axios                    |
| **Icons**         | Iconify                  |
| **Notifications** | React Toastify           |

---

## 📂 Project Structure

```bash
src/
├── assets/            # Static assets
├── components/        # Reusable UI components
│   ├── Map/           # Map-related components
│   └── AuthForms/     # Auth form components
├── config/
│   └── routesConfig.js # Route definitions
├── hoc/
│   └── withAuth.js    # Auth HOC
├── pages/             # Route pages
│   ├── DashBoard.jsx
│   ├── Login.jsx
│   └── (...)
├── services/          # API services
│   ├── authServices.js
│   └── userServices.js
├── stylesheets/       # CSS Modules
├── App.jsx            # Root component
└── main.jsx           # Entry point

```

⚙️ Setup
Install dependencies

bash

```
npm install
```

Configure environment variables
Create .env file:

env

```
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_API_BASE_URL=http://localhost:5000/api
```

Run development server

bash

```
npm run dev
```

🔗 Key Implementation Highlights
🛡️ Protected Routes (HOC)
jsx

```
// Example: withAuth.js
const withAuth = (WrappedComponent, requireAuth = true) => {
return (props) => {
const { user } = useAuth();
const navigate = useNavigate();

    useEffect(() => {
      if (requireAuth && !user) navigate("/login");
      if (!requireAuth && user) navigate("/dashboard");
    }, [user]);

    return <WrappedComponent {...props} />;

};
};
```

🗺️ Google Maps Integration
jsx

```
<GoogleMap
zoom={12}
center={selectedLocation}
mapContainerClassName="map-container"

> {selectedLocation && <Marker position={selectedLocation} />}
> </GoogleMap>

```
