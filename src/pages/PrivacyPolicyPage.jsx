import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-4xl font-extrabold text-primary text-center mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground text-center mb-12">Last Updated: March 10, 2025</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">1. Introduction</h2>
        <p className="text-muted-foreground">At Jonny Gringo Salsa, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">2. The Data We Collect</h2>
        <p className="text-muted-foreground">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website and products.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">3. How We Use Your Data</h2>
        <p className="text-muted-foreground">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>To process and deliver your order.</li>
          <li>To manage our relationship with you.</li>
          <li>To improve our website, products, and services.</li>
          <li>To recommend products that may be of interest to you.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">4. Data Security</h2>
        <p className="text-muted-foreground">We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">5. Data Retention</h2>
        <p className="text-muted-foreground">We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">6. Your Legal Rights</h2>
        <p className="text-muted-foreground">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          <li>Request access to your personal data.</li>
          <li>Request correction of your personal data.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>Right to withdraw consent.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">7. Cookies</h2>
        <p className="text-muted-foreground">Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">8. Contact Us</h2>
        <p className="text-muted-foreground">If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
        <p className="text-muted-foreground">Email: contact@jonnygringo.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage; 