const padLockElement = document.getElementById('padlock');
const dataTextElement = document.getElementById('masked-data-text');
const keyTextElement = document.getElementById('masked-data-key');
const messageElement = document.getElementById('message');
let padLockData, dataTextData, keyTextData;
const panelSecurity = document.getElementById('feature-panel-security');
const options = {
    threshold: 0.66,
};

const getInitialData = (steps, range, refer) => {
    const start = refer + scrollY - (innerHeight * options.threshold);
    const end = start + range;
    const unit = (end - start) / steps;
    return {start, end, steps, unit}
}

const serInitialData =() => {
    padLockData = getInitialData(72, 350, padLockElement.getBoundingClientRect().top);
    dataTextData = getInitialData(dataTextElement.innerText.length, 150, messageElement.getBoundingClientRect().top);
    keyTextData = getInitialData(keyTextElement.innerText.length, 150, messageElement.getBoundingClientRect().bottom);
}

serInitialData();
addEventListener('resize', serInitialData);

const getCurrentStep = ({start, end, steps, unit}) => {
    let currentStep = 0;
    // Si el usuario está en el límite permitido del rango
    if (scrollY >= start && scrollY <= end) {
        currentStep = Math.ceil((scrollY - start) / unit)};
    // Si el usuario está abajo del inicio y el paso actual no es 0
    if (scrollY < start && currentStep != 0) {
        currentStep = 0;};
    // Si el usuario está arriba del final y el paso actual no es el total de pasos
    if (scrollY > end && currentStep < steps) {
        currentStep = steps;};
    return currentStep
}

const handleOpenPadlockWithScroll = () => {
    padLockElement.style.animationDelay = `-${getCurrentStep(padLockData)}s`;
}

const handleChangeText = (data, element) => {
    const steps = element.innerText.length;
    const currentStep = getCurrentStep(data);
    const partialText = element.dataset.text.substring(0, currentStep);
    const partialDots = '•'.repeat(steps - currentStep);
    element.innerText = partialText + partialDots;
}

const funtionsForScroll = () => {
    handleOpenPadlockWithScroll();
    handleChangeText(dataTextData, dataTextElement);
    handleChangeText(keyTextData, keyTextElement);
}

const callbackSecurityPanel = (entries) => {
    if (entries[0].isIntersecting) {addEventListener('scroll', funtionsForScroll)
    } else {removeEventListener('scroll', funtionsForScroll)}
}

const SecurityObserve = new IntersectionObserver(callbackSecurityPanel);

export const securityPanelScroll = () => {
    SecurityObserve.observe(panelSecurity);
}