import { LeadPayload, LeadResponse } from './submitLead';

export function showLeadModal(
  result: LeadResponse,
  payload: LeadPayload
) {
  const outOfTerritory = !!result.outOfTerritory;
  const { accountManagerName, accountManagerCalendly, internalid, customerEntityId } = result;
  
  // Extract contact info from payload
  const contact = payload.contacts && payload.contacts.length > 0 ? payload.contacts[0] : null;
  const leadName = contact ? contact.name : '';
  const leadEmail = contact ? contact.email : '';

  // Remove existing if any
  const existing = document.getElementById('lead-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'lead-modal-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '99999';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.2s ease-in-out';
  overlay.style.padding = '20px';

  const modal = document.createElement('div');
  modal.style.position = 'relative';
  modal.style.width = '100%';
  modal.style.maxWidth = '700px';
  modal.style.maxHeight = '90vh';
  modal.style.overflowY = 'auto';
  modal.style.borderRadius = '16px';
  modal.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  modal.style.fontFamily = 'var(--font-primary, sans-serif)';

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '16px';
  closeBtn.style.right = '16px';
  closeBtn.style.background = 'rgba(255, 255, 255, 0.8)';
  closeBtn.style.border = '1px solid #E4E4E7';
  closeBtn.style.borderRadius = '50%';
  closeBtn.style.width = '32px';
  closeBtn.style.height = '32px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.display = 'flex';
  closeBtn.style.alignItems = 'center';
  closeBtn.style.justifyContent = 'center';
  closeBtn.style.color = '#003e48';
  closeBtn.style.fontSize = '16px';
  closeBtn.style.zIndex = '10';
  closeBtn.onclick = () => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 200);
  };
  modal.appendChild(closeBtn);

  if (!outOfTerritory) {
    // New In-Territory Success Screen (matching screenshot)
    modal.style.backgroundColor = '#D5E0D5'; // Pale green from screenshot
    modal.style.padding = '40px 40px 60px 40px';
    modal.style.color = '#004751'; // Dark blue text
    
    // Top Badge: "✓ YOU'RE IN TERRITORY"
    const badge = document.createElement('div');
    badge.style.display = 'inline-flex';
    badge.style.alignItems = 'center';
    badge.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    badge.style.border = '1px solid rgba(0, 0, 0, 0.05)';
    badge.style.borderRadius = '20px';
    badge.style.padding = '4px 12px';
    badge.style.marginBottom = '24px';
    badge.style.fontSize = '12px';
    badge.style.fontWeight = '700';
    badge.style.letterSpacing = '1px';
    badge.style.color = '#2E6E45'; // Darker green text
    
    const badgeIcon = document.createElement('span');
    badgeIcon.innerHTML = '✓';
    badgeIcon.style.backgroundColor = '#4A8C5B'; // Green circle
    badgeIcon.style.color = '#fff';
    badgeIcon.style.borderRadius = '50%';
    badgeIcon.style.width = '16px';
    badgeIcon.style.height = '16px';
    badgeIcon.style.display = 'inline-flex';
    badgeIcon.style.alignItems = 'center';
    badgeIcon.style.justifyContent = 'center';
    badgeIcon.style.marginRight = '8px';
    badgeIcon.style.fontSize = '10px';
    
    badge.appendChild(badgeIcon);
    badge.appendChild(document.createTextNode("YOU'RE IN TERRITORY"));
    modal.appendChild(badge);
    
    // Heading
    const title = document.createElement('h2');
    title.style.margin = '0 0 16px 0';
    title.style.fontSize = '46px';
    title.style.fontWeight = '700';
    title.style.lineHeight = '1.1';
    title.style.fontFamily = 'var(--font-heading, serif)';
    title.innerHTML = `Good news — you're in our patch.`;
    modal.appendChild(title);
    
    // Text
    const text = document.createElement('p');
    text.style.fontSize = '18px';
    text.style.lineHeight = '1.5';
    text.style.margin = '0 0 32px 0';
    text.style.opacity = '0.9';
    const amString = accountManagerName ? accountManagerName : 'an Account Manager';
    text.innerHTML = `There's a local MailPlus owner-operator covering your area. <strong>We've got your details</strong>, and ${amString} will call within one business day — or pick a time that suits you below.`;
    modal.appendChild(text);
    
    // Calendly Card
    if (accountManagerCalendly) {
      // Format calendly URL
      let calendlyUrl = accountManagerCalendly;
      try {
        const urlObj = new URL(calendlyUrl);
        if (leadName) urlObj.searchParams.set('name', leadName);
        if (leadEmail) urlObj.searchParams.set('email', leadEmail);
        if (internalid) urlObj.searchParams.set('a1', internalid);
        if (customerEntityId) urlObj.searchParams.set('a2', customerEntityId);
        urlObj.searchParams.set('a3', 'website');
        
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        urlObj.searchParams.set('month', `${yyyy}-${mm}`);
        
        calendlyUrl = urlObj.toString();
      } catch (e) {
        console.error("Invalid calendly URL", e);
      }

      const card = document.createElement('div');
      card.style.backgroundColor = '#fff';
      card.style.borderRadius = '16px';
      card.style.padding = '32px';
      card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      
      const cardBadge = document.createElement('div');
      cardBadge.style.display = 'inline-flex';
      cardBadge.style.alignItems = 'center';
      cardBadge.style.fontSize = '12px';
      cardBadge.style.fontWeight = '700';
      cardBadge.style.letterSpacing = '1px';
      cardBadge.style.color = '#1A3D33';
      cardBadge.style.marginBottom = '12px';
      
      const dot = document.createElement('span');
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = '#4A8C5B';
      dot.style.marginRight = '8px';
      
      cardBadge.appendChild(dot);
      cardBadge.appendChild(document.createTextNode('BOOK A TIME'));
      card.appendChild(cardBadge);
      
      const cardTitle = document.createElement('h3');
      cardTitle.style.margin = '0 0 12px 0';
      cardTitle.style.fontSize = '24px';
      cardTitle.style.fontWeight = '700';
      cardTitle.style.fontFamily = 'var(--font-heading, serif)';
      cardTitle.innerHTML = 'Pick a time that suits you';
      card.appendChild(cardTitle);
      
      const cardText = document.createElement('p');
      cardText.style.margin = '0 0 24px 0';
      cardText.style.fontSize = '15px';
      cardText.style.lineHeight = '1.5';
      cardText.style.color = '#3F3F46';
      cardText.innerHTML = `<strong>Prefer we just call you?</strong> No need to do anything — ${amString} will be in touch within one business day (Mon–Fri 9am–5pm AEST).`;
      card.appendChild(cardText);
      
      const calendlyWrap = document.createElement('div');
      calendlyWrap.className = 'calendly-inline-widget';
      calendlyWrap.dataset.url = calendlyUrl;
      calendlyWrap.style.minWidth = '320px';
      calendlyWrap.style.height = '600px';
      card.appendChild(calendlyWrap);
      
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      card.appendChild(script);
      
      modal.appendChild(card);
    }
    
  } else {
    // Out of territory layout matching design
    modal.style.backgroundColor = '#fff';
    modal.style.maxWidth = '540px';
    
    const contentDiv = document.createElement('div');
    contentDiv.style.padding = '60px 50px';
    contentDiv.style.textAlign = 'center';

    const iconWrap = document.createElement('div');
    iconWrap.style.width = '80px';
    iconWrap.style.height = '80px';
    iconWrap.style.borderRadius = '50%';
    iconWrap.style.backgroundColor = '#D5E0D5';
    iconWrap.style.display = 'flex';
    iconWrap.style.alignItems = 'center';
    iconWrap.style.justifyContent = 'center';
    iconWrap.style.margin = '0 auto 30px auto';
    iconWrap.style.fontSize = '36px';
    iconWrap.innerHTML = '📍';
    
    const title = document.createElement('h2');
    title.style.margin = '0 0 24px 0';
    title.style.fontSize = '32px';
    title.style.fontWeight = '700';
    title.style.color = '#004751';
    title.style.fontFamily = 'var(--font-heading, serif)';
    title.innerHTML = 'We\'re not in your area just yet.';
    
    const text = document.createElement('p');
    text.style.color = '#386373';
    text.style.fontSize = '17px';
    text.style.lineHeight = '1.6';
    text.style.margin = '0';
    text.innerHTML = 'Sorry, but we couldn\'t find a local MailPlus driver covering your address right now. You\'re welcome to check back any time.';
    
    contentDiv.appendChild(iconWrap);
    contentDiv.appendChild(title);
    contentDiv.appendChild(text);
    modal.appendChild(contentDiv);
  }

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Trigger animation
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });
}
