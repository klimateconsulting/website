/* Klimate Consulting — shared nav/footer injector for standalone interactive
 * posts. Injects the 2026 redesign's sticky header + footer + reading-progress
 * bar so these non-React pages carry the same shell as the rest of the site,
 * without touching the bespoke article content, charts or scripts beneath it.
 * Vanilla JS, no dependencies, so it loads instantly on the Plotly/Mapbox-heavy
 * posts. Single source of truth: edit here, every post updates. Include in
 * each post's <head>:
 *   <link rel="stylesheet" href="/blog-posts/_shared/site-nav.css">
 *   <script src="/blog-posts/_shared/site-nav.js" defer></script>
 */
(function () {
  'use strict'

  var NAV_LINKS = [
    { label: 'Services', href: '/services/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Insights', href: '/insights/' },
    { label: 'Research', href: '/research/' },
    { label: 'Data Labs', href: '/data-labs/' },
    { label: 'Team', href: '/team/' },
    { label: 'About', href: '/about/' },
  ]

  var FOOTER_SERVICE_LINKS = [
    { label: 'Water', href: '/services/water/' },
    { label: 'Energy', href: '/services/energy/' },
    { label: 'Agriculture', href: '/services/agriculture/' },
    { label: 'Food Systems', href: '/services/food-systems/' },
  ]

  var FOOTER_COMPANY_LINKS = [
    { label: 'About', href: '/about/' },
    { label: 'Team', href: '/team/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Insights', href: '/insights/' },
    { label: 'Data Labs', href: '/data-labs/' },
  ]

  var LINKEDIN_URL = 'https://www.linkedin.com/company/klimate-consulting/'

  // ---------- Fonts ----------
  // The redesign's nav/footer use Montserrat + Space Grotesk. These bespoke
  // posts load their own body fonts (left untouched) but usually don't pull
  // in these two families, so add them once if missing.
  function ensureFonts() {
    var already = document.querySelector('link[href*="Montserrat"], link[href*="family=Montserrat"]')
    if (already) return

    var preconnect1 = document.createElement('link')
    preconnect1.rel = 'preconnect'
    preconnect1.href = 'https://fonts.googleapis.com'

    var preconnect2 = document.createElement('link')
    preconnect2.rel = 'preconnect'
    preconnect2.href = 'https://fonts.gstatic.com'
    preconnect2.crossOrigin = 'anonymous'

    var fontLink = document.createElement('link')
    fontLink.rel = 'stylesheet'
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap'

    document.head.appendChild(preconnect1)
    document.head.appendChild(preconnect2)
    document.head.appendChild(fontLink)
  }

  function navLinkItems() {
    return NAV_LINKS.map(function (l) {
      return '<li><a href="' + l.href + '">' + l.label + '</a></li>'
    }).join('')
  }

  function footerLinkItems(links) {
    return links
      .map(function (l) {
        return '<a href="' + l.href + '">' + l.label + '</a>'
      })
      .join('')
  }

  function build() {
    if (document.querySelector('.kc-nav')) return // idempotent

    ensureFonts()

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
      '<a class="kc-nav__brand" href="/" aria-label="Klimate Consulting home">' +
      '<img src="/logos/logo-blue.png" alt="Klimate Consulting" width="180" height="40">' +
      '</a>' +
      '<button class="kc-nav__toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="kc-nav-links">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
      '</button>' +
      '<nav aria-label="Primary"><ul class="kc-nav__links" id="kc-nav-links">' +
      navLinkItems() +
      '<li><a class="kc-nav__contact" href="/contact/">Contact</a></li>' +
      '</ul></nav>' +
      '</div>' +
      '<div class="kc-progress" aria-hidden="true"><div class="kc-progress__fill"></div></div>'

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
      '<div class="kc-foot__grid">' +
      '<div class="kc-foot__brand">' +
      '<img src="/logos/logo-white.png" alt="Klimate Consulting" width="180" height="40">' +
      '<p class="kc-foot__tagline">A lean, AI-native research firm delivering high-quality analysis on water, energy, agriculture — and beyond.</p>' +
      '<a class="kc-foot__linkedin" href="' + LINKEDIN_URL + '" target="_blank" rel="noopener noreferrer">LinkedIn &#8599;</a>' +
      '</div>' +
      '<div>' +
      '<div class="kc-foot__heading">Services</div>' +
      '<div class="kc-foot__col">' + footerLinkItems(FOOTER_SERVICE_LINKS) + '</div>' +
      '</div>' +
      '<div>' +
      '<div class="kc-foot__heading">Company</div>' +
      '<div class="kc-foot__col">' + footerLinkItems(FOOTER_COMPANY_LINKS) + '</div>' +
      '</div>' +
      '<div>' +
      '<div class="kc-foot__heading">Contact</div>' +
      '<div class="kc-foot__col">' +
      '<a href="mailto:hello@klimateconsulting.com">hello@klimateconsulting.com</a>' +
      '<span class="kc-foot__muted">San Francisco, CA</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="kc-foot__bottom">' +
      '<span class="kc-foot__copy">&copy; ' + new Date().getFullYear() + ' Klimate Consulting. All rights reserved.</span>' +
      '<div class="kc-foot__stripe" aria-hidden="true">' +
      '<div style="background:#D3EBFB"></div><div style="background:#70A288"></div><div style="background:#FFAD05"></div><div style="background:#C3D2DF"></div>' +
      '</div>' +
      '</div>' +
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

    // Reading-progress fill, tracked against full document scroll range.
    var fill = header.querySelector('.kc-progress__fill')
    function updateProgress() {
      var doc = document.documentElement
      var scrollable = doc.scrollHeight - doc.clientHeight
      var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      fill.style.width = Math.min(100, Math.max(0, pct)) + '%'
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    updateProgress()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build)
  } else {
    build()
  }
})()
