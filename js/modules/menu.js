// Obteniendo elementos del dom
const menuButton = document.getElementById('menu-button');
const mainHeader = document.getElementById('main-header');
const overlay = document.getElementById('main-overlay');
const activeClass = 'is-active';
const isTablet = matchMedia('(max-width: 734px)');

const toggleMenu = () => mainHeader.classList.toggle(activeClass);
const cerrarMenu = () => mainHeader.classList.remove(activeClass);
const cerrarMenuConClick = (event) => {
    if (event.target.tagName === 'A') cerrarMenu();
    console.log('Hay listener en el header');
};
const cerrarMenuTeclaEscape = (event) => {
    if (event.code === 'Escape') cerrarMenu();
};

const handleAddEventListener = () => {
    menuButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', cerrarMenu);
    mainHeader.addEventListener('click', cerrarMenuConClick);
    mainHeader.addEventListener('keydown', cerrarMenuTeclaEscape);
}

const handleRemoveEventListener = () => {
    menuButton.addEventListener('click', toggleMenu);
    overlay.removeEventListener('click', cerrarMenu);
    mainHeader.removeEventListener('click', cerrarMenuConClick);
    mainHeader.removeEventListener('keydown', cerrarMenuTeclaEscape);
}

const handleEventListener = (mediaQuery) => {
    if (mediaQuery.matches) handleAddEventListener()
    else handleRemoveEventListener()
}

export const handleActiveMenu = () => {
    if (isTablet.matches) handleAddEventListener()
    isTablet.addEventListener('change', handleEventListener)
}