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
};

export default data;