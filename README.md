# PeerT — Travel Companion Backend

PeerT is a travel companion application designed to help users plan, organize, and manage their trips in a single place.

This repository contains the **backend service**, built with **Node.js and TypeScript**. The backend is responsible for handling business logic, integrations with external travel-related APIs, and user-specific data management.

---

## 🚀 Project Vision

PeerT aims to become a smart travel assistant that helps users:

- Organize trips and destinations
- Plan itineraries and activities
- Track expenses and bookings
- Retrieve contextual travel information such as weather, currency exchange, and flight options
- Compare travel options and offers based on user preferences

---

## 🧱 Architecture

The backend follows a standard layered Node.js architecture:

```
src/
├── routes/        # Route definitions and middleware wiring
├── controllers/   # Request/response handling
├── services/      # Business logic
├── data/          # Prisma client
├── middlewares/   # Validation and auth middlewares
├── validators/    # Joi schemas
├── errors/        # Custom error classes
└── types/         # TypeScript type extensions
```

---

## 📐 Data Model

![Domain Class Diagram](docs/diagram.png)

---

## 🛠️ Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **ORM:** Prisma (PostgreSQL)
- **Auth:** JWT + bcrypt
- **Validation:** Joi
- **Dev:** nodemon + ts-node
- **Infra:** Docker

---

## ⚙️ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- Node.js 18+

### 1. Clone and install

```bash
git clone https://github.com/mauriuy007/PeerT-
cd PeerT-
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

The defaults in `.env.example` already match the Docker Compose config, so no changes needed for local development.

### 3. Start the database

```bash
docker compose up -d
```

### 4. Run migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start the server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://peert:peert@localhost:5432/peert` |
| `JWT_SECRET` | Secret used to sign JWT tokens | `change_this_in_production` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |

---

## 📡 API Endpoints

All endpoints except `/api/auth/*` require a `Bearer` token in the `Authorization` header.

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and get token | No |

### Users
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users` | List all users |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/users` | Create a user |
| `PUT` | `/api/users/:id` | Update a user |
| `DELETE` | `/api/users/:id` | Delete a user |

### Trips
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips` | List all trips |
| `GET` | `/api/trips/:id` | Get trip by ID |
| `POST` | `/api/trips` | Create a trip |
| `PUT` | `/api/trips/:id` | Update a trip |
| `DELETE` | `/api/trips/:id` | Delete a trip |
| `POST` | `/api/trips/:id/participants` | Add participant to a trip |

### Bookings
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bookings` | List all bookings |
| `GET` | `/api/bookings/:id` | Get booking by ID |
| `POST` | `/api/bookings` | Create a booking |
| `PUT` | `/api/bookings/:id` | Update a booking |
| `DELETE` | `/api/bookings/:id` | Delete a booking |

### Expenses
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/expenses` | List all expenses |
| `GET` | `/api/expenses/:id` | Get expense by ID |
| `POST` | `/api/expenses` | Create an expense |
| `PUT` | `/api/expenses/:id` | Update an expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense |

### Itinerary Items
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/itinerary` | List all itinerary items |
| `GET` | `/api/itinerary/:id` | Get item by ID |
| `POST` | `/api/itinerary` | Create an itinerary item |
| `PUT` | `/api/itinerary/:id` | Update an itinerary item |
| `DELETE` | `/api/itinerary/:id` | Delete an itinerary item |

### Destinations
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/destinations` | List all destinations |
| `GET` | `/api/destinations/:id` | Get destination by ID |
| `POST` | `/api/destinations` | Create a destination |
| `PUT` | `/api/destinations/:id` | Update a destination |
| `DELETE` | `/api/destinations/:id` | Delete a destination |

---

## 🌍 External APIs & Integrations (Planned)

This project is designed to integrate with multiple third-party APIs to enrich the travel experience, centralizing data from different providers into a single backend (BFF-style architecture).

---

### 🗺️ Mapbox
**Purpose:** Maps, geolocation, and places

**Use cases:**
- Displaying destinations on maps
- Geocoding and reverse geocoding
- Distance and route calculations
- Autocomplete for destinations and places

---

### ✈️ Amadeus
**Purpose:** Flights and aviation data

**Use cases:**
- Airport and airline information
- Flight search and offers
- IATA code validation
- Travel planning support

---

### 🏨 Hotels API
**Purpose:** Accommodation data

**Use cases:**
- Hotel search by destination
- Basic hotel information and availability
- Price comparisons (where available)

---

### 🌦️ OpenWeather
**Purpose:** Weather and forecasts

**Use cases:**
- Current weather per destination
- Forecasts aligned with trip dates
- Weather-based itinerary insights

---

### 🗿 OpenTripMap
**Purpose:** Tourist attractions and points of interest

**Use cases:**
- Discovering landmarks and attractions
- Enriching destinations with cultural and touristic data
- Suggesting activities within a trip itinerary

---

### 💱 ExchangeRate API
**Purpose:** Currency conversion

**Use cases:**
- Budget calculations
- Expense tracking across multiple currencies
- Shared trip expenses

---

### 💳 dLocal
**Purpose:** Payments and subscriptions

**Use cases:**
- Subscription management
- Payment flows
- Webhook-based payment events

---

## 📌 Project Status

Currently in active development. Core backend is functional with authentication, CRUD for all entities, and Docker-based local setup. External API integrations are planned for the next phase.
