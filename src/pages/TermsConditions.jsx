import React from "react";

const TermsConditions = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* Header */}
      <section className="bg-linear-to-t from-[#0B1E6D] to-[#fafbfc] text-white pt-36 pb-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
        <p className="max-w-2xl mx-auto opacity-90">
          Please read these terms carefully before using our platform.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">

        <p>
          By accessing Edufin Scholarships, you agree to the following terms and conditions.
        </p>

        {/* Use */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Use of Platform
          </h2>
          <p>
            This platform provides scholarship information for educational purposes only.
            Users must verify details independently.
          </p>
        </section>

        {/* No Guarantee */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            No Guarantee
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>No guarantee of scholarship approval</li>
            <li>No guarantee of funding</li>
          </ul>
        </section>

        {/* Responsibility */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            User Responsibility
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide accurate information</li>
            <li>Do not misuse the platform</li>
            <li>No unauthorized copying of content</li>
          </ul>
        </section>

        {/* IP */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Intellectual Property
          </h2>
          <p>
            All content belongs to Edufin Scholarships and cannot be used without permission.
          </p>
        </section>

        {/* Payments */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Payments & Membership
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Payments are non-refundable</li>
            <li>Benefits may change</li>
            <li>Access may be revoked for misuse</li>
          </ul>
        </section>

        {/* Liability */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Limitation of Liability
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>No responsibility for errors or outdated info</li>
            <li>No liability for losses</li>
            <li>Users make their own decisions</li>
          </ul>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Modifications
          </h2>
          <p>We may update these terms at any time.</p>
        </section>

        {/* Law */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Governing Law
          </h2>
          <p>These terms are governed by the laws of India.</p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Contact
          </h2>
          <p>
            Email:{" "}
            <span className="text-[#D4AF37] font-medium">
              edufinscholarships@gmail.com
            </span>
          </p>
        </section>

      </div>

      <footer className="bg-[#0B1E6D] text-white text-center py-6">
        © {new Date().getFullYear()} Edufin Scholarships
      </footer>
    </div>
  );
};

export default TermsConditions;