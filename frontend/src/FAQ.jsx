import React, { useState } from "react";

const faqData = [
  {
    question: "How do I register for a tournament?",
    answer: `Choose a tournament, fill in your team details, and proceed to pay. Once the payment is complete, you'll be automatically redirected to a WhatsApp group.`,
  },
  {
    question: "How do I make the payment?",
    answer: `After entering your details, you'll be directed to a secure payment gateway. Complete the payment, and you’ll be auto-redirected to a WhatsApp group for match updates (Room ID and Password)`,
  },
  {
    question: "Where will I get the Room ID and Password?",
    answer: `Room ID and Password will be posted in the WhatsApp group 5-10 minutes before the match starts. Make sure to stay active in the group.`,
  },
  {
    question: "Can I join multiple matches in a day?",
    answer: `Yes, you can join as many matches as you want, as long as you complete payment and registration for each one.`,
  },
  {
    question: "Is there a refund if I don’t play the match?",
    answer: `No, we don’t offer refunds for missed matches. Refunds are only given if the match is cancelled from our end.`,
  },
  {
    question: "When will the prize be sent?",
    answer: `Prizes are distributed within 24–48 hours after match completion via UPI or Paytm to the registered team leader.`,
  },
  {
    question: "Are hackers allowed?",
    answer: `No. Strict action will be taken against anyone using cheats, hacks, or third-party tools. They will be permanently banned from future matches.`,
  },
  {
    question: "Is emulator gameplay allowed?",
    answer: `No, Only Mobile players are allowed to play our tournaments.`,
  },
  {
    question: "Can I change my team after payment?",
    answer: `No, once the payment is done and team is registered, changes are not allowed. Double-check before submitting.`,
  },
  {
    question: "What if I face a technical issue or lag?",
    answer: `We are not responsible for personal device or network issues. Ensure your setup is stable before joining the room.`,
  },
];

function FAQ() {
  const [openIndexes, setOpenIndexes] = useState({});

  const toggle = (idx) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto my-10 bg-[#181c2f] text-white rounded-2xl shadow-xl p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#ffb400] mb-8 tracking-wide">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-xl border border-[#23263a] overflow-hidden transition-all ${
              openIndexes[idx] ? "bg-[#23263a] shadow-md" : "bg-transparent"
            }`}
          >
            <div
              onClick={() => toggle(idx)}
              className="cursor-pointer flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 text-lg font-semibold text-white hover:bg-[#23263a] transition"
            >
              <span>
                {idx + 1}. {item.question}
              </span>
              <span
                className={`text-xl font-bold transition ${
                  openIndexes[idx] ? "text-white" : "text-[#ffb400]"
                }`}
              >
                {openIndexes[idx] ? "−" : "+"}
              </span>
            </div>
            {openIndexes[idx] && (
              <div className="px-4 py-3 sm:px-6 sm:py-4 text-[#ffb400] text-base leading-relaxed border-t border-[#2d3148]">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
