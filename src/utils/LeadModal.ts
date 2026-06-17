export function showLeadModal(outOfTerritory: boolean) {
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

  const modal = document.createElement('div');
  modal.style.backgroundColor = '#fff';
  modal.style.borderRadius = '16px';
  modal.style.width = '90%';
  modal.style.maxWidth = '400px';
  modal.style.position = 'relative';
  modal.style.overflow = 'hidden';
  modal.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  modal.style.fontFamily = 'var(--font-primary, sans-serif)';

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '12px';
  closeBtn.style.right = '12px';
  closeBtn.style.background = 'none';
  closeBtn.style.border = '1px solid #E4E4E7';
  closeBtn.style.borderRadius = '6px';
  closeBtn.style.width = '28px';
  closeBtn.style.height = '28px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.display = 'flex';
  closeBtn.style.alignItems = 'center';
  closeBtn.style.justifyContent = 'center';
  closeBtn.style.color = '#71717A';
  closeBtn.style.fontSize = '14px';
  closeBtn.onclick = () => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 200);
  };

  const contentDiv = document.createElement('div');
  contentDiv.style.padding = '40px 30px';
  contentDiv.style.textAlign = 'center';

  if (!outOfTerritory) {
    // In territory (Success)
    const topBg = document.createElement('div');
    topBg.style.background = 'linear-gradient(135deg, #0f384f 0%, #174b68 100%)';
    topBg.style.padding = '40px 20px';
    topBg.style.textAlign = 'center';
    topBg.style.color = '#fff';
    
    const iconWrap = document.createElement('div');
    iconWrap.style.width = '56px';
    iconWrap.style.height = '56px';
    iconWrap.style.borderRadius = '50%';
    iconWrap.style.border = '1px solid rgba(255,255,255,0.2)';
    iconWrap.style.display = 'flex';
    iconWrap.style.alignItems = 'center';
    iconWrap.style.justifyContent = 'center';
    iconWrap.style.margin = '0 auto 20px auto';
    iconWrap.style.fontSize = '24px';
    iconWrap.innerHTML = '🎉';
    
    const title = document.createElement('h2');
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '700';
    title.innerHTML = 'Great news — <span style="color: #FFDE33;">you\'re in our patch.</span>';
    
    topBg.appendChild(iconWrap);
    topBg.appendChild(title);
    
    const text = document.createElement('p');
    text.style.color = '#3F3F46';
    text.style.fontSize = '15px';
    text.style.lineHeight = '1.5';
    text.style.margin = '0';
    text.innerHTML = 'Your Account Manager will be in touch shortly to help you get started.';
    
    contentDiv.appendChild(text);
    
    modal.appendChild(topBg);
    modal.appendChild(contentDiv);
  } else {
    // Out of territory
    const iconWrap = document.createElement('div');
    iconWrap.style.width = '56px';
    iconWrap.style.height = '56px';
    iconWrap.style.borderRadius = '50%';
    iconWrap.style.backgroundColor = '#dbe8d9';
    iconWrap.style.display = 'flex';
    iconWrap.style.alignItems = 'center';
    iconWrap.style.justifyContent = 'center';
    iconWrap.style.margin = '0 auto 20px auto';
    iconWrap.style.fontSize = '24px';
    iconWrap.innerHTML = '📍';
    
    const title = document.createElement('h2');
    title.style.margin = '0 0 16px 0';
    title.style.fontSize = '22px';
    title.style.fontWeight = '700';
    title.style.color = '#0f384f';
    title.innerHTML = 'We\'re not in your area just yet.';
    
    const text = document.createElement('p');
    text.style.color = '#3F3F46';
    text.style.fontSize = '15px';
    text.style.lineHeight = '1.5';
    text.style.margin = '0 0 24px 0';
    text.innerHTML = 'We couldn\'t find a local MailPlus driver covering your address right now — so we can\'t start your free trial here today. You\'re welcome to check back any time.';
    
    const callBtn = document.createElement('a');
    callBtn.href = 'tel:1300656595';
    callBtn.style.display = 'block';
    callBtn.style.width = '100%';
    callBtn.style.padding = '12px';
    callBtn.style.borderRadius = '24px';
    callBtn.style.border = '1px solid #dbe8d9';
    callBtn.style.color = '#0f384f';
    callBtn.style.fontWeight = '600';
    callBtn.style.textDecoration = 'none';
    callBtn.style.fontSize = '15px';
    callBtn.innerHTML = 'Call 1300 65 65 95';
    
    contentDiv.appendChild(iconWrap);
    contentDiv.appendChild(title);
    contentDiv.appendChild(text);
    contentDiv.appendChild(callBtn);
    modal.appendChild(contentDiv);
  }

  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Trigger animation
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });
}
