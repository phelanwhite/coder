export function templateForgotPassword(link) {
  return `
    <div style="border: 1px solid #ddd; margin: auto; max-width: 500px; padding: 1rem; border-radius: .25rem;">
        <div style="color: rgb(19, 92, 228); font-weight: bold;font-size: larger;">Forgot Password?</div>
        <div style="margin-top: 1rem; margin-bottom: 1rem;">You can reset your password here.</div>
        <div>
            <a style="background-color: #337ab7; color: white; text-decoration: none; padding: .5rem 1rem; border-radius: .25rem; display: inline-block; text-align: center;" href=${link}>Reset Password</a>
        </div>

    </div>
    `;
}
