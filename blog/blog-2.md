---
title: "Born to React, Built Native."
author: "Siddharth Thakkar"
date: "2025-09-29"
readingTime: "8 min"
---

Hi there, I'm Siddharth. I'm a full-stack developer. This sentence right here is so overused that it has lost all meaning. Are you a bootcamp graduate? A CS degree holder? Nothing matters when you throw the title "Full Stack Developer" around. Unfortunately, these aren't just my sentiments; recruiters and founders have had enough. The only way to get work as a full-stack dev now is by either having experience building production-grade apps that scale or good ol' nepotism.

While I have built projects and maybe have gotten better than some of my contemporaries, I also tried to have another skill under my belt. And what sounds similar to web dev? Mobile dev!

---

## Mobile App Dev?

Before jumping any further, I must warn you that this wasn't a decision made on impulse; I've worked on developing mobile apps twice before; once when I took Flutter as an elective in undergrad, and once in Kotlin. It's safe to say I hated it both times. However, both experiences, though extremely tiring, helped me work my way around Backend-as-a-Service, or BaaS.

Let's not get ahead of ourselves and get lost in the jungle of jargon; what I mean by that is, app development has a more accepting and stronger outsourcing culture. It's like using libraries in Python or npm packages in JavaScript; app dev has services that let you worry less about writing repetitive code for things like authentication, databases, messaging, and sometimes even server-side functions.

These tools are known as Backend-as-a-Service, and examples include Firebase, Appwrite, and Supabase. Now, why is this important? Because if you're someone like me who's looking to pivot, you want to kickstart your application and get the MVP out first before actually thinking about scaling. So before starting with app development, make sure to familiarize yourself with one of these tools. Since we're close to October and the month of Hacktoberfest, I'd suggest going with Appwrite. They host a Hacktoberfest hackathon, and it's a great opportunity to get started with mobile app development; the incentives are genuinely motivating.

---

## Flutter? Kotlin? Swift? React (Native)!?

Despite having worked with Kotlin and Dart, my framework and language of choice for building apps ended up being React Native with TypeScript. Why? Because it was easier for me to adapt to; my daily projects already use both React and TypeScript, and I didn't want to waste time learning and unlearning. Moreover, React Native lets you build cross-platform apps from a single codebase, if that doesn't get you excited, go back to web dev (just kidding).

Just like how Next.js gives structure to web apps, mobile dev has its own power tools, starting with Expo. It's hands-down the easiest way to get started. Expo gives you a clean developer experience, and with the Expo Go app, you can instantly test your app on your mobile device.

To get started, just run:

```bash
npx create-expo-app my-app
cd my-app
npm expo start
```

After running start, you'll see a QR code in your terminal, which you can scan after installing the Expo Go app on your mobile. This helps you test and visualize the changes you make in your app in real time; kinda like an emulator.

You can also run:

```bash
npm run reset-project
```

to get rid of all the boilerplate and set up a ready-to-run project.

For styling, there's **NativeWind**, which brings Tailwind CSS-like utility classes to React Native. No more writing repetitive styles or dealing with verbose `StyleSheet.create` calls, just focus on building. You can install it with:

```bash
npm install nativewind
```

You can then set up nativewind by following their docs: https://www.nativewind.dev/docs/getting-started/installation

