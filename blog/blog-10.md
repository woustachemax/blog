---
title: "Redis, WebSockets, and Why Microservices Don't Actually Suck"
date: "2026-01-18"
readingTime: "8 min"
---

Hi there! I'm Siddharth and before we get into the blog, let me tell you that C++ is going great. Well, mostly great. Pointers and references still make me want to throw my laptop out the window sometimes (I just want to know who the heck came up with `int* ptr` and `int& ref`??), but I'm learning from The Cherno, the C++ GOAT, and his approach has completely changed how I learn technical concepts. It made me itch to understand things deeper instead of just passively consuming content.

Here's what I do. I watch one of his videos, pause, think about what was taught, and come up with a problem to solve. I write it down. Then I try to solve that problem without looking anything up. And more often than not, I stumble upon something even more useful than just what I learned in the video. The frustration of struggling with it instead of just copy-pasting made me understand it way better.

LeetCode is going great too. In fact, I've never felt better about it, and here's why, I swore to myself I'd stop using AI as a crutch. No matter how hard it gets, I push through. The best way to approach it, I've realized, is by learning language internals first functions like `split`, `slice`, `map`, `sort`, things you can just slap onto any data structure problem, draw it out, and reason about it. Master the tools first, and the problems become way more approachable. This didn't just pop into my head. I got rigorous enough with my learning that instead of being disappointed and giving up when things got hard, I understood why they felt hard and the results eventually followed.

This realization made me think about the design engineering stuff I mentioned before. Building a Sentry-like tool for C++ is fun and challenging, but it needs to be paired with solving a real problem. So I'm thinking about it from first principles now. I watched the Notion scale breakdown by Coding with Louis, and honestly, this has been the year of deep tutorials for me. Not just copy-pasting code and falling into tutorial hell, but actually finding the balance between learning and implementing. The only way forward is to build, and understanding the fundamentals will always matter more than a perfect tech stack.

AI is growing rapidly, and it's only fair to use it to build faster—but only if you know what you're doing. If you run into bottlenecks, you need to go back to old-school practices. So thinking about scaling got me into Redis and WebSockets. I've been using WebSockets, or rather applications built on top of them like Socket.io, but I never really understood what was happening under the hood. Until now.

Let me show you what I learned about microservices, Redis Pub/Sub, and WebSockets. And yeah, I drew it out on paper because that's how I think. Looking back, these are the exact dots that connect me to understanding distributed systems.

---

## What Are Microservices? (And Why Should You Care?)

Consider this. I'm Alex, CEO at PayPal (yes, this is hypothetical, I'm not secretly running PayPal). Maybe I'm not the CEO. Maybe I'm just a lead backend engineer. Doesn't matter. The point is, I need to build a system that handles real-time transactions, and I felt far behind when I first started thinking about this architecture despite making just as much effort to understand it.

Here's the question: **What are microservices?**

Think of it like this: instead of one giant monolithic backend that does everything, you split your system into smaller, independent services. Each service has one job and does it well. The frustration of trying to scale a monolith made me realize this approach makes way more sense. Picture this architecture:

- **Backend (Primary)**: Handles core business logic and real transactions
- **Push Notification Service**: Sends push notifications to users
- **Phone Service**: Manages phone-related operations (maybe SMS, calls, whatever)
- **Email Backend/Service**: Handles all email communications

