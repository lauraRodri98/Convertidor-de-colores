const cambiarIdioma = (lang) => {
    const titleSpanish = document.getElementById('title-spanish');
    const titleEnglish = document.getElementById('title-english');
    
    const titleTextSpanish = document.getElementById('title-text-spanish');
    const titleTextEnglish = document.getElementById('title-text-english');

    const subSpanish = document.getElementById('sub-spanish');
    const subEnglish = document.getElementById('sub-english');
    
    const textSpanish = document.getElementById('text-spanish');
    const textEnglish = document.getElementById('text-english');

    const copyRightSpanish = document.getElementById('copy-right-spanish');
    const copyRightEnglish = document.getElementById('copy-right-english');

    const buttonSpanish = document.getElementById('button__git--spanish')
    const buttonEnglish = document.getElementById('button__git--english')

    if (lang === 'en') {
        titleSpanish.style.display = 'block';
        titleTextSpanish.style.display = 'block';
        subSpanish.style.display = 'block';
        textSpanish.style.display = 'block';
        copyRightSpanish.style.display = 'block';
        buttonSpanish.style.display = 'block'

        titleEnglish.style.display = 'none';
        titleTextEnglish.style.display = 'none';
        subEnglish.style.display = 'none';
        textEnglish.style.display = 'none';
        copyRightEnglish.style.display = 'none';
        buttonEnglish.style.display = 'none'
    } else {
        titleEnglish.style.display = 'block';
        titleTextEnglish.style.display = 'block';
        subEnglish.style.display = 'block';
        textEnglish.style.display = 'block';
        copyRightEnglish.style.display = 'block';
        buttonEnglish.style.display = 'block';

        titleSpanish.style.display = 'none';
        titleTextSpanish.style.display = 'none';
        subSpanish.style.display = 'none';
        textSpanish.style.display = 'none';
        copyRightSpanish.style.display = 'none';
        buttonSpanish.style.display = 'none'

    }
};

document.getElementById('button--spanish').addEventListener('click', () => {
    cambiarIdioma('es');
});

document.getElementById('button--english').addEventListener('click', () => {
    cambiarIdioma('en');
});
