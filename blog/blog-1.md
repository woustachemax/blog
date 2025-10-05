---
title: "Understanding is just the beginning."
author: "Siddharth Thakkar"
date: "2025-06-02"
readingTime: "4 min"
---

Hi there, I'm Siddharth. When I first considered getting into AI, like many others, I was scared because I thought I'd have to learn Machine Learning, Statistics, Linear Algebra, Calculus, and all those difficult math concepts I loathed as a teenager. Turns out, I was wrong, and you probably are too.

---

## What is generative AI?

So, what is generative AI? Honestly, you can probably find more technical answers elsewhere, but this is a straightforward take from someone you might relate to, free from the Twitter expert fluff.

Generative AI refers to AI systems that can create new content, like text, images, code, you name it. As builders, we work with generative AI by using these existing models to create applications for our specific use cases. ChatGPT is the perfect example: it's just a chat interface built on top of an existing Large Language Model (LLM). The best part? You don't need to understand how to build the models, you just need to know how to use them.

---

## How does AI work under the hood?

Consider this prompt: "Hi, I'm Siddharth!" If I send this prompt/message, a typical response might be "Hey Siddharth! How's it going?" This generation of text, or response if you will, is a sequence of words. The responses can vary or have multiple answers, which is characteristic of a language model.

The working of these Language Models can be very well explained in one of the most well-explained papers of our generation, **Attention Is All You Need**. The paper focuses on the architecture of 'transformers'. Too many jarring terms at once? Let me break it down simply: GPT stands for "Generative Pre-trained Transformer", this is the key terminology you need to understand. GPTs are essentially transformer models that have been pre-trained on massive amounts of text data to handle the logical aspects of generative AI applications. The transformer architecture, with its attention mechanism, is the underlying neural network foundation that makes GPTs capable of understanding context and generating responses. You can think of it as a very fancy autocomplete.

---

## Fancy Autocomplete?

While "fancy autocomplete" is a term many AI researchers use to describe transformers, the way transformers work supports this idea quite well. You might have many questions, like:

- "If Google had the paper and the knowledge, why were they behind in the AI race for so long?"
- "How do transformers know what comes next?"
- "Why do the responses change even if the prompts are the same?"

Exploring these questions will lead you into a rabbit-hole of AI research. As a resident of the rabbit-hole, I can tell you it's incredibly exciting.

What did Google do with the initial transformer architecture? Interestingly, while Google invented transformers, other companies like OpenAI were quicker to turn them into conversational AI tools. Google initially focused on using transformers to improve Google Translate rather than creating new consumer products. The term "fancy autocomplete" makes more sense now, right?

The transformer architecture is simple yet effective. Let's revisit our previous prompt, "Hi, I'm Siddharth!" You see a sentence with three words and three punctuation marks, but a transformer sees all these words, spaces, and punctuation as 'tokens.' These tokens are just numbers in a matrix.

This might get a bit mathematical now. After the words are tokenized, they are arranged in a "vector-embedding." Don't worry about the jargon; focus on the concept. Imagine a plane with x and y axes. While real vector embeddings exist in hundreds of dimensions, just picture the x and y axes for a 2D example to grasp the core idea.

Now, if we consider two words, like 'cat' and 'dog,' and suppose these words are in the first quadrant, and 'bone,' which represents dog food, is in the third quadrant, 'milk,' which we can consider as cat food, will also be in the third quadrant. That's how relationships are connected in a vector embedding. Similarly, if the words 'car' and 'truck' are in the second quadrant and 'gasoline' is in the fourth quadrant, in which quadrant will 'diesel' be? That's for you to figure out.

---

## Your turn

Remember when you thought you needed to master calculus and linear algebra? This brief explanation of transformers and GPTs is proof you don't. You're now equipped with everything needed to start building AI applications. The scary math? Leave that to the researchers. You've got apps to build.