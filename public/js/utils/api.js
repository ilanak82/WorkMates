export async function apiPostFormData(endpoint, formData) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      credentials: "include"  // Sends cookies with the request if needed
    });

    // Attempt to parse JSON response
    const data = await response.json();

    return {
      success: response.ok,
      ...data
    };
  } catch (error) {
    console.error("API FormData Error:", error);
    return {
      success: false,
      error: "Network error"
    };
  }
}
