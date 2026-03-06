// File path: /api/subscribe.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  // Path to store emails (emails.json in your project root)
  const filePath = path.join(process.cwd(), "emails.json");
  let emails = [];

  // Try to read existing emails
  try {
    emails = JSON.parse(fs.readFileSync(filePath));
  } catch (err) {
    emails = [];
  }

  // Check if email already exists
  if (emails.includes(email)) {
    return res.status(400).json({ message: "You are already on the radar" });
  }

  // Add new email
  emails.push(email);
  fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));

  return res.status(200).json({ message: "Thanks! You’re on the radar." });

}
