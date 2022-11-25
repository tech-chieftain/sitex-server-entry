import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

// POST /users
app.post("/users", async (req, res) => {
  const { name, email, phoneNumber, interests, worldCupChoice } = req.body;
  console.log(req.body);
  
  const user = await prisma.user.create({
    data: {
      name,
      phoneNumber,
      email,
      interests,
      worldCupChoice,
    },
  });
  res.json(user);
});

// GET /users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// GET /users/:id
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Todo REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /users
    GET, PUT, DELETE /users/:id
  </pre>
  `.trim()
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