The main entry point is usually `index.tsx`, and the `_layout.tsx` file (especially if you're using Expo Router) helps define your app's file-based routing structure, very similar to how `app/` and `pages/` work in Next.js.

---

## Stack Overflow? More Like Stack Overload

If you think we're done with the differences, I hate to break it to you, but we're just getting started. But don't you worry, it's gonna be a smooth yet lovely ride.

Let's start with the layout. Note that structure is the most important thing. After you've run `npx create-expo-app` and then `npx expo-router@latest`, you'll probably reset things, and you'll be left with two main files, `index.tsx` and `_layout.tsx`.

Since we're going step by step, it's only fair to talk about `_layout.tsx` first. As the name suggests, it manages your app's layout, how it's gonna look and feel. The boilerplate code in `_layout.tsx` usually includes something called `<Tabs>`, which act like the main navigation tabs of your app. You can tweak, style, and customise these tabs however you like. As your app grows, you'll just keep adding new pages, and those can show up as new tabs if you want.

Now, here's a trick: you can follow a good practice of putting all your tab-related pages, including the `index.tsx`; inside a `(tabs)` folder, and then create a separate `_layout.tsx` inside that `(tabs)` folder. This helps keep your navigation organised. With that setup, Expo Router automatically sets up a bottom tab bar for you. No need to manually set up React Navigation, it's already built in.

But what if you want screens that aren't part of the tab bar, like a profile detail page or a product screen you navigate to from a tab? That's where Stacks come in. You can nest `<Stack>` navigators inside your tabs or even create standalone stack folders (like `(auth)` or `(modal)`), and Expo Router will handle the routing logic for you. So yeah, you'll probably end up using both `<Tabs>` and `<Stack>` components to build a solid navigation flow.

---

## Hello World!

The wait is finally over! Or is it? There are still some things you should know before attempting to write your first "Hello World" code.

React Native, though an extension of React, has a slightly different way of accepting JSX. For example, there aren't any `<div>`s; instead, we use `<View>`. There are no `<h1>` or `<p>` tags either; instead, you use `<Text>`. Heck, even `onClick` becomes `onPress`. But that's for another day.

Right now, our focus is just writing "Hello World".

**"So how do we write Hello World, you yapper?"** It's simple; you write a function:

```tsx
import { View, Text } from 'react-native';

export const Home = () => {
  return (
    <View>
      <Text>
        Hello World!
      </Text>
    </View>
  );
};
```

Yeah, it's that simple; it always was. Sure, there are things that need adjusting to; but that's what Google is for.

And yes, React Native fully supports `useEffect`, `useRef`, `useContext`, and all your favorite hooks. Hooks work the same way as they do in React Web.

Now, quick heads-up: this component won't render on its own unless it's part of the navigation stack. In Expo Router, pages are automatically routed based on file structure, so if you want this screen to show up, either put it inside the `(tabs)` folder to be a tab, or inside a stack folder like `(home)` and wrap it with a `<Stack>` in your `_layout.tsx`.

Stacks are essential when you're dealing with screens that don't belong in the tab bar; they let you navigate forward and back between screens, like a proper screen-to-screen flow.

Seems jarring, right? Don't worry, I got you.

Let's say you want "Hello World" to be a tab; here's how the folder structure and code would look:

```
app/
├── (tabs)/
│   ├── _layout.tsx
│   └── home.tsx
```

**(tabs)/_layout.tsx:**

```tsx
import { Tabs } from 'expo-router';

export default function Layout() {
  return <Tabs />;
}
```

**(tabs)/home.tsx:**

```tsx
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Hello World!</Text>
    </View>
  );
}
```

Now this `home.tsx` screen will show up as a tab, and the file name becomes the tab title automatically (unless you override it).

But let's say you want to use a Stack instead for screens you navigate to but don't need in the tab bar. Here's how that'd look:

```
app/
├── (tabs)/
│   └── _layout.tsx
├── (home)/
│   ├── _layout.tsx
│   └── home.tsx
```

**(home)/_layout.tsx:**

```tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack />;
}
```

Now you can navigate to this screen using a link or router push like:

```tsx
router.push('/(home)/home');
```

And voilà, it shows up as a full-screen route with built-in back navigation.

---

## Make an end-to-end Mobile App with React Native

Wait, you didn't think you'd build a full end-to-end app just by reading a blog, right? The real magic happens when you roll up your sleeves, try things out, make a few mistakes, and learn from them. That's where the power is, because coming out on top after figuring it out yourself hits different. Now go run `npx create-expo-app@latest` and start building, because no great app ever started with just reading.