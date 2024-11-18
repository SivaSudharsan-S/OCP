import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';
import './css/ProblemDescription.css';
import { useTheme } from './ThemeContext';
import { handleRunCode as runCode } from './ProblemSolver'; // Correct import

const ProblemDescription = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();

    // Problem Data (Static for now, can be dynamic)
    const problems = {
        1: {
            title: 'Two Sum',
            description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to the target.',
            examples: [
                {
                    input: 'nums = [2,7,11,15], target = 9',
                    output: '[0, 1]',
                    explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
                },
            ],
        },
        2: {
            title: 'Longest Substring Without Repeating Characters',
            description: 'Find the length of the longest substring without repeating characters.',
            examples: [
                {
                    input: 's = "abcabcbb"',
                    output: '3',
                    explanation: 'The answer is "abc", with the length of 3.',
                },
            ],
        },
        3: {
            title: 'Merge Two Sorted Lists',
            description: 'Merge two sorted linked lists and return it as a new sorted list.',
            examples: [
                {
                    input: 'l1 = [1,2,4], l2 = [1,3,4]',
                    output: '[1,1,2,3,4,4]',
                    explanation: 'Merging the two lists gives us the sorted list.',
                },
            ],
        },
        4: {
            title: 'Valid Parentheses',
            description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\', and \']\', determine if the input string is valid.',
            examples: [
                {
                    input: 's = "()"',
                    output: 'True',
                    explanation: 'The string "()" is valid.',
                }
            ],
        },
        5: {
            title: 'Maximum Subarray',
            description: 'Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
            examples: [
                {
                    input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
                    output: '6',
                    explanation: 'The contiguous subarray [4,-1,2,1] has the largest sum = 6.',
                }
            ],
        },
        6: {
            title: 'Search in Rotated Sorted Array',
            description: 'Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.',
            examples: [
                {
                    input: 'nums = [4,5,6,7,0,1,2], target = 0',
                    output: '4',
                    explanation: 'The target 0 is at index 4.',
                }
            ],
        },
        7: {
            title: 'Group Anagrams',
            description: 'Given an array of strings `strs`, group the anagrams together.',
            examples: [
                {
                    input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
                    output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
                    explanation: 'The anagrams are grouped together.',
                }
            ],
        },
        8: {
            title: 'Top K Frequent Elements',
            description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.',
            examples: [
                {
                    input: 'nums = [1,1,1,2,2,3], k = 2',
                    output: '[1,2]',
                    explanation: 'The two most frequent elements are 1 and 2.',
                }
            ],
        },
        9: {
            title: 'Longest Palindromic Substring',
            description: 'Given a string `s`, return the longest palindromic substring in `s`.',
            examples: [
                {
                    input: 's = "babad"',
                    output: '"bab"',
                    explanation: 'The longest palindromic substring is "bab".',
                }
            ],
        },
        10: {
            title: 'Coin Change',
            description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount.',
            examples: [
                {
                    input: 'coins = [1,2,5], amount = 11',
                    output: '3',
                    explanation: '11 = 5 + 5 + 1, so the fewest number of coins is 3.',
                }
            ],
        },
    };

    // State to manage code input, language selection, and output
    const [code, setCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [testResult, setTestResult] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const editorRef = useRef(null); // Ref for CodeMirror editor

    // CodeMirror editor initialization
    const { setContainer } = useCodeMirror({
        container: editorRef.current,
        value: code,
        extensions: [javascript()],
        theme: oneDark,
        onChange: (value) => setCode(value),
    });

    // Ensure that CodeMirror is set up correctly when the component mounts
    useEffect(() => {
        if (editorRef.current) {
            setContainer(editorRef.current);
        }
    }, [setContainer]);

    // Handle change of selected language
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    // Function to execute the code using the local server
    const handleRunCode = async () => {
        const languageMap = {
            javascript: 'javascript',
            python: 'python',
            cpp: 'cpp',
            java: 'java',
        };

        // Call the runCode function and update the output
        try {
            setShowLoader(true);
            const result = await runCode(code, languageMap[selectedLanguage]);
            setOutput(result.output || 'No output');  // Display output or a default message

            // Fetch the current problem using the id
            const problem = problems[id];
            const expectedOutput = problem.examples[0].output; // Assuming you are comparing with the first example

            if (result.output.trim() === expectedOutput.trim()) {
                setTestResult('passed');
            } else {
                setTestResult('failed');
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);  // Show any errors
            setTestResult('failed');
        } finally {
            setShowLoader(false);
        }
    };

    // Function to navigate to the previous problem
    const handlePrevious = () => {
        const prevId = parseInt(id) - 1;
        if (prevId >= 1) {
            navigate(`/problems/${prevId}`);
        }
    };

    // Function to navigate to the next problem
    const handleNext = () => {
        const nextId = parseInt(id) + 1;
        if (nextId <= Object.keys(problems).length) {
            navigate(`/problems/${nextId}`);
        }
    };

    return (
        <div className={`problem-container ${theme}`}>
            <div className="problem-description">
                <h2>{problems[id].title}</h2>
                <p>{problems[id].description}</p>

                <div className="problem-examples">
                    <h4>Examples:</h4>
                    {problems[id].examples.map((example, index) => (
                        <div key={index}>
                            <p><strong>Input:</strong> {example.input}</p>
                            <p><strong>Output:</strong> {example.output}</p>
                            <p><strong>Explanation:</strong> {example.explanation}</p>
                        </div>
                    ))}
                </div>

                <div className="problem-navigation">
                    <button className="prev-btn" onClick={handlePrevious} disabled={id === '1'}>
                        Previous
                    </button>
                    <button className="next-btn" onClick={handleNext} disabled={id === `${Object.keys(problems).length}`}>
                        Next
                    </button>
                </div>
            </div>

            <div className="problem-solution">
                <div className="problem-controls">
                    <select
                        className="language-select"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>

                    <button className="run-btn" onClick={handleRunCode}>Run</button>
                    <button className="submit-btn">Submit</button>
                </div>

                <div className="code-editor">
                    <div ref={editorRef} className="code-editor-container" />
                </div>

                <div className="output-section">
                    <h4>Output</h4>
                    <div className="output-console">
                        <p>{output || 'Your output will appear here...'}</p>
                    </div>
                </div>

                {testResult && (
                    <div className={`test-result ${testResult}`}>
                        {testResult === 'passed' ? 'Test cases passed' : 'Test cases failed'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProblemDescription;