Site da HE:labs
==============

http://helabs.com.br

## Running Server

```sh
$ bundle exec jekyll serve -w
```

## Running SASS+Compass
```sh
$ compass watch
```

## Problem with SASS+Git

The Git have a problem with SASS. So when you have a conflict in the generated file by SASS+Compass (stylesheets/style.css), please do not fix this conflict, just delete this conflicted file and generate a new. So you can run this:

```sh
$ git add stylesheets/style.css
$ git rebase --continue
```

## Editing JS

After editing JS files before push (this is a workaround and will be fixed :)

```sh
$ ./build.sh
```

## Editing CSS

You can edit the SCSS files in the sass folder.
In the stylesheets folder we have just the generated files by Compass.

## Adding A Project To Your Profile

The thumb size is 800x465 and please, export it using .jpg as extension.

## Import blogposts

```sh
$ rake import:blogposts
```