export async function callAI(messages: { role: 'system' | 'user' | 'assistant', content: string }[]): Promise<string> {
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA API Key missing. Please set VITE_NVIDIA_API_KEY in your .env file.");
  }

  const requestBody = {
    model: 'meta/llama-3.1-70b-instruct',
    messages,
    temperature: 0.7,
    max_tokens: 1000
  };

  try {
    const res = await fetch('/nvidia-api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`AI API error: ${res.status} ${res.statusText} - ${errText}`);
      throw new Error(`AI API error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.choices[0]?.message?.content || "Hedwig is asleep right now. Try again later.";
  } catch (error) {
    console.error("Hedwig Fetch Error:", error);
    throw error;
  }
}

export async function explainMistake(code: string, errorOutput: string, quest: string): Promise<string> {
  const messages = [
    {
      role: 'system' as const,
      content: "You are Hedwig, the highly intelligent snowy owl and coding assistant for the Arcane Academy of Code. A student's Python spell (code) has failed. Briefly explain what went wrong and give a gentle hint on how to fix it. Keep it under 4 sentences. Speak like a wise magical owl (e.g., use 'Hoot!', mention feathers, wands, etc.)."
    },
    {
      role: 'user' as const,
      content: `Quest Objective: ${quest}\n\nStudent's Code:\n${code}\n\nError Output:\n${errorOutput}`
    }
  ];

  return callAI(messages);
}
