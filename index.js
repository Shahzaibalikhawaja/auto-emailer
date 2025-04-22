import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Uncomment when you need logs
// console.log("Using Email => ", process.env.EMAIL_ADDRESS);
// console.log("Using Password => ", process.env.EMAIL_PASS);

const sendEmail = async () => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: process.env.EMAIL_USER, // sender
			to: "shahzaib.ali.khawaja@gmail.com", // receiver
			subject: "Test Email",
			text: "This is a test email sent using Nodemailer and Gmail App Password.",
		});

		console.log("Email sent:", info.response);
	} catch (error) {
		console.error("Error:", error);
	}
};

sendEmail();
