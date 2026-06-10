document.addEventListener('DOMContentLoaded', () => {
  // Ticket selection buttons
  const ticketCards = document.querySelectorAll('.ticket-card');
  
  // Interactive SVG map area groups
  const mapAreas = document.querySelectorAll('.map-area-group');
  
  // Area cards in the details section
  const areaCards = document.querySelectorAll('.area-card');

  // Toggle elements
  const toggleOverseas = document.getElementById('toggle-overseas');
  const toggleDomestic = document.getElementById('toggle-domestic');
  const satoyamaOverlay = document.getElementById('satoyama-overlay');
  const standardFeatures = document.getElementById('standard-features');

  // Global State
  let isOverseas = true;

  // Interactive ticket data definition (split by audience type)
  const ticketData = {
    overseas: {
      premium: {
        warehouse: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入參觀大倉庫，包含所有內部展示與影院。'
        },
        youth: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入青春之丘，包含進入「地球屋」古董店室內觀看。'
        },
        dondoko: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入咚咚吭森林，包含進入「皋月和梅的家」室內觀看。'
        },
        mononoke: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入魔法之里，體驗炭烤五平餅與參觀達達拉城外觀。'
        },
        witches: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入魔女之谷，包含進入「霍爾城堡」、「歐其諾家」、「魔女之家」室內觀看。新制起魔女之谷有再次入園權限。'
        }
      },
      standard: {
        warehouse: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入參觀大倉庫，包含所有內部展示與影院。'
        },
        youth: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】海外版「大散步券標準版」不包含青春之丘園區，僅能在免費公共步道遠眺。'
        },
        dondoko: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】海外版「大散步券標準版」不包含咚咚吭森林園區，僅能利用公共巴士站遠眺。'
        },
        mononoke: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入魔法之里，體驗炭烤五平餅與參觀達達拉城外觀。'
        },
        witches: {
          status: 'status-partial',
          text: '🟠 【僅限外觀】可進入魔女之谷園區及搭乘遊樂設施，但【無法進入】「霍爾城堡」等主題建築內部。新制起魔女之谷有再次入園權限。'
        }
      },
      satoyama: {
        // Dummy data because it is locked/hidden, but needed as fallback
        warehouse: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        youth: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        dondoko: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        mononoke: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        witches: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' }
      },
      'witches-mononoke': {
        warehouse: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        youth: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        dondoko: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        mononoke: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        witches: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' }
      },
      'warehouse-only': {
        warehouse: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        youth: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        dondoko: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        mononoke: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        witches: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' }
      },
      'youth-only': {
        warehouse: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        youth: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        dondoko: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        mononoke: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        witches: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' }
      },
      'dondoko-only': {
        warehouse: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        youth: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        dondoko: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        mononoke: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' },
        witches: { status: 'status-blocked', text: '🔴 【無權限】海外管道無法購買此票種。' }
      }
    },
    domestic: {
      premium: {
        warehouse: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入參觀大倉庫，包含所有內部展示與影院。'
        },
        youth: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入青春之丘，包含進入「地球屋」古董店室內觀看。'
        },
        dondoko: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入咚咚吭森林，包含進入「皋月和梅的家」室內觀看。'
        },
        mononoke: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入魔法之里，體驗炭烤五平餅與參觀達達拉城外觀。'
        },
        witches: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入魔女之谷，包含進入「霍爾城堡」、「歐其諾家」、「魔女之家」室內觀看。新制起魔女之谷有再次入園權限。'
        }
      },
      standard: {
        warehouse: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入參觀大倉庫，包含所有內部展示與影院。'
        },
        youth: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】大散步券標準版不包含青春之丘園區，僅能在免費公共步道遠眺。'
        },
        dondoko: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】大散步券標準版不包含咚咚吭森林園區，僅能利用公共巴士站遠眺。'
        },
        mononoke: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入魔法之里，體驗炭烤五平餅與參觀達達拉城外觀。'
        },
        witches: {
          status: 'status-partial',
          text: '🟠 【僅限外觀】可進入魔女之谷園區及搭乘遊樂設施，但【無法進入】「霍爾城堡」等主題建築內部。新制起魔女之谷有再次入園權限。'
        }
      },
      satoyama: {
        warehouse: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此票種【不包含】吉卜力大倉庫。'
        },
        youth: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此票種【不包含】青春之丘。'
        },
        dondoko: {
          status: 'status-partial',
          text: '🟠 【部分授權】僅能走山頂步道參觀「咚咚吭堂（龍貓雕像）」，【無法進入】「皋月和梅的家」園區及室內。無指定入園時間，但全體需於當天 16:30 前到達！'
        },
        mononoke: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入魔法之里，體驗炭烤五平餅與參觀達達拉城外觀。無指定入園時間，但全體需於當天 16:30 前到達！'
        },
        witches: {
          status: 'status-partial',
          text: '🟠 【僅限外觀】請於 13:00 ~ 16:30 進入魔女之谷園區，【無法進入】霍爾城堡等主題建築內部。新制起魔女之谷有再次入園權限。'
        }
      },
      'witches-mononoke': {
        warehouse: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此票種【不包含】吉卜力大倉庫。'
        },
        youth: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此票種【不包含】青春之丘。'
        },
        dondoko: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此票種【不包含】咚咚吭森林。'
        },
        mononoke: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入魔法之里，體驗炭烤五平餅與參觀達達拉城外觀。'
        },
        witches: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入魔女之谷，包含進入「霍爾城堡」、「歐其諾家」、「魔女之家」室內觀看。新制起魔女之谷有再次入園權限。'
        }
      },
      'warehouse-only': {
        warehouse: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入參觀大倉庫，包含所有內部展示與影院。'
        },
        youth: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含吉卜力大倉庫，不含其餘 4 個園區。'
        },
        dondoko: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含吉卜力大倉庫，不含其餘 4 個園區。'
        },
        mononoke: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含吉卜力大倉庫，不含其餘 4 個園區。'
        },
        witches: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含吉卜力大倉庫，不含其餘 4 個園區。'
        }
      },
      'youth-only': {
        warehouse: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含青春之丘，不含其餘 4 個園區。'
        },
        youth: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入青春之丘，包含進入「地球屋」古董店室內觀看。'
        },
        dondoko: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含青春之丘，不含其餘 4 個園區。'
        },
        mononoke: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含青春之丘，不含其餘 4 個園區。'
        },
        witches: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含青春之丘，不含其餘 4 個園區。'
        }
      },
      'dondoko-only': {
        warehouse: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含咚咚吭森林，不含其餘 4 個園區。'
        },
        youth: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含咚咚吭森林，不含其餘 4 個園區。'
        },
        dondoko: {
          status: 'status-allowed',
          text: '🟢 【完全授權】可進入咚咚吭森林，包含進入「皋月和梅的家」室內觀看。'
        },
        mononoke: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含咚咚吭森林，不含其餘 4 個園區。'
        },
        witches: {
          status: 'status-blocked',
          text: '🔴 【無入場資格】此單獨票僅包含咚咚吭森林，不含其餘 4 個園區。'
        }
      }
    }
  };

  // 1. Function to update ticket filter across map and details cards
  function updateTicketFilter(ticketType) {
    const activeData = isOverseas ? ticketData.overseas : ticketData.domestic;
    
    // Update map accessibility
    mapAreas.forEach(area => {
      const areaName = area.getAttribute('data-area');
      const isAllowed = activeData[ticketType][areaName].status !== 'status-blocked';
      
      if (isAllowed) {
        area.classList.remove('disabled');
      } else {
        area.classList.add('disabled');
        area.classList.remove('active'); // Remove active state if disabled
      }
    });

    // Update back-to-top button theme class
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      const classesToRemove = [];
      backToTopBtn.classList.forEach(cls => {
        if (cls.startsWith('theme-')) {
          classesToRemove.push(cls);
        }
      });
      classesToRemove.forEach(cls => backToTopBtn.classList.remove(cls));
      backToTopBtn.classList.add(`theme-${ticketType}`);
    }

    // Update details card badges and text
    areaCards.forEach(card => {
      const areaName = card.getAttribute('data-areas');
      const statusBox = card.querySelector('.area-ticket-status');
      
      if (statusBox) {
        // Reset classes
        statusBox.className = 'area-ticket-status';
        
        // Add new class and text based on active ticket
        const info = activeData[ticketType][areaName];
        
        // Apply ticket-specific theme color for allowed/partial entries
        if (info.status === 'status-blocked') {
          statusBox.classList.add('status-blocked');
        } else {
          // Status is allowed or partial - match selected ticket's badge color
          if (ticketType === 'premium') {
            statusBox.classList.add('status-theme-premium');
          } else if (ticketType === 'standard') {
            statusBox.classList.add('status-theme-standard');
          } else if (ticketType === 'satoyama') {
            statusBox.classList.add('status-theme-satoyama');
          } else if (ticketType === 'witches-mononoke') {
            statusBox.classList.add('status-theme-witches-mononoke');
          } else if (ticketType === 'warehouse-only') {
            statusBox.classList.add('status-theme-warehouse-only');
          } else if (ticketType === 'youth-only') {
            statusBox.classList.add('status-theme-youth-only');
          } else if (ticketType === 'dondoko-only') {
            statusBox.classList.add('status-theme-dondoko-only');
          } else {
            // fallback
            statusBox.classList.add('status-theme-single-area');
          }
        }
        
        statusBox.querySelector('span').textContent = info.text;
      }
    });
  }

  // 2. Audience View Update function
  function updateAudienceView() {
    const areaSatoyamaBadges = document.querySelectorAll('.area-card .ticket-badge.satoyama');
    const premiumOfficial = document.getElementById('premium-official-link');
    const premiumKlook = document.getElementById('premium-klook-link');
    const standardOfficial = document.getElementById('standard-official-link');
    const standardKlook = document.getElementById('standard-klook-link');
    const satoyamaOfficial = document.getElementById('satoyama-official-link');
    const satoyamaOnlyElements = document.querySelectorAll('.satoyama-only');
    const satoyamaInlineSpans = document.querySelectorAll('.satoyama-text-inline');
    const domesticOnlyCards = document.querySelectorAll('.domestic-only-card');

    if (isOverseas) {
      toggleOverseas.classList.add('active');
      toggleDomestic.classList.remove('active');
      if (satoyamaOverlay) satoyamaOverlay.classList.add('show');
      
      // Hide domestic-only cards in ticket selector
      domesticOnlyCards.forEach(card => card.style.display = 'none');

      // Hide satoyama badges in area cards
      areaSatoyamaBadges.forEach(badge => badge.style.display = 'none');

      // Hide satoyama-only elements and inline texts
      satoyamaOnlyElements.forEach(el => el.style.display = 'none');
      satoyamaInlineSpans.forEach(el => el.style.display = 'none');
      
      // Update standard features list in card
      standardFeatures.innerHTML = `
        <li class="standard-scope"><strong>僅限 3 大園區</strong> (大倉庫、魔法之里、魔女之谷)</li>
        <li class="unavailable">不含青春之丘、咚咚吭森林</li>
        <li class="unavailable">不可進入主題建築物內部</li>
        <li style="color: var(--accent-red); font-weight: 700;">大倉庫需指定入場時段</li>
        <li style="color: var(--accent-gold); font-weight: 700; font-size: 0.82rem;">💡 可於「魔女之谷」現場加購當日券入內</li>
        <li style="color:var(--primary); font-weight:700; font-size:0.8rem; margin-top:0.4rem;">💡 這是海外遊客在 Lawson 英文官網 / Klook 買到的版本</li>
      `;

      // Update purchase links for Overseas
      if (premiumOfficial) {
        premiumOfficial.setAttribute('href', 'https://l-tike.com/st1/ghibli-pk-en4');
        premiumOfficial.style.display = 'inline-flex';
      }
      if (premiumKlook) premiumKlook.style.display = 'none'; // Klook does not sell Premium
      if (standardOfficial) {
        standardOfficial.setAttribute('href', 'https://l-tike.com/st1/ghibli-pk-en4');
        standardOfficial.style.display = 'inline-flex';
      }
      if (standardKlook) {
        standardKlook.setAttribute('href', 'https://www.klook.com/zh-TW/activity/132673-ghibli-park-ticket/?dd_referrer=');
        standardKlook.style.display = 'inline-flex';
      }
      if (satoyamaOfficial) {
        satoyamaOfficial.style.display = 'none';
      }

      // If active ticket was a domestic-only ticket (which is now hidden), switch to premium
      const activeCard = document.querySelector('.ticket-card.active');
      if (activeCard && activeCard.classList.contains('domestic-only-card')) {
        activeCard.classList.remove('active');
        document.getElementById('btn-premium').classList.add('active');
      }
    } else {
      toggleOverseas.classList.remove('active');
      toggleDomestic.classList.add('active');
      if (satoyamaOverlay) satoyamaOverlay.classList.remove('show');
      
      // Show domestic-only cards in ticket selector
      domesticOnlyCards.forEach(card => card.style.display = 'flex');

      // Show satoyama badges in area cards
      areaSatoyamaBadges.forEach(badge => badge.style.display = 'inline-block');

      // Show satoyama-only elements and inline texts
      satoyamaOnlyElements.forEach(el => el.style.display = '');
      satoyamaInlineSpans.forEach(el => el.style.display = 'inline');
      
      // Update standard features list in card
      standardFeatures.innerHTML = `
        <li class="standard-scope"><strong>僅限 3 大園區</strong> (大倉庫、魔法之里、魔女之谷)</li>
        <li class="unavailable">不含青春之丘、咚咚吭森林</li>
        <li class="unavailable">不可進入主題建築物內部</li>
        <li style="color: var(--accent-red); font-weight: 700;">大倉庫需指定入場時段</li>
        <li style="color: var(--accent-gold); font-weight: 700; font-size: 0.82rem;">💡 可於「魔女之谷」現場加購當日券入內</li>
        <li style="color:var(--primary); font-weight:700; font-size:0.8rem; margin-top:0.4rem;">💡 這是日本國內版 (需日本手機門號簡訊認證)</li>
      `;

      // Update purchase links for Domestic
      if (premiumOfficial) {
        premiumOfficial.setAttribute('href', 'https://l-tike.com/bw-ticket/ghibli/ghibli-park/');
        premiumOfficial.style.display = 'inline-flex';
      }
      if (premiumKlook) premiumKlook.style.display = 'none';
      if (standardOfficial) {
        standardOfficial.setAttribute('href', 'https://l-tike.com/bw-ticket/ghibli/ghibli-park/');
        standardOfficial.style.display = 'inline-flex';
      }
      if (standardKlook) standardKlook.style.display = 'none';
      if (satoyamaOfficial) {
        satoyamaOfficial.setAttribute('href', 'https://l-tike.com/bw-ticket/ghibli/ghibli-park/');
        satoyamaOfficial.style.display = 'inline-flex';
      }
    }
    
    // Refresh the ticket filter
    const activeCard = document.querySelector('.ticket-card.active');
    if (activeCard) {
      updateTicketFilter(activeCard.getAttribute('data-ticket'));
    }
  }

  // 3. Ticket Selector click handler
  ticketCards.forEach(card => {
    card.addEventListener('click', () => {
      // If overseas view and clicking domestic-only card, do nothing
      if (isOverseas && card.classList.contains('domestic-only-card')) return;

      // Remove active class from all buttons
      ticketCards.forEach(c => c.classList.remove('active'));
      // Add active class to clicked button
      card.classList.add('active');
      
      const ticketType = card.getAttribute('data-ticket');
      updateTicketFilter(ticketType);
    });
  });

  // 4. SVG Map Area Clicks to scroll and highlight
  mapAreas.forEach(area => {
    area.addEventListener('click', () => {
      // If the area is disabled under the current ticket, do nothing
      if (area.classList.contains('disabled')) return;

      const areaId = area.getAttribute('data-area');
      const targetCard = document.getElementById(`area-${areaId}`);
      
      if (targetCard) {
        // Highlight active area in map
        mapAreas.forEach(a => a.classList.remove('active'));
        area.classList.add('active');
        
        // Scroll to card smoothly (align to start for mobile to prevent title cutoff, center for desktop)
        const isMobile = window.innerWidth <= 768;
        targetCard.scrollIntoView({ 
          behavior: 'smooth', 
          block: isMobile ? 'start' : 'center' 
        });
        
        // Add flash highlight animation
        targetCard.classList.remove('highlight-flash');
        // Trigger reflow
        void targetCard.offsetWidth;
        targetCard.classList.add('highlight-flash');
        
        // Remove animation class after it completes
        setTimeout(() => {
          targetCard.classList.remove('highlight-flash');
        }, 1500);
      }
    });
  });

  // 5. Toggle Event Listeners
  toggleOverseas.addEventListener('click', () => {
    isOverseas = true;
    updateAudienceView();
  });

  toggleDomestic.addEventListener('click', () => {
    isOverseas = false;
    updateAudienceView();
  });

  // 6. Prevent ticket card clicks when clicking purchase links
  const buyLinks = document.querySelectorAll('.buy-link-btn');
  buyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // 7. Initialize page with 'overseas' and 'premium' ticket filter
  updateAudienceView();

  // 8. Floating Menu Drawer toggle logic
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const sideNavDrawer = document.getElementById('side-nav-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMenu() {
    if (sideNavDrawer) sideNavDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  }

  function closeMenu() {
    if (sideNavDrawer) sideNavDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', openMenu);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMenu);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 9. Back to Top Button visibility and click logic
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      if (backToTopBtn) backToTopBtn.classList.add('show');
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove('show');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      const ticketsSection = document.getElementById('tickets');
      if (ticketsSection) {
        ticketsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  // 10. Center horizontal scroll of SVG map container on page load for mobile
  const mapContainer = document.querySelector('.map-container');
  if (mapContainer) {
    const centerScroll = () => {
      const scrollAmount = (mapContainer.scrollWidth - mapContainer.clientWidth) / 2;
      if (scrollAmount > 0) {
        mapContainer.scrollLeft = scrollAmount;
      }
    };
    centerScroll();
    setTimeout(centerScroll, 150);
    setTimeout(centerScroll, 400);
  }

  // 11. JPY to TWD Currency Converter
  const FALLBACK_RATE = 0.197;
  const rateTextEl = document.getElementById('currency-rate-text');
  const twdElements = document.querySelectorAll('.twd-price');

  function updatePrices(rate, isFallback = false) {
    twdElements.forEach(el => {
      const jpyVal = parseInt(el.getAttribute('data-jpy'), 10);
      if (!isNaN(jpyVal)) {
        const twdVal = Math.round(jpyVal * rate);
        const formattedTwd = twdVal.toLocaleString('zh-TW');
        el.textContent = `(約 NT$ ${formattedTwd})`;
      }
    });

    if (rateTextEl) {
      const sourceInfo = isFallback ? '使用備用匯率' : '即時匯率換算';
      const formattedRate = rate.toFixed(4);
      rateTextEl.textContent = `${sourceInfo}：1 日圓 ≈ ${formattedRate} 台幣`;
    }
  }

  async function fetchExchangeRate() {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/JPY');
      if (!response.ok) throw new Error('API response was not ok');
      const data = await response.json();
      if (data && data.rates && typeof data.rates.TWD === 'number') {
        const rate = data.rates.TWD;
        updatePrices(rate, false);
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (err) {
      console.warn('Unable to fetch live JPY/TWD rate. Using fallback rate:', err);
      updatePrices(FALLBACK_RATE, true);
    }
  }

  fetchExchangeRate();
});
