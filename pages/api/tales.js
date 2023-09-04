import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // just rreturn body
  // let x = req.body.prompt;
  const { prompt } = req.body;

  const aiResult = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The assistant helps you to write a fairy tale not exceeding 200 words, suitable for children under 12 years old. and return it at least 2 paragraphs, write NEWP- start of every paragraphs.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 3500,
    temperature: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });

  const response =
    aiResult.data.choices[0].message.content || "There is no response from AI";

  res.status(200).json(response);
}
