export default (function burgerButton() {
    document.querySelectorAll('[am-burger-button]').forEach(button => {
        button.addEventListener('click', () => {
            if (button.hasAttribute('active')) {
                button.removeAttribute('active')
                return
            }

            button.setAttribute('active', '')
        })
    })
})();