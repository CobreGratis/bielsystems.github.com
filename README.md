Site da HE:labs
==============

http://helabs.com.br


## Maintainers

- [Aluisio Azevedo](https://github.com/aluisioazevedo)


## Running Server

Running foreman will start the jekyll server, will compile your sass files and compile your javascripts.

```sh
$ foreman start
```

## Compiling SASS

When using Foreman to run the server it will also start a Guard process that will watch for changes on the files in the `sass` folder and compile them. No need to run `compass watch` or Grunt.

## Using Grunt to minify the JS

### Installation

To use Grunt you'll need Node.js installed. You can get Node on the [website](http://nodejs.org) or installing via `brew install node`

After installing Node you'll need to install ```grunt-cli``` npm package: ```npm install -g grunt-cli```.
You can also follow along the [Getting Started guide](http://gruntjs.com/getting-started).

Then after setting things up, run: ```npm install``` on the folder of the project. This will download the grunt dependencies.

### DO NOT ALTER THESE COMPILED FILES AND COMMIT THEM, ALWAYS USE THE COMPILER FIRST! DO YOU HEAR ME?!**

## Problem with SASS+Git

The Git have a problem with SASS. So when you have a conflict in the generated file by SASS+Compass (stylesheets/style.css), please do not fix this conflict, just delete this conflicted file and generate a new. So you can run this:

```sh
$ git add stylesheets/style.css
$ git rebase --continue
```

## Editing CSS

You can edit the SCSS files in the sass folder.
In the stylesheets folder we have just the generated files by Grunt/Compass.

## Adding A Project To Your Profile

* Check if the project exists inside ```_posts/projects``` folder. If it's there jump to the last step.
* Put a screenshot of the project with 800x465 size and .jpg extension into the ```images/projects/``` folder.
* Create a file with the following name format ```_posts/projects/YYYY-MM-DD-project-name.md```.
* Fill project file with the following information:
```yaml
---
layout: projects
category: projects
slug: project-name
name: Project Name
image: /images/projects/project-name.jpg
description: Description about the project.
---
```

* Open your profile page file. It's inside ```_posts/time```. Add project slug under ```projects``` property.

## Import blogposts

```sh
$ rake import:blogposts
```

## Creating your profile

Run `rake new_profile` task to generate some basic structure for the "blog post"
associated with your profile.
