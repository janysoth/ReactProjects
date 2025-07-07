const escapeHtml = (unsafe) =>
  unsafe.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[m]));

const generateResetEmail = (name, resetLink) => {
  const safeName = escapeHtml(name);
  const safeLink = escapeHtml(resetLink);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f7f7;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2 {
          color: #333;
        }
        p {
          color: #555;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          margin-top: 30px;
          font-size: 0.9em;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Hello ${safeName},</h2>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${safeLink}" class="button" role="button">Reset Password</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>This link will expire within 30 minutes.</p>
        <p><a href="${safeLink}" style="color: #007bff;">${safeLink}</a></p>
        <div class="footer">
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = generateResetEmail;
