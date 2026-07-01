/* Klimate Consulting — shared nav injector for standalone interactive posts.
 * Injects a sticky global header + footer so these non-React pages carry the
 * same navigation as the rest of the site. Vanilla JS, no dependencies, so it
 * loads instantly on the Plotly/Mapbox-heavy posts. Single source of truth:
 * edit here, every post updates. Include in each post's <head>:
 *   <link rel="stylesheet" href="/blog-posts/_shared/site-nav.css">
 *   <script src="/blog-posts/_shared/site-nav.js" defer></script>
 */
(function () {
  'use strict'

  var SITE = 'https://klimateconsulting.com'
  var DATA = 'https://data.klimateconsulting.com/'

  // Root-relative for same-origin links; absolute for the data subdomain.
  var LINKS = [
    { label: 'Insights', href: '/insights/' },
    { label: 'Research', href: '/research/' },
    { label: 'Data Labs', href: DATA },
    { label: 'Services', href: '/services/' },
    { label: 'Contact', href: '/contact/' },
  ]

  function linkItems() {
    return LINKS.map(function (l) {
      return '<li><a href="' + l.href + '">' + l.label + '</a></li>'
    }).join('')
  }

  function build() {
    if (document.querySelector('.kc-nav')) return // idempotent

    // Skip-to-content link.
    var skip = document.createElement('a')
    skip.className = 'kc-skip'
    skip.href = '#kc-content'
    skip.textContent = 'Skip to content'

    // Header.
    var header = document.createElement('header')
    header.className = 'kc-nav'
    header.setAttribute('role', 'banner')
    header.innerHTML =
      '<div class="kc-nav__inner">' +
      '<a class="kc-nav__brand" href="' + SITE + '/">Klimate Consulting</a>' +
      '<button class="kc-nav__toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="kc-nav-links">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
      '</button>' +
      '<nav aria-label="Primary"><ul class="kc-nav__links" id="kc-nav-links">' +
      linkItems() +
      '</ul></nav>' +
      '</div>'

    // Content sentinel (skip-link target, sits right after the header).
    var sentinel = document.createElement('span')
    sentinel.id = 'kc-content'
    sentinel.tabIndex = -1

    // Footer.
    var footer = document.createElement('footer')
    footer.className = 'kc-foot'
    footer.setAttribute('role', 'contentinfo')
    footer.innerHTML =
      '<div class="kc-foot__inner">' +
      '<ul class="kc-foot__links">' +
      '<li><a href="' + SITE + '/">Home</a></li>' +
      linkItems() +
      '</ul>' +
      '<p class="kc-foot__cross">Explore our interactive dashboards at ' +
      '<a href="' + DATA + '">data.klimateconsulting.com</a> — or return to the ' +
      '<a href="' + SITE + '/">main site</a>.</p>' +
      '<p class="kc-foot__copy">&copy; ' +
      new Date().getFullYear() +
      ' Klimate Consulting. All rights reserved.</p>' +
      '</div>'

    document.body.insertBefore(sentinel, document.body.firstChild)
    document.body.insertBefore(header, document.body.firstChild)
    document.body.insertBefore(skip, document.body.firstChild)
    document.body.appendChild(footer)

    // Mobile toggle.
    var toggle = header.querySelector('.kc-nav__toggle')
    var links = header.querySelector('.kc-nav__links')
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('kc-open')
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    })
    // Collapse the mobile menu after a link is tapped.
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('kc-open')
        toggle.setAttribute('aria-expanded', 'false')
      }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build)
  } else {
    build()
  }
})()
