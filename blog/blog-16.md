---
title: "I Started Using Neovim (btw)"
date: "2026-06-27"
readingTime: "7 min"
---

Hi there, I'm Siddharth, not consistent anymore, I know, but a man's gotta eat and these blogs don't pay the bills. But don't worry, I won't abandon you. I know there's someone, somewhere, constantly hitting my blog URL to see if I posted. Or it's just me being schizophrenic. Anyway, I have a problem. I have many, but one of them is watching too much of ThePrimeagen on YouTube and he brainwashed me into many things, but most importantly, he brainwashed me into being sane despite the hype cycles around AI causing so much chaos. He motivated me to go deeper, learn more, and because of him, I love computer science now more than ever. But if you know anything about me, you know I'm not here to talk about the good. I'm writing to invite you to a cult. A cult that ThePrimeagen made me join. Due to his constant pressure in every video, I folded, and now, I use Neovim (btw).

While it's a tiring experience to set up, it's pretty fun to use once you're in. And contrary to popular belief, it won't make you a better SWE. As George Hotz, the GOAT, said in one of his streams, learning vim shortcuts doesn't teach you shit. The only teacher is years and years of mastering your craft. But if it doesn't make you better, why even bother? The answer's simple. Unless you're one of those Anthropic guys who, despite having 4000 colleagues next to them as SWEs, say there's no need for SWEs and how they've stopped writing code entirely, if you still enjoy activating your neurons, you'll write code. And to catch up, you'd want to write faster. Neovim is the bridge.


## So What Even Is Vim

Vim is a text editor. A very, very old one. Bill Joy wrote vi in 1976. Vim came later, "Vi IMproved", in 1991. The idea was to keep your hands on the keyboard, always. It sounds insane and it is, but it also means once you internalize it, editing text becomes weirdly physical.

The thing that makes vim different is it has modes. Normal mode is where you navigate and manipulate text. Insert mode is where you actually type. Visual mode is where you select things. You spend most of your time in normal mode, which sounds backwards. The commands are terse. `dd` deletes a line. `ci"` changes whatever's inside quotes. `gg` goes to the top of the file. `G` goes to the bottom.  Neovim is vim but rebuilt with Lua for configuration instead of the ancient Vimscript nobody wants to learn. 


## How I Set It Up

I won't pretend this was smooth. It wasn't. I spent a full evening just getting the thing to open without errors, which is a great sign for a tool you're supposed to use for everything. The base I used was LazyVim, a starter config that handles the boring infrastructure so you can layer your preferences on top. First, I upgraded Neovim itself because the Ubuntu apt version was ancient and Telescope refused to load on anything below 0.11. Direct download from the GitHub releases page fixed that.

Then I focused on the plugins. LazyVim handles most of this through lazy.nvim, the plugin manager. File explorer with Neo-tree, fuzzy finding with Telescope, syntax highlighting with Treesitter, autocomplete through nvim-cmp wired to LSP, Mason for installing language servers. Python and TypeScript both have working autocomplete now, which felt like a small miracle after two hours of config files. The theme is Solarized Osaka, yoinked directly from craftzdog's dotfiles, with transparency on so the terminal background bleeds through. The dashboard has my name in a blocky ASCII font because of course it does. ThePrimeagen would probably call that cringe. I don't care.

The one thing nobody warns you about is that the first week you will be slower. Much slower. You'll forget how to save. You'll get stuck in insert mode. You'll accidentally type a hundred `j`s into a file because you forgot you weren't in normal mode.


## Does It Make You A Better Engineer

No. Kaoru Mitoma, the Japanese footballer, wrote his university thesis on dribbling. He studied the biomechanics of it, the angles, the weight shifts, the timing. Did that make him the best player in the world? No. Does Mbappe lose sleep over it? Also no. But did Mitoma get to know something about his sport that most players just feel intuitively without ever examining? Definitely. And in specific moments, in specific matches, that knowledge sure does help.

Neovim is like that. It won't make you a better system designer. It won't make your algorithms faster. It won't help you in a system design interview. But it will make you think about how you move through code. It'll make you faster at the mechanical parts of writing and editing. And somewhere along the way, because you had to learn how a text editor actually works at a level most people skip entirely, you'll know a thing or two more about your machine than you did before.


## tl;dr

ThePrimeagen is a menace and I'm in the cult now. Vim is old, Neovim is vim but good. Set it up with LazyVim, stole a theme from craftzdog, suffered for a week. Won't make you a 10x engineer but Mitoma wrote a thesis on dribbling and he's not doing badly. If you write code and you want to write it faster, it's worth the pain. If you don't, close this tab and go touch grass, I'm not your boss.
