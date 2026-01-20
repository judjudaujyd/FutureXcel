import express from 'express';
import nodemailer from 'nodemailer';

const contactRouter = express.Router();

// Configure email transporter (Gmail)
// NOTE: For production, use environment variables for credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with your email
        pass: process.env.EMAIL_PASS || 'your-app-password'      // Replace with app password
    }
});

// POST /contact - Handle contact form submissions
contactRouter.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email address'
            });
        }

        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: process.env.CONTACT_EMAIL || 'your-email@gmail.com', // Where to receive messages
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1c2a18; border-bottom: 3px solid #006600; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    <div style="background: #fff; padding: 20px; border-left: 4px solid #006600;">
                        <h3 style="color: #333; margin-top: 0;">Message:</h3>
                        <p style="color: #666; line-height: 1.6;">${message}</p>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 12px; color: #666;">
                        <p style="margin: 0;">This email was sent from the Green Celestial contact form.</p>
                        <p style="margin: 5px 0 0 0;">Reply directly to this email to respond to ${name}.</p>
                    </div>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: 'Message sent successfully',
            success: true
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            error: 'Failed to send message. Please try again later.'
        });
    }
});

export default contactRouter;
