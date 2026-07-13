export async function onRequest(context) {
  if (context.request.method === "GET") {
    return new Response(
      JSON.stringify({
        success: true,
        message: "API is working"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    const { accessToken } = await context.request.json();

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Missing access token" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const response = await fetch("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
