import m from "../vendor/mithril.js";

export var NavBar = {
  view: function() {
    return [
      m(".header", [
        m("div.headerItem iconAdd", m.trust("&#8853;")),
        m("span.headerItem headerTitle", document.title),
        m("input.headerItem searchField[type=text][placeholder=Suche]")
      ]),
      m("input.openSidebarMenu[type=checkbox][id=openSidebarMenu]"),
      m("label.sidebarIconToggle[for=openSidebarMenu]", [
        m(".spinner diagonal part-1"),
        m(".spinner horizontal part-1"),
        m(".spinner diagonal part-2")
      ]),
      m(
        "div[id=sidebarMenu]",
        m("ul.sidebarMenuInner", [
          m("li", m(m.route.Link, { href: "/" }, "Index")),
          m("li", m(m.route.Link, { href: "/list" }, "Page"))
        ])
      )
    ];
  }
};

export var Footer = {
  urls: [
    { url: "https://mithril.js.org/api.html", text: "mithril" },
    { url: "https://pouchdb.com/api.html", text: "pouchdb" },
    { url: "https://lodash.com/docs/4.17.15", text: "lodash" }
    //    {url: "", text: ""},
  ],
  view: function() {
    return [
      m("hr"),
      m(
        "center",
        m(
          "small",
          Footer.urls.map(function(l) {
            return [
              m("a", { href: l.url, target: "_blank" }, l.text),
              m.trust("&nbsp;")
            ];
          })
        )
      )
    ];
  }
};
