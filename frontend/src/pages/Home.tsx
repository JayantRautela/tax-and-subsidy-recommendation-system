import React from 'react'
import Typewriter from '../components/TypeWriter'

const Home = () => {
  return (
    <div className='w-full py-40 flex flex-col justify-center text-center'>
      <div>
        <h1 className='font-bold text-5xl mb-6'>Simplify Taxes & Government Schemes <br /> With AI-Powered Assistance 🇮🇳</h1>
        <p className='font-semibold text-2xl'>
          {" "}
          <span className="text-blue-500">
          <Typewriter
            words={["Compare Tax Regimes", "Discover Eligible Scheme", "Chat In Your Language"]}
            typingSpeed={100}
            deletingSpeed={50}
            delayBetweenWords={1000}
          />
        </span>
          </p>
      </div>
      <div className="w-max mx-auto border border-black rounded-lg overflow-hidden flex mt-16">
      <button type="button"
        className="px-5 py-2.5 text-black text-sm cursor-pointer tracking-wider font-medium border-r border-black outline-none hover:bg-black hover:text-white transition-all">Compare Tax</button>
      <button type="button"
        className="px-5 py-2.5 text-black text-sm cursor-pointer tracking-wider font-medium border-r border-black outline-none hover:bg-black hover:text-white transition-all">Find Subsidy</button>
      <button type="button"
        className="px-5 py-2.5 text-black text-sm cursor-pointer tracking-wider font-medium border-none outline-none hover:bg-black hover:text-white transition-all">Try Chat</button>
    </div>
    </div>
  )
}

export default Home
