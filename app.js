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
          text: '🟢 【完全授權】可進入魔女之谷，包含進入「霍爾城堡」、「歐其諾家」、「魔女之家」室內觀看。'
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
          text: '🟡 【僅限外觀】可進入魔女之谷園區及搭乘遊樂設施，但【無法進入】「霍爾城堡」等主題建築內部。'
        }
      },
      satoyama: {
        // Dummy data because it is locked/hidden, but needed as fallback
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
          text: '🟢 【完全授權】可進入魔女之谷，包含進入「霍爾城堡」、「歐其諾家」、「魔女之家」室內觀看。'
        }
      },
      standard: {
        warehouse: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入參觀大倉庫，包含所有內部展示與影院。'
        },
        youth: {
          status: 'status-partial',
          text: '🟡 【僅限外觀】可參觀青春之丘園區，但【無法進入】「地球屋」古董店建築物內部。'
        },
        dondoko: {
          status: 'status-partial',
          text: '🟡 【僅限外觀】可參觀咚咚吭森林步道與山頂，但【無法進入】「皋月和梅的家」內部。'
        },
        mononoke: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入魔法之里，體驗炭烤五平餅與參觀達達拉城外觀。'
        },
        witches: {
          status: 'status-partial',
          text: '🟡 【僅限外觀】可進入魔女之谷園區及搭乘遊樂設施，但【無法進入】「霍爾城堡」等主題建築內部。'
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
          text: '🟡 【部分授權】僅能走山頂步道參觀「咚咚吭堂（龍貓雕像）」，【無法進入】「皋月和梅的家」園區及室內。'
        },
        mononoke: {
          status: 'status-allowed',
          text: '🟢 【可進入】可進入魔法之里，體驗炭烤五平餅與參觀達達拉城外觀。'
        },
        witches: {
          status: 'status-partial',
          text: '🟡 【僅限外觀】可進入魔女之谷園區，但【無法進入】霍爾城堡等主題建築內部。'
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

    // Update details card badges and text
    areaCards.forEach(card => {
      const areaName = card.getAttribute('data-areas');
      const statusBox = card.querySelector('.area-ticket-status');
      
      if (statusBox) {
        // Reset classes
        statusBox.className = 'area-ticket-status';
        
        // Add new class and text based on active ticket
        const info = activeData[ticketType][areaName];
        statusBox.classList.add(info.status);
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

    if (isOverseas) {
      toggleOverseas.classList.add('active');
      toggleDomestic.classList.remove('active');
      satoyamaOverlay.classList.add('show');
      
      // Hide satoyama badges in area cards
      areaSatoyamaBadges.forEach(badge => badge.style.display = 'none');
      
      // Update standard features list in card
      standardFeatures.innerHTML = `
        <li class="standard-scope"><strong>僅限 3 大園區</strong> (大倉庫、魔法之里、魔女之谷)</li>
        <li class="unavailable">不含青春之丘、咚咚吭森林</li>
        <li class="unavailable">不可進入主題建築物內部</li>
        <li style="color: var(--accent-red); font-weight: 700;">大倉庫需指定入場時段</li>
        <li style="color:var(--primary); font-weight:700; font-size:0.8rem; margin-top:0.4rem;">💡 這是海外遊客在 Lawson 英文官網 / Klook 買到的版本</li>
      `;

      // Update purchase links for Overseas
      if (premiumOfficial) premiumOfficial.style.display = 'none'; // Lawson does not sell Premium overseas
      if (premiumKlook) {
        premiumKlook.setAttribute('href', 'https://www.klook.com/en-US/activity/132673-ghibli-park-ticket/?utm_medium=m_44824&utm_campaign=official_redirect&utm_source=merchant_referral');
        premiumKlook.style.display = 'inline-flex';
      }
      if (standardOfficial) {
        standardOfficial.setAttribute('href', 'https://l-tike.com/st1/ghibli-pk-en4');
        standardOfficial.style.display = 'inline-flex';
      }
      if (standardKlook) {
        standardKlook.setAttribute('href', 'https://www.klook.com/en-US/activity/132673-ghibli-park-ticket/?utm_medium=m_44824&utm_campaign=official_redirect&utm_source=merchant_referral');
        standardKlook.style.display = 'inline-flex';
      }

      // If active ticket was satoyama (which is locked), switch to premium
      const activeCard = document.querySelector('.ticket-card.active');
      if (activeCard && activeCard.getAttribute('data-ticket') === 'satoyama') {
        document.getElementById('btn-satoyama').classList.remove('active');
        document.getElementById('btn-premium').classList.add('active');
      }
    } else {
      toggleOverseas.classList.remove('active');
      toggleDomestic.classList.add('active');
      satoyamaOverlay.classList.remove('show');
      
      // Show satoyama badges in area cards
      areaSatoyamaBadges.forEach(badge => badge.style.display = 'inline-block');
      
      // Update standard features list in card
      standardFeatures.innerHTML = `
        <li class="standard-scope">暢遊全部 5 大園區 (室外區域)</li>
        <li class="unavailable">不可進入主題建築物內部</li>
        <li>僅限外觀拍照與步道散步</li>
        <li style="color: var(--accent-red); font-weight: 700;">大倉庫需指定入場時段</li>
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
      // If overseas view and clicking locked satoyama, do nothing
      if (isOverseas && card.getAttribute('data-ticket') === 'satoyama') return;

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
        
        // Scroll to card smoothly
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
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
});
