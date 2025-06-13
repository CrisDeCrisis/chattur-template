export const useFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: any
) => {
  try {
    const response = await fetch(url, {
      method: method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    throw error;
  }
};
