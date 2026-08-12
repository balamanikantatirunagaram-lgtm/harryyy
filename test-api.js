const apiKey = "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";
const prompt = `
You are the AI curriculum generator for a Wizarding Python Academy RPG.
The player is Level 1 and is entering Chapter 1.
Previous topics learned: None. This is their first lesson..

Generate the next Python lesson. If Chapter 1 is a multiple of 6, make it a BOSS battle.
Return ONLY valid JSON in the following format, with no markdown formatting or extra text:
{
  "chapterNumber": 1,
  "title": "String (e.g. The Enchanted Variable)",
  "story": "String (2-3 paragraphs of immersive RPG story matching the magical academy theme)",
  "instruction": "String (The educational explanation of the Python concept)",
  "questDescription": "String (A short quest objective, e.g. 'Use a for loop to count the potions')",
  "starterCode": "String (The starting Python code, can be empty or have comments)",
  "expectedOutputSnippet": "String (A substring that the output must contain to pass)",
  "xpReward": Number,
  "isBoss": Boolean
}
`;

console.log("Starting request...");
const start = Date.now();
fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'nvidia/nemotron-3.5-lightning-30b-a3b',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 1500,
  })
})
.then(res => {
    console.log("Response status:", res.status);
    return res.text();
})
.then(text => {
    console.log("Response text:", text);
    console.log("Time taken (ms):", Date.now() - start);
    process.exit(0);
})
.catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
