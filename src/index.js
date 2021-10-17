const elements = document.querySelectorAll('div[data-text-gif]');

const data = {
    play: true,
    lang: 'js',
    screens: [
        {
            content: "<p>test test te ok'<p>wowo</p>'st</p>",
            notes: 'this is just a thing'
        }
    ]
}

for (let i = 0; i < elements.length; i++) {
    const element = elements[i].textContent;
    const { play, lang, screens } = JSON.parse(atob(element));
    console.log('data: ', play, lang, screens);
}
