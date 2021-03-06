// ==UserScript==
// @name           Tiberium Alliances Logout
// @namespace      Tiberium_Alliances_Logout
// @description    Creates logout and back buttons.
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.5.1
// @author         satougame & DLwarez
// ==/UserScript==

(function(){
  var TALogout_mainFunction = function() {
    console.log("TALogout Loaded");
    function createTweak() {
      //var TALogout = {};
      qx.Class.define("TALogout.main", {
        type: "singleton",
        extend: qx.core.Object,
        construct : function () {},
        members: {
          buttonLogout: null,
		  buttonBack: null,
          initialize: function() {
            var logoutBar = qx.core.Init.getApplication().__dh;
			//Logout-Button
            this.buttonLogout = new qx.ui.form.Button("Logout").set({
                toolTipText: "Log Out",
                width: 20,
                height: 40,
                maxWidth: 100,
                maxHeight: 40,
                //appearance: ("button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                center: true
            });
            this.buttonLogout.addListener("click", function (e) {
                this.logout();
            }, this);
            logoutBar.getDesktop().add(this.buttonLogout, {top: 20, right: 125});
			//Back-Button
			this.buttonBack = new qx.ui.form.Button("Back").set({
                toolTipText: "Back",
                width: 20,
                height: 40,
                maxWidth: 100,
                maxHeight: 40,
                //appearance: ("button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                center: true
            });
            this.buttonBack.addListener("click", function (e) {
                this.back();
            }, this);
            logoutBar.getDesktop().add(this.buttonBack, {top: 40, right: 125});
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
            //window.TALogout.main.getInstance().initialize();
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
  };

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var TALogoutScript = document.createElement("script");
  var txt = TALogout_mainFunction.toString();
  TALogoutScript.innerHTML = "(" + txt + ")();";
  TALogoutScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(TALogoutScript);
  }

})();

// Events
document.addEventListener("keyup", Key, false);
Ini();