These services are called **microservices**, and the way they communicate with each other is usually through **WebSockets** (with a slight delay, which we'll get to). The services are inside a larger "data from database" box because they all pull information from the same data source. But here's the key: they're independent. If the email service crashes, push notifications still work. If the phone service is slow, it doesn't block the primary backend. That's the beauty of microservices. Every setback in my understanding taught me that persistence and adaptability will always matter more than just knowing the trendy tech.

---

## The Real Problem: How Do Microservices Talk to Each Other?

So here's the scenario I mapped out. A user initiates a transaction:

> "Hey random user, let's say someone paid me $15. It hits my account, and I get $158 to throw."

The backend handles this transaction (yes, I know the math is weird, bear with me). But now what? The user needs to know their payment went through. They should get:
- A push notification on their phone
- An email confirmation
- Maybe an SMS

The backend can't just block and wait for all these services to complete. That would be terrible for performance. So what do we do? This made me itch to understand the solution.

This is where **asynchronous communication** comes in. The backend says "hey, transaction completed, here's what happened" and immediately moves on to the next request. The other services pick up that message whenever they're ready and do their thing. But here's the question: **how do these services know when something happened?**

---

## Enter Redis Pub/Sub

The answer is **Redis Pub/Sub** (Publish/Subscribe pattern). While the entire explanation would be an essay of its own, here's what I learned most from it.

Here's how it works in simple terms:

1. **Backend (Publisher)**: When a transaction happens, the backend publishes a message to a Redis channel. Think of a channel like a topic or a broadcast frequency. Let's call it the "transactions" channel.

2. **Services (Subscribers)**: The push notification service, email service, and phone service are all subscribed to the "transactions" channel. They're listening for messages.

3. **Message Flow**: When the backend publishes a message, Redis instantly delivers it to all subscribers. Each service receives the message and does its job independently.

```
Backend: "Transaction completed! User ID: 123, Amount: $15"
↓
Redis Channel: "transactions"
↓
Push Service: "Got it! Sending push notification..."
Email Service: "Got it! Sending email..."
Phone Service: "Got it! Sending SMS..."
```

Within less than a month of studying this architecture, I learned why this pattern works so well. It all started to make sense now.

---

## WebSockets: The Real-Time Connection

Now, here's where WebSockets come in. You might be asking: "Siddharth, you said microservices communicate through WebSockets. But you also said Redis Pub/Sub. Which is it?"

Great question. I finally had answers to a question I was exhausted from asking myself, "Why are these patterns so confusing?" But I knew understanding the terminology wasn't enough. I had to bring serious change to how I approached learning this.

Here's the deal:

**WebSockets** are used for **real-time, bidirectional communication between the client (user's browser or app) and the server**. Once a WebSocket connection is established, data can flow both ways instantly without the overhead of HTTP requests.

In the context of microservices:
- The backend might maintain WebSocket connections with users
- When a transaction completes, the backend uses Redis Pub/Sub to notify the push notification service
- The push notification service then uses WebSockets (or a push protocol) to deliver the notification to the user's device in real time

So Redis Pub/Sub handles **server-to-server** communication (microservices talking to each other), while WebSockets handle **server-to-client** communication (server pushing updates to users).

I swore to stick to three rules before trying to become an expert at this. Rule one: while learning anything, I'd iteratively take up concrete challenges and accomplish them depth-wise. I learned what was needed and didn't focus on everything about distributed systems at once. Rule two: I summarized everything I learned in my own words. Rule three: I only compared myself to my younger self, never to others who already knew this stuff.

---

## The Socket.io Connection

I've been using Socket.io for a while now without really understanding what it does under the hood. Socket.io is basically a library that wraps WebSockets and adds a bunch of nice features:
- Automatic reconnection
- Fallback to HTTP long-polling if WebSockets aren't supported
- Room-based broadcasting
- Easy event-based communication

But at its core, it's still using WebSockets. And understanding the raw WebSocket protocol makes you appreciate what Socket.io does for you.

When you're building real-time features (like live notifications, chat systems, collaborative editing), WebSockets are essential. And when you're scaling those features across multiple servers, Redis Pub/Sub becomes essential. These rules didn't just pop into my head. I got rigorous enough with my learning that instead of being disappointed and giving up when things got hard, I understood why they felt hard and the results eventually followed.

---

## Why This Matters for Scaling

Here's the thing that clicked for me after watching the Notion scale breakdown: **real-time systems don't scale the same way as traditional request-response systems**.

If you have 10,000 users connected via WebSockets and you're running multiple server instances (because one server can't handle 10,000 concurrent connections), how do you broadcast a message to all of them?

This is where Redis Pub/Sub shines:

1. User A sends a message
2. Server 1 (where User A is connected) publishes the message to a Redis channel
3. All servers (Server 1, Server 2, Server 3, etc.) are subscribed to that channel
4. Each server receives the message and broadcasts it to all connected users on that server

Without Redis Pub/Sub, Server 1 would have no way to tell Server 2 and Server 3 about the message. Each server would be isolated. Redis acts as the message broker that keeps everything in sync.

This is not a sad story about getting confused by distributed systems, but a story of undying persistence and rigor in learning them.

---

## First Principles Thinking

Remember when I said I'm thinking about the Sentry like tool from first principles? This is what I mean. Instead of just saying "I'll use WebSockets because everyone uses WebSockets," I'm asking:

- Why do we need real-time communication?
- What are the bottlenecks when scaling WebSocket connections?
- How do microservices communicate efficiently?
- When should I use Redis Pub/Sub vs. direct HTTP calls vs. message queues?

These are the questions that lead to better architecture. Not "what's the trendy tech stack," but "what problem am I actually solving, and what's the right tool for it?".

---

## AI and Building Faster (But Smarter)

AI is growing rapidly, and it's only fair to use it to build faster. But here's the catch: **only if you know what you're doing**.

I use AI for boilerplate code, for exploring APIs I haven't used before, for refactoring. But when I hit a bottleneck, when something doesn't work the way I expected, I drop AI and go old-school. I read documentation. I draw diagrams on paper. I implement things manually to understand them.

This is the balance I've found: use AI to accelerate, but never as a crutch. If you can't explain what your code does without AI, you don't understand it well enough yet.

---

## How It All Connects

Here's the architecture I mapped out:

1. A user (random user) initiating a transaction
2. The backend handling it asynchronously
3. Multiple microservices (push notifications, email, phone) all connected via queues
4. Data flowing from the database to all services
5. The note: "The services are called microservices & the way backend communicates with them is websockets (i.e. usually with a slight delay)"

That architecture made everything click. I could see how the pieces fit together. I could reason about bottlenecks. I could ask better questions. Looking back, these are the exact dots that connect me to understanding distributed systems at scale.

---

## What's Next

I'm building something with this knowledge. Maybe the Sentry-like tool I mentioned. Maybe a real-time collaborative coding environment. Maybe something completely different. The point is, I'm not just learning for the sake of learning anymore. I'm learning to build. I'm here to contribute, to create, and to prove that persistence and adaptability will always matter more than a perfect path.

If you're working on scaling challenges, real-time systems, or microservice architectures, try this:
1. Draw out your system on paper
2. Identify the communication patterns (sync vs. async, client-server vs. server-server)
3. Ask yourself: "What happens when this scales to 10x? 100x?"
4. Learn the fundamentals (WebSockets, Redis, message brokers)
5. Build something small that uses these concepts
6. Break it, fix it, understand it

That's the process. No shortcuts. No tutorial hell. Just deliberate practice and first principles thinking.

---

## Go Draw Something

You didn't think you'd become an expert just by reading a blog, right? The real learning happens when you grab a notebook, draw out a system architecture, and try to solve a real problem. So go do that. Pick a real-time feature you want to build. Draw the architecture. Identify the bottlenecks. Learn what you need to learn. Build it.

And when you hit a wall, don't just throw AI at it. Think. Draw. Reason. That's how you actually learn.

(And if you're reading this and thinking "wow, Siddharth really loves drawing diagrams," you're absolutely right. Pen and paper are underrated. Fight me.)

---

**tl;dr**: Microservices communicate asynchronously using Redis Pub/Sub for server-to-server messaging and WebSockets for real-time server-to-client communication. Scaling real-time systems requires understanding these patterns deeply. Drawing things out on paper helps more than any tutorial. The only way forward is to build, and persistence matters more than a perfect path.