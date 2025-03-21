export async function GET() {
  const data = { id: 1, name: "John" };
  return Response.json({ data });
}
