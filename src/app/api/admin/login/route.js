export async function POST(req) {
  const { password } = await req.json();

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "ADMIN_PASSWORD not set on server" }, { status: 500 });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = Response.json({ ok: true });
  res.headers.set(
    "Set-Cookie",
    `admin_session=${encodeURIComponent(process.env.ADMIN_PASSWORD)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${
      60 * 60 * 12
    }`
  );
  return res;
}
