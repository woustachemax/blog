---
title: "Thinking Like a Programmer Before Pretending to Be One"
date: "2026-04-16"
readingTime: "6 min"
---

Hi there, I'm Siddharth! Back again, surprised I'm publishing two blogs in the same month. Last one was micrograd, which if you read it, you know I've been deep in ML land. Still am. But I've also been running a parallel track on LeetCode, and that track had hit a wall.

What kept happening with me was tutorial hell but on steroids. I'd open a problem, stare at it, get nowhere, read the solution, nod along like it made sense, and move on. Next day, new problem, same freeze. I was getting through problems but not actually getting better at any of this. So I paused the grind and went looking for something more foundational (wow, big word).

## The Pattern Matching Trap

The problem with my grind was that I was treating every problem like a trivia question. See problem. Recognize it's a sliding window one. Apply the sliding window template. Move on. Which is definetely a way to go but not the way for me cause it's like math, if I just memorise derrivations, the moment i get something that has linear algebra and calc, I'm fucked. Cause I only knew the pattern that was shown to me previously. I needed to fix it and  the fix I've been forcing on myself is to slow down. When I get a new problem, I try to solve it for an input of size 2. Then size 3. Then size 4. By the time I've worked through four tiny cases by hand, I usually see what's happening. Sometimes it maps to a pattern I already know. Sometimes it doesn't and I have to invent something. Either way, the solution is mine, which is very cathartic if you ask me, cathartic and slower, obviously. But the time I was spending memorizing solutions I couldn't reproduce wasn't cheap either.

## Breaking Problems Down

The other habit I've been trying to build is splitting problems into smaller independent pieces before I write anything. Say you're checking if a list contains a palindrome. Lazy me writes one function that loops through the list and does the palindrome check inline. But in case I fuck up one line of code, I have two bugs tangled into one. And I can't test either piece on its own.

Careful me writes two functions. One that takes a string and returns whether it's a palindrome. One that takes a list and calls the first function. Both solutions are small enough that I can eyeball it and be sure it works. And if I need to check palindromes somewhere else later, I have my mini solution.

## The DP Thing

I'd been scared of dynamic programming for months. Every explanation online starts with "memoization" and "overlapping subproblems" and by sentence three I feel like killing myself, so I used my ability to be chronically online into good use and watched a video on how to learn, which is hilarious, cause I'm a grown ass man but, it helped me. The video emphasised on the best way to learning fast, which is drumroll, learning slowly, and breaking concepts into building blocks, by that logic, DP was just building up from small cases and reusing the answers. If you know how to solve the problem for n = 1, can you use that to solve n = 2? Can you use n = 2 to solve n = 3? If yes, you have a DP solution. The fancy version where you store answers in an array so you don't redo work is an optimization on top of that.

The slow cases approach I described up top is already DP. I'd been doing it without knowing that's what it was called, and the name was scaring me more than the technique.

## Libraries

You don't need to know everything. You need to know where to look. Use libraries. Don't reinvent the wheel unless the wheel is the problem. Small caveat. You have to know enough about what's underneath to spot when the library is wrong for the job. I wrote a whole blog about this last month so I won't rant again. Both things are true at once.

## DSA With Fresh Eyes

After using my big and very rarely used brain, I went back to the DSA basics. And so should you, but I won't list the resources, but, I won't gatekeep either. Anyway, why would you want to watch a video by someone who's an expert, ex-FAANG/MAANG, ex-OpenAI, ex-Anthropic, when you can instead learn it from someone who isn't any of these companies' ex, me!

## Big O

Big O describes performance as the input grows.

O(1) means time doesn't care about input size, eg: array index access.

O(n) means time grows linearly with input, eg: One loop through a list.

O(n log n) is the best you can do for sorting arbitrary data, no eg here, figure out on your own this is a blog not a book

O(n squared) means a loop inside a loop. Dies as n grows, it explains why nested loops on big inputs are a red flag.

The move for any algorithm you write is to ask what happens if the input has a million items, if the answer is nothing changes much, you're fine. If the answer is your laptop catches fire, you need a better approach. But the caveat is you need to be smart enough to know if something would change or not, which I highly doubt you are since you're reading my blog.

## Searching and Sorting

Binary search is the poster child for why sorting matters. If your data is sorted, you find any item in O(log n) by halving the search space every step. Look at the middle. If it's too big (insert Michael Scott's image), search the left half. If it's too small (insert the reader's image), search the right half. Repeat. For a million items that's about 20 steps. For a billion, 30. 

Selection sort is O(n squared). Find the smallest element, swap it to the front, find the next smallest, swap it to position two. It's the sort you'd invent on your own if nobody told you better ones existed. Which is fine, that's how slow thinking is supposed to work.

Merge sort is O(n log n) and uses divide and conquer. Split the list in half, sort each half, merge them. Merging two sorted lists is linear, and you only split log(n) times, so the whole thing comes out to n log n. Same DP vibe, where you solve smaller problems, combine their answers.

## Data Structures

Every data structure is a trade-off. None of them are better in a vacuum. You pick based on what you need to do fast.

**Arrays** are contiguous memory with a fixed size. Index access is O(1) which is as fast as it gets, but mid-list insertion is slow because you have to shift everything over.

**Linked Lists** are flexible in size, each node pointing to the next. Insertion and deletion are fast if you already have the node reference, but access is O(n) because you have to walk from the head to get anywhere.

**Binary Search Trees** have a left child that's smaller and a right child that's greater at every node. Search, insert, and delete are O(log n) when balanced. When they aren't balanced, the worst case is O(n), which is a linked list.

**Heaps** are trees where the root is always the max or the min. They're great for priority queues where you always want the most important thing next. Task schedulers use them. A* pathfinding uses them. Fun fact, heaps are usually stored in arrays, which is the kind of detail that makes you feel smart at parties if your parties are very specific.

**Hash Maps** are the goat. Average O(1) for insert, lookup, and delete. A hash function turns a key into an index. If two keys hash to the same index it's a collision, usually handled by storing both at that index in a small linked list. Hash maps are the answer to way more problems than you'd think (coding problems).

**Graphs** are nodes and edges, used to model relationships. BFS explores level by level with a queue and is your go-to for shortest path in an unweighted graph. DFS goes as deep as it can before backtracking, usually with recursion or a stack. Topological sort handles dependency ordering, like figuring out what order to take classes in when some are prerequisites.

None of these are intimidating once you stop treating them as a checklist and start treating them as answers to specific questions. I need to check if a username is taken across 10 million users, hash map. I need a leaderboard that stays sorted as scores come in, BST. I need to always serve the next Swiggy order by priority, heap. I need to find the fewest connections between me and some random recruiter on LinkedIn, BFS.

## What Happened

Approach towards DSA has changed, for any problem I start with inputs of size 2, 3, 4, and actually work them out on paper (yes, paper, I'm old school like that). I split the problem into the smallest pieces I can. I ask what the problem really needs, fast lookups, ordering, shortest path, and pick the data structure off of that. The solutions take longer to show up but they stay with me, and the next problem doesn't feel like I'm walking into an exam I forgot to study for. Am I suddenly good at LeetCode? Lmao, no. But I'm no longer pretending, and for now that's the upgrade I needed.

**tl;dr** Stopped pattern matching, started building from scratch on tiny inputs. Broke problems into pieces before writing a single line. Realised DP was just that habit with a scary name. Big O is vibes for how badly your code dies when n gets huge. Data structures are just trade-offs pretending to be a syllabus. Build something small and ugly before you try to build something impressive, and if you're reading this on a Sunday night panicking about Monday's interview, godspeed.