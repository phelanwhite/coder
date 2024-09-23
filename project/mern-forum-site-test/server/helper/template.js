export const templateForgotPassword = (link) => {
  const text = `<div
        style="
          max-width: 600px;
          padding: 2rem;
          margin: 0 auto;
          border: 1px solid #eee;
          background-color: white;
          text-align: center;
          border-radius: 10px;
          font-family: Rubik, sans-serif;
          box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
        "
      >
        <div style="font-size: 1.5rem; line-height: 2rem">
          You have requested to reset your password
        </div>
        <div style="color: #455056; line-height: 1.5rem; margin: 1.5rem 0">
          We cannot simply send you your old password. A unique link to reset
          your password has been generated for you. To reset your password,
          click the following link and follow the instructions.
        </div>
        <a
          style="
            background-color: #20e277;
            color: white;
            border-radius: 50px;
            padding: 0.5rem 1.5rem;
            display: inline-block;
            text-decoration: none;
            transition: 0.3s all ease-in-out;
          "
          href=${link}
          >Reset Password</a
        >
      </div>`;
  return text;
};
