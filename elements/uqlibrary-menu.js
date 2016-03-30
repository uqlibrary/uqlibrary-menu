/**
 * By Jan-Willem Wisgerhof <j.wisgerhof@uq.edu.au>
 */
(function () {
  Polymer({
    is: 'uqlibrary-menu',
    properties: {
      /**
       * The current route of the app
       */
      route: {
        type: String,
        value: 'home'
      },
      /**
       * The base of all URLs within the UQL app
       */
      baseUrl: {
        type: String,
        value: ''
      },
      /**
       * Whether to load the menu items automatically
       * @type Boolean
       */
      autoLoad: {
        type: Object,
        value: true
      },
      /**
       * Holds the applications used by the menu
       */
      applications: {
        type: Object,
        observer: '_applicationsChanged'
      },
      /**
       * Holds the user's account
       */
      _account: {
        type: Object,
        value: {
          hasSession: false
        }
      },
      /**
       * @type Boolean
       */
      showHeader: {
        type: Object,
        value: false
      },
      /**
       * The header image to be used
       */
      headerImage: {
        type: String,
        value: ''
      }
    },
    ready: function () {
      var self = this;

      // Load the user's account
      this.$.apiAccount.addEventListener('uqlibrary-api-account-loaded', function (e) {
        if (e.detail.hasSession) {
          self._account = e.detail;
          self.$.apiApplications.get();
        }
      });

      // Load the Applications
      this.$.apiApplications.addEventListener('uqlibrary-api-applications-loaded', function(e) {
        self.applications = e.detail;
      });

      if (this.autoLoad) {
        this.$.apiAccount.get();
        this.$.apiApplications.get();
      }
    },
    attached: function () {
      this.$$('.account').style.background = "url(" + this.headerImage + ") 100%";
    },
    /**
     * Called when a menu item has been clicked
     * @param e
     * @private
     */
    _menuItemClicked: function (e) {
      this.fire("uqlibrary-menu-item-clicked", e.detail);
    },
    /**
     * Called when applications have changed. Sets external / internal link
     * @private
     */
    _applicationsChanged: function () {
      for (var i = 0; i < this.applications.length; i++) {
        var item = this.applications[i];

        if (item.isDivider) {
          item.isLink = false;
        } else {
          item.isLink = true;

          if (item.link.indexOf("http") == 0) {
            item.isExternal = true;
          } else {
            item.isExternal = false;
            item.route = item.link.substring(1);
            item.href = this.baseUrl + item.route;
          }
        }
      }
      
      this.fire('uqlibrary-menu-loaded', this.applications);
    },
    /**
     * Toggles the drawer panel of the main UQL app
     * @private
     */
    _toggleDrawerPanel: function () {
      this.fire('uqlibrary-toggle-drawer');
    },
    /**
     * Returns whether the user is on a mobile device
     * @returns {boolean}
     * @private
     */
    _isMobile: function () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    /**
     * returns true if application before current application is a divider
     * @param index
     * @private
     */
    _hasDivider: function (index) {
      if (index > 0 && this.applications.length > index && this.applications[index-1].isDivider) {
        return 'divider';
      }
    },
    /**
     * Called when the "skipNavigation" button is focused
     * @param e
     * @private
     */
    _skipNavigationFocused: function (e) {
      this.$$('.skip-navigation').style.left = 'calc(50% - 100px)';
      this.$$('.skip-navigation').style.top = "20px";
    },
    /**
     * Called when the "skipNavigation" button loses focus
     * @param e
     * @private
     */
    _skipNavigationBlurred: function (e) {
      this.$$('.skip-navigation').style.left = '-20000px';
      this.$$('.skip-navigation').style.top = "-20000px";
    },
    /**
     * Skips navigation by moving to the "after" span. Will prefer to navigate to the Mega Menu's after
     * @param e
     * @private
     */
    _skipNavigation: function (e) {
      this.$.content.focus();
    },
    /**
     * Performs the logout
     * @param e
     * @private
     */
    _logout: function (e) {
      this._account = {};
      this.fire("uqlibrary-menu-logout");
      this.$.accountApi.logout();
    }
  })
})();
