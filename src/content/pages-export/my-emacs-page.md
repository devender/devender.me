---
title: "Emacs"
date: 2010-04-27T13:23:08-08:00
slug: "my-emacs-page"
wpUrl: "http://devender.me/my-emacs-page/"
categories: []
---

I am a emacs newbie, I have created this page to document \*stuff\* about emacs that will help other newbies like me. If you found this page useful please leave a note.

[My Emacs Cheat Sheet](https://docs.google.com/Doc?docid=0AQ_Mlo3_91AfZGNwcHRkY3hfOTdmNW44ZGRjaA&hl=en)

[My init.el file](https://docs.google.com/leaf?id=0Bw_Mlo3_91AfMzcxYjVjOGUtZjlmZC00NWQ5LWEzMTgtNmNmMjJlMzg4YzBl&hl=en)

**M** stands for Meta, this is the Alt Key.

**C** stands for Control key.

#### Install

For linux: `sudo apt-get install emacs23`

**For Mac: Install [Carbon Emacs](http://homepage.mac.com/zenitani/emacs-e.html) (I hear that this is more standards compliant, this is what I am using and seems to work fine.)**

**Most books, posts seem to refer to emacs rather than Xemacs so I just went with the flow.**

**On a side note I really like Monaco fonts (which is default on Mac) you can get it [here](http://www.gringod.com/2006/11/01/new-version-of-monaco-font/), I’ll show you later how to set it up for emacs on Linux.**

Try this out

1. C-x C-f (find or create file) sample.py (this will create a new python file called sample.py. In the file type in **print “hello emacs”.**
2. **Now C-x C-s (to save it)**
3. **M-x run-python (opens up a python process)**
4. **Select the buffer for sample.py, on the line that you typed in run C-c C-c**

Even without doing anything else on this page, you now have a working python ide !!

#### Config

Once you have emacs installed, check to make sure you have this directory in your home folder “**.emacs.d**” . If you don’t go ahead and create it.

Also in that directory (.emacs.d) create this file. “**touch init.el**“.

On a side note, many recommend that you check in this directory in a source control so that you can have the same setup on all your computers.

#### Package Manager

**ELPA**, it is similar to apt-get.  
Instructions for installing ELPA are over [here](http://tromey.com/elpa/install.html).

Once you have ELPA installed it will add a small snippet to you init.el file. You can now start installing various packages.

To Install a package do this

M-x package-list-packages (you can use tabs for completion) and hit enter.

This will show you a buffer with various packages listed scroll through it using your arrow keys and select packages by hitting ‘I’ and you can install it by typing ‘X’.

Below are the packages that I have installed as of this writing.

* blank-more
* cloure-mode
* css-more
* highlight-parentheses
* inf-ruby
* magit
* ruby-mode
* slime
* slime-repl
* swank-clojure
* twitter
* url
* w3

ELPA only has a few packages, other packages you will have to install manually.

**Manually install a package** :

1. Find the package ([emacswiki.org](http://emacswiki.org/) is a gold mine for looking for packages)
2. Lets say you want to install a sql mode, the package for this is found [here](http://www.stanford.edu/~riepel/sql-mode/sql-mode.el). Once you have found a package that will do what you want the next step is to download and save it. I have created a folder called **3rdparty** in my **.emacs.d** directory where I save these files.
3. Packages are .el file (emacs lisp files) you download them and ask emacs to load them up during startup.
4. Now you tell emacs where these files are, open up your init.el file and add the following line, “**(add-to-list ‘load-path “/home/devender/.emacs.d/3rdparty”)**“
5. Some packages will need some more customization, you will find that information either on the author’s page or in the package documentation itself. For the sql-mode package you need to do add the following lines to init.el
   * (autoload ‘sql “sql-mode” “Start the interactive SQL interpreter in a new buffer.” t)
   * (autoload ‘sql-mode “sql-mode” “Mode for editing SQL files and running a SQL interpreter.” t)
   * (autoload ‘sql-buffer “sql-mode” “Create or move to the sql-mode \”\*SQL commands\*\” buffer.” t)
   * (setq auto-mode-alist (cons ‘(“\\.sql$” . sql-mode) auto-mode-alist))
6. I have installed the following packages manually
   * sql-mode ( <http://www.stanford.edu/~riepel/sql-mode/sql-mode.el>)
   * indent-tabs-mode ( <http://curiousprogrammer.wordpress.com/2009/01/24/how-to-disable-ident-tabs-mode/>)
   * psvn (<http://www.xsteve.at/prg/vc_svn/>)

#### Books

I have found this book very useful “[Sams Teach Yourself Emacs](http://www.amazon.com/Sams-Teach-Yourself-Emacs-Hours/dp/0672315947/ref=sr_1_1?ie=UTF8&s=books&qid=1272406503&sr=8-1)“.

#### Customization

Tell emacs to save your customizations in a different file, edit init.el and add these lines  
 `;; save customizations in a different file  
(setq custom-file "~/.emacs.d/emacs-custom.el")  
(load custom-file)`

Now you can start making changes, to change font for example, type this M-x customize RET. This will open up a buffer with all the properties that you can change, select Faces>Basic Faces>Default>
