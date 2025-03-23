import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
        <p className="text-sm text-gray-500 mb-4">
          Last updated on <span className="font-medium">23-03-2025 07:38:04</span>
        </p>
        <div className="text-gray-700 space-y-4 text-justify">
          <p>
            These Terms and Conditions, along with the privacy policy or other terms (“Terms”), constitute a binding agreement by and between{" "}
            <span className="font-semibold">RAJESH SOMNATH CHARHAJARI</span>
            (“Website Owner,” “we,” “us,” or “our”) and you (“you” or “your”) and relate to your use of our website, goods (as applicable), or services (as applicable) (collectively, “Services”).
          </p>

          <p>
            By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time
            without prior notice. It is your responsibility to review these Terms periodically to stay informed of updates.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Terms of Use</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              To access and use the Services, you agree to provide true, accurate, and complete information to us during and after registration. You are responsible for all activities conducted
              through your registered account.
            </li>
            <li>We do not provide any warranty regarding the accuracy, timeliness, performance, completeness, or suitability of the information on this website or through the Services.</li>
            <li>Your use of our Services and the website is at your own risk. You should independently assess and ensure that the Services meet your requirements.</li>
            <li>The content of the Website and the Services is proprietary to us. You shall not claim any intellectual property rights, title, or interest in its contents.</li>
            <li>You agree not to use the website or Services for any unlawful or prohibited activities.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800">Refund Policy</h3>
          <p>
            If we are unable to provide the Service, you may be eligible for a refund. Refund requests must be submitted within the specified timeframe. Failure to do so may render you ineligible for
            a refund.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Force Majeure</h3>
          <p>We shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed due to a force majeure event.</p>

          <h3 className="text-lg font-semibold text-gray-800">Governing Law & Jurisdiction</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in
            Solapur, Maharashtra.
          </p>

          <p>If you have any concerns or need to communicate with us regarding these Terms, please contact us using the information provided on this website.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
