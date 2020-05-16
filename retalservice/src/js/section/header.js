export default function initHeader() {
    const mobileMenu_button = document.querySelector('[am-burger-button="menu"]')
    const mobileMenu = document.querySelector('.menu__mobile')
    const menuTargets = document.querySelectorAll('[menu-target]')
    const body = document.querySelector('body')

    function mobileMenuHandler() {
        mobileMenu_button.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active')
                body.removeAttribute('style')
            } else {
                body.style.overflow = 'hidden'
                mobileMenu.classList.add('active')
            }
        })
        menuTargets.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.remove('active')
                mobileMenu_button.removeAttribute('active')
                body.removeAttribute('style')
            })
        })
    }

    mobileMenuHandler()
}