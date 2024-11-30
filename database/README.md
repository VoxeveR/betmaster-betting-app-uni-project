# Database Setup

## Setup Docker

1. Pull postgres docker image

```
docker pull postgres:latest
```

2. Run docker image

```
docker run --name postgres-container -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=betmaster -p 5432:5432 -d postgres:latest
```

**_NOTE_** _Remember to put your username, password and database name

3. Connect to database

- via datagrip

Just put your credentials and connect if you have any issues check if and you running windows remember to shutdown all postgres services on your local machine

- via cmd

Download postgres client

```
sudo apt install -y postgresql-client
```

Connect via psql

```
psql -h localhost -U username -d betmaster
```

**_NOTE_** -d stands for database which your are connecting to.

