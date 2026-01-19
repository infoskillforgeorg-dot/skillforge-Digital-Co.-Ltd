const html = document.documentElement
const themeBtn = document.getElementById('theme-toggle')
const navToggle = document.querySelector('.nav-toggle')
const navList = document.getElementById('primary-navigation')
const yearEl = document.getElementById('year')

function setTheme(theme) {
  html.setAttribute('data-theme', theme)
  localStorage.setItem('sf-theme', theme)
  const pressed = theme === 'dark'
  themeBtn.setAttribute('aria-pressed', String(pressed))
  themeBtn.textContent = pressed ? 'Light Mode' : 'Dark Mode'
}

;(function initTheme() {
  const saved = localStorage.getItem('sf-theme')
  if (saved) setTheme(saved)
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }
})()

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') || 'light'
  setTheme(current === 'light' ? 'dark' : 'light')
})

navToggle.addEventListener('click', () => {
  const isMobile = window.innerWidth <= 640
  if (isMobile) {
    const menu = document.getElementById('mobile-menu')
    const open = !menu?.classList.contains('open')
    if (open) openMenu()
    else closeMenu()
    navToggle.setAttribute('aria-expanded', String(open))
  } else {
    const open = navList.classList.toggle('open')
    navToggle.setAttribute('aria-expanded', String(open))
  }
})

function openMenu() {
  document.getElementById('mobile-menu')?.classList.add('open')
}
function closeMenu() {
  document.getElementById('mobile-menu')?.classList.remove('open')
}

yearEl.textContent = new Date().getFullYear()

document.querySelector('.subscribe-form')?.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value.trim()
  if (!email) return
  alert('Thanks for subscribing, ' + email + '!')
  e.target.reset()
})

document.querySelector('.feedback-form')?.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = document.getElementById('fb-name').value.trim()
  const email = document.getElementById('fb-email').value.trim()
  const message = document.getElementById('fb-message').value.trim()
  if (!name || !email || !message) return
  alert('Thanks for your feedback, ' + name + '!')
  e.target.reset()
})

// Optional external logo override via meta[name="sf:logo"]
;(function setLogo() {
  const metaLogo = document.querySelector('meta[name="sf:logo"]')?.content
  const logoEl = document.getElementById('brand-logo')
  if (metaLogo && logoEl) logoEl.src = metaLogo
})()

;(function markActiveNav() {
  const path = location.pathname.toLowerCase()
  const hash = location.hash.toLowerCase()
  document.querySelectorAll('.nav-list a').forEach(a => {
    const href = a.getAttribute('href')?.toLowerCase() || ''
    a.classList.remove('active')
    if ((href === '#academy' && (hash.includes('#academy') || path.includes('academy'))) ||
        (href === '#agency' && (hash.includes('#agency') || path.includes('agency')))) {
      a.classList.add('active')
    }
  })
})()

;(function router() {
  const host = location.hostname.toLowerCase()
  if (host.startsWith('academy.')) {
    if (location.hash !== '#academy') location.hash = '#academy'
  } else if (host.startsWith('agency.')) {
    if (location.hash !== '#agency') location.hash = '#agency'
  } else {
    if (location.pathname.toLowerCase().includes('/academy') && location.hash !== '#academy') location.hash = '#academy'
    if (location.pathname.toLowerCase().includes('/agency') && location.hash !== '#agency') location.hash = '#agency'
  }
  function activateFromHash() {
    document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'))
    const link = document.querySelector(`.nav-list a[href="${location.hash}"]`)
    link && link.classList.add('active')
    const target = document.getElementById(location.hash.slice(1))
    target && target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  window.addEventListener('hashchange', activateFromHash)
  if (location.hash) activateFromHash()
})()
  }
  window.addEventListener('hashchange', activateFromHash)
  if (location.hash) activateFromHash()
})()

;(function initReveal() {
  const targets = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('show'))
    return
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  targets.forEach(t => observer.observe(t))
})()

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu()
})
