// Tab switching functionality
document.addEventListener("DOMContentLoaded", () => {
  const tabHeaders = document.querySelectorAll(".tab-header")
  const tabContents = document.querySelectorAll(".tab-content")

  tabHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all headers and contents
      tabHeaders.forEach((h) => h.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked header and corresponding content
      this.classList.add("active")
      document.getElementById(targetTab + "-tab").classList.add("active")
    })
  })

  // Login form submission
  const loginForm = document.getElementById("login-form")
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("login-username").value
    const password = document.getElementById("login-password").value

    console.log("Login attempt:", { username, password })
    alert("Giriş yapılıyor: " + username)

    // Here you would typically send data to your backend
    // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) })
  })

  // Register form submission
  const registerForm = document.getElementById("register-form")
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const fullname = document.getElementById("register-fullname").value
    const email = document.getElementById("register-email").value
    const username = document.getElementById("register-username").value
    const password = document.getElementById("register-password").value
    const terms = document.getElementById("terms").checked

    if (!terms) {
      alert("Lütfen kullanım koşullarını kabul edin.")
      return
    }

    console.log("Register attempt:", { fullname, email, username, password })
    alert("Kayıt oluşturuluyor: " + username)

    // Here you would typically send data to your backend
    // Example: fetch('/api/register', { method: 'POST', body: JSON.stringify({ fullname, email, username, password }) })
  })

 

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#") {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })
})
