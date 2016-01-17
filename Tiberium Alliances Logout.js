// ==UserScript==
// @name           Tiberium Alliances Logout
// @namespace      Tiberium_Alliances_Logout
// @description    Creates logout and back buttons.
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.5.0
// @author         satougame & DLwarez
// ==/UserScript==

(function(){
  var TALogout_mainFunction = function() {
    var TALogout;
      
      function createTweak() {
      console.log("TALogout Loaded");
          
      qx.Class.define("TALogout.main", {
        type: "singleton",
        extend: qx.core.Object,
          members: {
          buttonLogout: null,
		  buttonBack: null,
          initialize: function() {
            var logoutBar = qx.core.Init.getApplication().__dh;
			//Logout-Button
            this.buttonLogout = new qx.ui.form.Button("Logout");
            this.buttonLogout.set({width: 20});
            this.buttonLogout.addListener("click", this.logout, this);
            logoutBar.add(this.buttonLogout, {top: 50, right: 50});
			//Back-Button
			this.buttonBack = new qx.ui.form.Button("Back");
            this.buttonBack.set({width: 20, appearance: "button-text-small"});
            this.buttonBack.addListener("click", this.back, this);
            logoutBar.add(this.buttonBack, {top: 70, right: 50});
          },
          logout: function() {
            window.location.assign("https://alliances.commandandconquer.com/logout");
          },
		  back: function() {
			window.location.assign("https://alliances.commandandconquer.com/home");
		  },
        }
      });
    }
    
    function TALogout_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            createTweak();
          } else
            window.setTimeout(TALogout_checkIfLoaded, 1000);
        } else {
          window.setTimeout(TALogout_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(TALogout_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TALogoutScript = document.createElement("script");
  var txt = TALogout_mainFunction.toString();
  TALogoutScript.innerHTML = "(" + txt + ")();";
  TALogoutScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TALogoutScript);
  }

})();
