const API_BASE = "http://127.0.0.1:8000";
const API_KEY = "dev-secret-key";

export async function enrollUser(
  userId: string,
  displayName: string,
  file1: Blob,
  file2: Blob
) {
  const form = new FormData();
  form.append("external_user_id", userId);
  form.append("display_name", displayName);
  form.append("file1", file1);
  form.append("file2", file2);

  const res = await fetch(`${API_BASE}/signup/enroll/enroll/`, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
    },
    body: form,
  });

  return res.json();
}

export async function loginStep1(userId: string, file: Blob) {
  const form = new FormData();
  form.append("external_user_id", userId);
  form.append("file", file);

  const res = await fetch(`${API_BASE}/auth/`, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
    },
    body: form,
  });

  return res.json();
}

export async function getChallenge(userId: string) {
  const res = await fetch(
    `${API_BASE}/auth/challenge/?user_id=${userId}`
  );
  return res.json();
}

export async function verifyChallenge(userId: string, file: Blob) {
  const form = new FormData();
  form.append("external_user_id", userId);
  form.append("file", file);

  const res = await fetch(`${API_BASE}/auth/verify/`, {
    method: "POST",
    body: form,
  });

  return res.json();
}