# uqlibrary-menu

[![Codeship Status for uqlibrary/uqlibrary-menu](https://app.codeship.com/projects/34fdfc90-f6c8-0136-788f-76436281e834/status?branch=polymer1.0)](/projects/321073)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-menu.svg)](https://david-dm.org/uqlibrary/uqlibrary-menu)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-menu/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-menu?type=dev)

Element providing main navigation menu in Polymer v1

Element features:

- skip navigation for accessibility
- loads menu items from json file
- notifies client for menu items loaded and menu item selected

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
