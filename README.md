uqlibrary-menu
================

Element providing main navigation menu in Polymer v1
Element features:
  - skip navigation for accessibility
  - loads menu items from json file
  - notifies client for menu items loaded and menu item selected

##### Example

  <uqlibrary-menu
      user="{{user}}"
      menu-file="{{appMenuFile}}"
      on-selected-menu-item-changed="closeMenu"
      on-menu-items-changed="menuReloaded"
      on-logout-clicked="logout">
