// lib/api.ts
export const api = async (
    endpoint: string,
    method = "GET",
    data?: Record<string, any>
  ) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: data ? JSON.stringify(data) : undefined
    });
  
    const json = await res.json();
  
    if (!res.ok) {
      throw new Error(json.message || "İstek başarısız");
    }
  
    return json;
  };
  