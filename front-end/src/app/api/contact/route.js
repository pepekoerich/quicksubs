import { transporter, mailOptions } from "@/libs/nodemailer";

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: `Contato pelo QuickSubs - ${name}`,
      text: `Email enviado por ${email}`,
      html: `<p>Olá, me chamo ${name}. ${message}. Por favor, responda essa mensagem por este ${email}</p>`,
    });
    return Response.json({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
