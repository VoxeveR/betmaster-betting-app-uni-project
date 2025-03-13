# Betting App

## Table of Contents
- [General Info](#general-info)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Technologies](#technologies)
- [Usage](#usage)
- [Example Endpoints](#example-endpoints)
- [Screenshots](#screenshots)

## General Info

This project was created as part of a Software Engineering course at Cracow University of Technology. The Betting App allows users to place bets, view odds, and manage their betting history.

**_NOTE:_** _This project is for educational purposes only._

### Features:
- User registration and login
- Viewing available bets and placing bets
- Admin panel for managing betting odds
- User dashboard for tracking bets and winnings
- Responsive frontend built with React
- Fast and secure backend powered by FastAPI

## Setup

To set up the project on your local machine, follow the instructions below.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/VoxeveR/SE_Uni_Project_Betting_App.git
2. Navigate to the backend directory:
```bash
cd SE_Uni_Project_Betting_App/backend
```
3. Install the necessary dependencies:
```bash
pip install -r requirements.txt
```
4. Set up environment variables (such as database connection, secret keys, etc.). You can find an example .env file in the backend directory.
5. Run the FastAPI backend:
```bash
uvicorn main:app --reload
```
This will start the backend server at http://localhost:8000.

### Frontend Setup
1. Navigate to the frontend directory:

```bash
cd SE_Uni_Project_Betting_App/frontend
```
2. Install the necessary dependencies:
```bash
npm install
```
3. Run the React frontend:
```bash
npm start
```
This will start the frontend server at http://localhost:3000.

### Database Setup
Ensure you have Docker installed and running.

1. To create and run a PostgreSQL container, use the following command:
```bash
docker run --name betting_app_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=betting_app -p 5432:5432 -d postgres
```
This command will do the following:
- Create a container named betting_app_db.
- Set the PostgreSQL username as postgres and password as password.
- Create a new database named betting_app.
- Expose the database on port 5432.
2. Check if the container is running:
```bash
docker ps
```
3. Update the database connection settings in the .env file located in the backend directory to match the Docker setup. The default settings should work as follows:
  - Host: localhost
  - Port: 5432
  - Database: betting_app
  - User: postgres
  - Password: password
4. Once connected, open the create_database.sql script, which is located in the database folder of the project:
```bash
cd SE_Uni_Project_Betting_App/database
```
5. Execute the SQL script to set up the database schema. The script will create the necessary tables and structure for the app.
- In DataGrip or another SQL client:
  - Open the schema.sql file.
  - Execute the script on the betting_app database.

## Technologies
- **Python 3** - The backend is written in Python 3.
- **FastAPI** - A modern web framework for building APIs with Python.
- **React** - A JavaScript library for building user interfaces.
- **HTML/CSS** - Used for the structure and styling of the frontend.
- **PostgreSQL** - A powerful, open-source relational database system.

## Usage
After setting up the project, you can start using it by navigating to the frontend URL (http://localhost:3000) and signing up or logging in. You’ll be able to place bets, track your history, and view available odds.

## Example Endpoints
- **GET /api/bets** - Fetch available bets
- **POST /api/bets** - Place a new bet
- **GET /api/users/{user_id}/history** - View user bet history
The frontend will allow users to interact with these endpoints through an intuitive UI.

## Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/83080103-d78d-4dc3-863c-f5d225820219" />
  <br />
  <em>Main Page</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ae276060-cbda-410c-b031-86ab3c059c67" />
  <br />
  <em>Login Page</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/be51afb5-6c8b-483c-91df-79cfec8e3b94" />
  <br />
  <em>Register Page</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/5a6a47d5-ac4b-44a7-b2be-f51102acccd7" />
  <br />
  <em>Profile Page</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/366b0f2b-3c04-4479-b3c5-4988c13997e4" />
  <br />
  <em>Offer Page</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/50ad02f9-8f72-4496-b8d0-be8e92c44cbd" />
  <br />
  <em>Bet Page</em>
</p>
