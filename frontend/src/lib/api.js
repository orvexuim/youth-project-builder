/**
 * API client — wraps fetch with JWT headers
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("ypb_token") || "";
}

async function request(method, path, body = null) {
  const headers = {
    "Content-Type": "application/json",
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  };
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
  return json;
}

export const api = {
  get:    (path)        => request("GET",    path),
  post:   (path, body)  => request("POST",   path, body),
  delete: (path)        => request("DELETE", path),

  // Auth
  register: (data)  => api.post("/api/auth/register", data),
  login:    (data)  => api.post("/api/auth/login",    data),
  me:       ()      => api.get("/api/auth/me"),

  // Projects
  listProjects:   ()    => api.get("/api/projects/"),
  createProject:  (d)   => api.post("/api/projects/", d),
  getProject:     (id)  => api.get(`/api/projects/${id}`),
  deleteProject:  (id)  => api.delete(`/api/projects/${id}`),

  // Generation
  generateStep: (step, id) => api.post(`/api/generate/step${step}/${id}`),
};
