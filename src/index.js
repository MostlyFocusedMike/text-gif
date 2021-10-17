const elements = document.querySelectorAll('div[data-text-gif]');

const data = {
    play: true,
    lang: 'js',
    screens: [
        {
            content: "<p>test test te ok'<p>wowo</p>'st</p>",
            notes: 'this is just a thing'
        },
        {
            content: "Second thing here 'hi'",
            notes: 'another'
        }
    ]
}
console.log('JSON.stringify: ', btoa(JSON.stringify(data)));

const makeScreens = (element) => {
    const {play, lang, screens} = JSON.parse(atob(element.textContent));
    console.log('play, lang, screens: ', play, lang, screens);
    for (let i = 0; i < screens.length; i++) {
        const { content } = screens[i]

        const code = document.createElement('code');
        const text = document.createTextNode(content);
        code.appendChild(text);
        const div = document.createElement('div');
        div.classList.add(`screen-${i}`);
        div.appendChild(code);
        element.appendChild(div)
    }
}

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    makeScreens(element);
}

let currentInterval;
let current = 0;

const showCurrentScreen = () => {
    console.log('current: ', current);
    current = ++current % 4
}

document.getElementById('start').addEventListener('click', () => {
    currentInterval = setInterval(showCurrentScreen, 1000)
})

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(currentInterval);
})
