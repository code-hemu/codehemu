
(function () {
  'use strict';
var monthFormat = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  noThumbnail = "",
  postPerPage = 10,
  fixedSidebar = !0,
  commentsSystem = "blogger",
  url=window.location.href;

["?m=1", "&m=1", "%3D%3D", "%3D"].forEach((r => {
  const l = url.indexOf(r);
  l > -1 && (url = url.substring(0, l))
})), url !== window.location.href && window.history.replaceState({}, document.title, url);

function qs(selector, context) {
  if (context === void 0) { context = document; }
  return context.querySelector(selector);
}

function qsa(selector, context) {
  if (context === void 0) { context = document; }
  return Array.from(context.querySelectorAll(selector));
}

function ce(tag) { return document.createElement(tag) }

function jsonpRequest(url, options) {
  var script = ce("script"),
    callbackName = "jsonp_cb_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
  options.beforeSend && options.beforeSend(), window[callbackName] = function (data) {
    delete window[callbackName], script.parentNode && script.parentNode.removeChild(script), options.success && options.success(data)
  }, script.src = url + (-1 === url.indexOf("?") ? "?" : "&") + "callback=" + callbackName, document.head.appendChild(script)
}

function extractTitle(html) {
  var match = html.match(/<h1[^>]*class="[^"]*post-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? match[1].replace(/<[^>]*>/g, "").trim() : ""
}

function fadeIn(el, duration) {
  el.style.opacity = "0", el.style.display = "block", el.style.transition = "opacity " + duration + "ms ease", el.offsetHeight, el.style.opacity = "1"
}

function fadeOut(el, duration) {
  el.style.opacity = "1", el.style.transition = "opacity " + duration + "ms ease", el.offsetHeight, el.style.opacity = "0", setTimeout((function () {
    el.style.display = "none"
  }), duration)
}
document.addEventListener("DOMContentLoaded", (function () {
  function makeSnippet(entries, idx) {
    var text = entries[idx].content.$t.replace(/<[^>]*>/g, '').trim().substr(0, 150);
    var p = ce('p');
    p.className = 'post-snippet';
    p.textContent = text + '…';
    return p;
  }

  function getPostUrl(entries, idx) {
    for (var i = 0; i < entries[idx].link.length; i++)
      if ("alternate" == entries[idx].link[i].rel) {
        var url = entries[idx].link[i].href;
        break
      } return url
  }

  function makePostLink(entries, idx, url) {
    var a = ce('a');
    a.href = url;
    a.textContent = entries[idx].title.$t;
    return a;
  }

  function makeAuthorHtml(entries, idx) {
    var span = ce('span');
    span.className = 'post-author';
    var a = ce('a');
    a.textContent = entries[idx].author[0].name.$t;
    span.appendChild(a);
    return span;
  }

  function makeDateHtml(entries, idx) {
    var pub = entries[idx].published.$t;
    var span = ce('span');
    span.className = 'post-date';
    span.textContent = monthFormat[parseInt(pub.substring(5, 7), 10) - 1] + ' ' + pub.substring(8, 10) + ', ' + pub.substring(0, 4);
    return span;
  }

  function makeThumbHtml(entries, idx) {
    var title = entries[idx].title.$t,
      content = entries[idx].content.$t,
      src;
    if ("media$thumbnail" in entries[idx]) {
      src = entries[idx].media$thumbnail.url.replace("/s72-c", "/w680");
      content.indexOf("youtube.com/embed") > -1 && (src = src.replace("/default.", "/hqdefault."))
    } else {
      var match = content.match(/<img[^>]+src=["']([^"']+)["']/);
      src = match ? match[1] : noThumbnail
    }
    var img = ce('img');
    img.className = 'post-thumb';
    img.alt = title;
    img.src = src;
    return img;
  }

  function makeTagHtml(entries, idx) {
    if (null != entries[idx].category) {
      var span = ce('span');
      span.className = 'post-tag';
      span.textContent = entries[idx].category[0].term;
      return span;
    }
    return null;
  }

  function renderPosts(el, layout, count, label) {
    if (layout.match("mega-menu") || layout.match("hot-posts") || layout.match("col-left") || layout.match("feat-big") || layout.match("post-list") || layout.match("related")) {
      jsonpRequest("recent" == label ? "/feeds/posts/default?alt=json-in-script&max-results=" + count : "random" == label ? "/feeds/posts/default?max-results=" + count + "&start-index=" + (Math.floor(Math.random() * count) + 1) + "&alt=json-in-script" : "/feeds/posts/default/-/" + label + "?alt=json-in-script&max-results=" + count, {
        beforeSend: function () {
          layout.match("hot-posts") ? (el.textContent = '', el.appendChild(Object.assign(ce('div'), {className: 'hot-loader'})), el.parentElement.classList.add("show-hot")) : layout.match("col-left") && (el.textContent = '', el.appendChild(Object.assign(ce('div'), {className: 'hot-loader'})), el.parentElement.classList.add("show-cool"))
        },
        success: function (data) {
          var list;
          if (layout.match("mega-menu")) {
            list = ce("ul");
            list.className = "mega-menu-inner";
          } else if (layout.match("col-left")) {
            list = ce("ul");
            list.className = "feat-col";
          } else if (layout.match("feat-big")) {
            list = ce("ul");
            list.className = "feat-big";
          } else if (layout.match("hot-posts")) {
            list = ce("ul");
            list.className = "hot-posts";
          } else if (layout.match("post-list")) {
            list = ce("ul");
            list.className = "custom-widget";
          } else if (layout.match("related")) {
            list = ce("ul");
            list.className = "related-posts";
          }
          var entries = data.feed.entry;
          if (null != entries) {
            for (var i = 0, entryList = entries; i < entryList.length; i++) {
              var postUrl = getPostUrl(entryList, i),
                postTitleEl = makePostLink(entryList, i, postUrl),
                postThumbEl = makeThumbHtml(entryList, i),
                postTagEl = makeTagHtml(entryList, i),
                postAuthorEl = makeAuthorHtml(entryList, i),
                postDateEl = makeDateHtml(entryList, i);
              makeSnippet(entryList, i);
              var item;
              if (layout.match("mega-menu")) {
                var wrap = ce("div");
                wrap.className = "post-image-wrap";
                var a = ce("a");
                a.className = "post-image-link";
                a.href = postUrl;
                a.appendChild(postThumbEl);
                wrap.appendChild(a);
                if (postTagEl) wrap.appendChild(postTagEl);
                var h2 = ce("h2");
                h2.className = "post-title";
                h2.appendChild(postTitleEl);
                var meta = ce("div");
                meta.className = "post-meta";
                meta.appendChild(postDateEl);
                var content = ce("div");
                content.className = "mega-content";
                content.appendChild(wrap);
                content.appendChild(h2);
                content.appendChild(meta);
                item = ce("div");
                item.className = "mega-item item-" + i;
                item.appendChild(content);
              } else if (layout.match("hot-posts")) {
                var inner = ce("div");
                inner.className = "hot-item-inner";
                var a = ce("a");
                a.className = "post-image-link";
                a.href = postUrl;
                a.appendChild(postThumbEl);
                inner.appendChild(a);
                var info = ce("div");
                info.className = "post-info";
                if (postTagEl) info.appendChild(postTagEl);
                var h2 = ce("h2");
                h2.className = "post-title";
                h2.appendChild(postTitleEl);
                info.appendChild(h2);
                var meta = ce("div");
                meta.className = "post-meta";
                meta.appendChild(postDateEl);
                info.appendChild(meta);
                inner.appendChild(info);
                item = ce("li");
                item.className = "hot-item item-" + i;
                item.appendChild(inner);
              } else if (layout.match("col-left")) {
                var info = ce("div");
                info.className = "post-info";
                var h2 = ce("h2");
                h2.className = "post-title";
                h2.appendChild(postTitleEl);
                info.appendChild(h2);
                var meta = ce("div");
                meta.className = "post-meta";
                meta.appendChild(postDateEl);
                info.appendChild(meta);
                if (0 == i) {
                  var feInner = ce("div");
                  feInner.className = "feat-inner";
                  var a = ce("a");
                  a.className = "post-image-link";
                  a.href = postUrl;
                  a.appendChild(postThumbEl);
                  feInner.appendChild(a);
                  feInner.appendChild(info);
                  item = ce("li");
                  item.className = "feat-item item-big item-" + i;
                  item.appendChild(feInner);
                } else {
                  var a = ce("a");
                  a.className = "post-image-link";
                  a.href = postUrl;
                  a.appendChild(postThumbEl);
                  item = ce("li");
                  item.className = "feat-item item-small item-" + i;
                  item.appendChild(a);
                  item.appendChild(info);
                }
              } else if (layout.match("feat-big")) {
                var info = ce("div");
                info.className = "post-info";
                var h2 = ce("h2");
                h2.className = "post-title";
                h2.appendChild(postTitleEl);
                info.appendChild(h2);
                var meta = ce("div");
                meta.className = "post-meta";
                meta.appendChild(postAuthorEl);
                meta.appendChild(postDateEl);
                info.appendChild(meta);
                if (0 == i) {
                  var feInner = ce("div");
                  feInner.className = "feat-inner";
                  var a = ce("a");
                  a.className = "post-image-link";
                  a.href = postUrl;
                  a.appendChild(postThumbEl);
                  feInner.appendChild(a);
                  if (postTagEl) feInner.appendChild(postTagEl);
                  feInner.appendChild(info);
                  item = ce("li");
                  item.className = "feat-item item-big item-" + i;
                  item.appendChild(feInner);
                } else {
                  var a = ce("a");
                  a.className = "post-image-link";
                  a.href = postUrl;
                  a.appendChild(postThumbEl);
                  item = ce("li");
                  item.className = "feat-item item-small item-" + i;
                  item.appendChild(a);
                  item.appendChild(info);
                }
              } else if (layout.match("post-list")) {
                var a = ce("a");
                a.className = "post-image-link";
                a.href = postUrl;
                a.appendChild(postThumbEl);
                var info = ce("div");
                info.className = "post-info";
                var h2 = ce("h2");
                h2.className = "post-title";
                h2.appendChild(postTitleEl);
                info.appendChild(h2);
                var meta = ce("div");
                meta.className = "post-meta";
                meta.appendChild(postDateEl);
                info.appendChild(meta);
                item = ce("li");
                item.className = "item-" + i;
                item.appendChild(a);
                item.appendChild(info);
              } else if (layout.match("related")) {
                var wrap = ce("div");
                wrap.className = "post-image-wrap";
                var a = ce("a");
                a.className = "post-image-link";
                a.href = postUrl;
                a.appendChild(postThumbEl);
                wrap.appendChild(a);
                if (postTagEl) wrap.appendChild(postTagEl);
                var h2 = ce("h2");
                h2.className = "post-title";
                h2.appendChild(postTitleEl);
                var meta = ce("div");
                meta.className = "post-meta";
                meta.appendChild(postDateEl);
                item = ce("li");
                item.className = "related-item item-" + i;
                item.appendChild(wrap);
                item.appendChild(h2);
                item.appendChild(meta);
              }
              if (item) list.appendChild(item);
            }
          } else {
            list = ce("ul");
            list.className = "no-posts";
            var li = ce("li");
            li.textContent = "Error: No Posts Found";
            list.appendChild(li);
          }
          if (layout.match("mega-menu")) {
            el.classList.add("has-sub", "mega-menu");
            el.appendChild(list);
            var linkEl = qs("a", el);
            if (linkEl) {
              var targetUrl = "recent" == label || "random" == label ? "/search/?&max-results=" + postPerPage : "/search/label/" + label + "?&max-results=" + postPerPage;
              linkEl.setAttribute("href", targetUrl)
            }
          } else if (layout.match("hot-posts")) {
            el.textContent = '';
            el.appendChild(list);
            el.parentElement.classList.add("show-hot");
          } else {
            el.textContent = '';
            el.appendChild(list);
          }
        }
      })
    }
  }! function () {
    var menu = qs("#main-menu");
    if (menu) {
      var j, k, text, parent, text2, link2, subParent, links = qsa(".LinkList ul > li > a", menu),
        len = links.length;
      for (j = 0; j < len; j++) {
        var subUl = ce("ul");
        subUl.className = "sub-menu m-sub";
        "_" !== (text = (k = links[j]).textContent).charAt(0) && j + 1 < len && "_" === links[j + 1].textContent.charAt(0) && (parent = k.parentElement) && parent.appendChild(subUl), "_" === text.charAt(0) && (k.textContent = text.replace("_", ""), qs(".sub-menu", parent).appendChild(k.parentElement))
      }
      for (j = 0; j < len; j++) {
        var subUl2 = ce("ul");
        subUl2.className = "sub-menu2 m-sub";
        "_" !== (text2 = (link2 = links[j]).textContent).charAt(0) && j + 1 < len && "_" === links[j + 1].textContent.charAt(0) && (subParent = link2.parentElement) && subParent.appendChild(subUl2), "_" === text2.charAt(0) && (link2.textContent = text2.replace("_", ""), qs(".sub-menu2", subParent).appendChild(link2.parentElement))
      }
      qsa("ul li ul", menu).forEach((function (el) {
        el.parentElement && "LI" === el.parentElement.tagName && el.parentElement.classList.add("has-sub")
      }));
      var widget = qs(".widget", menu);
      widget && widget.classList.add("show-menu")
    }
  }();
  var mainMenuNav = qs("#main-menu-nav"),
    mobileMenu = qs(".mobile-menu");
  mainMenuNav && mobileMenu && mobileMenu.appendChild(mainMenuNav.cloneNode(!0)), mobileMenu && (qsa(".has-sub", mobileMenu).forEach((function (el) {
    var div = ce("div");
    div.className = "submenu-toggle", el.appendChild(div)
  })), qsa("ul > li a", mobileMenu).forEach((function (el) {
    var href = el.getAttribute("href").trim(),
      lower = href.toLowerCase(),
      slug = href.split("/")[0];
    lower.match("mega-menu") && el.setAttribute("href", "/search/label/" + slug + "?&max-results=" + postPerPage)
  })));
  var slideToggle = qs(".slide-menu-toggle");
  slideToggle && slideToggle.addEventListener("click", (function () {
    document.body.classList.toggle("nav-active")
  })), mobileMenu && qsa("ul li .submenu-toggle", mobileMenu).forEach((function (el) {
    el.addEventListener("click", (function (ev) {
      var parent = el.parentElement;
      if (parent.classList.contains("has-sub")) {
        ev.preventDefault();
        var sub = qs(":scope > .m-sub", parent);
        sub && (parent.classList.contains("show") ? (parent.classList.remove("show"), sub.style.maxHeight = sub.scrollHeight + "px", requestAnimationFrame((function () {
          sub.style.maxHeight = "0px", sub.style.overflow = "hidden", sub.style.transition = "max-height 170ms ease"
        }))) : (parent.classList.add("show"), sub.style.display = "block", sub.style.maxHeight = "0px", sub.style.overflow = "hidden", requestAnimationFrame((function () {
          sub.style.maxHeight = sub.scrollHeight + "px", sub.style.transition = "max-height 170ms ease"
        }))))
      }
    }))
  }));
  var showSearchBtn = qs(".show-search");
  showSearchBtn && showSearchBtn.addEventListener("click", (function () {
    var searchWrap = qs("#nav-search");
    if (searchWrap) {
      searchWrap.style.display = "block", searchWrap.style.opacity = "0", searchWrap.style.transition = "opacity 250ms ease", searchWrap.offsetHeight, searchWrap.style.opacity = "1";
      var input = qs("input", searchWrap);
      input && input.focus()
    }
  }));
  try { var hideSearchBtn = qs(".hide-search");
  hideSearchBtn && hideSearchBtn.addEventListener("click", (function () {
    var searchWrap = qs("#nav-search");
    if (searchWrap) {
      fadeOut(searchWrap, 250);
      var input = qs("input", searchWrap);
      input && input.blur()
    }
  })) } catch (e) { console.error("hideSearch:", e) }
  try { qsa(".Label a, a.b-label").forEach((function (el) {
    var href = el.getAttribute("href");
    el.setAttribute("href", href + "?&max-results=" + postPerPage)
  })) } catch (e) { console.error("Labels:", e) }
  try { qsa(".avatar-image-container img").forEach((function (el) {
    var src = el.getAttribute("src");
    src = (src = src.replace("/s35-c/", "/s45-c/")).replace("//img1.blogblog.com/img/blank.gif", "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0U8FqQtRU98S-a_VheOlpNVcq5kIpQbjN3Eob9p0EtWvBcsGscBsKvDsYKuODGTM8YEq8s6Ug6KVhfRv2_lcZX8Dx6_dDxsyF6h0GGFDjERBAUY9hMdEbfw9ekmtdMhskzkvc2oJdYoDo/s55-r/avatar.png"), el.setAttribute("src", src)
  })) } catch (e) { console.error("Avatars:", e) }
  try { qsa(".author-description a").forEach((function (el) {
    el.setAttribute("target", "_blank")
  })) } catch (e) { console.error("Author:", e) }
  try { qsa(".post-nav").forEach((function () {
    var prevLink = qs("a.prev-post-link"),
      nextLink = qs("a.next-post-link"),
      prevHref = prevLink ? prevLink.getAttribute("href") : "",
      nextHref = nextLink ? nextLink.getAttribute("href") : "";
    prevHref && fetch(prevHref).then((function (res) {
      return res.text()
    })).then((function (html) {
      var titleText = extractTitle(html);
      titleText && (qs(".post-prev a .post-nav-inner p").textContent = titleText)
    })), nextHref && fetch(nextHref).then((function (res) {
      return res.text()
    })).then((function (html) {
      var titleText = extractTitle(html);
      titleText && (qs(".post-next a .post-nav-inner p").textContent = titleText)
    }))
  })) } catch (e) { console.error("PostNav:", e) }
  try { qsa(".post-body strike").forEach((function (el) {
    var text = el.textContent;
    var s; text.match("left-sidebar") && (s = ce("style"), 
      s.textContent = ".item #main-wrapper{float:right}.item #sidebar-wrapper{float:left}", 
      el.replaceWith(s)), 
    text.match("right-sidebar") && (s = ce("style"), 
      s.textContent = ".item #main-wrapper{float:left}.item #sidebar-wrapper{float:right}", 
      el.replaceWith(s)), text.match("full-width") && (s = ce("style"), 
      s.textContent = ".item #main-wrapper{width:100%}.item #sidebar-wrapper{display:none}", 
      el.replaceWith(s))
  })) } catch (e) { console.error("Strike:", e) }
  try { 1 == fixedSidebar && new StickyGum({
    container: "#main-wrapper",
    sidebar: "#sidebar-wrapper",
    offsetTop: 30,
    offsetBottom: 30
  }) } catch (e) { console.error("Sticky:", e) }
  try { qsa(".featured-posts .widget-content").forEach((function (el) {
    var count, label, content = el.textContent.trim(),
      lower = content.toLowerCase(),
      parts = content.split("/");
    lower.match("feat-big") ? (count = 5, label = parts[0]) : (count = parseInt(parts[0], 10), label = parts[1]), renderPosts(el, lower, count, label)
  })) } catch (e) { console.error("Featured:", e) }
  try { qsa(".featured-post .widget-content").forEach((function (el) {
    var count, label, content = el.textContent.trim(),
      lower = content.toLowerCase(),
      parts = content.split("/");
    lower.match("feat-big") ? (count = 5, label = parts[0]) : (count = parseInt(parts[0], 10), label = parts[1]), renderPosts(el, lower, count, label)
  })) } catch (e) { console.error("Featured2:", e) }
  try { qsa(".back-top").forEach((function (el) {
    window.addEventListener("scroll", (function () {
      el.style.display = window.scrollY >= 100 ? "block" : "none"
    })), el.addEventListener("click", (function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }))
  })) } catch (e) { console.error("BackTop:", e) }
  try { qsa("#main-menu #main-menu-nav li").forEach((function (el) {
    var link = qs("a", el);
    if (link) {
      var href = link.getAttribute("href").trim();
      renderPosts(el, href.toLowerCase(), 4, href.split("/")[0])
    }
  })) } catch (e) { console.error("MainMenu:", e) }
  try { qsa("#hot-section .widget-content").forEach((function (el) {
    var text = el.textContent.trim();
    renderPosts(el, text.toLowerCase(), 5, text.split("/")[0])
  })) } catch (e) { console.error("HotSection:", e) }
  try { qsa("#break-section .widget-content").forEach((function (el) {
    var text = el.textContent.trim(),
      lower = text.toLowerCase(),
      split = text.split("/");
    renderPosts(el, lower, parseInt(split[0], 10), split[1])
  })) } catch (e) { console.error("BreakSection:", e) }
  try { qsa(".common-widget .widget-content").forEach((function (el) {
    var text = el.textContent.trim(),
      lower = text.toLowerCase(),
      split = text.split("/");
    renderPosts(el, lower, parseInt(split[0], 10), split[1])
  })) } catch (e) { console.error("CommonWidget:", e) }
  try { qsa(".related-ready").forEach((function (el) {
    var tag = qs(".related-tag", el);
    renderPosts(el, "related", 3, tag ? tag.getAttribute("data-label") : "")
  })) } catch (e) { console.error("Related:", e) }
  try { qsa(".blog-post-comments").forEach((function (el) {
    var system = commentsSystem,
      cls = "comments-system-" + system;
    "blogger" == system ? (el.classList.add(cls), el.style.display = "block") : "hide" == system ? el.style.display = "none" : (el.classList.add("comments-system-default"), el.style.display = "block")
  })) } catch (e) { console.error("Comments:", e) }
  try {
    if (document.cookie.indexOf("ch-cookie-consent") === -1) {

      var cookieWrapper = ce("div");
      cookieWrapper.className = "ch-cookie-wrapper";

      var cookieBox = ce("div");
      cookieBox.className = "ch-cookie-banner ch-cookie-container";

      var cookieMessage = ce("p");
      cookieMessage.className = "ch-cookie-message";
      cookieMessage.appendChild(
        document.createTextNode("We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. ")
      );

      var privacyLink = ce("a");
      privacyLink.target = "_blank";
      privacyLink.rel = "noopener noreferrer";
      privacyLink.setAttribute(
        "aria-label",
        "Read our policy about cookie usage"
      );
      privacyLink.href = "//www.codehemu.in/p/privacy-policy.html";
      privacyLink.textContent = "Learn more";

      cookieMessage.appendChild(privacyLink);
      cookieBox.appendChild(cookieMessage);

      var acceptButton = ce("button");
      acceptButton.type = "button";
      acceptButton.className = "ch-cookie-button";
      acceptButton.textContent = "Got it!";

      cookieBox.appendChild(acceptButton);
      cookieWrapper.appendChild(cookieBox);

      cookieWrapper.id = "ch-cookie-consent";
      document.body.appendChild(cookieWrapper);

      acceptButton.addEventListener("click", function () {

        var cookieBanner = document.getElementById("ch-cookie-consent");

        if (cookieBanner) {
          cookieBanner.parentNode.removeChild(cookieBanner);
        }

        var expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 365);

        document.cookie = [
          "ch-cookie-consent=1",
          "expires=" + expiryDate.toUTCString(),
          "path=/",
          "domain=" + location.hostname
        ].join(";");

      });

    }
  } catch (error) {
    console.error("Cookie Consent Error:", error);
  }
})); })();