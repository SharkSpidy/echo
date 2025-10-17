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
    <div className="flex flex-col gap-4 items-center">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="bg-green-600 px-4 py-2 rounded-lg text-white"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload to IPFS"}
      </button>
      {cid && (
        <p>
          ✅ Uploaded: <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noreferrer">{cid}</a>
        </p>
      )}
    </div>
  );
}
