let mobileNav = document.getElementsByClassName('mobile-nav')[0]
let body = document.getElementsByTagName('body')[0]

// Open/close mobile nav
mobileNav.addEventListener('click', (e) => {
    body.classList.toggle('mobileNavOpen')
}, false)
