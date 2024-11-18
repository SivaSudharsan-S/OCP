import axios from 'axios';

const JUDGE0_API_URL = 'https://judge0.p.rapidapi.com/submissions';
const JUDGE0_API_KEY = 'ycc646e5cf1msh54a0dd19717eda6p138eeajsn51b77c55ea14';  // Replace this with your RapidAPI key

export async function submitCode(sourceCode, languageId) {
  try {
    const response = await axios.post(JUDGE0_API_URL, {
      source_code: sourceCode,
      language_id: languageId,
      // Add any other parameters like stdin if needed
    }, {
      headers: {
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting code:', error);
    throw error;
  }
}
