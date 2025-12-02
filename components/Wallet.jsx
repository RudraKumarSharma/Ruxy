function Wallet({mnemonic, index, publicKey, privateKey, onDelete}) {
  
  return (
    <div className='w-full'>
      <div className='px-6 py-4 bg-gray-800 rounded-lg shadow-md flex flex-col'>
        
        <div key={index} className='mb-4 p-4 bg-gray-900 rounded-lg'>
          <div className="flex justify-between items-center">
            <h2 className=' font-semibold text-white mb-2 text-2xl'>Wallet {index + 1}</h2>
            <button onClick={() => onDelete(index)} className="text-red-500 hover:text-red-400 transition-colors mr-2">
              <svg className = "text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>

          
          <div className=" text-white bold mb-2 ">
            <h2 className="text-xl">Public Key</h2>
            <p className="text-white ">
              {publicKey}
            </p>
          </div>
          <div className=" text-white bold mb-2">
            <div class>
              <h2 className="text-xl">Private Key</h2>
            </div>
            <p className=" text-white">
              {privateKey}
            </p>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

export default Wallet