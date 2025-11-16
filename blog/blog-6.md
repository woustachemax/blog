---
title: "I Built a Dev Environment Backup Tool Nobody Uses"
date: "2025-11-16"
readingTime: "9 min"
---

Hi there, I'm Siddharth. Last month, I was eating peanut butter M&Ms and dropped one into my laptop bag. Didn't think much of it. Next thing I know, my laptop fans are going full jet engine mode and I'm panicking thinking my machine is about to die. Turns out, a melted peanut butter M&M had wedged itself into the vent. I cleaned it out, the laptop survived, but that near-death experience got me thinking. What if it hadn't survived? I'd have to reinstall everything. Homebrew. Node. Python. All my VS Code extensions. My shell configs. My git settings. Every single npm package I had globally installed. So I built DevBackup. Not because my laptop died, but because someday it might. And honestly, I just wanted to learn how to properly build a CLI tool. Spoiler: nobody uses it, but I learned a ton building it, so let me tell you how I did it.

---

## The Problem I Convinced Myself Existed

Let's be real. Setting up a new dev machine sucks, but it doesn't happen that often. Maybe once a year if you're unlucky. Most developers just deal with it when it happens because it's a one-time pain. But I had just finished reading about how Docker revolutionized deployments by making environments reproducible, and I thought, "why isn't there a Docker for my entire dev machine?"

There kind of is, with things like dotfiles repos and setup scripts, but those require maintenance. You install a new tool, you have to remember to add it to your setup script. I wanted something that just worked automatically. Backup everything now, restore it later, zero manual tracking. So I built it, mostly as an excuse to learn Bash scripting properly and understand how package managers actually work under the hood.

---

## Bash Scripting Is Harder Than It Looks

I started with a simple script. Just backup my .zshrc and .gitconfig, tar them up, done. But then I realized, what about my Homebrew packages? What about npm globals? What about VS Code extensions? The scope kept growing, and suddenly I was writing a 800-line Bash script that had to work on macOS, Linux, WSL, and Windows.

Bash is weird. Like, really weird. There's no standard way to check if a command exists, so you end up with `command -v brew &> /dev/null` everywhere. Error handling is a nightmare because by default, scripts just keep running even when things fail. You have to explicitly check return codes or set `set -e` which then breaks other things. And don't even get me started on string manipulation. Want to extract a filename from a path? Cool, here's some syntax that looks like line noise: `${file##*/}`. Have fun.

But I learned a lot. I learned that `/dev/null` is where output goes to die. I learned that `2>&1` redirects stderr to stdout. I learned that `$(command)` captures output and backticks do the same thing but are older and everyone hates them now. I learned that you can't have spaces around the equals sign in variable assignments because Bash will think you're running a command. I learned all of this the hard way, by breaking things repeatedly.

---

## Detecting Operating Systems Is Annoying

You'd think detecting the OS would be simple. It's not. macOS reports itself as `darwin` in `$OSTYPE`. Linux is `linux-gnu`. Windows Git Bash reports as `msys`. WSL reports as `linux-gnu` but you have to check `/proc/version` for the word "microsoft" to know it's actually WSL pretending to be Linux. Cygwin is different from Git Bash. Nothing is straightforward.

I ended up with this function:

```bash
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        echo "windows"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if grep -qi microsoft /proc/version 2>/dev/null; then
            echo "wsl"
        else
            echo "linux"
        fi
    else
        echo "unknown"
    fi
}
```

This took me way longer than it should have because I kept testing on macOS, pushing to GitHub, and then realizing it broke on Linux. I don't have a Windows machine, so I just hoped the Windows logic worked. Spoiler: it didn't the first three times.

---

## Backing Up Package Managers Is a Mess

Every OS has its own package manager. macOS has Homebrew. Ubuntu has APT. Arch has Pacman. Windows has Chocolatey. They all work differently. They all have different commands to list installed packages. They all store configs in different places. It's chaos.

Homebrew was the easiest because it has `brew bundle dump` which creates a Brewfile with everything you've installed. One command, done. But then you realize Homebrew casks (applications) aren't always in the Brewfile, so you have to separately run `brew list --cask` to get those. And then you realize some taps (third-party repositories) aren't captured either, so you have to handle those too.

