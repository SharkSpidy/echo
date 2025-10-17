"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";

export default function WalletConnect({ setEvmAddress, setDotAddress }) {
  const [evmAddress, setEvmAddr] = useState(null);
  const [dotAddress, setDotAddr] = useState(null);

  const connectMetaMask = async () => {
    if (!window.ethereum) return alert("Install MetaMask first!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setEvmAddr(accounts[0]);
    setEvmAddress(accounts[0]);
  };

  const connectPolkadot = async () => {
    const extensions = await web3Enable("ECHO App");
    if (extensions.length === 0) return alert("No Polkadot extension found");
    const accounts = await web3Accounts();
    if (accounts.length > 0) {
      setDotAddr(accounts[0].address);
      setDotAddress(accounts[0].address);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <button onClick={connectMetaMask} className="bg-blue-500 px-4 py-2 rounded-lg text-white">
        Connect MetaMask
      </button>
      {evmAddress && <p>Connected: {evmAddress}</p>}

      <button onClick={connectPolkadot} className="bg-pink-500 px-4 py-2 rounded-lg text-white">
        Connect Polkadot.js
      </button>
      {dotAddress && <p>Connected: {dotAddress}</p>}
    </div>
  );
}
