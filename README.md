# Phonebook App

> This is a minimal Phonebook App that allows you to add, edit, delete and search for contacts.
It is also a showcase app to demonstrate the use of tRPC to establish a type-safe communication between the frontend and backend.

### Tech Stack
- TypeScript
- Nuxt 3
- PrimeVue
- tRPC
- Prisma
- Docker + Docker Compose
- PostgreSQL

### Prerequisites
- Docker
- Node.js

### How to run
1. Clone the repo and move into the directory
```sh
git clone git@github.com:bogdanbucurps/ambr-phonebook.git
```

2. Install dependencies
```sh
yarn install
```

3. Initialize the database
```sh
docker-compose up -d
```

4. Run the database migrations
```sh
yarn prisma migrate dev
```

5. Start the app
```sh
yarn dev
```

6. Open the app in your browser at http://localhost:3000
