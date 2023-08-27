const articleTemplate = `<h1>A relevant title\r\n
Symptom\r\n
The error or the issue as initally reported\r\n
Solution\r\
Describe how to workaround the bug or the solution detailed by the support engineer.`;

const ARTICLE_MESSAGES = [
  {
    role: "system",
    content: "write a documentation article",
  },
  {
    role: "system",
    content:
      "You must wirte only the article content. It must be as complete as possible and contain all technical point present in the initial description. It must be written as a documentation article.",
  },
  {
    role: "system",
    content:
      "Do not mention user and be as generic as possible. Don't describe a situation, just use the information to write a documention article.",
  },
  {
    role: "system",
    content: `You must write in HTML and use the following template to write the answer ${articleTemplate}.`,
  },
];

export default ARTICLE_MESSAGES;
