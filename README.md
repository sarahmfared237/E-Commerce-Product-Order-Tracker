
## Project Overview

An E-Commerce backend API built with NestJS + MongoDB to manage users, products, categories, and orders, with secure authentication and transactional order processing.

- Features

Auth: JWT login/signup, role-based access (user/admin).

Products & Categories: CRUD with stock management.

Orders: Transactional creation (order → order lines → stock update → total calculation).

Order Lines: Stores product, quantity, and price snapshot.

Statuses: Pending → confirmed → shipped → delivered.

- Stack

NestJS + Mongoose (MongoDB)

JWT Auth & Guards

Mongo Transactions (Replica Set)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# nest-starter-proj


## Database Setup

1. Make sure MongoDB is running locally
2. Create a `.env` file in the project root
3. Add your connection string:
```env
DB_URI=mongodb://localhost:27017/nest-db
JWT_SECRET= supersecret

```
4. The app will automatically connect to the database on startup

## API docs
included in the swagger file

## Backend Deployment on Railway
Automatic commits on main are automatically deployed on railway
The railway server: e-commerce-product-order-tracker-production.up.railway.app
