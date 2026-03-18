export function ApiEmailNotifications() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      aria-labelledby="email-notif-heading"
      style={{ backgroundColor: '#DAE8DA' }}
    >
      <div
        className="organic-blob absolute w-[500px] h-[500px] -right-32 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.08 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — visual mockup */}
          <div
            className="rounded-3xl border p-8 flex flex-col gap-5"
            style={{ backgroundColor: 'rgba(255,255,255,0.72)', borderColor: 'rgba(9,92,123,0.15)' }}
            aria-hidden="true"
          >
            {/* Email notification mockups */}
            {[
              { subject: 'Your order has been picked up!', body: 'Hi Sarah, your order #5521 is on its way.', time: '9:15 am', icon: '📦' },
              { subject: 'Out for delivery today', body: 'Great news — your parcel is out for delivery.', time: '11:30 am', icon: '🚚' },
              { subject: 'Your order has been delivered!', body: 'Your order #5521 was delivered. Enjoy!', time: '2:47 pm', icon: '✅' },
            ].map((email) => (
              <div
                key={email.subject}
                className="flex items-start gap-4 rounded-2xl p-4 border"
                style={{ backgroundColor: '#ffffff', borderColor: 'rgba(9,92,123,0.10)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-none"
                  style={{ backgroundColor: 'rgba(9,92,123,0.08)' }}
                >
                  {email.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold truncate" style={{ color: '#103d39' }}>{email.subject}</p>
                    <p className="text-xs flex-none" style={{ color: 'rgba(16,61,57,0.45)' }}>{email.time}</p>
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(16,61,57,0.60)' }}>{email.body}</p>
                </div>
              </div>
            ))}

            <div
              className="rounded-2xl p-4 text-center"
              style={{ backgroundColor: 'rgba(234,240,68,0.15)', border: '1px solid rgba(234,240,68,0.35)' }}
            >
              <p className="text-sm font-bold" style={{ color: '#095c7b' }}>Automatic notifications sent at every stage</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(16,61,57,0.60)' }}>Zero manual effort required</p>
            </div>
          </div>

          {/* Right — text */}
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-4 block"
              style={{ color: '#095c7b' }}
            >
              Customer Notifications
            </span>
            <h2
              id="email-notif-heading"
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ color: '#095c7b' }}
            >
              Send automatic email notifications{' '}
              <span className="italic" style={{ color: '#103d39' }}>to your customers.</span>
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'rgba(9,92,123,0.75)' }}
            >
              We&apos;ll keep your customers up to date on their order status, all while delighting them with faster delivery.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
