---
title: "Stop RESTing!"
author: "Siddharth Thakkar"
date: "2025-11-01"
readingTime: "5 min"
---

Hi there, I'm Siddharth. For the first few years of building, I thought REST APIs were the only way. You define endpoints, write fetch calls, manually type everything, and hope your frontend matches your backend. I spent hours debugging production bugs because someone changed an API response and forgot to update the frontend types. I thought this was just part of being a developer. But (*switch to Jian Yang voice*) what if I told you, there's something that can make your frontend automatically know when your backend changes? Where deleted endpoints break at compile time, not in production? Where you never have to manually write API types again? Sounds too good to be true, right? It isn't!


## The Problem With REST

Let's be honest. REST APIs are exhausting. You create an endpoint like `/api/users`, write some documentation (or skip it because who has time), and pray your frontend developer reads it correctly. Then someone changes the response structure from `user.name` to `user.fullName`, forgets to update the types, and suddenly you're debugging production errors at 2 AM while users are complaining. Even worse, there's no safety net. You can delete an endpoint, deploy it, and your frontend won't know until runtime. A user clicks a button, gets a 404, and you're scrambling to figure out what broke. It's reactive, not proactive. And if you're working solo on both frontend and backend, it's just painful coordination with yourself. I dealt with this for way too long. Then I found tRPC, and everything changed.


## What Even Is tRPC?

tRPC is a framework that uses TypeScript to link your backend to your frontend. It's not just "type-safe API calls." It's automatic type generation from your server code. You define your backend once, and your frontend immediately knows about every endpoint, every input, and every output. No manual typing. No documentation. No guessing. What's magical is you define a router on your server with procedures (basically your API endpoints). tRPC derives TypeScript types from this router. On your frontend, you pass these types to a tRPC client. Now your client knows everything. When you type `client.`, your editor autocompletes every available procedure. If you try to call something that doesn't exist, you get a compile error immediately. Not at runtime. During development. Change something on the backend? Your frontend breaks at compile time. Delete an endpoint? Every place that calls it shows a TypeScript error. It's the safety net you've always needed but never had with REST.


## Forrest Knight Was Right

Before we go further, let's address the elephant in the room. Forrest Knight *(my favourite creator)*, recently tweeted, "If you're still using JavaScript over TypeScript, you're just lazy". And he's right. TypeScript has caught bugs in my code that would've haunted me in production. It forces you to think about your data structures before you write them. It makes you a better developer. If you're avoiding TypeScript because "it's too much setup" or "JavaScript works fine," you're making excuses. And if you're using TypeScript but still manually typing your API calls, you're missing out on what makes TypeScript truly powerful. That's where tRPC comes in.


## Procedures, Queries, and Mutations

Every endpoint in tRPC is called a procedure. You define procedures as either queries (for fetching data, like GET requests) or mutations (for changing data, like POST/PUT/DELETE). On the server, you write something like:

```typescript
greet: publicProcedure
  .input(z.object({ name: z.string() }))
  .query(({ input }) => {
    return `Hello ${input.name}!`;
  })
```

Now on your frontend, you call `client.greet.query({ name: "Siddharth" })`, and TypeScript knows exactly what to expect. It autocompletes the input structure. It infers the return type. If you pass the wrong type, it breaks before the code runs. You define inputs using Zod, a TypeScript-first validation library. Write `.input(z.object({ name: z.string() }))`, and your procedure expects an object with a `name` string. TypeScript infers this automatically. If someone sends bad data, Zod catches it at runtime. You get both compile-time and runtime safety.


## Authentication: Protected Procedures

Now here's where it gets interesting. You don't want every procedure to be public. Some need authentication. The traditional way is using middleware. You create a middleware that checks if the user is logged in, and if they are, it injects user data into the procedure's context. Then you create a `protectedProcedure` that uses this middleware. That works. But I don't use it. I create a helper function called `isLoggedIn`, and I call it at the start of any procedure that needs authentication. It's simpler. It's explicit. It works like middleware but without the extra abstraction. You can do it either way. tRPC gives you options.


## Premium Procedures: I Want the Money, the Cash, the Moola, the Bag (sorry Hanumankind)

I don't know what's funnier, I'm apologising to Hanumankind as if he would ever read a tech blog or the fact that if he were to read one, he'd read mine with a total of 4 readers (out of those 4, 2 are my parents :/). Anyway, here's the real silver lining of tRPC that nobody talks about enough: premium procedures. Not just "are you logged in?" but "have you paid?" This is where you integrate Stripe and gate features behind payment checks. You create a `premiumProcedure` that checks if the user has an active subscription. If they do, they get access. If they don't, you return an error or redirect them to upgrade. It's the same pattern as protected procedures, but now you're checking payment status instead of authentication.

This is huge for SaaS apps. You define your premium features once on the backend, and your frontend automatically knows which procedures require payment. Want to add a new premium feature? Create a procedure, mark it as premium, and you're done. The type safety means you can't accidentally call a premium procedure without handling the payment check on the frontend. And because it's all TypeScript, you can create different tiers. Maybe you have a `proProcedure` and an `enterpriseProcedure`. Each one checks for a different subscription level. Your frontend knows exactly which features are available to which users, all with compile-time safety. This is how you stack the bag. Build features. Gate them. Get paid. tRPC makes it stupid easy.


## tRPC With Next.js

Now, here's where it all comes together. If you know me, you know I'm a Next.js developer. Because honestly, who's still using plain React in 2025? If you're not using a framework, you're either building a library or stuck in 2019. *(THIS IS THE MOST OBVIOUS BAIT EVER, DON'T START A TWITTER WAR ABOUT IT, or maybe do it at least I'll have some clout!)* tRPC integration with Next.js is incredibly smooth. The official docs have a setup guide, and it just works. You define your procedures in an API route, export the router type, and use it on the client. Your frontend and backend live in the same repo. You change a backend procedure, and your frontend immediately reflects it. No coordination. No version mismatches. No deployment headaches.


## Go Build Something

You didn't think you'd master tRPC by reading this, right? The real learning happens when you install it, set up a project, break things, and figure out why. So go spin up a Next.js app, install tRPC, define some procedures, and start building. Gate some features behind Stripe. Get that bag. Because no great project ever started with just reading.