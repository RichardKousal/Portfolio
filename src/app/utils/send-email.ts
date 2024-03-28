export async function sendEmail(data: FormData) {
  const apiEndpoint = "/api/email";

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData.message);
    } else {
      throw new Error("Failed to send email");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error:", err.message);
    } else {
      console.error("Unknown error occurred");
    }
  }
}
