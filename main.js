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
  const open = navList.classList.toggle('open')
  navToggle.setAttribute('aria-expanded', String(open))
})

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

document.querySelectorAll('a[aria-disabled="true"]').forEach(a => {
  a.addEventListener('click', (e) => e.preventDefault())
})
