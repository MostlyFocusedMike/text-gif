import data from './data';

let isPlaying = false;
let currentInterval;
let current = 1;

const elements = document.querySelectorAll('div[data-text-gif]');

console.log('JSON.stringify: ', btoa(JSON.stringify(data)));

const makeButtons = (screens, uniqueId) => {
    let buttons = '';
    for (let i = 0; i < screens.length; i++) {
        buttons += `<button id='button-${i}-${uniqueId}' data-idx=${i}>${i + 1}</button>`
    }
    return buttons;
};



const makeScreens = (element, uniqueId) => {
    const { play, lang, screens } = JSON.parse(atob(element.textContent));


    const hideAllScreens = () => {
        for (let i = 0; i < screens.length; i++) {
            document.getElementById(`screen-${i}`).style.display = 'none';
            document.getElementById(`comment-${i}`).style.display = 'none';
        }
    }

    const showCurrentScreen = () => {
        hideAllScreens();
        document.getElementById(`screen-${current}`).style.display = 'block';
        document.getElementById(`comment-${current}`).style.display = 'block';
    }

    const showNextCurrentScreen = () => {
        current = current % screens.length;
        showCurrentScreen();
        current++;
    }

    element.innerHTML = `
        <button id='start-${uniqueId}'>Start</button>
        <button id='stop-${uniqueId}'>Stop</button>
        ${makeButtons(screens, uniqueId)}
        <button id='copy-current'>Copy current</button>
        <button id='copy-main'>Copy Final</button>
    `;

    const attachListeners = (screens, uniqueId) => {
        for (let i = 0; i < screens.length; i++) {
            const button = document.getElementById(`button-${i}-${uniqueId}`);
            button.addEventListener('click', (e) => {
                console.log();
                current = e.target.dataset.idx;
                showCurrentScreen();
            })
        }
    }

    attachListeners(screens, uniqueId);

    for (let i = 0; i < screens.length; i++) {
        const { content, notes } = screens[i]
        const lines = content.split('\n');
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.id = `comment-${i}`;
        p.append(notes)
        div.append(p);
        const code = document.createElement('code');
        code.id = `screen-${i}`;
        for (let j = 0; j < lines.length; j++) {
            const pre = document.createElement('pre');
            pre.style.margin = 0;
            const text = document.createTextNode(lines[j] || ' ');
            pre.appendChild(text);
            code.appendChild(pre);
        }
        Object.assign(code.style, {
            padding: '1rem',
            background: 'rgb(34, 34, 36)',
            color: 'aliceblue',
        })
        code.style.display = 'block';
        if (i) {
            code.style.display = 'none';
            p.style.display = 'none';
        }
        div.append(code)
        element.appendChild(div);
    }


    document.getElementById(`start-${uniqueId}`).addEventListener('click', () => {
        if (!isPlaying) {
            currentInterval = setInterval(showNextCurrentScreen, 1000)
            isPlaying = true;
        }
    })

    document.getElementById(`stop-${uniqueId}`).addEventListener('click', () => {
        if (isPlaying) {
            clearInterval(currentInterval);
            isPlaying = false;
        }
    })

    document.getElementById(`copy-current`).addEventListener('click', () => {
        navigator.clipboard.writeText(screens[current].content);
    });

    document.getElementById(`copy-main`).addEventListener('click', () => {
        navigator.clipboard.writeText(screens[screens.length - 1].content);
    });
}

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    makeScreens(element, i);
}


