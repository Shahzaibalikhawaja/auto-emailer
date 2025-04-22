import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASS,
	},
});

app.post("/send-email", async (req, res) => {
	const { to, subject, body } = req.body;

	if (!to || !subject || !body) {
		return res.status(400).json({ error: "Missing fields: to, subject, body" });
	}

	try {
		const info = await transporter.sendMail({
			to,
			subject,
			text: body,
		});

		res.json({ success: true, message: "Email sent", info });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Email sending failed", details: err.message });
	}
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
