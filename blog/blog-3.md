---
title: "Beyond just understanding."
author: "Siddharth Thakkar"
date: "2025-10-10"
readingTime: "5 min"
---

Hi there, I'm Siddharth. I'm a full-stack developer and a recent graduate. I've been constantly experimenting with new things, and one of the most overused words on Twitter recently has been semantic search or vector embeddings. I was done feeling dumb, so I googled it, learned it, and made a project out of it. If that sounds interesting to you, then please continue reading, and if it still doesn't sound interesting to you, then it might very soon, so don't stop reading (Reader retention 101).

---

## What Are Vector Embeddings?

If you read my blog on AI and Gen AI titled "Understanding Is Just The Beginning," you might have understood that AI in a broader spectrum is just words being connected to each other via a matrix. And while I would have loved it to be that simple, the reality is it isn't. That's why I went deep into the rabbit hole of vector embeddings.

Vector embeddings are lists of numbers that are used to represent data like text, images, or even code. These embeddings create numbers that are used to draw similarities between other numbers. It doesn't make sense, does it? You're probably thinking, "Numbers? Similarities? What are you even talking about?" Let me explain.

Imagine you have three sentences: "The cat sat on the mat," "A feline rested on the rug," and "I need to buy groceries." If you convert these into vector embeddings, the first two sentences will have similar numbers because they mean the same thing, just worded differently. The third sentence? Its numbers will be completely different because it's talking about something unrelated. That's the magic. Instead of matching exact words like traditional search does, you're matching meaning.

---

## Why Does This Matter?

Traditional search sucks at understanding context. If you search for "how to fix authentication bug" in your codebase using regular search, it'll only find files with those exact words. But what if the solution is in a file that talks about "login issues" or "user verification problems"? You'd miss it completely. With semantic search powered by vector embeddings, you can find relevant code even if it doesn't match your exact words. It understands what you mean, not just what you typed.

This is why vector embeddings are everywhere now. They're used in search engines, recommendation systems, chatbots, and honestly, anywhere you need to understand the meaning behind text. The math behind it is called cosine similarity, which basically measures how close two vectors are to each other. The closer they are, the more similar the meaning. You don't need to understand the math to use it, but knowing it exists helps you appreciate what's happening under the hood.

---

## How Do You Actually Use This?

Let's get practical. To generate vector embeddings, you need an embedding model. OpenAI provides one called `text-embedding-3-large`, which is what most people use because it's good and relatively cheap. You send your text to their API, and it sends back a list of numbers (the embedding). These numbers are usually around 1024 to 3072 dimensions, depending on the model you use.

Once you have these embeddings, you store them in a database. PostgreSQL works great for this because it supports JSON fields, which is where you'll store your embeddings. When someone queries your system, you convert their query into an embedding using the same model, then compare it against all the stored embeddings using cosine similarity. The closest matches are your search results.

Here's the thing though, generating embeddings can get expensive if you're doing it for a huge codebase or dataset. That's why you want to do it once during ingestion and store the results. After that, you only need to generate an embedding for the user's query, which is cheap and fast.

---

## Semantic Search! (Promise, this is as simple just read it!)

Semantic search is just vector embeddings applied to search problems. Instead of keyword matching, you're meaning matching. Let's say you're building a documentation search tool. A user types "how do I connect to the database?" Traditional search would look for those exact words. But with semantic search, you can match it to documentation that talks about "establishing database connections" or "setting up your DB connection string," even if it never uses the word "connect."

This is huge for developer tools. Imagine searching through your codebase and asking, "Where do I handle user authentication?" Semantic search can find all the relevant files, even if they use different terminology like "login," "auth," or "user verification." It's like having a teammate who actually remembers where everything is.

The setup is straightforward. You ingest your content, generate embeddings, store them in a database with metadata like file paths or titles, and then let users query it. The query gets converted to an embedding, you run cosine similarity against your stored embeddings, and boom, you've got semantic search.

---

## Commander.js: Making CLIs Not Suck

Now let's talk about Commander.js because if you're building a CLI tool, this is your best friend. Commander.js is a Node.js library that makes building command-line interfaces incredibly simple. You define your commands, options, and arguments, and it handles all the parsing and validation for you.

Here's why it's great, you don't have to manually parse `process.argv` or deal with messy flag handling. Commander does it all. You just define what you want, and it works. For example, if you want a command like `--ingest` or `--query "some question"`, you can set that up in like five lines of code.

The syntax is clean. You create a program, define your options with `.option()`, set up actions with `.action()`, and parse the arguments with `.parse()`. That's it. It even generates help text automatically, so when users type `--help`, they get a nice formatted list of all available commands and what they do.

I used Commander.js to build the CLI for my project because I needed two main commands, one to ingest the codebase and generate embeddings, and another to query the stored embeddings. With Commander, I could set this up in minutes. It's one of those libraries that just works, and you don't have to think about it after the initial setup.

---

## Building QuackStack

After learning about vector embeddings and semantic search, I wanted to build something practical. I built [QuackStack](https://github.com/woustachemax/QuackStack), a CLI tool that ingests your codebase, generates embeddings for each file and function, stores them in a PostgreSQL database, and lets you search through your code using semantic search. I used Commander.js to handle the CLI commands, OpenAI's embedding API to generate the vectors, and Prisma to manage the database. The whole thing runs locally with your own API keys and database, so there's no account creation or third-party storage involved. You ingest your project once, and then you can query it whenever you need to find something. It's like having a search engine for your code that actually understands what you're asking for.

---

## Go Build Something

You didn't think you'd become an expert just by reading a blog, right? The real learning happens when you try things out, break stuff, fix it, and figure out what works. Vector embeddings and semantic search are powerful tools, but they're just tools. The magic is in what you build with them. So go spin up a project, grab an OpenAI API key, set up a database, and start experimenting. Because no great project ever started with just reading.