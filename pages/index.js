import { useState } from "react";
import FileUploader from "../components/FileUploader";
import WalletConnect from "../components/WalletConnect";

export default function Home() {
  const [evmAddress, setEvmAddress] = useState(null);
  const [dotAddress, setDotAddress] = useState(null);
  const [cid, setCid] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">ECHO — Your Web3 Digital Archive</h1>

      <WalletConnect setEvmAddress={setEvmAddress} setDotAddress={setDotAddress} />

      <div className="mt-8">
        <FileUploader onUploaded={setCid} />
      </div>

      {cid && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p>✅ File stored on Storacha IPFS</p>
          <p><strong>CID:</strong> {cid}</p>
          <a href={`https://storacha.io/ipfs/${cid}`} target="_blank" rel="noreferrer">
            View File
          </a>
        </div>
      )}
    </div>
  );
}
