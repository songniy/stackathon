# Stackathon

Looking to mix up a backend with `express`/`sequelize` and a frontend with
`react`/`redux`? Set up to deploy to trais ci and Heroku. PWA-webpack enabled

Service worker is added using webpack.

## Setup

git remote add boilermaker https://github.com/FullstackAcademy/boilermaker.git
git fetch boilermaker
git merge boilermaker/master

```
once in a while, `boilermaker` may
be updated with additional features or bug fixes, and you can easily
get those changes from now on by entering:
```

git fetch boilermaker
git merge boilermaker/master

```
### OAuth

* To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
  * You can get them from the [Google APIs dashboard][google-apis].

[google-apis]: https://console.developers.google.com/apis/credentials

## Linting

Linters are fundamental to any project. They ensure that your code
has a consistent style, which is critical to writing readable code.

Boilermaker comes with a working linter (ESLint, with
`eslint-config-fullstack`) "out of the box." However, everyone has
their own style, so we recommend that you and your team work out yours
and stick to it. Any linter rule that you object to can be "turned
off" in `.eslintrc.json`. You may also choose an entirely different
config if you don't like ours:

* [Standard style guide](https://standardjs.com/)
* [Airbnb style guide](https://github.com/airbnb/javascript)
* [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Star

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment

Ready to go world wide? Here's a guide to deployment! There are two
supported ways to deploy in Boilermaker:

* automatically, via continuous deployment with Travis.
* "manually", from your local machine via the `deploy` script.

Either way, you'll need to set up your deployment server to start.
The steps below are also covered in the CI/CD workshop.

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno

* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.

### Travis

_**NOTE**_ that this step assumes that Travis-CI is already testing your code.
Continuous Integration is not about testing per se – it's about _continuously
integrating_ your changes into the live application, instead of periodically
_releasing_ new versions. CI tools can not only test your code, but then
automatically deploy your app. This is known as Continuous Deployment.
Boilermaker comes with a `.travis.yml` configuration almost ready for
continuous deployment; follow these steps to the job.

1.  Run the following commands to create a new branch:
```

git checkout master
git pull
git checkout -b f/travis-deploy

```
2.  Run the following script to finish configuring `travis.yml` :
    `npm run heroku-token`
    This will use your `heroku` CLI (that you configured previously, if
    not then see [above](#Heroku)) to generate an authentication token. It
    will then use `openssl` to encrypt this token using a public key that
    Travis has generated for you. It will then update your `.travis.yml`
    file with the encrypted value to be sent with the `secure` key under
    the `api_key`.
3.  Run the following commands to commit these changes
```

git add .travis.yml
git commit -m 'travis: activate deployment'
git push -u origin f/travis-deploy

```
4.  Make a Pull Request for the new branch, get it approved, and merge it into
    the master branch.

_**NOTE**_ that this script depends on your local `origin` Git remote matching
your GitHub URL, and your local `heroku` remote matching the name of your
Heroku app. This is only an issue if you rename your GitHub organization,
repository name or Heroku app name. You can update these values using
`git remote` and its related commands.

#### Travis CLI

There is a procedure to complete the above steps by installing the official
[Travis CLI tools][travis-cli]. This requires a recent Ruby, but this step
should not be, strictly speaking, necessary. Only explore this option when the
above has failed.

[travis-cli]: https://github.com/travis-ci/travis.rb#installation

That's it! From now on, whenever `master` is updated on GitHub, Travis
will automatically push the app to Heroku for you.

### Cody's own deploy script

Your local copy of the application can be pushed up to Heroku at will,
using Boilermaker's handy deployment script:

1.  Make sure that all your work is fully committed and merged into your
    master branch on Github.
2.  If you currently have an existing branch called "deploy", delete
    it now (`git branch -d deploy`). We will use a dummy branch
    with the name `deploy` (see below), so and the script below will error if a
    branch with that name already exists.
3.  `npm run deploy`
    _ this will cause the following commands to happen in order:
    _ `git checkout -b deploy`: checks out a new branch called
    `deploy`. Note that the name `deploy` here is not magical, but it needs
    to match the name of the branch we specify when we push to our `heroku`
    remote.
    _ `webpack -p`: webpack will run in "production mode"
    _ `git add -f public/bundle.js public/bundle.js.map`: "force" add
    these files which are listed in `.gitignore`.
    _ `git commit --allow-empty -m 'Deploying'`: create a commit, even
    if nothing changed
    _ `git push --force heroku deploy:master`: push your local
    `deploy` branch to the `master` branch on `heroku`
    _ `git checkout master`: return to your master branch
    _ `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!
```
