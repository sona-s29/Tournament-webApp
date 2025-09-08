import React from "react";
import fullMapImg from "./assets/brsquad.png";
import clashSquad2v2Img from "./assets/clashsquad2v2.png";
import clashSquad1v1Img from "./assets/clashsquad1v1.png";

const tournaments = [
  {
    title: "FULL MAP",
    description: "BR Per kill Squad Tournament",
    image: fullMapImg,
  },
  {
    title: "CLASH SQUAD",
    description: "2V2 Onetap Custom",
    image: clashSquad2v2Img,
  },
  {
    title: "CLASH SQUAD",
    description: "1V1 Onetap Custom",
    image: clashSquad1v1Img,
  },
];

function Home() {
  return (
    <>
      {/* BANNER */}
      <div
        className="w-full min-h-[600px] sm:min-h-[300px] flex items-center justify-center bg-cover bg-center my-10"
        style={{
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/08/14/31/40/360_F_814314086_qsWB6Ye2vEQXLyehu35yip8Peko1Y0TJ.jpg')",
        }}
      >
        <div className="bg-black/70 text-white p-8 sm:p-4 rounded-2xl text-center max-w-3xl shadow-2xl m-2">
          <h1 className="text-4xl sm:text-2xl font-bold tracking-wide mb-4">
            Classy Tournament
          </h1>
          <p className="text-lg sm:text-base leading-relaxed mb-6">
            Welcome to Classy Tournament – your ultimate destination for
            competitive gaming! Join tournaments, compete with the best, and win
            exciting rewards. Experience the thrill of eSports like never
            before.
          </p>
          <a
            href="/about"
            className="bg-[#ffb400] text-[#181c2f] font-bold px-6 py-3 rounded-full text-lg sm:text-base transition hover:bg-white hover:text-[#ffb400] transform hover:scale-105 inline-block"
          >
            Read More
          </a>
        </div>
      </div>

      {/* Short Description */}
      <div className="max-w-3xl mx-auto my-10 bg-[#23263a] text-white rounded-xl text-center p-10 sm:p-6 shadow-md text-lg font-medium leading-relaxed">
        India’s most thrilling battleground for Free Fire warriors! <br />
        Join daily competitive matches, showcase your skills, win exciting cash
        prizes, and climb the leaderboard. Fast registration, secure payment,
        fair play, and instant updates – everything a true gamer needs. <br />
        <span className="block mt-3 text-[#ffb400] font-semibold text-xl">
          Ready to dominate the zone? Let the class begin!
        </span>
      </div>

      {/* TOURNAMENT CARDS */}
      <div className="flex flex-wrap justify-center gap-8 sm:gap-4 my-14">
        {tournaments.map((t, i) => (
          <div
            key={i}
            className="bg-[#23263a] rounded-xl shadow-md w-[320px] sm:w-[90vw] sm:max-w-md flex flex-col transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-44 sm:h-36 object-cover"
            />
            <div className="flex flex-col flex-1 items-center text-center p-5">
              <h3 className="text-xl text-[#ffb400] font-bold mb-2">
                {t.title}
              </h3>
              <p className="text-gray-200 text-base mb-4">{t.description}</p>
              <a
                href="/tournaments"
                className="bg-[#ffb400] text-[#181c2f] font-bold px-6 py-2 rounded-full text-base transition hover:bg-white hover:text-[#ffb400] transform hover:scale-105"
              >
                Join Here
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Prize Breakdown */}
      <div className="max-w-5xl mx-auto my-10 bg-[#181c2f] text-white rounded-xl shadow-md p-10 sm:p-6 text-center">
        <h2 className="text-3xl font-bold text-[#ffb400] mb-6">
          Prize Breakdowns & Details
        </h2>

        <div className="mb-8">
          <h3 className="text-[#ffb400] text-lg mb-2">
            FULL MAP (BR Per kill Squad Tournament)
          </h3>
          <ul className="inline-block text-left mb-2 text-base text-gray-200">
            <li>Entry Fee: ₹40</li>
            <li>Per Kill: ₹7</li>
            <li>Booyah Bonus: ₹40</li>
          </ul>
          <p className="text-gray-400 text-sm">
            Squad up and battle for every kill! Top squads win big with per-kill
            rewards and a booyah bonus for the last team standing.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-[#ffb400] text-lg mb-2">
            CLASH SQUAD (2V2 Onetap Custom)
          </h3>
          <ul className="inline-block text-left mb-2 text-base text-gray-200">
            <li>Entry Fee: ₹25</li>
            <li>Booyah Bonus: ₹85 (to duo)</li>
          </ul>
          <p className="text-gray-400 text-sm">
            Team up for intense 2v2 onetap action. Outsmart your opponents and
            claim the booyah bonus for your duo!
          </p>
        </div>

        <div>
          <h3 className="text-[#ffb400] text-lg mb-2">
            CLASH SQUAD (1V1 Onetap Custom)
          </h3>
          <ul className="inline-block text-left mb-2 text-base text-gray-200">
            <li>Entry Fee: ₹20</li>
            <li>Win: ₹50</li>
          </ul>
          <p className="text-gray-400 text-sm">
            Go solo in a 1v1 onetap showdown. Prove your skills and take home
            the winner’s prize!
          </p>
        </div>
      </div>

      {/* How to Join */}
      <div className="max-w-5xl mx-auto my-10 bg-[#23263a] text-white rounded-xl shadow-md p-10 sm:p-6 text-center">
        <h2 className="text-3xl font-bold text-[#ffb400] mb-6">
          How to Join the Tournament
        </h2>
        <ol className="list-decimal list-inside space-y-6 text-[#ffb400] font-medium text-lg sm:text-base max-w-xl mx-auto">
          <li>
            <b>Step 1: Enter Your Free Fire User ID</b>
            <br />
            <span className="text-white font-normal">
              Fill in your valid Free Fire User ID in the registration form so
              we can identify you during the match.
            </span>
          </li>
          <li>
            <b>Step 2: Pay the Entry Fee</b>
            <br />
            <span className="text-white font-normal">
              Complete the entry payment securely using UPI, Razorpay, or the
              available method shown on the screen.
            </span>
          </li>
          <li>
            <b>Step 3: Slot Confirmation</b>
            <br />
            <span className="text-white font-normal">
              Once your payment is verified, your slot will be reserved, and
              your name will appear on the participants list.
            </span>
          </li>
          <li>
            <b>Step 4: Join the WhatsApp Group</b>
            <br />
            <span className="text-white font-normal">
              After a successful join, you’ll be redirected to our official
              WhatsApp group where room ID, password, match timing, and updates
              will be shared.
            </span>
          </li>
          <li>
            <b>Step 5: Play & Win</b>
            <br />
            <span className="text-white font-normal">
              Enter the match lobby at the given time, play fairly, and compete
              for the top prizes. Winners will be announced post-match.
            </span>
          </li>
        </ol>
      </div>
    </>
  );
}

export default Home;
