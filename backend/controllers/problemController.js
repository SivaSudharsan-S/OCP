const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const tmp = require('tmp');

// backend/controllers/problemController.js
const submitCode = async (req, res) => {
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
        return res.status(500).json({ result: 'Error', output: stderr });
      }

      res.json({ result: 'Success', output: stdout });
    });
  } catch (error) {
    console.error('Server error occurred:', error);
    res.status(500).json({ result: 'Error', output: error.message });
  }
};

// Helper functions
const getCommand = (language, filePath) => {
  switch (language) {
    case 'javascript':
      return `node ${filePath}`;
    case 'python':
      return `python ${filePath}`;
    case 'cpp':
      return `g++ ${filePath} -o ${filePath}.out && ${filePath}.out`;
    case 'java':
      const className = path.basename(filePath, '.java');
      const dir = path.dirname(filePath);
      return `javac ${filePath} && java -cp ${dir} ${className}`;
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

module.exports = {
  submitCode,
};