APT on Ubuntu has `dpkg --get-selections` which gives you a list of packages. Cool. But restoring them is weird. You have to pipe that list into `dpkg --set-selections` and then run `apt-get dselect-upgrade` which is this ancient command nobody uses anymore but it's the only way to bulk install from a list. And you have to run it as sudo, which means prompting the user for their password in the middle of the script, which breaks automation.

Pacman on Arch is simpler. `pacman -Qqe` lists explicitly installed packages. Restore with `pacman -S --needed`. But then you have AUR packages which aren't in the official repos, and those require a different tool like `yay` or `paru`, and detecting which AUR helper someone uses is its own problem.

Chocolatey on Windows I just guessed at because I don't use Windows. I wrote the code, crossed my fingers, and moved on. If it breaks, someone can open an issue.

---

## Node, Python, Rust, Ruby, Oh My

Then there's all the language-specific package managers. npm for Node.js. pip for Python. cargo for Rust. gem for Ruby. Each one has global packages that need backing up.

npm was annoying because `npm list -g --depth=0` gives you a list, but the output format is weird. It's JSON, but it includes npm itself in the list, and you don't want to reinstall npm with npm because that breaks things. So you have to filter it out. And some packages fail to install on restore because they have native dependencies that don't exist on the target system, so you have to silently ignore errors or the whole restore fails.

pip has `pip freeze` which lists everything, but it includes version numbers which is both good and bad. Good because you get exact versions. Bad because those exact versions might not exist anymore or might not be compatible with the Python version on the new machine. I went with `pip list --format=freeze` because it seemed safer.

cargo has `cargo install --list` which is straightforward. But then you realize cargo packages often have optional features that aren't captured in the list, so you might not get the exact same setup. I decided this was good enough.

Ruby gems I barely tested because I don't write Ruby. `gem list` gives you a list. Restore with `gem install`. If it breaks, sorry.

---

## Config Files Are Everywhere

Backing up config files sounds simple. Just copy .zshrc, .bashrc, .gitconfig, done. But then you realize there's also .bash_profile and .profile and they all do slightly different things on different systems. And some people use fish or zsh with oh-my-zsh which has its own config directory. And vim has .vimrc. And tmux has .tmux.conf. And SSH has a config file and public keys.

I decided to just backup the common ones and ignore the edge cases. If someone uses fish or has a custom setup, they can modify the script. That's the beauty of open source, right? (Right? ...anyone?)

SSH keys were tricky because I didn't want to backup private keys. Those should never be backed up or transferred automatically. But public keys and the SSH config file are fine. So I had to specifically exclude any file without a .pub extension in the .ssh directory. This took me three tries to get right because I kept forgetting to test it.

---

## IDE Extensions Are Platform-Specific

VS Code extensions are easy. `code --list-extensions` gives you a list. Restore with `code --install-extension`. Done. But then you realize some extensions are platform-specific. An extension that works on macOS might not exist on Linux. So your restore logs a bunch of errors. I just let it fail silently because I couldn't figure out a better way.

Cursor is the same as VS Code because it's basically a fork. Same commands, same logic. I added support for it because I use Cursor, and if nobody else does, oh well.

---

## Interactive Menus in Bash

I wanted an interactive mode because typing commands with flags is boring. I wanted something like `devbackup` that drops you into a menu where you pick what to do. Turns out, this is just a while loop with a case statement and some ASCII art.

```bash
show_menu() {
    show_logo
    echo "What would you like to do?"
    echo "  1) Backup"
    echo "  2) Restore"
    echo "  3) Verify"
    echo "  4) Help"
    echo "  5) Exit"
    read -p "Enter choice: " choice
    
    case $choice in
        1) backup_wizard ;;
        2) restore_wizard ;;
        3) verify_backup ;;
        4) show_help ;;
        5) exit 0 ;;
        *) echo "Invalid"; sleep 2; show_menu ;;
    esac
}
```

