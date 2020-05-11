# Canvas LMS Customisation Demo

Example application for use with 'canvas-lms-app'.

## Installation

Clone this repository. Then run the following command:

    npm run setup

or:

    yarn setup

This will clean up the repo and reinitialize Git.

## Usage

Running `yarn build` or `npm run build` will compile everything into one JavaScript file and one CSS file. These files will be optimized and minified. They will be compiled against the list of supported browsers provided by "[Instructure](https://github.com/instructure/supported-browsers)".

During development you can run `yarn build:dev` or `npm run build:dev`. This will compile the scripts into one file that can be uploaded in you Canvas theme. CSS styles will be injected to the page automatically. Running  `yarn watch` or `npm run watch` will keep watching for changes and recompile on-the-fly.
