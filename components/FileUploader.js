import { useState } from "react";
import { uploadToIPFS } from "../utils/ipfs";

export default function FileUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    setLoading(true);
    const cid = await uploadToIPFS(file);
    setCid(cid);
    onUploaded(cid);
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {cid && <p>Uploaded! CID: {cid}</p>}
    </div>
  );
}
