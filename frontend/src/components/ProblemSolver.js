import React, { useState } from 'react';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { githubDark } from '@uiw/codemirror-theme-github';

// Use MUI (Material-UI) imports from the latest version
import {
    Button,
    Select,
    MenuItem,
    Backdrop,
    CircularProgress,
    styled,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

// Replace `makeStyles` with `styled`
const Editor = styled('div')(({ theme }) => ({
    height: "300px",
    width: "100%",
    border: "1px solid #2196F3",
}));

const Output = styled('div')({
    marginTop: "20px",
    backgroundColor: "#282c34",
    padding: "10px",
    borderRadius: "5px",
    color: "#ffffff",
    whiteSpace: "pre-wrap",
    overflow: "auto",
});

const RunPanel = styled('div')({
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
});

// Define handleRunCode outside the component
const handleRunCode = async (code, language) => {
    try {
        const res = await axios.post('http://localhost:5000/api/problems/submit', {
            code,
            language,  // Using dynamic language
        });
        return res.data;
    } catch (error) {
        console.error('Error submitting code:', error);
        throw error;
    }
};

// Problem Solver Component
const ProblemSolver = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [showLoader, setShowLoader] = useState(false);

    const getLanguageExtension = () => {
        switch (language) {
            case 'javascript':
                return javascript();
            case 'python':
                return python();
            case 'cpp':
                return cpp();
            case 'java':
                return java();
            default:
                return javascript(); // Default to JS if language is unknown
        }
    };

    const runCode = async () => {
        setShowLoader(true);
        try {
            const result = await handleRunCode(code, language);
            setOutput(result.output || 'No output');
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        } finally {
            setShowLoader(false);
        }
    };

    return (
        <div>
            <RunPanel>
                <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <MenuItem value="python">python</MenuItem>
                    <MenuItem value="javascript">javascript</MenuItem>
                    <MenuItem value="cpp">cpp</MenuItem>
                    <MenuItem value="java">java</MenuItem>
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={runCode}
                    startIcon={<PlayArrowRoundedIcon />}
                >
                    Run
                </Button>
            </RunPanel>

            <Editor>
                <CodeMirror
                    value={code}
                    height="300px"
                    theme={githubDark}
                    extensions={[getLanguageExtension()]}
                    onChange={(value) => setCode(value)}
                />
            </Editor>

            {showLoader && (
                <Backdrop open={showLoader}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}

            {output && <Output>Output: {output}</Output>}
        </div>
    );
};

export { handleRunCode };
export default ProblemSolver;