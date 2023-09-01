const articleTemplate = `<h1>A relevant title</h1>\r\n
<h2>Symptom</h2>\r\n
The error or the issue as initally reported\r\n
<h2>Solution</h2>\r\
Description for the workaround or the solution detailed by the support engineer written with HTML format.`;

const ARTICLE_MESSAGES = [
  {
    role: "system",
    content: "write a documentation article",
  },
  {
    role: "system",
    content:
      "You must wirte only the article content. It must be as complete as possible and contain all technical points present in the initial description. It must be written as a documentation article.",
  },
  {
    role: "system",
    content:
      "Do not mention user and be as generic as possible. Don't describe a situation, just use the information to write a documention article.",
  },
  {
    role: "system",
    content: `You must write in HTML and use the following template to write the answer: ${articleTemplate}.`,
  },
];

export default ARTICLE_MESSAGES;
