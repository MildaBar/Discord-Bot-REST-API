# Discord-Bot-REST-API

## Description

This project is a congratulatory message management system with Discord integration. It allows users to send congratulatory messages to various Discord channels.

## Preparation

To set up the project, follow these steps:

1. **Install Dependencies:**

```bash
npm install
```

2. **Run migrations:**

```bash
npm run migrate:latest
```

3. **Generate types for database tables:**

```bash
npm run gen:types
```

4. **Run seeders file:**

```bash
npm run coverage
```

5. **Set up environment for checking endpoints:**

   - Use tools like Insomnia to test the API endpoints.
   - Ensure you have a Discord account and add the necessary information.

## Usage

### Endpoints

- POST /messages
  <p>Send a congratulatory message to a user on Discord.</p>
  > Note: Include the message details in the request body in JSON format with username, sprintCode, and channelId
  <p><em><strong>Example:</strong></em></p>
  ```bash
  {
    "username": "johnjoe",
    "sprintCode": "WD-1.2",
    "channelId": "1234567891011121314"
  }
  ```

- GET /messages
  <p>Get a list of all congratulatory messages.</p>

- GET /messages?username=johdoe
  <p>Get a list of all congratulatory messages for a specific user.</p>

- CRUD /templates

  - POST /templates
    <p>Create a congratulatory message template.</p>
  - GET /templates
    <p>Get all congratulatory message templates.</p>
  - PATCH /templates/:id
    <p>Update a congratulatory message template.</p>
  - DELETE /templates/:id
    <p>Delete a congratulatory message template.</p>

- CRUD /sprints
  - POST /sprints
    <p>Create a sprint.</p>
  - GET /sprints
    <p>Get all sprints.</p>
  - PATCH /sprints/:id
    <p>Update a sprint.</p>
  - DELETE /sprints/:id
    <p>Delete a sprint.</p>

### Running the program

To run the program, use the following command:

```bash
npm run dev
```

### Testing

To test the code, use either of the following commands:

```bash
npm test
```

or

```bash
npm test file/Path/You/Want/To/Test
```

### Additional

If you want to see code coverage, run:

```bash
npm run coverage
```

###### Link to peer programming exercise:

https://github.com/MildaBar/peer-programming-exercise.git
