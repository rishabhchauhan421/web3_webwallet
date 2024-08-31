'use client';
import { generateMnemonic, generateSolanaKeys } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function Example() {
  const [keys, setKeys] = useState([
    {
      publicKey: '',
      secretKey: '',
    },
  ]);
  let [mnemonic, setMnemonic] = useState('');
  let [addressCount, setAddressCount] = useState(0);
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Input your Secret Phrase
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Don&apos;t worry you can click on generate button for dynamic
            phrase.
          </p>
          <div className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="seed-phrase" className="sr-only">
              Seed Phrase
            </label>
            {mnemonic === '' ? (
              <input
                id="seed-phrase"
                name="seed"
                type="seed"
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="Enter your seed phrase"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              />
            ) : (
              <div className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6">
                {mnemonic}
              </div>
            )}
            <button
              onClick={() => {
                console.log('Generating keys');
                if (mnemonic.length == 0 && addressCount === 0) {
                  mnemonic = generateMnemonic();
                  setMnemonic(mnemonic);
                  setKeys([]);
                } else if (mnemonic.length > 0 && addressCount === 0) {
                  setMnemonic(mnemonic);
                  setKeys([]);
                }
                console.log({ mnemonic, addressCount });
                const keyPairs = generateSolanaKeys(mnemonic, addressCount);
                if (keys[0].publicKey === '') {
                  setKeys([keyPairs]);
                } else {
                  setKeys([...keys, keyPairs]);
                }
                setAddressCount(addressCount + 1);
                console.log({ mnemonic, keyPairs });
              }}
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Generate Keys
            </button>
          </div>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {keys.map((key, index) => (
              <li
                key={index}
                className="col-span-1 divide-y rounded-lg  shadow"
              >
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-white">
                        Secret: {key.secretKey}
                      </h3>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="truncate text-sm font-medium text-white">
                    Public: {key.publicKey}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient
                r={1}
                cx={0}
                cy={0}
                id="759c1415-0410-454c-8f7c-9a820de03641"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="ml-10 border-t border-white/10 ">
        <p className="text-xs leading-5 text-gray-400">
          &copy; Created by{' '}
          <Link href="https://github.com/rishabhchauhan421">
            Rishabh Chauhan
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
