const nodemailer=require('nodemailer')

export const sendRequestMail = async (name,email,role) => {
  const user = process.env.EMAIL_USERNAME;
  const app_pass = process.env.APP_PASS;
  const adminEmail=process.env.ADMIN_EMAIL;
  try {
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: user,
        pass: app_pass,
      },
    });
    let details = {
      from: user,
      to: adminEmail,
      subject: `Request by ${name} for ${role}`,
      html: generateEmailTemplate(name, email,role),
    };

    mailTransporter.sendMail(details, function (error, info) {
      if (error) {
        ("wrong email");
      } else {
        console.log("email has been sent", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const generateEmailTemplate = (name, email,role) => {
    const adminName=process.env.ADMIN_NAME
  return `
    <html>
    <head>
      <style>
        / Define your email styles here /
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .header {
          background-color: #f0f0f0;
          padding: 10px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 20px 0;
        }
        .footer {
          background-color: #f0f0f0;
          padding: 10px;
          text-align: center;
          border-radius: 0 0 10px 10px;
        }
      </style>
    </head>
    <body>
    <div class="content">
        <p>Dear ${adminName},</p>
        <p>A new request has been received from ${name}!</p>
        <p>${name} has requested to apply as a <strong>${role}</strong></p>
        <p>Verify the user from your dashboard.</p>
      </div>
      <div class="footer">
        <p>${process.env.INSTITUTE}</p>
      </div>
      </div>
    </body>
  </html>
`;
};
