# Discord-Bot-REST-API

## Description

This project is a congratulatory message management system with Discord integration. It allows users to send congratulatory messages to various Discord channels.

## Preparation

To set up the project, follow these steps:

1. **Install Dependencies:**

```
   npm install
```

2. **Run migrations:**

```
   npm run migrate:latest
```

3. **Generate types for database tables:**

```
npm run gen:types
```

4. **Set up environment for checking endpoints:**
   - Use tools like Insomnia to test the API endpoints.
   - Ensure you have a Discord account and add the necessary information.

## Usage

### Endpoints

- POST /messages
  Send a congratulatory message to a user on Discord.
  > Note: Include the message details in the request body in JSON format with username, sprintCode, and channelId
  >
  > - Example:
  ```
  >   {
  >   "username": "johnjoe",
  >   "sprintCode": "WD-1.2",
  >   "channelId": "1234567891011121314"
  >   }
  ```
- GET /messages
  Get a list of all congratulatory messages.

- GET /messages?username=johdoe
  Get a list of all congratulatory messages for a specific user.

- CRUD /templates

  - POST /templates
    Create a congratulatory message template.
  - GET /templates
    Get all congratulatory message templates.
  - PATCH /templates/:id
    Update a congratulatory message template.
  - DELETE /templates/:id
    Delete a congratulatory message template.

- CRUD /sprints
  - POST /sprints
    Create a sprint.
  - GET /sprints
    Get all sprints.
  - PATCH /sprints/:id
    Update a sprint.
  - DELETE /sprints/:id
    Delete a sprint.

### Running the program

To run the program, use the following command:

```
npm run dev
```

### Testing

To test the code, use either of the following commands:

```
npm test
```

or

```
npm test filePathYouWantToTest
```

### Additional

If you want to see code coverage, run:

```
npm run coverage
```
