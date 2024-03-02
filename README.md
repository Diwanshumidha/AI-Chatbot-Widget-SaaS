# Chatty (Ai Chatbot Generator)

See the Project Tutorial and Live Stream [here](https://www.youtube.com/@brettwestwooddeveloper/streams)

This Project Helps You To add a custom chatbot widget to your website so your customer can get quick customer helpline from a chatbot that is powered by open ai and can be customized with your data

## Getting Started

Follow these steps to get started with the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/bwestwood11/AI-Chatbot-Widget-SaaS.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

4. Obtain you DATABASE_URL from [MONGO DB](https://www.mongodb.com/)

5. Obtain your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from [Google Cloud Console](https://console.cloud.google.com/apis/credentials).

6. Obtain your RESEND_API_KEY from [Resend](https://resend.com/).

7. Generate a secret token `NEXTAUTH_SECRET` using the following command:

   ```bash
   openssl rand -base64 32
   ```

   Update your `.env` file with the `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `RESEND_API_KEY`, and the generated `NEXTAUTH_SECRET`.

## Usage

...

## License

...
