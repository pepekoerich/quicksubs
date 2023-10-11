import { transporter, mailOptions } from "@/app/libs/nodemailer";

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: `Contato pelo site de ${name}`,
      text: `Email enviado por ${email}`,
      html: `<p>${message}</p>`,
    });
    return Response.json({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
