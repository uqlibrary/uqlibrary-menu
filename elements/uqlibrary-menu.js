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
      user: {
        type: Object,
        value: {
          hasSession: false
        }
      },
      /**
       * Only to be used by unit and integration tests
       * @private
       * @type Boolean
       */
      testMode: {
        type: Object,
        value: false
      }
    },
    ready: function () {
      var self = this;

      // Load the user's account
      this.$.apiAccount.addEventListener('uqlibrary-api-account-loaded', function (e) {
        if (e.detail.hasSession) {
          self.user = e.detail;
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
    /**
     * Called when a menu item has been clicked
     * @param e
     * @private
     */
    _menuItemClicked: function (e) {
      console.log(e);
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

          if (this.testMode) {
            item.href = "#";
            item.route = item.link.substring(1);
          } else if (item.link.indexOf("http") == 0) {
            item.isExternal = true;
          } else {
            item.isExternal = false;
            item.route = item.link.substring(1);
            item.href = this.baseUrl + item.route;
          }
        }
      }
      
      this.fire('uqlibrary-menu-loaded', this.applications);
    }
  })
})();
