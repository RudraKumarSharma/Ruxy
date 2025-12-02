import { useState, useEffect } from 'react'
import '@solana/web3.js'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import MnemonicDisplay from '../components/MnemonicDisplay'
import Navbar from '../components/Navbar.jsx'
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from '@solana/web3.js';
import Wallet from '../components/Wallet.jsx'



function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const [wallets, setWallets] = useState([]);

  async function walletGenrator(mnemonic, index) {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
    const keypair = Keypair.fromSecretKey(secret);
    const newWallet = {address: keypair.publicKey.toBase58(), privateKey: Buffer.from(keypair.secretKey).toString("hex")};
    setWallets([...wallets, newWallet]);
  }

  function deleteWallet(index) {
    setWallets(wallets.filter((_, i) => i !== index));
  }


  useEffect(() => {
  const stored = localStorage.getItem("mnemonic");
  if (stored) {
    setMnemonic(stored);
  }
  }, []);
  useEffect(() => {
  const stored = localStorage.getItem("showGenerateButton");
  if (stored) {
    setShowGenerateButton(stored === "true");
  }
  }, []);
  useEffect(() => {
  const storedWallets = localStorage.getItem("wallets");
  if(storedWallets) {
    setWallets(JSON.parse(storedWallets));
  }
  }, []);

  useEffect(() => {
    if (wallets.length > 0) {
      localStorage.setItem("wallets", JSON.stringify(wallets));
    } else {
      localStorage.removeItem("wallets");
    }
  }, [wallets]);


  return (
    <>
      <div className='min-h-screen w-full bg-gradient-to-br from-[#0a0f24] via-[#0e1733] to-[#1c2546] flex flex-col items-center '>
        <Navbar />
        
        {showGenerateButton && 
          (<button onClick={async function () {
            const phrase = await generateMnemonic();
            const showButton = false;
            localStorage.setItem("showGenerateButton", showButton);
            localStorage.setItem("mnemonic", phrase);
            setMnemonic(phrase);
            setShowGenerateButton(false);
          }}
          className="px-4 py-3 rounded-s-lg rounded-e-lg font-medium bg-white mt-4" >
            Generate Wallet
          </button>
        )}

        {mnemonic &&<MnemonicDisplay mnemonic={mnemonic} />}
        
        <div className="w-full max-w-7xl mx-auto mt-6 px-6">
            {!showGenerateButton &&
              (<>
                <div className="flex flex-row items-center justify-between">
                  <h1 className="text-white font-bold text-2xl">
                    Solana Wallet
                  </h1>
                  
                  <div className="flex gap-4">
                    <button onClick={async function () {
                      await walletGenrator(mnemonic, wallets.length);
                    }}
                    className='px-4 py-2 rounded-lg font-medium bg-white text-black hover:bg-gray-100 transition-colors'>
                      Add Wallet
                    </button>

                    <button onClick={ async function () {
                      localStorage.removeItem("mnemonic");
                      localStorage.removeItem("showGenerateButton");
                      setMnemonic("");
                      setShowGenerateButton(true);

                      localStorage.removeItem("wallets");
                      setWallets([]);
                    }}
                    className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors" >
                      Clear Wallets
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {wallets.map((wallet, index) => (
                    <Wallet key={index} mnemonic={mnemonic} index={index} publicKey={wallet.address} privateKey={wallet.privateKey} onDelete={deleteWallet} />
                  ))}
                </div>
              </>)
            }
        </div>

      </div>
    </>
  )
}

export default App
