# PeerT — Travel Companion Backend

PeerT is a travel companion application designed to help users plan, organize, and manage their trips in a single place.

This repository contains the **backend service**, built with **Node.js and TypeScript**, following **Clean Architecture principles**. The backend is responsible for handling business logic, integrations with external travel-related APIs, and user-specific data management.

---

## 🚀 Project Vision

PeerT aims to become a smart travel assistant that helps users:

- Organize trips and destinations
- Plan itineraries and activities
- Track expenses and bookings
- Retrieve contextual travel information such as weather, currency exchange, and flight options
- Compare travel options and offers based on user preferences

The application is designed to evolve incrementally, starting from a solid domain-driven backend.

---

## 🧱 Architecture

The backend follows **Clean Architecture**, with clear separation of concerns:

- **Domain**  
  Core business entities and value objects. No framework or infrastructure dependencies.

- **Application**  
  Use cases that orchestrate business rules and domain logic.

- **DataAccess**  
  Implementations for repositories and integrations with external services and APIs.

- **API**  
  HTTP layer (Express) exposing the backend functionality.

This structure ensures scalability, testability, and long-term maintainability.

---

## 📐 Domain Model

> This diagram represents the core domain model and aggregate boundaries,
> following Domain-Driven Design and Clean Architecture principles.

![Domain Class Diagram](docs/diagram.png)

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express
- Clean Architecture
- External Travel APIs (Weather, Currency Exchange, Flights, Hotels)
- Prisma ORM
- Docker and Azure for deployment and containerization
---

## 🌍 External APIs & Integrations (Planned)

This project is designed to integrate with multiple third-party APIs to enrich the travel experience, centralizing data from different providers into a single backend (BFF-style architecture).

Below is a list of **tentative APIs** selected based on relevance, realism, and learning value.

---

### 🗺️ Mapbox
**Purpose:** Maps, geolocation, and places  

**Use cases:**
- Displaying destinations on maps  
- Geocoding and reverse geocoding  
- Distance and route calculations  
- Autocomplete for destinations and places  

Mapbox is chosen as a flexible and developer-friendly alternative to Google Maps.

---

### ✈️ Amadeus
**Purpose:** Flights and aviation data  

**Use cases:**
- Airport and airline information  
- Flight search and offers  
- IATA code validation  
- Travel planning support  

Amadeus provides a realistic travel-tech experience and offers a sandbox environment suitable for development and portfolio projects.

---

### 🏨 Hotels API
**Purpose:** Accommodation data  

**Use cases:**
- Hotel search by destination  
- Basic hotel information and availability  
- Price comparisons (where available)  

This integration is exploratory and may be used to enrich trip planning with accommodation suggestions.

---

### 🌦️ OpenWeather
**Purpose:** Weather and forecasts  

**Use cases:**
- Current weather per destination  
- Forecasts aligned with trip dates  
- Weather-based itinerary insights  

Weather data significantly improves user experience by adding contextual information to trips.

---

### 🗿 OpenTripMap
**Purpose:** Tourist attractions and points of interest  

**Use cases:**
- Discovering landmarks and attractions  
- Enriching destinations with cultural and touristic data  
- Suggesting activities within a trip itinerary  

OpenTripMap is open and well-suited for exploration without heavy commercial restrictions.

---

### 💱 ExchangeRate API
**Purpose:** Currency conversion  

**Use cases:**
- Budget calculations  
- Expense tracking across multiple currencies  
- Shared trip expenses  

Useful for trips involving multiple countries and currencies.

---

### 🔐 Auth0
**Purpose:** Authentication and authorization  

**Use cases:**
- Secure user authentication  
- JWT-based access control  
- Role and permission management  

Auth0 may be used to handle authentication flows while keeping the backend stateless.

---

### 💳 dLocal
**Purpose:** Payments and subscriptions  

**Use cases:**
- Subscription management  
- Payment flows  
- Webhook-based payment events  

dLocal is planned as the payment provider, aligning with real-world fintech integrations and subscription-based features.

---
## 📌 Project Status

This project is currently in **early development**, with a focus on:
- Domain modeling
- Core entities and value objects
- Foundational backend architecture

Features and integrations will be added incrementally.

