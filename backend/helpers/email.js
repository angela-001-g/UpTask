import nodemailer from 'nodemailer'

export const registerEmail = async (data) => {
    const { email, name, token } = data

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    // Información del email 

    const info = await transport.sendMail({
        from: '"UpTask - Project Manager" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirm your account",
        text: "Confirm your account in UpTask",
        html: `<p> Hi ${name}, confirm your account in UpTask </p>

        <p> Your account is almost ready, you just have to confirm it in the following link: </p>

        <a href="${process.env.FRONTEND_URL}/confirm/${token}"> Confirm account </a>

        <p> If you did not create this account, you can ignore this message </p>
        `
    })
}

export const forgotPasswordEmail = async (data) => {
    const { email, name, token } = data

    // TODO: Mover hacia variables de entorno 

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    // Información del email 

    const info = await transport.sendMail({
        from: '"UpTask - Project Manager" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Reset your password",
        text: "Confirm your account in UpTask",
        html: `<p> Hi ${name}, you have requested to reset your password </p>

        <p> Follow the following link to reset your password: </p>

        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}"> Reset password </a>

        <p> If you did not request this email, you can ignore this message </p>
        `
    })
}