"use client";

export default function ContactMap() {
  return (
    <div className="rounded-xl overflow-hidden shadow-neu-raised h-64">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1625880.514175268!2d9.4525!3d4.0511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106112e56a3b09e1%3A0x8b3b4b0b0b0b0b0!2sDouala%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      />
    </div>
  );
}