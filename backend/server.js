const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

app.post('/api/problems/submit', async (req, res) => {
    const { code, language } = req.body;

    try {
        const tmpFile = tmp.fileSync({ postfix: `.${language}` });
        const filePath = tmpFile.name;
        const className = language === 'java' ? extractClassName(code) : path.basename(filePath, `.${language}`);
        const finalFilePath = path.join(path.dirname(filePath), `${className}.${language}`);
        fs.writeFileSync(finalFilePath, code);

        const command = getCommand(language, finalFilePath);
        exec(command, { cwd: path.dirname(finalFilePath) }, (error, stdout, stderr) => {
            if (error) {
                console.error('Execution error:', stderr);
                return res.status(500).json({ error: stderr, output: '' });
            }

            res.json({ output: stdout });
        });
    } catch (error) {
        console.error('Server error occurred:', error);
        res.status(500).json({ error: error.message, output: '' });
    }
});

const getCommand = (language, filePath) => {
    switch (language) {
        case 'javascript':
            return `node ${filePath}`;
        case 'python':
            return `python ${filePath}`;
        case 'cpp':
            return `g++ ${filePath} -o ${filePath}.out && ${filePath}.out`;
        case 'java':
            return `javac ${filePath} && java -cp ${path.dirname(filePath)} ${path.basename(filePath, '.java')}`;
        default:
            throw new Error('Unsupported language');
    }
};

const extractClassName = (code) => {
    const match = code.match(/class\s+(\w+)/);
    if (match) {
        return match[1];
    }
    throw new Error('Class name not found in Java code');
};

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});