import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* Header */}
      <section className="bg-linear-to-t from-[#0B1E6D] to-[#f5f5f5] text-white pt-36 pb-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="max-w-2xl mx-auto opacity-90">
          Your privacy matters to us. Learn how we collect and protect your data.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">

        <p>
          Edufinscholarships.com ("we", "us", or "our") is committed to protecting your privacy.
          This policy explains how we collect, use, and safeguard your information.
        </p>

        {/* Info Collection */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone / WhatsApp Number</li>
            <li>Academic Preferences</li>
            <li>Payment details (via secure third-party providers)</li>
            <li>Website usage data (cookies & analytics)</li>
          </ul>
        </section>

        {/* Usage */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide scholarship services</li>
            <li>Send alerts and updates</li>
            <li>Improve website experience</li>
            <li>Process payments and memberships</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Data Protection
          </h2>
          <p>
            We implement appropriate security measures, but no online platform can guarantee complete security.
          </p>
        </section>

        {/* Third Party */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Third-Party Services
          </h2>
          <p>
            We use third-party tools such as payment gateways, analytics, and communication services.
            These have their own privacy policies.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Cookies
          </h2>
          <p>
            Cookies help improve user experience. You can disable them in browser settings.
          </p>
        </section>

        {/* Rights */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            User Rights
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your data</li>
            <li>Opt-out of communications</li>
            <li>Request correction or deletion</li>
          </ul>
        </section>

        {/* Updates */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Policy Updates
          </h2>
          <p>We may update this policy. Changes will appear on this page.</p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-[#0B1E6D] mb-3">
            Contact Us
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

export default PrivacyPolicy;