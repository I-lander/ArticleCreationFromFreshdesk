# 🚀 Freshdesk Article Creator Tool

This project is designed to generate Freshdesk articles from ticket content using the OpenAI API.

## 📋 Prerequisites

- 📦 Node.js
- 🔑 OpenAI API Access
- 🎫 Freshdesk API Access

## 🛠 Installation

1. **Clone the repository**:

```
git clone https://github.com/I-lander/ArticleCreationFromFreshdesk
```

2. **Navigate to the project directory**:

```
cd [REPO_NAME]
```

3. **Install the dependencies**:

```
npm install
```

## ⚙️ Configuration

Ensure you set up your API keys for both OpenAI and Freshdesk. 📝 Create a `.env` file at the root of the project and input your keys:

```
OPENAI_API_KEY=your_openai_key
FRESHDESK_API_KEY=your_freshdesk_key
```

## 🏃 Usage

**Start the server**:

1. Prod

```
npm start
```

2. Dev with nodemon for auto-rebuild

```
npm run dev
```

## 📡 Making a Call to the Service

To request an article generation from a Freshdesk ticket, you'll use the following endpoint:

```
http://localhost:3000/generate-article
```

### Parameters:

1. `ticketId`: (Required) The ID of the Freshdesk ticket from which you want to generate an article.

   Example:

```
ticketId=46253
```

2. `createArticle`: (Optional) This parameter dictates the response from the API:

- If set to `true`, the API will not only generate the content but also create an article in Freshdesk.
- If set to `false` (or omitted), the API will only return the generated content without creating an article in Freshdesk.

Example:

```
createArticle=false
```

### Full Example:

To generate content from the ticket with ID `46253` without creating a Freshdesk article:

```
http://localhost:3000/generate-article?ticketId=46253&createArticle=false
```

## 🤝 Contributing

Contributions are welcome! 🌟 Please submit pull requests for improvements.

## 📜 License

This project is licensed under [MIT](LICENSE).
