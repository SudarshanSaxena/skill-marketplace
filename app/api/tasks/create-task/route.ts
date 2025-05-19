export async function POST(request: Request) {
  const body = await request.json();
  const { id, name, description, category } = body;

  try {
    const response = await fetch(`http://localhost:3000/api/skills/update-skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        description,
        category,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update skill");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
}