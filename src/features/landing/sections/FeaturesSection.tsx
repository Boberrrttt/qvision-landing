import Image from "next/image"

const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center px-6 sm:px-12 lg:px-16 py-16 md:py-56 justify-center w-full" id="features">
      <h1 className="font-semibold w-full text-3xl sm:text-4xl">What is QVision?</h1>
      <p className="w-full text-base sm:text-xl my-6">
        QVision is an assistive eyewear for the visually impaired. It uses Artificial Intelligence to interpret and describe the user’s surroundings and communicates it through audio.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 w-full">
        {/* Card 1 */}
        <div className="shadow-[-2px_-2px_4px_rgba(0,0,0,0.1),3px_4px_4px_rgba(0,0,0,0.18)] rounded-xl flex flex-col p-7 py-10 gap-3 w-full h-full">
          <Image src="/assets/q2.png" alt="Scene Recognition" width={140} height={140}  />
          <h2 className="font-bold text-2xl">Scene Recognition</h2>
          <p className="flex-grow">
            QVision identifies objects, surroundings, and people in real time, giving users clear awareness of their environment.
          </p>
        </div>

        {/* Card 2 */}
        <div className="shadow-[-2px_-2px_4px_rgba(0,0,0,0.1),3px_4px_4px_rgba(0,0,0,0.18)] rounded-xl flex flex-col p-7 py-10 gap-3 w-full h-full">
          <Image src="/assets/assist.png" alt="Navigation Assistance" width={140} height={140} />
          <h2 className="font-bold text-2xl">Navigation Assistance</h2>
          <p className="flex-grow">
            Guides users safely through indoor and outdoor spaces with intuitive cues for direction and obstacle avoidance.
          </p>
        </div>

        {/* Card 3 */}
        <div className="shadow-[-2px_-2px_4px_rgba(0,0,0,0.1),3px_4px_4px_rgba(0,0,0,0.18)] rounded-xl flex flex-col p-7 py-10 gap-3 w-full h-full">
          <Image src="/assets/tsp.png" alt="Text to Speech" width={140} height={140} className="pt-4 pb-2"  />
          <h2 className="font-bold text-2xl">Text to Speech</h2>
          <p className="flex-grow">
            Reads printed text aloud instantly, making signs, labels, and documents accessible anytime, anywhere.
          </p>
        </div>

        {/* Card 4 */}
        <div className="shadow-[-2px_-2px_4px_rgba(0,0,0,0.1),3px_4px_4px_rgba(0,0,0,0.18)] rounded-xl flex flex-col p-7 py-10 gap-3 w-full h-full">
          <Image src="/assets/voice.png" alt="Voice Commands" width={140} height={140}  />
          <h2 className="font-bold text-2xl">Voice Commands</h2>
          <p className="flex-grow">
            Hands-free control of the device through simple spoken commands.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

