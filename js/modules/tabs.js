const tabsSection = document.getElementById('tabs-section');
const tabsContainer = document.getElementById('tabs-container');

const getArrayElements = (selector) => Array.from(tabsSection.querySelectorAll(selector));

const panels = getArrayElements('.panel');
const tabs = getArrayElements('.tab');
const images = getArrayElements('.image-panel');

const changeActiveClass = (elements, index) => {
    elements.map(elements => elements.classList.remove('is-active'));
    elements[index].classList.add('is-active');
}

const switchContent = (event) => {
    const element = event.target;
    if(!element.classList.contains('tab')) return;
    const index = tabs.indexOf(element);
    changeActiveClass(tabs, index);
    changeActiveClass(images, index);
    changeActiveClass(panels, index);
}

export const handleActiveTabs = () => {
    tabsContainer.addEventListener('click', switchContent)
}