---
title: "Karpathy Taught Me Micrograd, So I Made It Move"
date: "2026-04-03"
readingTime: "10 min"
---
Hi there, I'm Siddharth! For my old and frequent readers, I know the frequency of the blogs has taken a huge hit, but that just means I'm busier than ever, which is a good thing, isn't it? So be happy for me!

I speak like there are thousands being upset about me writing 1 blog per month when in reality no one gives a shit! But that's what's helped me for so long, being delusional. I delude myself to think I'm the greatest of all time, I delude myself to think I can do anything, and the same delusion made me think I could master ML in a month.

Now if you know the blog, you know there's a spoiler here, which is I didn't meet the timeline but I'm a lot further ahead from where I was a month ago.

Let's start from the beginning. Do you remember the FastAPI blog? For my newer readers or first timers, last month I was tired of seeing JS/TS bros everywhere and wanted to learn a framework that gave me an edge, so I went down the FastAPI rabbit hole, and the same rabbit hole led me to yet another rabbit hole. Fuck, those were too many rabbit holes for a single sentence.

Coming back to the point, I've had a stint as a Data Engineer. The stint, though short, had me fascinated about data, so while in the FastAPI rabbit hole, I thought why not build something that combines working with data to build a backend that learns from it. Not just uses data as a db or in an auth layer, but something that learns with it.

You see where I'm going with this right? You guessed it, it's ML. So I started with Math, same old Linear Algebra, Stats, Calc etc., learned just enough to move forward, and started watching the Deep Learning playlist by 3Blue1Brown, which just blew me away. So much so that I started looking for more resources, which is when I came across Karpathy's micrograd video.


## The 3b1b Problem

3b1b, is a great educator, but the man ruined me. In the best way possible, but ruined nonetheless. His neural network series is probably the clearest explanation of how networks learn that exists on the internet. The animations make me feel like I'm watching the Neural Networks learn right ingtont og me. They make the math feel physical.  So after finishing that playlist, I was infected. I needed everything to look like that. I needed every concept to move. Which is a problem when you sit down to learn anything else.

## Karpathy's Micrograd and the Visualization Itch

If you haven't seen the micrograd video, go watch it. Karpathy builds a tiny autograd engine from scratch in about 100 lines of Python. The point is to show the viewers how backpropagation works, one operation at a time, before you trust a library to do it for you. It's a great, great video.

But it's also just a screen recording of him typing code. After 3Blue1Brown, that felt wrong. I kept pausing and rewinding trying to hold the computation graph in my head. Each node, each edge, each gradient flowing backward through the chain rule. I could follow it step by step, but I couldn't see the whole thing at once. So I built the thing I wanted to watch.


## What Micrograd Is

Before I get into what I built, quick context for anyone who hasn't seen the video. Micrograd is a scalar-valued autograd engine. Scalar-valued means every value in the graph is a single number, not a vector or a matrix. Autograd means it computes gradients for you. The gradient is the number that tells you how much the final output changes if you nudge this value a little bit. Every modern neural network framework does this. PyTorch does it. JAX does it. Micrograd does it in 100 lines of Python so you can read and understand every part.

Here's what happens when you write something like `L = (a + b) * c`. Under the hood, micrograd builds a directed acyclic graph. Each operation creates a node. Each node stores its value and a function that knows how to compute its gradient. When you call `.backward()`, the engine walks the graph in reverse and fills in every gradient using the chain rule or backpropogation.

## The Four Sections

I built the visualizer as four interactive sections, each one focused on a different layer of how a network learns.

**The Idea**

This one is about computation graphs. You run a forward pass, then a backward pass, and hover over every node. Values flow forward, gradients flow backward, on the same graph, in the same place. I spent more time here than anywhere else because this is where it all starts. If the computation graph doesn't click, nothing downstream does. Most explanations move past it too fast because it looks obvious in code. It is not obvious in code. It becomes obvious when you can see it.

**The Unit**

A neuron is a dot product. Inputs times weights, summed with a bias, squashed through an activation. You can hover over the weights and bias and watch their values change after a backprop step. The activation here is ReLU, which just means: if the value is negative, output zero; if it's positive, pass it through. Watching the gradient stop dead at a dead ReLU is one of those things that you read about a dozen times and then see once and it's immediately obvious.

**The Network**

Stacking neurons into layers is where it goes from toy to something real. The architecture is 2 inputs, 4 hidden neurons, 4 hidden neurons, 1 output. Nothing fancy. But running the forward and backward passes on the full network shows the signal flowing forward and the gradients flowing back at the same time. Edge thickness encodes weight magnitude. Edge color encodes sign. You get a feel for which weights are doing work and which ones are coasting.

**The Loop**

Hit start and watch it train in real time. The decision boundary updates as the network learns. Loss falls. Accuracy climbs. The loop is straightforward: compute the output, measure how wrong it is, compute the gradients, subtract a small fraction of each gradient from each parameter, repeat. Seeing that happen continuously across hundreds of steps changes how you think about it. It stops feeling like a math formula and starts feeling like a physical process. The parameters are falling downhill toward the answer.


## Was This Necessary?

Probably not. Karpathy's video is perfectly good. You can understand micrograd without a visualizer.

But the honest reason why I built it is, 3Blue1Brown made me feel like I was in the same room as the math. Karpathy's video made me feel like I was reading over someone's shoulder. I wanted the former and the video gave me the latter, so I spent a few hours building the bridge. There's a practical side too. I learn by building. I can watch a video, feel like I understand something, open a code editor the next day, and draw a complete blank. Building the visualizer meant I had to implement every part correctly, or the animation would be wrong. You can't fake a visualization. If the gradients are flowing in the wrong direction, you'll see it. So I was basically testing myself by making the project impossible to bullshit.


## The Thing That Got Me Hooked

There's something addictive about watching a neural network learn from nothing. You initialize the weights randomly. The decision boundary is a mess. The loss is high. Accuracy sits around 50%, barely better than a coin flip. And then you hit start, and over a couple hundred steps, the boundary adjusts, the loss falls, the accuracy climbs. The network figures out the pattern.It didn't know anything. Now it knows something. That happened because of math you can follow from start to finish. This when visualized is better to grasp, especially for someone as idiotic and attention deficit as me.

## Go Look at It

The visualizer is live at [woustachemax.github.io/micrograd-viz](https://woustachemax.github.io/micrograd-viz). It runs in the browser. Go hover over nodes. Run the backward pass. Watch the training loop. Then go watch Karpathy's micrograd video. It will make a lot more sense after you've spent ten minutes poking around the graph.

Am I going to do this for every concept I learn? Probably not. Was this still worth it? Hell yeah.


(tl:dr: If you're one of my regular readers: hi, still alive, still building. If you're new: I write about things I build while learning, sometimes technical, sometimes a rant, always honest about what I don't know yet. Stick around.)

