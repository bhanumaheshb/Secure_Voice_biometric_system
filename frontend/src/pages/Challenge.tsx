import { useEffect, useState } from "react";
import { getChallenge, verifyChallenge } from "../API/api";
import { useNavigate } from "react-router-dom";

export default function Challenge() {
  const [challenge, setChallenge] = useState("");
  const [file, setFile] = useState<Blob | null>(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("pending_user") || "";

  useEffect(() => {
    async function fetchChallenge() {
      const res = await getChallenge(userId);
      setChallenge(res.challenge);
    }
    fetchChallenge();
  }, []);

  const handleVerify = async () => {
    if (!file) return;

    const res = await verifyChallenge(userId, file);

    if (res.auth) {
      localStorage.setItem("voice_auth", "true");
      navigate("/dashboard");
    } else {
      alert("Challenge failed");
    }
  };

  return (
    <div>
      <h2>Say This:</h2>
      <h3>{challenge}</h3>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleVerify}>Verify Challenge</button>
    </div>
  );
}