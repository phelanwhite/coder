const teamplate = {
  emailResetPassword: (data) => {
    return {
      subject: "Reset Password",
      html: `
            <h1>Reset Password</h1>
            <p>Click on the link below to reset your password:</p>
            <a href="${data}">Reset Password</a>
            `,
    };
  },
  emailWelcome: () => {
    return {
      subject: "Welcome to our website!",
      html: `
            <h1>Welcome to our website!</h1>
            <p>Thank you for signing up. You can now use your email and password to log in.</p>
            `,
    };
  },
};

export default teamplate;
