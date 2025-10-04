<!-- ---
title: "Born to React, Built Native."
author: "Siddharth Thakkar"
date: "2025-09-29"
readingTime: "4 min"
---

Hi there, I'm Siddharth. I'm a full-stack developer. This sentence right here is so overused that it has lost all meaning. Are you a bootcamp graduate? A CS degree holder? Nothing matters when you throw the title "Full Stack Developer" around. Unfortunately, these aren't just my sentiments; recruiters and founders have had enough. The only way to get work as a full-stack dev now is by either having experience building production-grade apps that scale or good ol' nepotism.

While I have built projects and maybe have gotten better than some of my contemporaries, I also tried to have another skill under my belt. And what sounds similar to web dev? Mobile dev!

## Mobile App Dev?
Before jumping any further, I must warn you that this wasn't a decision made on impulse; I've worked on developing mobile apps twice before; once when I took Flutter as an elective in undergrad, and once in Kotlin. It's safe to say I hated it both times. However, both experiences, though extremely tiring, helped me work my way around Backend-as-a-Service, or BaaS.

Let's not get ahead of ourselves and get lost in the jungle of jargon; what I mean by that is, app development has a more accepting and stronger outsourcing culture. It's like using libraries in Python or npm packages in JavaScript; app dev has services that let you worry less about writing repetitive code for things like authentication, databases, messaging, and sometimes even server-side functions.

These tools are known as Backend-as-a-Service, and examples include Firebase, Appwrite, and Supabase. Now, why is this important? Because if you're someone like me who's looking to pivot, you want to kickstart your application and get the MVP out first before actually thinking about scaling. So before starting with app development, make sure to familiarize yourself with one of these tools. Since we’re close to October and the month of Hacktoberfest, I’d suggest going with Appwrite. They host a Hacktoberfest hackathon, and it’s a great opportunity to get started with mobile app development; the incentives are genuinely motivating.

## Write your first 'Hello World' code in React Native ?

Despite having worked with Kotlin and Dart, my framework and language of choice for building apps ended up being React Native with TypeScript. Why? Because it was easier for me to adapt to; my daily projects already use both React and TypeScript, and I didn’t want to waste time learning and unlearning. Moreover, React Native lets you build cross-platform apps from a single codebase—if that doesn’t get you excited, go back to web dev (just kidding).

Just like how Next.js gives structure to web apps, mobile dev has its own power tools—starting with Expo. It’s hands-down the easiest way to get started. Expo gives you a clean developer experience, and with the Expo Go app, you can instantly test your app on your mobile device.

To get started, just run:

npx create-expo-app my-app
cd my-app
npm start


This gets rid of all the boilerplate and sets up a ready-to-run project.

For styling, there's NativeWind, which brings Tailwind CSS-like utility classes to React Native. No more writing repetitive styles or dealing with verbose StyleSheet.create calls—just focus on building. You can install it with:

npm install nativewind

You can then set up nativewind by following their docs: https://www.nativewind.dev/docs/getting-started/installation 

The main entry point is usually index.tsx, and the _layout.tsx file (especially if you're using Expo Router) helps define your app’s file-based routing structure—very similar to how app/ and pages/ work in Next.js.


## Syntax

If you think we're done with the differences, I hate to break it to you, but we're just getting started




## Your turn
 -->
