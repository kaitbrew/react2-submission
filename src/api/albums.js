const BASE_URL = "http://localhost:4000/albums";

// GET all albums
export async function fetchAlbums() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Fetch albums failed: ${res.status}`);
  return res.json();
}

// POST a new album
export async function createAlbum(album) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(album),
  });
  if (!res.ok) throw new Error(`Create album failed: ${res.status}`);
  return res.json();
}

// PATCH an existing album
export async function updateAlbum(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`Update album ${id} failed: ${res.status}`);
  return res.json();
}

// DELETE an existing album
export async function deleteAlbum(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Delete album ${id} failed: ${res.status}`);
  return res.json();
}