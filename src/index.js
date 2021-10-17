const elements = document.querySelectorAll('div[data-text-gif]');

const data = {
    play: true,
    lang: 'js',
    screens: [
        {
            content: `const fs = require('fs');
const path = require('path');
const repl = require('repl')`,
            notes: 'First, lets import all our dependencies'
        },
        {
            content: `const fs = require('fs');
const path = require('path');
const repl = require('repl')

const modelDir = path.join(__dirname, 'src', 'models');`,
            notes: 'We also need to tell our script exactly where the models are. path.join and __dirname create an OS agnostic path starting from the directory our script is in.'
        },
        {
            content: `// ...
const loadModels = (context) => {

}`,
            notes: `Next, lets work on the actual function to add our models to the REPL. Lets start by passing in a \`context\` parameter. This is the build context of the REPL. We can add properties to this object and access them globally in the session.`
        },
        {
            content: `// ...
const loadModels = (context) => {
    fs.readdirSync(modelDir, 'utf8').forEach(name => {
        const filePath = path.join(modelDir, name);
        context[name.slice(0,-3)] = require(filePath);
    });
}`,
            notes: `All we're doing is loading our model directory filenames. Thn we take each filename and make a proper path using our modelDir variable. Finally, we're dynamically setting the filename (minus the .js extension) onto our context, and setting the value to be the actual contents of the file via a new \`require\` statement.`
        },
        {
            content: `// ...
const loadModels = (context) => {
    Object.keys(require.cache).forEach(key => {
        delete require.cache[key];
    });

    fs.readdirSync(modelDir, 'utf8').forEach(name => {
        const filePath = path.join(modelDir, name);
        context[name.slice(0,-3)] = require(filePath);
    });
}`,
            notes: `However, we also need to make sure that our \`require\` is only getting the freshest data. Ordinarily, there's a cache that only loads from the real file once. But here, we want to reload from the file each time. So, first we need to `
        },
        {
            content: `const fs = require('fs');
const path = require('path');
const repl = require('repl');

const modelDir = path.join(__dirname, 'src', 'models');

const loadModels = (context) => {
  Object.keys(require.cache).forEach(key => {
    delete require.cache[key];
  });
  fs.readdirSync(modelDir, 'utf8').forEach(name => {
    const filePath = path.join(modelDir, name);
    context[name.slice(0,-3)] = require(filePath);
  });
}`,
            notes: 'And here it is all put together!'
        }
    ]
}
console.log('JSON.stringify: ', btoa(JSON.stringify(data)));

const makeScreens = (element, uniqueId) => {
    const {play, lang, screens} = JSON.parse(atob(element.textContent));
    element.innerHTML = `<button id='start-${uniqueId}'>Start</button>
    <button id='stop-${uniqueId}'>Stop</button>`
    for (let i = 0; i < screens.length; i++) {
        const { content } = screens[i]
        const lines = content.split('\n');
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
        if (i) code.style.display = 'none';
        element.appendChild(code);
    }

    let isPlaying = false;
    let currentInterval;
    let current = 1;
    let prev = 0

    const showCurrentScreen = () => {
        current = current % screens.length
        prev = prev % screens.length
        console.log('current: ', current);
        console.log('prev: ', prev);
        document.getElementById(`screen-${current}`).style.display = 'block'
        document.getElementById(`screen-${prev}`).style.display = 'none'
        current++
        prev++

    }

    document.getElementById(`start-${uniqueId}`).addEventListener('click', () => {
        if (!isPlaying) {
            currentInterval = setInterval(showCurrentScreen, 1000)
            isPlaying = true;
        }
    })

    document.getElementById(`stop-${uniqueId}`).addEventListener('click', () => {
        if (isPlaying) {
            clearInterval(currentInterval);
            isPlaying = false;
        }
    })
}

for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    makeScreens(element, i);
}


