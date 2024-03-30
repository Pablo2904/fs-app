# Creating the .env File

To configure your application, you need to create a `.env` file in the root directory of your project. Follow the steps below to create the file and add the required environment variables:

1. Create a new file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following content:

```bash
# PostgreSQL
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=dbname
POSTGRES_PORT=5432

# Application
PORT=5000
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/${POSTGRES_DB}

# Environment
NODE_ENV=development
```

# Starting app

- install Docker on Your computer
- create .env file in root folder as mentioned above
- run in root folder `docker-compose up`, it should initialize app, database nad migrate all tables, app should be ready to go
- check `http://localhost:5000/api-docs/` if its rendering swagger
