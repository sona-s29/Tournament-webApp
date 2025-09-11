
function TermsConditions() {

  return (
    <>
      {/* Terms & Conditions */}
      <div className="max-w-3xl mx-auto mt-10 bg-[#181c2f] text-white rounded-2xl shadow-lg p-10 sm:p-6">
        <h1 className="text-center text-3xl font-bold text-[#ffb400] mb-8 sm:text-2xl">Terms & Conditions</h1>

        <div className="mb-8">
          <h2 className="text-[#ffb400] text-xl font-semibold mb-4 sm:text-lg">Acceptance of Terms</h2>
          <p className="text-white text-base sm:text-sm">
            By using Classy Tournament, you agree to abide by these terms and all applicable rules
            and policies.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-[#ffb400] text-xl font-semibold mb-4 sm:text-lg">User Responsibilities</h2>
          <ul className="list-disc list-inside text-base sm:text-sm space-y-2">
            <li>Provide accurate registration and payment information</li>
            <li>Follow all tournament rules and fair play guidelines</li>
            <li>Respect other players and staff</li>
            <li>Do not engage in cheating, hacking, or disruptive behavior</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-[#ffb400] text-xl font-semibold mb-4 sm:text-lg">Platform Policies</h2>
          <ul className="list-disc list-inside text-base sm:text-sm space-y-2">
            <li>We reserve the right to modify tournaments, rules, or rewards at any time</li>
            <li>Accounts found violating terms may be suspended or banned</li>
            <li>All decisions by tournament admins are final</li>
          </ul>
        </div>

        <div>
          <h2 className="text-[#ffb400] text-xl font-semibold mb-4 sm:text-lg">Contact</h2>
          <p className="text-white text-base sm:text-sm">
            For questions or disputes, contact us at{' '}
            <a
              href="classytournamentofficial@gmail.com"
              className="text-[#ffb400] underline hover:text-white"
            >
             classytournamentofficial@gmail.com
            </a>
            
          </p>
        </div>
      </div>
    </>
  );
}

export default TermsConditions;
