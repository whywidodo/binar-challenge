const request = require("supertest");
const app = require("../routers");

describe("User Registration", () => {
  it("should register a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      identity_number: "1234567890",
      identity_type: "ID",
      address: "123 Main St",
    };

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(userData)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Register user successfully.");
    expect(response.body.data.name).toBe(userData.name);
    expect(response.body.data.email).toBe(userData.email);
    // Add more assertions as needed
  });

  it("should return an error for duplicate email", async () => {
    const userData = {
      name: "Jane Doe",
      email: "janedoe@example.com", // Use an email that already exists
      password: "password456",
      identity_number: "9876543210",
      identity_type: "ID",
      address: "456 Elm St",
    };

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(userData)
      .set("Accept", "application/json");

    expect(response.status).toBe(500); // You can customize this based on your error handling
    expect(response.body.error).toBe(true);
    // Add more assertions as needed
  });
});

// Close the Express app after tests
afterAll(() => {
  app.close();
});
