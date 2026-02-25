---

title: "FastAPI, JWT, and SQLAlchemy: Building APIs That Don't Break"
date: "2026-02-25" 
readingTime: "7 min"
---

Hi there (long time, huh), I'm Siddharth. I’m still on my January 2026 grind, but I hit a realization. While diving into C++ for quant, I stumbled upon a project idea I really want to execute. I won’t spill it yet. You will probably see a blog about it soon. Or not, if I fail miserably.

My stack was looking hella same with Node and Next.js. I decided it was time for a change. Instead of going for a minor pivot like any sane individual would, maybe Hono or Elysia, I thought of diving into a whole new territory with FastAPI and AWS. Turns out Python works for quant too. I would much rather spend ten minutes writing twenty lines of Python than ten days fighting a 5000 line C++ monster that compiles 0.002 ms faster. (Orgs, if you’re reading this, I’m joking. I love pointers. Please hire me.)

---

## The Swap: Express/Prisma to FastAPI/SQLAlchemy

Moving from my usual TypeScript stack meant finding direct replacements for my favorite tools. Instead of Express, I'm using FastAPI. It handles routing through simple decorators like `@app.get("/")`. Instead of Prisma, I found SQLAlchemy. It feels different because you define classes for your tables, but the end result is the same type-safe database interaction. For security, JWT and Bcrypt work exactly the same way they do in Node. You hash the password, store it, and issue a signed token on login.

For OAuth, you don't need a massive library like NextAuth. FastAPI has a built-in `OAuth2PasswordBearer` system. It handles the extraction of the token from the headers automatically. You just define a dependency, and your route is protected.

---

## The Database: SQLAlchemy 2.0

We're using SQLAlchemy 2.0 style. You define your models as Python classes. SQLAlchemy handles the mapping to your database tables.

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True)
    hashed_password: Mapped[str] = mapped_column(String(255))

```

and postthis, the IDE understands what a `User` object is.

---

## Authentication: JWT

JWT is how we handle state without a session. The user logs in. We give them a signed token. They send that token back in the header for every request.

The flow:

1. User sends credentials.
2. Server verifies and generates a JWT.
3. Server signs the JWT using a `SECRET_KEY`.
4. Client stores the token and sends it in the `Authorization: Bearer <token>` header.

Yeah, yeah, same as express, I know but a lil' hand holding won't kill you princess!
---

## The Realistic Challenge: Migrations

The challenge is migrations. In production, your database schema is alive. You can't just drop tables every time you add a column. This is where **Alembic** comes in. It's like Git for your database. You run a command. It detects the changes in your SQLAlchemy models. It generates a script to update the database.

* **Step 1:** `alembic revision --autogenerate -m "add phone number"`
* **Step 2:** Inspect the script.
* **Step 3:** `alembic upgrade head`

I'll admit it, I missed prisma a bit too much here!
---

## Docker and AWS

To take this live, I’m wrapping the app in Docker. This ensures the Python environment stays consistent from my laptop to the cloud. I use a slim Python base image to keep the footprint small and the build times fast. For AWS, I am looking at App Runner for easy container scaling or Lambda with the Mangum adapter for a serverless approach. This setup handles the infrastructure so I can focus on the code. It is a big jump from Vercel, but the control is worth it.

---

## Go Build a Backend

Building a secure API is just a series of small, logical steps. Define your data. Secure your routes. Connect your database. Will your first API be perfect? Probably not. Will it be better than the 5000 line C++ script that took you a month to debug? Definitely.

So go run `pip install fastapi uvicorn sqlalchemy alembic` and build that backend. The internet needs more tools that don't suck.

---

**tl;dr** Swapped Express for FastAPI and Prisma for SQLAlchemy. JWT and Bcrypt stay the same. Use Alembic for migrations. Dockerize and push to AWS for the win. Happy New Year <3!

---
