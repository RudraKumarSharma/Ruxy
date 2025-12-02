import { useState } from "react";

export default function MnemonicDisplay({mnemonic}) {
    const wordArray = mnemonic.split(" ");

    return (
        <div className="w-full max-w-7xl mx-auto mt-6 p-6 bg-gray-900 rounded-2xl border border-gray-700 shadow-lg align-content-center flex items-center justify-center flex-col">
            <h2 className="text-xl font-semibold text-white mb-4 text-left">
                Your Recovery Phrase
            </h2>
            <div className="grid grid-cols-3 gap-4 w-full max-w-6xl mt-4 py-4">
                {wordArray.map((word, index) => (
                    <div
                        key={index}
                        className="bg-[#1d1d20] py-3 px-4 rounded-lg text-sm font-medium shadow-sm text-gray-200"
                    >
                        <span className="font Medium">{word}</span>
                    </div>
                ))}
            </div>
            <p className="text-center text-white font-medium pt-4">
                Never share these words with anyone.
            </p>
        </div>
    )

}