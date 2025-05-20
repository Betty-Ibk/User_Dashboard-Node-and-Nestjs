
Testing the NestJS API Endpoints
You can use tools like Postman or any HTTP client to test your API endpoints:

1. Create a User
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "test@example.com",
  "firstname": "Segun",
  "lastname": "Peters",
  "password": "myPassword123",
  "dateJoined": "2023-01-01"
}
2. Get All Users (with pagination and filtering)
http://localhost:3000/users?page=1&limit=10&startDate=2025-05-14&endDate=2025-05-20
3. Get User by ID
GET http://localhost:3000/users/1
4. Update User (Make user active)
PATCH http://localhost:3000/users/1
Content-Type: application/json

{
  "isApproved": true
}
5. Delete User
DELETE http://localhost:3000/users/1
6. Get User Metrics for Dashboard
GET http://localhost:3000/metrics/users
Expected Response Formats:

Dashboard Metrics:

json
{
  "success": true,
  "data": {
    "totalUsers": 10,
    "activeUsers": 5,
    "inactiveUsers": 5
  }
}
User List:
json
{
  "data": [
    {
      "id": 1,
      "fullname": "Test User",
      "status": "Active",
      "registeredDate": "2023-01-01T00:00:00.000Z"
    },
    // Additional users...
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "hasMore": false
  }
}


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

