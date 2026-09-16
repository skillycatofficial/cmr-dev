import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | CMR Developers',
  description: 'Read the CMR Developers Privacy Policy.',
}

export default function PrivacyPage() {
  return (
    <main className="bg-white pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B8862E]">
          CMR Developers
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[#142B22] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          At CMR Developers, your trust is our greatest asset. We are committed to protecting your
          personal information and being transparent about how we collect, use, and safeguard it.
        </p>

        <div className="mt-12 space-y-10 text-base leading-7 text-slate-700">
          <section>
            <h2 className="text-2xl font-semibold text-[#142B22]">1. Information We Collect</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Personal details you provide, such as your name, phone number, and email address, when you submit forms, enquiries, or subscribe to updates.</li>
              <li>Non-personal data, such as browser type, device, and site usage patterns, used to improve your browsing experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#142B22]">2. How We Use Your Information</h2>
            <p className="mt-4">We use your information only to serve you better:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>To respond to your enquiries about our projects.</li>
              <li>To share updates, offers, and events that may interest you.</li>
              <li>To improve our website, services, and customer support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#142B22]">3. Data Protection</h2>
            <p className="mt-4">Your data security is our priority. We follow industry-standard practices to protect your personal details from unauthorized access, misuse, or disclosure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#142B22]">4. Sharing of Information</h2>
            <p className="mt-4">We do not sell, trade, or rent your personal information to third parties. Information may only be shared with trusted service providers working on our behalf under strict confidentiality.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#142B22]">5. Your Rights</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>You may opt out of promotional communications at any time.</li>
              <li>You can request access, correction, or deletion of your personal information by contacting us directly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#142B22]">6. Updates to This Policy</h2>
            <p className="mt-4">We may update this Privacy Policy to reflect changes in law, technology, or our practices. Updates will always be posted on this page for your reference.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#142B22]">7. Contact Us</h2>
            <p className="mt-4">For questions about this Privacy Policy or how your data is handled, please contact us at <a className="font-medium text-[#B8862E] underline" href="mailto:info@cmrdevelopers.com">info@cmrdevelopers.com</a>.</p>
          </section>
        </div>

        <Link href="/" className="mt-12 inline-block font-semibold text-[#B8862E] underline">
          Return to home
        </Link>
      </article>
    </main>
  )
}