The trick is clearing the screen between menus so it feels like a real interface. `clear` does this. And adding colors makes it look way better. Bash has escape codes for colors like `\033[0;32m` for green and `\033[0m` to reset. I defined them as variables so I didn't have to remember the codes:

```bash
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'  # No Color

echo -e "${GREEN}✓${NC} Success"
```

The `-e` flag in echo enables escape code interpretation. Forget that and you just print the literal escape codes, which looks terrible.

---

## Cross-Platform Restore Is Hard

The big challenge was making backups work cross-platform. Backup on macOS, restore on Linux, and have it work. This meant detecting the source OS from the backup and the target OS where you're restoring, and intelligently skipping packages that don't exist on the target.

I stored the source OS in a text file inside the backup. When restoring, I read that file, compare it to the current OS, and log a warning if they're different. Then during restore, I check if the relevant package manager exists before trying to restore packages. If you're on Linux and the backup has a Brewfile, just skip it. If you're on macOS and the backup has APT packages, skip it.

This mostly works. Sometimes packages have different names on different systems. `python3-pip` on Ubuntu vs `python-pip` on Arch. I didn't handle this because it's a nightmare. If someone needs that level of compatibility, they can fork the repo and fix it.

---

## The Install Script

I wanted one-command installation. `curl | sudo bash` is controversial because it's a security risk (you're piping internet content directly into bash as root), but it's also super convenient. I went with it.

The install script just copies the main script to `/usr/local/bin/devbackup` and makes it executable. That's it. No package managers, no dependencies, just a single file. This means the script has to be self-contained with no external dependencies beyond standard Unix tools.

```bash
sudo cp devbackup /usr/local/bin/devbackup
sudo chmod +x /usr/local/bin/devbackup
```

Uninstalling is just `sudo rm /usr/local/bin/devbackup`. Simple.

---

## Why Nobody Uses It

I posted DevBackup on Reddit, Twitter, and some Discord servers. Nobody really uses it. And I get why.

Most developers already have their own setup. They have dotfiles repos, or they just manually set up machines because it doesn't happen often enough to automate. DevBackup solves a problem that isn't painful enough for most people to bother with a new tool.

Also, it's intimidating. You're running a script that modifies your entire system. What if it breaks something? What if it installs the wrong version of a package? What if it overwrites your current configs? Even though I added backup logic for configs, the trust isn't there. I wouldn't run a random script from GitHub on my machine either unless I really needed it.

And honestly, the marketing is hard. "Backup your dev environment" doesn't sound exciting. It's a boring problem. It's not like QuackStack where I'm promising semantic search for your codebase. It's just insurance. And people don't get excited about insurance until they need it.

---

## What I Learned

I learned Bash scripting deeply. I can now write shell scripts that actually work across platforms. I understand how package managers work under the hood. I know how to detect operating systems, handle errors gracefully, and build interactive CLI tools.

I also learned that building something people use is way harder than building something that works. DevBackup works. It does exactly what I wanted it to do. But that doesn't mean anyone cares. And that's fine. Not every project has to be a hit. Sometimes you build things to learn, and the learning is the point.

---

## Try It Out (Or Don't)

If you want to play with DevBackup, it's on GitHub at [github.com/woustachemax/dev-backup](https://github.com/woustachemax/dev-backup). Installation is:

```bash
curl -fsSL https://raw.githubusercontent.com/woustachemax/dev-backup/main/script/install.sh | sudo bash
```

Then run `devbackup backup` to create a backup. Copy the `DevBackup.tar.gz` file to a new machine, install DevBackup there, and run `devbackup restore`. It'll probably work. Maybe.

If you find bugs, open an issue. If you want to add features, submit a PR. If you just want to read the code to learn Bash, go for it. That's why it's open source.

---

## Go Build Something

You didn't think you'd master Bash scripting and package management just by reading a blog, right? The real learning happens when you try building a CLI tool yourself. Pick a problem, write a script to solve it, break things, fix them, and figure out how Unix tools actually work. Because no great tool ever started with just reading.

(Thanks for reading this, even if you'll never use DevBackup.)