import m from "/vendor/mithril.js";
import PouchDB from "/vendor/pouchdb.min.js";
import _ from "/vendor/lodash.min.js";

import { NavBar, Footer } from "/src/layout.js";

var db = new PouchDB("mpskel");
// var sync = PouchDB.sync(db, "https://mkskel-usr:xPm3d!m29@db.gunb.de/mkskel");

/* UI:
Topbar: Menu, Add, Search
Liste: Scroll & onpress-open
Form: Save, del, cancel 
Diet Tracker (Foto, Text ...)
*/

var List = {
  data: [],
  oninit: function(vnode) {
    db.allDocs({ include_docs: true }).then(function(result) {
      List.data = _.map(result.rows, "doc");
      m.redraw();
    });
  },
  view: function(vnode) {
    return m(
      "ul",
      List.data.map(function(rec) {
        return m(
          "li",
          {
            onclick: function(e) {
              console.log(rec._id);
            }
          },
          vnode.attrs.showline(rec, vnode)
        );
      })
    );
  }
};

var Page = {
  recid: null,
  showline: function(rec, vnode) {
    return rec.name + " - " + rec.meaning + vnode.attrs.bla;
  },
  view: function() {
    return [
      m(NavBar),
      m(".main", [
        //m("h1", "Hello, world!"),
        m(List, { bla: " - arg", showline: Page.showline })
      ])
    ];
  }
};

var Home = {
  view: function() {
    return [m(NavBar), m(".main", [m("h1", "Hello, world!!!"), m(Footer)])];
  }
};

m.route(document.body, "/list", {
  "/": Home, // defines `https://localhost/#!/home`
  "/list": Page
});

/*
db.get('1df395d13a7d99343442726fab001f40').then(function (doc) {
  doc.meaning = "OX !";
  db.put(doc)
})
/* */

//
// SW registrieren (nicht im IE11)
//
if (
  "serviceWorker" in navigator &&
  !navigator.userAgent.match(/Trident.*rv\:11\./)
) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceworker.js")
      .then(function(registration) {
        console.log("Service Worker registered");
      })
      .catch(function(err) {
        console.log("SW registration failed");
      });
  });
}
