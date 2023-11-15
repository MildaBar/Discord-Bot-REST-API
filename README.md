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

   - Use a GUI REST client, such as Insomnia, Postman, or VS Code extensions (REST Client or Thunder Client).
   - Ensure you have a Discord account and add the necessary information. To make Discord integration work, you need to:
   - Create a Discord application.
   - Obtain the Bot Token and add it to your project's environment variables.

## Usage

### Endpoints

- POST /messages
  <p>Send a congratulatory message to a user on Discord.</p>
  <em><strong>NOTE:</strong></em> Include the message details in the request body in JSON format with username, sprintCode, and channelId
  <p><em><strong>Example:</strong></em></p>
  ```
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

  - **POST /templates** - Create a congratulatory message template.
  <em><strong>NOTE:</strong></em> In the request body in JSON format include template you want to add.
  <p><em><strong>Example:</strong></em></p>

  ```
  {
    "template": "Congratulations on your success! You're unstoppable!🎉"
  }
  ```

  - **GET /templates** - Get all congratulatory message templates.
  - **PATCH /templates/:id** - Update a congratulatory message template.
  <em><strong>NOTE:</strong></em> Include the template id and data you want to update in the request body in JSON format.
  <p><em><strong>Example:</strong></em></p>

  ```
  {
    "id": 20,
    "template": "Congratulations on your success! 🎉"
  }
  ```

  - **DELETE /templates/:id** - Delete a congratulatory message template.
  <em><strong>NOTE:</strong></em> Include the template id in the request body in JSON format.
  <p><em><strong>Example:</strong></em></p>

  ```
  {
  	"id": 20
  }

  ```

- CRUD /sprints

  - **POST /sprints** - Create a sprint.
  <em><strong>NOTE:</strong></em> Include the message details in the request body in JSON format with username, sprintCode, and channelId
    <p><em><strong>Example:</strong></em></p>

  ```
  {
    "template": "Congratulations on your success! You're unstoppable!🎉"
  }
  ```

- **GET /sprints** - Get all sprints.
- **PATCH /sprints/:id** - Update a sprint.
  <em><strong>NOTE:</strong></em> Include the sprints id and data you want to update in the request body in JSON format.
  <p><em><strong>Example:</strong></em></p>
  ```
  {
    "id": 9,
    "sprintTitle": "Node.js and Relational Databases - first Module 3 project"
  }
  ```
- **DELETE /sprints/:id** - Delete a sprint.
  <em><strong>NOTE:</strong></em> Include the sprint id in the request body in JSON format.
  <p><em><strong>Example:</strong></em></p>
  ```
  {
    "id": 9
    }
  ```

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
