---
title:  "Switching from Jekyll to Metalsmith - Post Mortem"
date: 2017-05-14T9:07:00Z
description: I embarked on a journey to refactor my blog approximately 6 times. After finally landing on using Metalsmith, I kind of wish I didn't bother.
---

Once I finished my [Jekyll](http://jekyllrb.com/) blog I was super pleased with it. It took some MacGyvering to get things to work like I wanted ([as evidenced by this post](./building-a-gulp-workflow-around-jekyll/)), but it was easy to work on and write posts for, and thanks to it just being a static site was pretty quick. After a few months the honeymoon period sort of died out though; every time I came back to write something I had to give myself a refresher on how Jekyll worked, the deployment process became a bit of a pain if something went wrong and, by far the most infuriating, it would randomly break itself for no reason due to some random Ruby gem somehow getting updated at some point (even though I literally never work in Ruby and only had it on my machine for Jekyll).

## Jekyll to Metalsmith, the journey

It was around then that I stopped writing articles and embarked on a massive blog rebuild journey, which has finally ended with the launch of this [Metalsmith](http://www.metalsmith.io/)-powered incarnation. On the journey from Jekyll to Metalsmith I passed by numerous other setups:

- [Prismic.io](https://prismic.io/) headless CMS with custom express app for serving blog posts. Abandoned due to not liking how Prismic handled numerous things.
- [Contentful](https://www.contentful.com/) headless CMS with custom express app with my own MVC cacheing setup which used server-side React for templating. Abandoned because I realized it was too much trouble than it was worth and far too overcomplicated for something I didn't really want to deal with.
- [Hexo](https://hexo.io/) JS static-site/blog. Abandoned due to Hexo docs being incredibly incomplete and out of date and not liking pretty much everything about it.

After all of those I finally landed on Metalsmith, which I had used at my last job as a front-end style guide creation tool. While I did in fact finish the rebuild and stuck with Metalsmith, I think if I were to do it again I would have just stuck with Jekyll and spent more time trying to determine why my environment was breaking as well as move from Digital Ocean to Github Pages for hosting to solve my deployment woes.

I'll first go into my thoughts on Metalsmith, then I'll do a brief outline of my particular implementation on this blog afterwards.

### Pluggability is a blessing and a curse

The main selling point behind Metalsmith is ultimately the freedom it gives you in the form of its pluggability. Whatever you want it to transform you can likely find a module that will plug right in; and if you can't find one the API gives you the control to somewhat simply create one yourself. While this is great in terms of enabling an large ecosystem of external modules to be created, it also makes Metalsmith pretty featureless without a large amount of modules plugged in and leaves it prone to lots of abandonware as well as modules that don't really work very well outside of the context of the authors original project.

When I say this requires you to have multitudes of external modules, I mean it. For a simple blog like this, you can easily wind up with 20+ metalsmith plugin modules and 50+ lines of Metalsmith pipe blocks, even when extracting configuration objects to their own separate json files. While this may not be an issue to some, having a massive pipe in your build file to manage manually can become a pain during development when you're having to swap plugins out constantly as you find out that quite a few of them don't work. It's also worth mentioning that build times can grow very quickly due to having lots of build modules, particularly if some of them aren't very well optimized.

### Documentation is underrated

The biggest issue I had with Metalsmith was with both the official documentation as well as third party module documentation. The basic concept of how Metalsmith works, walking a file tree, converting each file to a JS object based on contents and front matter metadata then ultimately passing that object to a templating engine, is pretty simple and straight forward. However, there are some nuances to the API that aren't explained very well and can make it pretty frustrating when diving in. For example the way it handles source and views, in my opinion, makes trying to setup something like a CSS pre-processor overly difficult. There is a weird in-place transform going on that makes it difficult to exclude certain things or include external dependencies, which left me combing through both official documentation as well as third party documentation trying to come up with a proper solution.

### Optimal Metalsmith use cases

With all of my complaining taken into account, I'd probably still recommend Metalsmith for certain projects. For generating StyleGuides, simple brochure sites, or custom front end development environments I would absolutely recommend Metalsmith as for those use cases you could easily get away with minimal external module usage and minimal pipe/architecture wizardry. Projects that only need to transform a small subset of documents or assets would also highly benefit from Metalsmith, as that was essentially what it was designed for. For a Jekyll-replacement that handles styles, client side JavaScript, asset management and page/post transforming I'd still suggest sticking with Jekyll. While it can be done, it winds up feeling like you're spending a lot of time trying to jam a square peg into a round hole.

## This implementation

My requirements for this implementation were mostly as follows:

- Convert posts from markdown to templated HTML pages
- Manage post collections
- Transform Sass to CSS
- Pretty permalinks
- No external build automation frameworks
- Deploy to Github pages

### The build system

At the heart of the build process I'm using is regular old Node firing off a regular-old Metalsmith JS implementation. The directory structure is pretty similar to most Metalsmith projects:

	package.json
	index.js		// Main script
	metalsmith.js	// Metalsmith build file
	configs/		// Module configurations
	source/			// Posts, pages, and sass
	views/			// Layout templates
	assets/			// Misc assets/images/etc.

While Metalsmith offers both a JSON and javascript integration, I opted to go with the javascript one so I could have more control over the build pipe.

The index file simply catches command line arguments and pipes options to the metalsmith build file. There are only 3 variations:

	- `node ./index.js`: Runs a normal builds to a temporary build directory.
	- `node ./index.js --watch`: Runs a build then runs a metalsmith browsersync server for development.
    - `node ./index.js --deploy`: Runs a normal build to a special deployment directory.

As the grunt of deployment is handled by a bash script, these get run by [GNU make](https://www.gnu.org/software/make/manual/make.html) so I can have a consistent commands. The Metalsmith file takes these options and makes small changes to the build based on whichever option got passed to it. It looks a little something like this:

```js
// metalsmith.js

const Metalsmith = require('metalsmith');

/* Lots and lots of require's
.
.
. */

module.exports = function (mode) {
	const buildTarget = mode === 'deploy' ? './.deploy_git' : './public';

	const srcDir = path.join(__dirname, './source');
	const buildDir = path.join(__dirname, buildTarget);

	const metalsmith = new Metalsmith(__dirname)
		.destination(buildDir)
		.use(branch('styles/main.scss')
			.use(sass({
				includePaths: [path.join(__dirname, './source/styles/')],
				outputDir: 'styles/',
			}))
		)
		.metadata(config.globals)
		.use(ignore([
			'styles/*.scss',
			'styles/**/*.scss',
		]))
		.source(srcDir)
		.use(drafts())
		.use(collections(config.collections))
		.use(highlighting())
		.use(youtube({
			suggested: false,
			controls: true,
			showTitle: true,
			privacy: true,
		}))
		.use(dates({ format: 'D MMMM, YYYY' }))
		.use(markdown())
		.use(permalinks(config.permalinks))
		.use(helpers({
			directory: path.join(__dirname, './views/helpers'),
		}))
		.use(layout(config.layout))
		.use(assets({
			source: './assets',
			destination: './assets',
		}))
		.use(sitemap({
			hostname: 'https://bengsfort.github.io/',
			omitIndex: true,
		}))
		.use(redirect(config.redirects));

	if (mode === 'watch') {
		metalsmith.use(browserSync({
			files: [
				`${srcDir}/**/*`,
				`${srcDir}/views/**/*`,
				`${srcDir}/configs/**/*`,
				`${srcDir}/assets/**/*`,
			],
			server: buildDir,
		}));
	}
	
	metalsmith.build(function(err) {
		if (err) throw err;
		console.log('Build complete!');
	});
};
```

As this is pretty much a standard Metalsmith build file (told you they were long), the only thing really different here is the use of separate config files. I mostly did this so that the more complex modules configurations could remain separate from the main pipe and easily accessible for quick changes/updates; for example collections settings, global metadata, permalinks and redirects. These are stored in json files which all get required and exported by `configs/index.js`:

```json
{
	"posts": {
		"sortBy": "date",
		"reverse": true,
		"pattern": ["articles/*.md", "dev-logs/*.md"]
	},
	"articles": {
		"sortBy": "date",
		"reverse": true,
		"pattern": "articles/*.md",
		"metadata": {
			"name": "Articles",
			"description": "Compiled thoughts and walkthroughs on development, design, and project management."
		}
	},
	"dev-logs": {
		"sortBy": "date",
		"reverse": true,
		"pattern": "dev-logs/*.md",
		"metadata": {
			"name": "Development Logs",
			"description": "Informal updates and thoughts on currently active projects."
		}
	},
	"pixel-art": {
		"sortBy": "date",
		"reverse": true,
		"pattern": "pixel-art/*.md"
	}
}
```

```js
// configs/index.js

module.exports = {
	globals: require('./globals'),
	layout: require('./layout'),
	permalinks: require('./permalinks'),
	collections: require('./collections'),
	redirects: require('./redirects'),
};
```

If I were to start another Metalsmith project I would absolutely do this again; keeping configuration metadata separate from the main pipe did wonders for my sanity. If something was going on with the collections instead of digging through 50 lines to find my collection `.use()` I could just pop open the `collections.json` file and have all of the information right there in front of me without any other distractions.

### Deployment to Github Pages

This was a biggie for me as I've gotten to the point where I really just want a simple deployment procedure that's error-proof and don't want to deal with self-hosting and blog droplet management anymore. The solution I wound up using just uses a second hidden build folder that is synced up to the `master` branch for my site repository. When deploying I just have to run `make publish` and Metalsmith will build the site to the hidden deployment folder, make a new commit with the current timestamp, then push to github. Simple and error-proof. The secondary build directory portion was the easiest part of this setup, and can be seen above in the Metalsmith config. The script that does the actual deployment is actually quite simple as well, and is just a 19-line bash script.

```bash
#!/bin/bash

# Function for easier timestamp inclusion
timestamp() {
	date +"%d.%m.%Y_%H:%M"
}

# Run NPM install then build the site to ./.deploy_git
npm install && npm run deploy

# Move the readme into the deployment directory for consistency
cp README.md ./.deploy_git/README.md

# Jump into deployment directory, add everything then push it up to Github
cd ./.deploy_git
git add --all
git commit -S -m "Blog update @ $(timestamp)"
git push origin master
```

That's it! This portion of the implementation is my favorite as it allows me to take advantage of github's auto-deployment to gh pages while maintaining the freedom of using whatever I want to develop the site with. A similar setup could even be used with a more complex Jekyll implementation, so even if I decide to refactor again the changes to the deployment script will remain minimal (if any are even needed).

## Wrap-up

While Metalsmith is kind of cool and useful for some projects, in this particular implementation it may have been better for me to look into my environment set up rather than switching platforms. That said, with some creative thinking you can work around some of the pitfalls of the Metalsmith and create some really complex projects with it.
