import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const PORT = 5000;

const prisma = new PrismaClient();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json("Everything is OK!");
});

app.get("/farmers", async (_req, res) => {
  try {
    const farmers = await prisma.farmer.findMany();
    res.status(200).json(farmers);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/farmers/:id", async (req, res) => {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        farms: true,
      },
    });
    res.status(200).json(farmer);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/farmers/add", async (req, res) => {
  const { identity, name, farms } = req.body;
  try {
    const farmer = await prisma.farmer.create({
      data: {
        identity,
        name,
        farms: {
          create: farms,
        },
      },
    });

    res.status(201).json({ ...farmer, farms });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.put("/farmers/edit/:id", async (req, res) => {
  try {
    const farmer = await prisma.farmer.update({
      data: req.body,
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(farmer);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/farms/add", async (req, res) => {
  const { farm, farmerId } = req.body;
  try {
    const farmer = await prisma.farm.create({
      data: {
        farmerId,
        ...farm,
      },
    });
    res.status(201).json(farmer);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.put("/farms/edit/:id", async (req, res) => {
  try {
    const farmer = await prisma.farm.update({
      data: req.body,
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(farmer);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.delete("/farms/delete/:id", async (req, res) => {
  try {
    const farmer = await prisma.farm.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(farmer);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/aggregate/state", async (_req, res) => {
  const groupFarms = await prisma.farm.groupBy({
    by: "state",
    _count: {
      state: true,
    },
  });
  res.status(200).json(groupFarms);
});

app.get("/aggregate/seeds", async (_req, res) => {
  const groupFarms = await prisma.farm.groupBy({
    by: "seeds",
    _count: {
      seeds: true,
    },
  });
  res.status(200).json(groupFarms);
});

app.get("/aggregate/state/total", async (_req, res) => {
  const groupFarms = await prisma.farm.groupBy({
    by: "state",
    _sum: {
      total: true,
    },
  });
  res.status(200).json(groupFarms);
});

app.get("/aggregate/agricultural", async (_req, res) => {
  const aggregate = await prisma.farm.aggregate({
    _sum: {
      agricultural: true,
    },
  });
  res.status(200).json(aggregate);
});

app.get("/aggregate/vegetation", async (_req, res) => {
  const aggregate = await prisma.farm.aggregate({
    _sum: {
      vegetation: true,
    },
  });
  res.status(200).json(aggregate);
});

app.get("/aggregate/total", async (_req, res) => {
  const aggregate = await prisma.farm.aggregate({
    _sum: {
      total: true,
    },
  });
  res.status(200).json(aggregate);
});

app.get("/count/farms", async (_req, res) => {
  const count = await prisma.farm.count();
  res.status(200).json(count);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
