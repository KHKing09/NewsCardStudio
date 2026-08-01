// Advanced Editor Logic

document.addEventListener('DOMContentLoaded', () => {
    const fontSizeSlider = document.getElementById('font-size-slider');
    const titleColorPicker = document.getElementById('title-color-picker');
    const bgColorPicker = document.getElementById('bg-color-picker');
    const toggleLogoBtn = document.getElementById('toggle-logo-btn');

    const advCardTitle = document.getElementById('adv-card-title');
    const advCard = document.getElementById('adv-card');
    const cardLogoText = document.getElementById('card-logo-text');

    if (!fontSizeSlider || !titleColorPicker || !bgColorPicker || !toggleLogoBtn) {
        return;
    }

    if (!advCardTitle || !advCard || !cardLogoText) {
        return;
    }

    const updateTitleFontSize = (value) => {
        advCardTitle.style.fontSize = `${value}px`;
    };

    updateTitleFontSize(fontSizeSlider.value);

    fontSizeSlider.addEventListener('input', (event) => {
        updateTitleFontSize(event.target.value);
    });

    titleColorPicker.addEventListener('input', (event) => {
        advCardTitle.style.color = event.target.value;
    });

    bgColorPicker.addEventListener('input', (event) => {
        advCard.style.backgroundColor = event.target.value;
    });

    toggleLogoBtn.addEventListener('click', () => {
        const isHidden = cardLogoText.style.display === 'none';
        cardLogoText.style.display = isHidden ? 'inline-block' : 'none';
    });
});