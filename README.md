# uqlibrary-menu

[![Codeship Status for uqlibrary/uqlibrary-menu](https://app.codeship.com/projects/34fdfc90-f6c8-0136-788f-76436281e834/status?branch=polymer1.0)](/projects/321073)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-menu.svg)](https://david-dm.org/uqlibrary/uqlibrary-menu)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-menu/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-menu?type=dev)

Element providing main navigation menu in Polymer v1

Element features:

- skip navigation for accessibility
- loads menu items from json file
- notifies client for menu items loaded and menu item selected

Full documentation and demo can be found in [GitHub Pages](https://uqlibrary.github.io/uqlibrary-menu/uqlibrary-menu/).

## Getting Started

Install Node.JS and run the following in the project directory:

```sh
npm install -g bower web-component-tester polymer-cli
npm install
bower install
```

## Developing

- Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/).
- Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
- GitHub pages should be updated after every commit to `master` branch by running `bin/generate-gh-pages.sh`
- A preview of the component can be viewed locally by running `npm start`. Use the second URL from the command output.

## Example

```html
<uqlibrary-menu
  user="{{user}}"
  menu-file="{{appMenuFile}}"
  on-selected-menu-item-changed="closeMenu"
  on-menu-items-changed="menuReloaded"
  on-logout-clicked="logout"
>
```
