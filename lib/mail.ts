import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = "http://localhost:3000"

export const sendVerificationEmail = async (email: string, token: string) => {
 const confirmationLink = `${domain}/auth/new-verification?token=${token}`

 await resend.emails.send({
   from: "onboarding@resend.dev",
   to: email,
   subject: "Please verify your email address",
   html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email address</p>`
 });

}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/reset-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
  })
}