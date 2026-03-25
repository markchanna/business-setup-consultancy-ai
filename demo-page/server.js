const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const RETELL_API_KEY = process.env.RETELL_API_KEY;
const AGENT_ID = process.env.RETELL_AGENT_ID;

if (!RETELL_API_KEY || !AGENT_ID) {
  console.error("Missing required environment variables: RETELL_API_KEY and RETELL_AGENT_ID");
  process.exit(1);
}

// Create a web call and return access token
app.post("/api/create-web-call", async (req, res) => {
  try {
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: AGENT_ID,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.json({
      access_token: data.access_token,
      call_id: data.call_id,
    });
  } catch (error) {
    console.error("Error creating web call:", error);
    res.status(500).json({ error: "Failed to create web call" });
  }
});

app.get("/api/get-call/:callId", async (req, res) => {
  try {
    const response = await fetch(`https://api.retellai.com/v2/get-call/${req.params.callId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching call details:", error);
    res.status(500).json({ error: "Failed to fetch call details" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PrimeStart Demo Server running at http://localhost:${PORT}`);
});
