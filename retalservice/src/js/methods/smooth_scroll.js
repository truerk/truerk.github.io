export const smooth_scroll = () => {
    let menuItems = document.querySelectorAll('[menu-target]');

    menuItems.forEach(item => {
        let itemValue = item.getAttribute('menu-target');
        const neededSector = document.getElementById(itemValue) || false;
        if (neededSector) {
            const neededId = neededSector.getAttribute('id');
            if (neededId == itemValue) {
                item.addEventListener('click', (e) => {
                    e.preventDefault;

                    neededSector.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
                })
            }
        }
    })
}