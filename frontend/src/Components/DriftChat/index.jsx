// src/components/DriftChat.js
import React, { useEffect } from "react";

const DriftChat = () => {
  useEffect(() => {
    (function () {
      var t = (window.driftt = window.drift = window.driftt || []);
      if (!t.init) {
        if (t.invoked) {
          console.error("Drift snippet included twice.");
          return;
        }
        t.invoked = true;
        t.methods = [
          "identify",
          "config",
          "track",
          "reset",
          "debug",
          "show",
          "ping",
          "page",
          "hide",
          "off",
          "on",
        ];
        t.factory = function (e) {
          return function () {
            var n = Array.prototype.slice.call(arguments);
            n.unshift(e);
            t.push(n);
            return t;
          };
        };
        t.methods.forEach(function (e) {
          t[e] = t.factory(e);
        });
        t.load = function (t) {
          var e = 3e5;
          var n = Math.ceil(new Date() / e) * e;
          var o = document.createElement("script");
          o.type = "text/javascript";
          o.async = true;
          o.crossorigin = "anonymous";
          o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
          var i = document.getElementsByTagName("script")[0];
          i.parentNode.insertBefore(o, i);
        };
      }
    })();
    // eslint-disable-next-line no-undef
    driftt.SNIPPET_VERSION = "0.3.1";
    // eslint-disable-next-line no-undef
    driftt.load("2wtrnnnziwbp");

    // Optional: Identify users if needed
    // driftt.identify({ userId: 'your-user-id', email: 'user@email.com' });
  }, []);

  return <></>; // React requires a return statement, can be empty for this component
};

export default DriftChat;
