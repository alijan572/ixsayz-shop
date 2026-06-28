(function () {
  "use strict";

  const money = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
  const app = document.getElementById("app");
  const isAdminPage = window.IXSAYZ_FORCE_ADMIN || location.pathname.replace(/\\/g, "/").includes("/admin");

  const categories = ["Образы", "Одежда", "Обувь", "Новинки", "Мужское", "Женское", "Sale"];
  const statuses = ["Заявка", "В обработке", "Ожидает оплаты", "Оплачен", "Отправлен", "Завершен", "Отменен"];
  const storageKey = "ixsayz-demo-db-v1";
  const sessionKey = "ixsayz-session-v1";
  const adminKey = "ixsayz-admin-v1";
  const userKey = "ixsayz-user-v2";
  const seenProductsKey = "ixsayz-seen-products-v2";
  const visitKey = "ixsayz-visit-counted-v2";
  const deviceKey = "ixsayz-device-v2";

 const seed = {
  settings: {
    siteName: "IXSAYZ SHOP",
    description: "",
    logo: "IXSAYZ",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-walking-in-a-corridor-with-neon-lights-39879-large.mp4",
    backgroundImage: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=1800&q=85",
    contacts: "+7 999 555-19-19",
    instagram: "https://instagram.com/",
    telegram: "https://t.me/",
    telegramOrderUrl: "https://t.me/IXSAYZ",
    telegramOrderUsername: "IXSAYZ",
    whatsapp: "https://wa.me/79253656255",
    whatsappOrderNumber: "79253656255",
    deliveryPrice: 500,
    banners: [
      {
        title: "IXSAYZ DROP",
        text: "Новые образы уже в наличии",
        image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=85"
      },
      {
        title: "Выгодные комплекты",
        text: "Самые выгодные цены на готовые образы",
        image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=1400&q=85"
      },
      {
        title: "Быстрое оформление",
        text: "Выберите размер и отправьте заявку за минуту",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85"
      }
    ],
    cloudinaryCloudName: "dbbaxwqvn",
    cloudinaryUploadPreset: "ixsayz_shop"
  },
    products: [
      {
        id: uid(),
        title: "Midnight Layer Look",
        category: "Образы",
        price: 24900,
        image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1000&q=85",
        sizes: { S: 2, M: 4, L: 3, XL: 1 },
        inStock: true,
        description: "Графитовый комплект: oversize-футболка, прямые брюки и городские sneakers.",
        lookItems: [
          { name: "Футболка IXSAYZ Heavy", price: 6900 },
          { name: "Брюки Straight Motion", price: 9800 },
          { name: "Кроссовки Night Step", price: 8200 }
        ],
        views: 0,
        added: 0,
        bought: 0
      },
      {
        id: uid(),
        title: "White Noise Jacket",
        category: "Одежда",
        price: 13900,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
        sizes: { M: 3, L: 4, XL: 2 },
        inStock: true,
        description: "Легкая куртка с чистым силуэтом и матовой фурнитурой.",
        lookItems: [],
        views: 0,
        added: 0,
        bought: 0
      },
      {
        id: uid(),
        title: "Chrome Runner",
        category: "Обувь",
        price: 15900,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
        sizes: { "40": 2, "41": 2, "42": 5, "43": 2, "44": 1 },
        inStock: true,
        description: "Универсальная пара для образов с денимом, брюками и techwear.",
        lookItems: [],
        views: 0,
        added: 0,
        bought: 0
      },
      {
        id: uid(),
        title: "Black Core Tee",
        category: "Sale",
        price: 4900,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85",
        sizes: { S: 4, M: 8, L: 4 },
        inStock: true,
        description: "Плотная базовая футболка с посадкой premium relaxed.",
        lookItems: [],
        views: 0,
        added: 0,
        bought: 0
      },
      {
        id: uid(),
        title: "Weekend Tailored Set",
        category: "Новинки",
        price: 21900,
        image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=1000&q=85",
        sizes: { M: 2, L: 2, XL: 1 },
        inStock: true,
        description: "Собранный casual-set для свиданий, ужинов и городских выходов.",
        lookItems: [
          { name: "Рубашка Soft Form", price: 7900 },
          { name: "Брюки Pleat Line", price: 9100 },
          { name: "Лоферы Deep Black", price: 4900 }
        ],
        views: 0,
        added: 0,
        bought: 0
      },
      {
        id: uid(),
        title: "Pearl Slip Dress",
        category: "Женское",
        price: 12900,
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85",
        sizes: { XS: 2, S: 4, M: 2 },
        inStock: true,
        description: "Минималистичное платье для вечерних образов в витрине бренда.",
        lookItems: [],
        views: 0,
        added: 0,
        bought: 0
      }
    ],
    orders: [],
    customers: [],
    sessions: [],
    events: [],
    visits: 0
  };

  const hasFirebaseConfig = Boolean(window.IXSAYZ_FIREBASE_CONFIG?.projectId);

  let state = loadDb();
  let user = loadSavedUser();
  let cart = [];
  let selectedCategory = "Все";
  let adminTab = "dashboard";
  let activeView = "catalog";
  let selectedSizes = {};
  let authMode = "phone";
  let adminOk = false;
  let shopDelegationReady = false;
  let remoteDocRef = null;
  let remoteSetDoc = null;
  let remoteGetDoc = null;
  let remoteServerTimestamp = null;
  let remoteApplying = false;
  let remoteSaveTimer = null;
  let remoteLastHash = "";
  const seenProducts = new Set(readLocalJson(seenProductsKey, []));
  const sessionInfo = {
    id: getDeviceId(),
    startedAt: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    device: window.innerWidth <= 760 ? "Телефон" : "Компьютер",
    width: window.innerWidth,
    height: window.innerHeight,
    language: navigator.language || "",
    page: location.pathname || "/"
  };


  function uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }

  function readLocalJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeLocalJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Local session save skipped", error);
    }
  }

  function loadSavedUser() {
    return readLocalJson(userKey, null);
  }

  function getDeviceId() {
    const existing = readLocalJson(deviceKey, "");
    if (existing) return existing;
    const next = uid();
    writeLocalJson(deviceKey, next);
    return next;
  }

  function saveSavedUser() {
    if (user) writeLocalJson(userKey, user);
  }

  function clearAdminSession() {
    try {
      [storageKey, sessionKey, adminKey, "ixsayz-cart-v1"].forEach((key) => sessionStorage.removeItem(key));
    } catch (error) {
      console.warn("Admin session cleanup skipped", error);
    }
  }

  function readJson(key, fallback) {
    return fallback;
  }

  function writeJson(key, value) {
    return value;
  }

  function loadDb() {
    return structuredClone(seed);
  }

  function saveDb() {
    if (remoteDocRef && !remoteApplying) scheduleRemoteSave();
  }

  async function saveDbNow() {
    clearTimeout(remoteSaveTimer);
    await pushRemoteState();
  }

  function defaultBanners() {
    return structuredClone(seed.settings.banners);
  }

  function normalizeBanners(value) {
    let banners = value;
    if (typeof banners === "string") {
      banners = banners.trim()
        ? banners.split("|").map((item) => {
            const [title, text, image] = item.split("::").map((part) => part?.trim() || "");
            return { title, text, image };
          })
        : [];
    }
    if (!Array.isArray(banners)) banners = [];
    banners = banners
      .map((banner) => ({
        title: String(banner?.title || "").trim(),
        text: String(banner?.text || "").trim(),
        image: String(banner?.image || "").trim()
      }))
      .filter((banner) => banner.title || banner.text || banner.image)
      .slice(0, 5);
    return banners.length ? banners : defaultBanners();
  }

  function normalizeState(value) {
    const next = { ...structuredClone(seed), ...(value || {}) };
    next.settings = { ...seed.settings, ...(value?.settings || {}) };
    next.settings.banners = normalizeBanners(next.settings.banners);
    next.products = Array.isArray(value?.products) ? value.products : [];
    next.orders = Array.isArray(value?.orders) ? value.orders : [];
    next.customers = Array.isArray(value?.customers) ? value.customers : [];
    next.sessions = Array.isArray(value?.sessions) ? value.sessions : [];
    next.events = Array.isArray(value?.events) ? value.events : [];
    next.visits = Number(value?.visits || 0);
    return next;
  }

  function publicState() {
    return normalizeState(state);
  }

  function hashState(value) {
    return JSON.stringify(value);
  }

  function scheduleRemoteSave() {
    clearTimeout(remoteSaveTimer);
    remoteSaveTimer = setTimeout(pushRemoteState, 120);
  }

  async function pushRemoteState() {
    if (!remoteDocRef || !remoteSetDoc || remoteApplying) return;
    let next = publicState();
    if (remoteGetDoc) {
      try {
        const latestPayload = await remoteGetDoc(remoteDocRef);
        if (latestPayload?.state) next = mergeStateForWrite(normalizeState(latestPayload.state), next);
      } catch (error) {
        console.warn("Remote merge skipped", error);
      }
    }
    const hash = hashState(next);
    remoteLastHash = hash;
    try {
      await remoteSetDoc(remoteDocRef, {
        state: next,
        updatedAt: remoteServerTimestamp ? remoteServerTimestamp() : new Date().toISOString()
      });
    } catch (error) {
      console.error(error);
      toast("Firebase не сохранил данные. Проверьте Firestore Rules.");
    }
  }

  function mergeById(latestItems, nextItems, key = "id") {
    const map = new Map();
    [...(latestItems || []), ...(nextItems || [])].forEach((item) => {
      if (!item?.[key]) return;
      map.set(item[key], { ...(map.get(item[key]) || {}), ...item });
    });
    return [...map.values()];
  }

  function mergeCustomers(latestCustomers, nextCustomers) {
    const map = new Map();
    [...(latestCustomers || []), ...(nextCustomers || [])].forEach((customer) => {
      const key = customer.id || customer.phone || customer.email;
      if (!key) return;
      map.set(key, { ...(map.get(key) || {}), ...customer });
    });
    return [...map.values()];
  }

  function mergeProductsForShop(latestProducts, nextProducts) {
    return (latestProducts || []).map((latest) => {
      const next = (nextProducts || []).find((item) => item.id === latest.id);
      if (!next) return latest;
      return {
        ...latest,
        views: Math.max(Number(latest.views || 0), Number(next.views || 0)),
        added: Math.max(Number(latest.added || 0), Number(next.added || 0)),
        bought: Math.max(Number(latest.bought || 0), Number(next.bought || 0))
      };
    });
  }

  function mergeStateForWrite(latest, next) {
    const merged = normalizeState({
      ...latest,
      orders: mergeById(latest.orders, next.orders),
      customers: mergeCustomers(latest.customers, next.customers),
      sessions: mergeById(latest.sessions, next.sessions),
      events: mergeById(latest.events, next.events),
      visits: Math.max(Number(latest.visits || 0), Number(next.visits || 0))
    });

    if (isAdminPage) {
      merged.settings = next.settings;
      merged.products = next.products;
    } else {
      merged.settings = latest.settings;
      merged.products = mergeProductsForShop(latest.products, next.products);
    }

    return merged;
  }

  function withTimeout(promise, ms, label) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timeout`)), ms))
    ]);
  }

  function renderFirebaseError(error) {
    console.error(error);
    if (isAdminPage) {
      app.innerHTML = `
        <section class="hero">
          <div class="hero-fallback"></div>
          <div class="modal glass firebase-error">
            <h3>Firebase не подключился</h3>
            <p class="muted">Проверьте Realtime Database Rules, файл firebase.js и что сайт загружен на GitHub полностью.</p>
            <p class="muted">Ошибка: ${escapeHtml(error?.message || error || "неизвестно")}</p>
          </div>
        </section>`;
      return;
    }
    app.innerHTML = `<section class="silent-loader"></section>`;
  }
  async function startFirebaseSync() {
    if (!hasFirebaseConfig) return;
    const config = window.IXSAYZ_FIREBASE_CONFIG;
    try {
      const { initializeApp } = await withTimeout(import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"), 8000, "firebase-app import");
      const firebaseApp = initializeApp(config);

      if (config.databaseURL) {
        const database = await withTimeout(import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"), 8000, "firebase-database import");
        const db = database.getDatabase(firebaseApp);
        remoteDocRef = database.ref(db, "ixsayzShop/main");
        remoteSetDoc = (ref, payload) => database.set(ref, payload);
        remoteGetDoc = async (ref) => {
          const snapshot = await database.get(ref);
          return snapshot.val();
        };
        remoteServerTimestamp = database.serverTimestamp;
        const snap = await withTimeout(database.get(remoteDocRef), 8000, "Realtime Database read");
        if (snap.exists() && snap.val()?.state) {
          state = normalizeState(snap.val().state);
        } else {
          await withTimeout(remoteSetDoc(remoteDocRef, { state: publicState(), updatedAt: remoteServerTimestamp() }), 8000, "Realtime Database write");
        }
        registerSession();
        remoteLastHash = hashState(publicState());
        render();
        trackVisitOnce();
        database.onValue(remoteDocRef, (docSnap) => {
          const value = docSnap.val();
          if (!value?.state) return;
          applyRemoteState(value.state);
        });
        return;
      }

      const firestore = await withTimeout(import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"), 8000, "firestore import");
      const db = firestore.getFirestore(firebaseApp);
      remoteSetDoc = firestore.setDoc;
      remoteGetDoc = async (ref) => {
        const snapshot = await firestore.getDoc(ref);
        return snapshot.exists() ? snapshot.data() : null;
      };
      remoteServerTimestamp = firestore.serverTimestamp;
      remoteDocRef = firestore.doc(db, "ixsayzShop", "main");
      const snap = await withTimeout(firestore.getDoc(remoteDocRef), 8000, "Firestore read");
      if (snap.exists() && snap.data()?.state) {
        state = normalizeState(snap.data().state);
      } else {
        await withTimeout(remoteSetDoc(remoteDocRef, { state: publicState(), updatedAt: remoteServerTimestamp() }), 8000, "Firestore write");
      }
      registerSession();
      remoteLastHash = hashState(publicState());
      render();
      trackVisitOnce();
      firestore.onSnapshot(remoteDocRef, (docSnap) => {
        if (!docSnap.exists() || !docSnap.data()?.state) return;
        applyRemoteState(docSnap.data().state);
      });
    } catch (error) {
      renderFirebaseError(error);
    }
  }

  function applyRemoteState(remoteState) {
    const incoming = normalizeState(remoteState);
    const incomingHash = hashState(incoming);
    if (incomingHash === remoteLastHash) return;
    remoteApplying = true;
    state = incoming;
    remoteLastHash = incomingHash;
    remoteApplying = false;
    render();
  }

  function registerSession() {
    const existing = state.sessions.find((item) => item.id === sessionInfo.id);
    sessionInfo.lastSeen = new Date().toISOString();
    sessionInfo.width = window.innerWidth;
    sessionInfo.height = window.innerHeight;
    if (user) {
      sessionInfo.userName = user.name || "";
      sessionInfo.contact = user.phone || user.email || "";
    }
    if (existing) Object.assign(existing, sessionInfo);
    else state.sessions.unshift({ ...sessionInfo });
    state.sessions = state.sessions.slice(0, 200);
  }

  function eventLabel(type) {
    return {
      visit: "Вход на сайт",
      registration: "Регистрация",
      view_product: "Открыл товар",
      add_to_cart: "Добавил в корзину",
      buy_now: "Купить сейчас",
      nav_view: "Открыл раздел",
      category_filter: "Выбрал категорию",
      size_select: "Выбрал размер",
      cart_open: "Открыл корзину",
      cart_close: "Закрыл корзину",
      qty_change: "Изменил количество",
      remove_cart: "Удалил из корзины",
      checkout_open: "Открыл оформление",
      lead_created: "Создал заявку",
      messenger_open: "Открыл мессенджер"
    }[type] || type;
  }

  function trackVisitOnce() {
    const visitorId = user?.id || sessionInfo.id;
    const counted = readLocalJson(visitKey, {});
    if (counted[visitorId]) return;
    counted[visitorId] = new Date().toISOString();
    writeLocalJson(visitKey, counted);
    state.visits = Number(state.visits || 0) + 1;
    track("visit", `${sessionInfo.device} ${sessionInfo.width}x${sessionInfo.height}`, { save: true });
  }

  function track(type, details, options = {}) {
    registerSession();
    state.events.unshift({
      id: uid(),
      type,
      label: eventLabel(type),
      details,
      date: new Date().toISOString(),
      sessionId: sessionInfo.id,
      device: sessionInfo.device,
      page: sessionInfo.page,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      customer: user ? { id: user.id, name: user.name || "", contact: user.phone || user.email || "" } : null
    });
    state.events = state.events.slice(0, 600);
    if (options.save) saveDb();
  }

  function toast(message) {
    let node = document.querySelector(".toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "toast glass";
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add("show");
    setTimeout(() => node.classList.remove("show"), 2300);
  }

  function icon(name) {
    const icons = {
      cart: "🛒",
      user: "👤",
      close: "×",
      plus: "+",
      minus: "−",
      admin: "⚙",
      shop: "⌂"
    };
    return icons[name] || "";
  }

  function render() {
    app.className = "app";
    if (isAdminPage) renderAdmin();
    else renderShop();
  }

  function renderShop() {
    if (!user) {
      app.innerHTML = `
        <section class="hero auth-only">
          <div class="hero-fallback" style="background-image: url('${escapeAttr(state.settings.backgroundImage)}')"></div>
          ${state.settings.videoUrl ? `<video autoplay muted loop playsinline src="${escapeAttr(state.settings.videoUrl)}"></video>` : ""}
          <div class="login-screen">
            <div class="solo-logo">XS</div>
            ${heroAuthPanel()}
          </div>
        </section>
        ${modalLayer()}
      `;
      bindShopEvents();
      return;
    }

    app.innerHTML = `
      ${shopContent()}
      ${modalLayer()}
    `;
    bindShopEvents();
  }

  function shopContent() {
    return `
      <header class="app-topbar">
        <button class="app-logo" data-view="catalog">XS</button>
        <button class="cart-top-btn" title="Корзина" data-action="cart">${icon("cart")}<span>${cart.length}</span></button>
      </header>
      <main class="main app-main" id="catalog">
        ${viewContent()}
      </main>
      ${bottomNav()}
      ${cartDrawer()}
    `;
  }

  function heroAuthPanel() {
    const contactLabel = authMode === "phone" ? "Номер телефона" : "Электронная почта";
    const contactName = authMode === "phone" ? "phone" : "email";
    const contactType = authMode === "phone" ? "tel" : "email";
    const placeholder = authMode === "phone" ? "+7 999 000-00-00" : "name@email.com";

    return `
      <form class="auth-card glass" id="heroAuthForm">
        <div class="mode-switch" role="tablist" aria-label="Способ входа">
          <button type="button" class="${authMode === "phone" ? "active" : ""}" data-auth-mode="phone">Телефон</button>
          <button type="button" class="${authMode === "email" ? "active" : ""}" data-auth-mode="email">E-mail</button>
        </div>
        <label class="line-field">
          <span>${contactLabel}</span>
          <input name="${contactName}" type="${contactType}" required placeholder="${placeholder}" value="${escapeAttr(user?.[contactName] || "")}" />
        </label>
        <label class="line-field">
          <span>Имя</span>
          <input name="name" required placeholder="Как к вам обращаться" value="${escapeAttr(user?.name || "")}" />
        </label>
        <button class="btn primary">Войти / Зарегистрироваться</button>
      </form>
    `;
  }

  function viewContent() {
    if (activeView === "cart") return cartView();
    if (activeView === "orders") return ordersView();
    if (activeView === "profile") return profileView();
    return catalogView();
  }

  function catalogView() {
    return `
      <div class="section-head compact-head">
        <div>
          <h2>Каталог</h2>
          <p>Выберите товар, размер и добавьте в корзину.</p>
        </div>
      </div>
      ${promoCarousel()}
      <div class="filters">${["Все", ...categories].map((c) => `<button class="chip ${selectedCategory === c ? "active" : ""}" data-category="${c}">${c}</button>`).join("")}</div>
      <section class="grid">${filteredProducts().map(productCard).join("")}</section>
    `;
  }

  function promoCarousel() {
    const banners = normalizeBanners(state.settings.banners);
    return `
      <section class="promo-carousel" aria-label="Рекламные баннеры">
        <div class="promo-track" style="--count:${banners.length}">
          ${banners.map((banner) => `
            <article class="promo-slide glass">
              <img src="${escapeAttr(banner.image)}" alt="" loading="lazy" />
              <div>
                <span>IXSAYZ SHOP</span>
                <h3>${escapeHtml(banner.title)}</h3>
                <p>${escapeHtml(banner.text)}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function cartView() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    return `
      <div class="section-head compact-head">
        <div>
          <h2>Корзина</h2>
          <p>Проверьте товары и перейдите к оформлению.</p>
        </div>
      </div>
      <section class="checkout-panel glass">
        ${cart.length ? cart.map(cartItem).join("") : `<p class="muted">Корзина пока пустая.</p>`}
        <div class="row"><span>Товары</span><strong>${money.format(subtotal)}</strong></div>
        <p class="checkout-warning">Доставка и оплата подтверждаются после оформления заказа в мессенджере.</p>
        <button class="btn primary" data-action="checkout" ${cart.length ? "" : "disabled"}>Оформить заказ</button>
      </section>
    `;
  }

  function ordersView() {
    const contact = user?.phone || user?.email || "";
    const orders = state.orders.filter((order) => order.customerId === user?.id || order.phone === user?.phone || order.email === user?.email || order.contact === contact);
    return `
      <div class="section-head compact-head">
        <div>
          <h2>Заказы</h2>
          <p>История ваших оформлений и текущие статусы.</p>
        </div>
      </div>
      <section class="order-list">
        ${orders.length ? orders.map((order) => `
          <article class="order-card glass">
            <div class="row"><strong>#${escapeHtml(order.id)}</strong><span>${escapeHtml(order.status)}</span></div>
            <p class="muted">${new Date(order.date).toLocaleString("ru-RU")}</p>
            <p>${escapeHtml(order.city)}, ${escapeHtml(order.address)}</p>
            <strong>${money.format(order.total)}</strong>
          </article>
        `).join("") : `<div class="glass empty-state">Заказов пока нет.</div>`}
      </section>
    `;
  }

  function profileView() {
    return `
      <div class="section-head compact-head">
        <div>
          <h2>Профиль</h2>
          <p>Ваши данные для заказов.</p>
        </div>
      </div>
      <section class="checkout-panel glass">
        <div class="profile-row"><span>Имя</span><strong>${escapeHtml(user.name || "")}</strong></div>
        <div class="profile-row"><span>Телефон</span><strong>${escapeHtml(user.phone || "не указан")}</strong></div>
        <div class="profile-row"><span>E-mail</span><strong>${escapeHtml(user.email || "не указан")}</strong></div>
        <button class="btn primary" data-action="auth">Изменить профиль</button>
      </section>
    `;
  }

  function bottomNav() {
    const items = [
      ["catalog", "Каталог", "⌂"],
      ["cart", "Корзина", "🛒"],
      ["orders", "Заказы", "▣"],
      ["profile", "Профиль", "👤"]
    ];
    return `<nav class="bottom-nav">${items.map(([key, label, mark]) => `<button class="${activeView === key ? "active" : ""}" data-view="${key}"><span>${mark}</span>${label}</button>`).join("")}</nav>`;
  }

  function filteredProducts() {
    if (selectedCategory === "Все") return state.products;
    if (selectedCategory === "Мужское") return state.products.filter((p) => p.category !== "Женское");
    return state.products.filter((p) => p.category === selectedCategory);
  }

  function productCard(product) {
    const sizes = Object.entries(product.sizes || {});
    const activeSize = selectedSizes[product.id] || "";
    const stock = sizes.reduce((sum, [, count]) => sum + Number(count || 0), 0);
    return `
      <article class="product glass" data-product="${product.id}">
        <button type="button" class="product-media product-open" data-open-product="${product.id}" aria-label="Открыть товар ${escapeAttr(product.title)}">
          <img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.title)}" loading="lazy" />
          <span class="badge">${product.inStock && stock > 0 ? "В наличии" : "Нет в наличии"}</span>
        </button>
        <div class="product-body">
          <div class="row product-title-row">
            <button type="button" class="product-title-button" data-open-product="${product.id}"><h3>${escapeHtml(product.title)}</h3></button>
            <span class="price">${money.format(product.price)}</span>
          </div>
          <p class="muted">${escapeHtml(product.description)}</p>
          <div class="size-title">Размер</div>
          <div class="sizes">${sizes.map(([s, count]) => `<button class="size ${activeSize === s ? "active" : ""}" data-size="${s}" ${count < 1 ? "disabled" : ""}><strong>${s}</strong><span>${count > 0 ? `${count} шт` : "нет"}</span></button>`).join("")}</div>
          <div class="btn-row">
            <button class="btn" data-add="${product.id}">В корзину</button>
            <button class="btn primary" data-buy="${product.id}">Купить</button>
          </div>
        </div>
      </article>
    `;
  }

  function productImages(product) {
    const images = [product.image, ...(Array.isArray(product.images) ? product.images : [])].filter(Boolean);
    return [...new Set(images)];
  }

  function showProductDetail(id, countView = true) {
    const product = state.products.find((p) => p.id === id);
    if (!product) return;
    if (countView && !seenProducts.has(id)) {
      seenProducts.add(id);
      writeLocalJson(seenProductsKey, [...seenProducts]);
      product.views = Number(product.views || 0) + 1;
      track("view_product", product.title, { save: true });
    }
    const sizes = Object.entries(product.sizes || {});
    const activeSize = selectedSizes[id] || "";
    const modal = document.getElementById("modalLayer");
    modal.innerHTML = `
      <div class="modal glass product-detail-modal">
        <div class="row"><h3>${escapeHtml(product.title)}</h3><button type="button" class="btn icon-btn" data-close>${icon("close")}</button></div>
        <div class="detail-gallery">${productImages(product).map((image) => `<img src="${escapeAttr(image)}" alt="${escapeAttr(product.title)}" />`).join("")}</div>
        <div class="detail-info">
          <strong class="price">${money.format(product.price)}</strong>
          <p class="muted">${escapeHtml(product.description)}</p>
          ${product.lookItems?.length ? `<div class="look-list">${product.lookItems.map((i) => `<div class="look-item"><span>${escapeHtml(i.name)}</span><strong>${money.format(i.price)}</strong></div>`).join("")}</div>` : ""}
          <div class="size-title">Выберите размер</div>
          <div class="sizes">${sizes.map(([s, count]) => `<button class="size ${activeSize === s ? "active" : ""}" data-detail-size="${s}" ${count < 1 ? "disabled" : ""}><strong>${s}</strong><span>${count > 0 ? `${count} шт` : "нет"}</span></button>`).join("")}</div>
          <div class="btn-row">
            <button class="btn" data-detail-add="${product.id}">Добавить в корзину</button>
            <button class="btn primary" data-detail-buy="${product.id}">Купить сейчас</button>
          </div>
        </div>
      </div>`;
    modal.classList.add("open");
    modal.querySelector("[data-close]").onclick = closeModal;
    modal.querySelectorAll("[data-detail-size]").forEach((btn) => btn.addEventListener("click", () => {
      selectedSizes[id] = btn.dataset.detailSize;
      showProductDetail(id, false);
    }));
    modal.querySelector("[data-detail-add]")?.addEventListener("click", () => addToCart(id, false));
    modal.querySelector("[data-detail-buy]")?.addEventListener("click", () => addToCart(id, true));
  }

  function cartDrawer() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    return `
      <aside class="drawer glass" id="cartDrawer">
        <div class="drawer-head">
          <h3>Корзина</h3>
          <button class="btn icon-btn" data-action="cart-close">${icon("close")}</button>
        </div>
        ${cart.length ? cart.map(cartItem).join("") : `<p class="muted">Корзина пока пустая.</p>`}
        <div class="row"><span>Товары</span><strong>${money.format(subtotal)}</strong></div>
        <div class="row"><span>Доставка</span><strong>после расчета</strong></div>
        <div class="row"><span>К оплате сейчас</span><strong>${money.format(subtotal)}</strong></div>
        <button class="btn primary" data-action="checkout" ${cart.length ? "" : "disabled"}>Оформить заказ</button>
      </aside>
    `;
  }

  function cartItem(item) {
    return `
      <div class="cart-item">
        <div class="row"><strong>${escapeHtml(item.title)}</strong><span>${money.format(item.price * item.qty)}</span></div>
        <p class="muted">Размер: ${escapeHtml(item.size)}</p>
        <div class="row">
          <div class="qty">
            <button data-qty="${item.key}" data-delta="-1">${icon("minus")}</button>
            <span>${item.qty}</span>
            <button data-qty="${item.key}" data-delta="1">${icon("plus")}</button>
          </div>
          <button class="btn danger" data-remove="${item.key}">Удалить</button>
        </div>
      </div>
    `;
  }

  function modalLayer() {
    return `<div class="modal-layer" id="modalLayer"></div>`;
  }

  function bindShopEvents() {
    if (!shopDelegationReady) {
      shopDelegationReady = true;
      app.addEventListener("click", (event) => {
        const openProduct = event.target.closest("[data-open-product]");
        if (openProduct) {
          event.preventDefault();
          showProductDetail(openProduct.dataset.openProduct);
          return;
        }
      });
    }
    document.querySelectorAll("[data-scroll]").forEach((btn) => btn.addEventListener("click", () => document.getElementById(btn.dataset.scroll)?.scrollIntoView()));
    document.querySelectorAll("[data-category]").forEach((btn) => btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.category;
      track("category_filter", selectedCategory);
      renderShop();
      document.getElementById("catalog")?.scrollIntoView();
    }));
    document.querySelectorAll("[data-product]").forEach((card) => {
      const id = card.dataset.product;
      card.querySelectorAll("[data-size]").forEach((btn) => btn.addEventListener("click", () => {
        selectedSizes[id] = btn.dataset.size;
        track("size_select", `${id}: ${btn.dataset.size}`);
        renderShop();
      }));
    });
    document.querySelectorAll("[data-add]").forEach((btn) => btn.addEventListener("click", () => addToCart(btn.dataset.add, false)));
    document.querySelectorAll("[data-buy]").forEach((btn) => btn.addEventListener("click", () => addToCart(btn.dataset.buy, true)));
    document.querySelectorAll("[data-action]").forEach((el) => el.addEventListener("click", handleAction));
    document.querySelectorAll("[data-view]").forEach((btn) => btn.addEventListener("click", () => {
      activeView = btn.dataset.view;
      track("nav_view", activeView);
      renderShop();
    }));
    document.querySelectorAll("[data-auth-mode]").forEach((btn) => btn.addEventListener("click", () => {
      authMode = btn.dataset.authMode;
      track("nav_view", `auth:${authMode}`);
      renderShop();
    }));
    document.getElementById("heroAuthForm")?.addEventListener("submit", submitHeroAuth);
    document.querySelectorAll("[data-qty]").forEach((btn) => btn.addEventListener("click", () => updateQty(btn.dataset.qty, Number(btn.dataset.delta))));
    document.querySelectorAll("[data-remove]").forEach((btn) => btn.addEventListener("click", () => removeItem(btn.dataset.remove)));
  }

  function isValidPhone(value) {
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function submitHeroAuth(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const phone = form.get("phone") || "";
    const email = form.get("email") || "";
    if (authMode === "phone" && !isValidPhone(phone)) {
      toast("Введите правильный номер телефона");
      return;
    }
    if (authMode === "email" && !isValidEmail(email)) {
      toast("Введите правильный e-mail");
      return;
    }
    user = {
      id: user?.id || uid(),
      name: form.get("name"),
      phone,
      email,
      date: new Date().toISOString()
    };
    saveSavedUser();
    upsertCustomer(user);
    track("registration", user.phone || user.email);
    trackVisitOnce();
    activeView = "catalog";
    renderShop();
    toast("Готово, вы вошли в IXSAYZ SHOP");
    document.getElementById("catalog")?.scrollIntoView();
  }

  function handleAction(event) {
    const action = event.currentTarget.dataset.action;
    if (action === "auth" && !user) document.querySelector(".auth-card")?.scrollIntoView();
    if (action === "auth" && user) showAuth();
    if (action === "cart") { track("cart_open", cart.length); document.getElementById("cartDrawer").classList.add("open"); }
    if (action === "cart-close") { track("cart_close", cart.length); document.getElementById("cartDrawer").classList.remove("open"); }
    if (action === "checkout") { track("checkout_open", cart.length); showCheckout(); }
  }

  function addToCart(id, buyNow) {
    if (!user) {
      document.querySelector(".auth-card")?.scrollIntoView();
      toast("Сначала войдите через телефон или e-mail");
      return;
    }
    const product = state.products.find((p) => p.id === id);
    const size = selectedSizes[id];
    if (!size) {
      toast("Выберите размер");
      return;
    }
    if (Number(product.sizes?.[size] || 0) < 1) {
      toast("Этого размера нет в наличии");
      return;
    }
    const key = `${id}-${size}`;
    const existing = cart.find((i) => i.key === key);
    if (existing) existing.qty += 1;
    else cart.push({ key, id, title: product.title, size, price: Number(product.price), qty: 1 });
    product.added += 1;
    track("add_to_cart", product.title);
    saveDb();
    renderShop();
    document.getElementById("cartDrawer").classList.add("open");
    if (buyNow) { track("buy_now", product.title); showCheckout(); }
  }

  function updateQty(key, delta) {
    const current = cart.find((i) => i.key === key);
    if (current && delta > 0) {
      const product = state.products.find((p) => p.id === current.id);
      const available = Number(product?.sizes?.[current.size] || 0);
      if (current.qty + delta > available) {
        toast(`В наличии только ${available} шт. размера ${current.size}`);
        return;
      }
    }
    cart = cart.map((i) => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i);
    renderShop();
    document.getElementById("cartDrawer").classList.add("open");
  }

  function removeItem(key) {
    cart = cart.filter((i) => i.key !== key);
    renderShop();
    document.getElementById("cartDrawer").classList.add("open");
  }

  function showAuth() {
    const modal = document.getElementById("modalLayer");
    modal.innerHTML = `
      <form class="modal glass form" id="authForm">
        <div class="row"><h3>Профиль</h3><button type="button" class="btn icon-btn" data-close>${icon("close")}</button></div>
        <p class="muted">Демо-вход без подтверждения. Позже подключим реальную базу и проверку.</p>
        <label class="field"><span>Имя</span><input name="name" required value="${escapeAttr(user?.name || "")}" /></label>
        <label class="field"><span>Телефон</span><input name="phone" placeholder="+7 999 000-00-00" value="${escapeAttr(user?.phone || "")}" /></label>
        <label class="field"><span>Email</span><input name="email" type="email" value="${escapeAttr(user?.email || "")}" /></label>
        <button class="btn primary">Сохранить</button>
      </form>`;
    modal.classList.add("open");
    modal.querySelector("[data-close]").onclick = closeModal;
    modal.querySelector("#authForm").onsubmit = (e) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const phone = form.get("phone") || "";
      const email = form.get("email") || "";
      if (phone && !isValidPhone(phone)) {
        toast("Введите правильный номер телефона");
        return;
      }
      if (email && !isValidEmail(email)) {
        toast("Введите правильный e-mail");
        return;
      }
      user = { id: user?.id || uid(), name: form.get("name"), phone, email, date: new Date().toISOString() };
      saveSavedUser();
      upsertCustomer(user);
      track("registration", user.phone);
      closeModal();
      renderShop();
      toast("Профиль сохранен");
    };
  }

  function upsertCustomer(customer) {
    const found = state.customers.find((c) => (customer.phone && c.phone === customer.phone) || (customer.email && c.email === customer.email));
    if (found) Object.assign(found, customer);
    else state.customers.push({ ...customer, orders: 0, total: 0 });
    saveDb();
  }

  function showCheckout() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const modal = document.getElementById("modalLayer");
    modal.innerHTML = `
      <form class="modal glass form" id="checkoutForm">
        <div class="row"><h3>Оформление заказа</h3><button type="button" class="btn icon-btn" data-close>${icon("close")}</button></div>
        <div class="checkout-notice">
          <strong>ДЛЯ РАСЧЕТА ДОСТАВКИ И ОПЛАТЫ ОФОРМИТЕ ЗАКАЗ</strong>
          <span>Мы получим город, адрес и ваш мессенджер. После этого отправим ближайший удобный пункт выдачи, сумму доставки и способ оплаты: QR-код, ссылку или номер для перевода.</span>
        </div>
        <div class="split">
          <label class="field"><span>Город</span><input name="city" required /></label>
          <label class="field"><span>Адрес дома</span><input name="address" required placeholder="Улица, дом, квартира" /></label>
        </div>
        <label class="field"><span>Куда открыть сообщение</span><select name="messenger"><option>Telegram @IXSAYZ</option><option>WhatsApp +7 925 365-62-55</option></select></label>
        <label class="field"><span>Комментарий</span><textarea name="comment"></textarea></label>
        <div class="row"><span>Товары</span><strong>${money.format(subtotal)}</strong></div>
        <p class="muted">Доставка сейчас не прибавляется автоматически. Мы рассчитаем ее вручную и отправим вам в выбранный мессенджер.</p>
        <button class="btn primary">Оформить заказ</button>
      </form>`;
    modal.classList.add("open");
    modal.querySelector("[data-close]").onclick = closeModal;
    modal.querySelector("#checkoutForm").onsubmit = (e) => {
      e.preventDefault();
      const form = Object.fromEntries(new FormData(e.currentTarget).entries());
      const order = {
        id: uid(),
        customerId: user?.id,
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        contact: user?.phone || user?.email || "",
        ...form,
        items: structuredClone(cart),
        subtotal,
        delivery: "Рассчитаем и отправим в мессенджер",
        deliveryCost: 0,
        payment: "QR / ссылка / номер после подтверждения",
        total: subtotal,
        status: "Заявка",
        saleApplied: false,
        date: new Date().toISOString()
      };
      state.orders.unshift(order);
      track("lead_created", order.id);
      cart = [];
      saveDb();
      closeModal();
      activeView = "orders";
      renderShop();
      openMessengerOrder(order);
      toast("Заказ создан. Откроем мессенджер для подтверждения");
    };
  }

  function openMessengerOrder(order) {
    const items = order.items.map((item) => `${item.title} / размер ${item.size} x ${item.qty}`).join("; ");
    const message = [
      `Новая заявка IXSAYZ SHOP #${order.id}`,
      `Имя: ${order.name}`,
      `Город: ${order.city}`,
      `Адрес: ${order.address}`,
      `Контакт клиента: ${order.contact}`,
      `Товары: ${items}`,
      `Сумма товаров: ${money.format(order.subtotal)}`,
      "Нужно отправить клиенту ближайший пункт выдачи, расчет доставки и оплату: QR/ссылку/номер."
    ].join("\n");
    const wantsWhatsapp = String(order.messenger || "").toLowerCase().includes("whatsapp");
    const cleanWhatsapp = String(state.settings.whatsappOrderNumber || "79253656255").replace(/\D/g, "");
    const target = state.settings.telegramOrderUrl || `https://t.me/${state.settings.telegramOrderUsername || "IXSAYZ"}`;
    const url = wantsWhatsapp
      ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(message)}`
      : target.includes("share/url")
        ? `${target}?text=${encodeURIComponent(message)}`
        : `${target}${target.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`;
    track("messenger_open", wantsWhatsapp ? "WhatsApp" : "Telegram");
    window.open(url, "_blank");
  }

  function applyOrderSale(order) {
    if (!order || order.saleApplied) return;
    order.items.forEach((item) => {
      const product = state.products.find((p) => p.id === item.id);
      if (!product) return;
      product.bought = Number(product.bought || 0) + Number(item.qty || 0);
      product.sizes = product.sizes || {};
      product.sizes[item.size] = Math.max(0, Number(product.sizes[item.size] || 0) - Number(item.qty || 0));
      product.inStock = Object.values(product.sizes || {}).some((count) => Number(count) > 0);
    });
    const customer = state.customers.find((c) => (order.phone && c.phone === order.phone) || (order.email && c.email === order.email));
    if (customer) {
      customer.orders = Number(customer.orders || 0) + 1;
      customer.total = Number(customer.total || 0) + Number(order.total || 0);
    }
    order.saleApplied = true;
    order.soldAt = new Date().toISOString();
  }

  function reverseOrderSale(order) {
    if (!order || !order.saleApplied) return;
    order.items.forEach((item) => {
      const product = state.products.find((p) => p.id === item.id);
      if (!product) return;
      product.bought = Math.max(0, Number(product.bought || 0) - Number(item.qty || 0));
      product.sizes = product.sizes || {};
      product.sizes[item.size] = Number(product.sizes[item.size] || 0) + Number(item.qty || 0);
      product.inStock = Object.values(product.sizes || {}).some((count) => Number(count) > 0);
    });
    const customer = state.customers.find((c) => (order.phone && c.phone === order.phone) || (order.email && c.email === order.email));
    if (customer) {
      customer.orders = Math.max(0, Number(customer.orders || 0) - 1);
      customer.total = Math.max(0, Number(customer.total || 0) - Number(order.total || 0));
    }
    order.saleApplied = false;
    order.reversedAt = new Date().toISOString();
  }
  function closeModal() {
    const modal = document.getElementById("modalLayer");
    modal.classList.remove("open");
    modal.innerHTML = "";
  }

  function renderAdmin() {
    if (!adminOk) return renderAdminLogin();
    app.innerHTML = `
      <div class="admin-shell">
        <aside class="sidebar">
          <a class="logo" href="../"><span class="logo-dot"></span><span>IXSAYZ ADMIN</span></a>
          <div class="tab-list">
            ${[
              ["dashboard", "Аналитика"],
              ["products", "Товары"],
              ["orders", "Заказы"],
              ["customers", "Клиенты"],
              ["settings", "Настройки"]
            ].map(([key, label]) => `<button class="btn ${adminTab === key ? "primary" : ""}" data-tab="${key}">${label}</button>`).join("")}
            <button class="btn danger" data-admin-logout>Выйти</button>
          </div>
        </aside>
        <main class="admin-content">${adminContent()}</main>
      </div>
    `;
    bindAdminEvents();
  }

  function renderAdminLogin() {
    app.innerHTML = `
      <section class="hero">
        <div class="hero-fallback"></div>
        <form class="modal glass form" id="adminLogin">
          <h3>Вход администратора</h3>
          <p class="muted">Демо-доступ: admin / IXSAYZ2026!</p>
          <label class="field"><span>Логин</span><input name="login" required /></label>
          <label class="field"><span>Пароль</span><input name="password" type="password" required /></label>
          <button class="btn primary">Войти в /admin</button>
          <a class="btn" href="../">Вернуться в магазин</a>
        </form>
      </section>`;
    document.getElementById("adminLogin").onsubmit = (e) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      if (form.get("login") === "admin" && form.get("password") === "IXSAYZ2026!") {
        adminOk = true;
        renderAdmin();
      } else {
        toast("Неверный логин или пароль");
      }
    };
  }

  function adminContent() {
    if (adminTab === "products") return productsAdmin();
    if (adminTab === "orders") return ordersAdmin();
    if (adminTab === "customers") return customersAdmin();
    if (adminTab === "settings") return settingsAdmin();
    return dashboardAdmin();
  }

  function dashboardAdmin() {
    const registered = state.customers.length;
    const events = state.events || [];
    const sessions = state.sessions || [];
    const clicks = events.filter((e) => e.type === "add_to_cart").length;
    const views = events.filter((e) => e.type === "view_product").length;
    const paidStatuses = ["Оплачен", "Отправлен", "Завершен"];
    const sales = state.orders.filter((o) => o.saleApplied && paidStatuses.includes(o.status));
    const conversion = views ? Math.round((sales.length / views) * 100) : 0;
    const paid = sales.length;
    const revenue = sales.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const devices = [...new Set(sessions.map((item) => item.id))].length;
    const phones = sessions.filter((item) => item.device === "Телефон").length;
    const productMax = Math.max(1, ...state.products.map((p) => Math.max(p.views || 0, p.added || 0, p.bought || 0)));
    const statusCounts = statuses.map((status) => ({ status, count: state.orders.filter((o) => o.status === status).length }));
    const statusMax = Math.max(1, ...statusCounts.map((item) => item.count));
    const latestEvents = events.slice(0, 30);
    const latestSessions = sessions.slice(0, 20);
    return `
      <div class="section-head"><div><h2>Аналитика</h2><p>Все действия пишутся в Firebase и обновляются автоматически на всех устройствах.</p></div></div>
      <section class="admin-grid">
        <div class="metric glass"><span class="muted">Визиты</span><strong>${state.visits}</strong></div>
        <div class="metric glass"><span class="muted">Устройства</span><strong>${devices}</strong></div>
        <div class="metric glass"><span class="muted">Телефоны</span><strong>${phones}</strong></div>
        <div class="metric glass"><span class="muted">Регистрации</span><strong>${registered}</strong></div>
        <div class="metric glass"><span class="muted">Просмотры товаров</span><strong>${views}</strong></div>
        <div class="metric glass"><span class="muted">Клики в корзину</span><strong>${clicks}</strong></div>
        <div class="metric glass"><span class="muted">Заявки</span><strong>${state.orders.length}</strong></div>
        <div class="metric glass"><span class="muted">Конверсия</span><strong>${conversion}%</strong></div>
        <div class="metric glass"><span class="muted">Продажи</span><strong>${paid}</strong></div>
        <div class="metric glass"><span class="muted">Выручка</span><strong>${money.format(revenue)}</strong></div>
      </section>
      <div class="analytics-grid">
        <div class="admin-panel glass">
          <h3>Воронка</h3>
          <div class="funnel">
            ${[
              ["Визиты", state.visits],
              ["Просмотры", views],
              ["В корзину", clicks],
              ["Заказы", state.orders.length],
              ["Оплачено", paid]
            ].map(([label, value]) => `<div class="funnel-row"><span>${label}</span><div><i style="width:${Math.max(6, Math.round((Number(value) / Math.max(1, state.visits, views, clicks)) * 100))}%"></i></div><strong>${value}</strong></div>`).join("")}
          </div>
        </div>
        <div class="admin-panel glass">
          <h3>Статусы заказов</h3>
          <div class="bar-chart">
            ${statusCounts.map((item) => `<div class="bar"><span style="height:${Math.max(8, Math.round((item.count / statusMax) * 100))}%"></span><small>${item.status}</small><strong>${item.count}</strong></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="admin-panel glass">
        <h3>Последние действия</h3>
        <table class="table"><thead><tr><th>Время</th><th>Действие</th><th>Детали</th><th>Устройство</th><th>Клиент</th></tr></thead><tbody>
          ${latestEvents.map((event) => `<tr><td>${new Date(event.date).toLocaleString("ru-RU")}</td><td>${escapeHtml(event.label || event.type)}</td><td>${escapeHtml(event.details || "")}</td><td>${escapeHtml(event.device || "")}<br><span class="muted">${escapeHtml(event.screen || "")}</span></td><td>${escapeHtml(event.customer?.name || "")}${event.customer?.contact ? `<br><span class="muted">${escapeHtml(event.customer.contact)}</span>` : ""}</td></tr>`).join("") || `<tr><td colspan="5">Действий пока нет.</td></tr>`}
        </tbody></table>
      </div>
      <div class="admin-panel glass">
        <h3>Устройства и заходы</h3>
        <table class="table"><thead><tr><th>Последний вход</th><th>Тип</th><th>Экран</th><th>Язык</th><th>Клиент</th></tr></thead><tbody>
          ${latestSessions.map((item) => `<tr><td>${new Date(item.lastSeen || item.startedAt).toLocaleString("ru-RU")}</td><td>${escapeHtml(item.device || "")}</td><td>${escapeHtml(String(item.width || ""))}x${escapeHtml(String(item.height || ""))}</td><td>${escapeHtml(item.language || "")}</td><td>${escapeHtml(item.userName || "")}${item.contact ? `<br><span class="muted">${escapeHtml(item.contact)}</span>` : ""}</td></tr>`).join("") || `<tr><td colspan="5">Устройств пока нет.</td></tr>`}
        </tbody></table>
      </div>
      <div class="admin-panel glass">
        <h3>Популярные товары</h3>
        <div class="product-analytics">
          ${state.products.map((p) => `
            <div class="product-stat">
              <strong>${escapeHtml(p.title)}</strong>
              <div class="stat-bars">
                <span>Просмотры <i style="width:${Math.round(((p.views || 0) / productMax) * 100)}%"></i><b>${p.views || 0}</b></span>
                <span>В корзину <i style="width:${Math.round(((p.added || 0) / productMax) * 100)}%"></i><b>${p.added || 0}</b></span>
                <span>Купили <i style="width:${Math.round(((p.bought || 0) / productMax) * 100)}%"></i><b>${p.bought || 0}</b></span>
              </div>
            </div>`).join("") || `<p class="muted">Товаров пока нет.</p>`}
        </div>
      </div>
    `;
  }
  function productsAdmin() {
    return `
      <div class="section-head"><div><h2>Товары</h2><p>Фото можно вставлять URL сейчас; при Firebase фото будут уходить в Storage.</p></div></div>
      <form class="admin-panel glass form" id="productForm">
        <input type="hidden" name="id" />
        <div class="split">
          <label class="field"><span>Название</span><input name="title" required /></label>
          <label class="field"><span>Цена</span><input name="price" type="number" required /></label>
        </div>
        <div class="split">
          <label class="field"><span>Категория</span><select name="category">${categories.map((c) => `<option>${c}</option>`).join("")}</select></label>
          <label class="field"><span>Фото URL / Cloudinary URL</span><input name="image" required /></label>
        </div>
        <label class="field"><span>Загрузить фото из галереи телефона / компьютера</span><input name="imageFile" type="file" accept="image/*" /></label><p class="muted">Фото загрузится в Cloudinary и будет видно всем пользователям после сохранения товара.</p>
        <label class="field"><span>Дополнительные фото URL</span><textarea name="images" placeholder="Каждую ссылку с новой строки или через запятую"></textarea></label>
        <label class="field"><span>Загрузить несколько дополнительных фото</span><input name="imagesFiles" type="file" accept="image/*" multiple /></label>
        <label class="field"><span>Описание</span><textarea name="description" required></textarea></label>
        <div class="split">
          <label class="field"><span>Размеры и остатки</span><input name="sizes" placeholder="M:3,L:2,XL:1" required /></label>
          <label class="field"><span>Комплект образа</span><input name="lookItems" placeholder="Футболка:6900; Брюки:9800" /></label>
        </div>
        <label class="field"><span>Статус</span><select name="inStock"><option value="true">В наличии</option><option value="false">Нет в наличии</option></select></label>
        <button class="btn primary">Сохранить товар</button>
      </form>
      <div class="admin-panel glass">
        <table class="table"><thead><tr><th>Фото</th><th>Название</th><th>Категория</th><th>Цена</th><th>Размеры</th><th></th></tr></thead><tbody>
        ${state.products.map((p) => `<tr><td><img src="${escapeAttr(p.image)}" alt="" style="width:58px;height:72px;object-fit:cover;border-radius:8px"></td><td>${escapeHtml(p.title)}</td><td>${p.category}</td><td>${money.format(p.price)}</td><td>${Object.entries(p.sizes || {}).map(([s, c]) => `${s}:${c}`).join(", ")}</td><td><button class="btn" data-edit="${p.id}">Изменить</button> <button class="btn danger" data-delete="${p.id}">Удалить</button></td></tr>`).join("")}
        </tbody></table>
      </div>
    `;
  }

  function qrSvg(order) {
    const text = `IXSAYZ|${order.id}|${order.total}|${order.phone || order.email || ""}`;
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    const size = 9;
    const cell = 7;
    const dots = [];
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const finder = (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5);
        const bit = ((hash >> ((x + y * size) % 24)) ^ (x * 13 + y * 17)) & 1;
        if (finder || bit) dots.push(`<rect x="${x * cell}" y="${y * cell}" width="${cell - 1}" height="${cell - 1}" rx="1" />`);
      }
    }
    return `<svg viewBox="0 0 ${size * cell} ${size * cell}" aria-label="QR заказа ${escapeAttr(order.id)}">${dots.join("")}</svg>`;
  }

  function ordersAdmin() {
    return `
      <div class="section-head"><div><h2>Заказы</h2><p>Все новые заказы из checkout появляются здесь.</p></div></div>
      <div class="admin-panel glass">
        <table class="table"><thead><tr><th>Дата</th><th>Клиент</th><th>Товары</th><th>Сумма</th><th>QR оплата</th><th>Доставка</th><th>Адрес</th><th>Статус</th><th>Подтверждение</th></tr></thead><tbody>
        ${state.orders.map((o) => `<tr>
          <td>${new Date(o.date).toLocaleString("ru-RU")}<br><span class="muted">#${escapeHtml(o.id)}</span></td>
          <td>${escapeHtml(o.name)}<br><span class="muted">${escapeHtml(o.phone || o.email || "")}</span><br><strong>${escapeHtml(o.messenger || "")}</strong><br><span class="muted">${escapeHtml(o.contact || "")}</span></td>
          <td>${o.items.map((i) => `${escapeHtml(i.title)} / ${escapeHtml(i.size)} x ${i.qty}`).join("<br>")}</td>
          <td><strong>${money.format(o.total)}</strong><br><span class="muted">${escapeHtml(o.payment || "")}</span></td>
          <td><div class="qr-box">${qrSvg(o)}</div><span class="muted">Демо QR</span></td>
          <td>${escapeHtml(o.delivery)}</td>
          <td>${escapeHtml(o.city)}, ${escapeHtml(o.address)}</td>
          <td><select data-order="${o.id}">${statuses.map((s) => `<option ${o.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></td>
          <td>
            <div class="order-actions">
              <button class="btn" data-order-action="paid" data-order-id="${o.id}">Оплата получена</button>
              <button class="btn primary" data-order-action="done" data-order-id="${o.id}">Подтвердить</button>
            </div>
          </td>
        </tr>`).join("") || `<tr><td colspan="9">Заказов пока нет.</td></tr>`}
        </tbody></table>
      </div>
    `;
  }

  function customersAdmin() {
    return `
      <div class="section-head"><div><h2>Клиенты</h2><p>База регистраций и покупателей.</p></div></div>
      <div class="admin-panel glass">
        <table class="table"><thead><tr><th>Имя</th><th>Телефон</th><th>Email</th><th>Регистрация</th><th>Заказы</th><th>Сумма</th></tr></thead><tbody>
        ${state.customers.map((c) => `<tr><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.phone)}</td><td>${escapeHtml(c.email || "")}</td><td>${new Date(c.date).toLocaleDateString("ru-RU")}</td><td>${c.orders || 0}</td><td>${money.format(c.total || 0)}</td></tr>`).join("") || `<tr><td colspan="6">Клиентов пока нет.</td></tr>`}
        </tbody></table>
      </div>
    `;
  }

  function settingsAdmin() {
    return `
      <div class="section-head"><div><h2>Настройки сайта</h2><p>Меняют логотип, видео-фон, контакты, соцсети и доставку на витрине.</p></div></div>
      <form class="admin-panel glass form" id="settingsForm">
        <div class="split">
          <label class="field"><span>Название сайта</span><input name="siteName" value="${escapeAttr(state.settings.siteName)}" /></label>
          <label class="field"><span>Логотип</span><input name="logo" value="${escapeAttr(state.settings.logo)}" /></label>
        </div>
        <label class="field"><span>Описание</span><textarea name="description">${escapeHtml(state.settings.description)}</textarea></label>
        <label class="field"><span>Видео-фон URL</span><input name="videoUrl" value="${escapeAttr(state.settings.videoUrl)}" /></label>
        <label class="field"><span>Фото-фон URL</span><input name="backgroundImage" value="${escapeAttr(state.settings.backgroundImage)}" /></label>
        <div class="split">
          <label class="field"><span>Контакты</span><input name="contacts" value="${escapeAttr(state.settings.contacts)}" /></label>
          <label class="field"><span>Цена доставки</span><input name="deliveryPrice" type="number" value="${escapeAttr(state.settings.deliveryPrice)}" /></label>
        </div>
        <div class="split">
          <label class="field"><span>Instagram</span><input name="instagram" value="${escapeAttr(state.settings.instagram)}" /></label>
          <label class="field"><span>Telegram</span><input name="telegram" value="${escapeAttr(state.settings.telegram)}" /></label>
        </div>
        <label class="field"><span>Telegram для заказов</span><input name="telegramOrderUrl" value="${escapeAttr(state.settings.telegramOrderUrl)}" /></label>
        <label class="field"><span>Telegram username</span><input name="telegramOrderUsername" value="${escapeAttr(state.settings.telegramOrderUsername)}" /></label>
        <label class="field"><span>WhatsApp номер заказов</span><input name="whatsappOrderNumber" value="${escapeAttr(state.settings.whatsappOrderNumber)}" /></label>
        <label class="field"><span>WhatsApp</span><input name="whatsapp" value="${escapeAttr(state.settings.whatsapp)}" /></label>
        <label class="field"><span>Cloudinary cloud name</span><input name="cloudinaryCloudName" value="${escapeAttr(state.settings.cloudinaryCloudName)}" placeholder="например: dx123abc" /></label>
        <label class="field"><span>Cloudinary unsigned upload preset</span><input name="cloudinaryUploadPreset" value="${escapeAttr(state.settings.cloudinaryUploadPreset)}" placeholder="например: ixsayz_unsigned" /></label>
        <div class="banner-admin">
          <h3>Рекламные баннеры</h3>
          <p class="muted">До 5 баннеров. Фото можно вставить ссылкой или загрузить через Cloudinary.</p>
          ${normalizeBanners(state.settings.banners).slice(0, 5).map((banner, index) => `
            <div class="banner-form glass">
              <strong>Баннер ${index + 1}</strong>
              <label class="field"><span>Заголовок</span><input name="bannerTitle${index}" value="${escapeAttr(banner.title)}" /></label>
              <label class="field"><span>Текст</span><input name="bannerText${index}" value="${escapeAttr(banner.text)}" /></label>
              <label class="field"><span>Картинка URL / Cloudinary URL</span><input name="bannerImage${index}" value="${escapeAttr(banner.image)}" /></label>
              <label class="field"><span>Загрузить картинку</span><input name="bannerFile${index}" type="file" accept="image/*" data-banner-file="${index}" /></label>
            </div>
          `).join("")}
          ${Array.from({ length: Math.max(0, 5 - normalizeBanners(state.settings.banners).length) }, (_, emptyIndex) => {
            const index = normalizeBanners(state.settings.banners).length + emptyIndex;
            return `
              <div class="banner-form glass">
                <strong>Баннер ${index + 1}</strong>
                <label class="field"><span>Заголовок</span><input name="bannerTitle${index}" /></label>
                <label class="field"><span>Текст</span><input name="bannerText${index}" /></label>
                <label class="field"><span>Картинка URL / Cloudinary URL</span><input name="bannerImage${index}" /></label>
                <label class="field"><span>Загрузить картинку</span><input name="bannerFile${index}" type="file" accept="image/*" data-banner-file="${index}" /></label>
              </div>`;
          }).join("")}
        </div>
        <button class="btn primary">Сохранить настройки</button>
      </form>
    `;
  }

  function bindAdminEvents() {
    document.querySelectorAll("[data-tab]").forEach((btn) => btn.addEventListener("click", () => {
      adminTab = btn.dataset.tab;
      renderAdmin();
    }));
    document.querySelector("[data-admin-logout]")?.addEventListener("click", () => {
      adminOk = false;
      clearAdminSession();
      renderAdmin();
    });
    document.querySelector("#productForm")?.addEventListener("submit", saveProduct);
    document.querySelector("#productForm input[name='imageFile']")?.addEventListener("change", previewProductImage);
    document.querySelector("#productForm input[name='imagesFiles']")?.addEventListener("change", previewProductImages);
    document.querySelectorAll("[data-banner-file]").forEach((input) => input.addEventListener("change", uploadBannerImage));
    document.querySelectorAll("[data-edit]").forEach((btn) => btn.addEventListener("click", () => fillProduct(btn.dataset.edit)));
    document.querySelectorAll("[data-delete]").forEach((btn) => btn.addEventListener("click", async () => {
      state.products = state.products.filter((p) => p.id !== btn.dataset.delete);
      await saveDbNow();
      renderAdmin();
    }));
    document.querySelectorAll("[data-order]").forEach((select) => select.addEventListener("change", () => {
      const order = state.orders.find((o) => o.id === select.dataset.order);
      if (!order) return;
      if (["Оплачен", "Отправлен", "Завершен"].includes(select.value)) applyOrderSale(order);
      else reverseOrderSale(order);
      order.status = select.value;
      order.statusUpdatedAt = new Date().toISOString();
      saveDb();
      toast("Статус заказа обновлен");
      renderAdmin();
    }));
    document.querySelectorAll("[data-order-action]").forEach((button) => button.addEventListener("click", () => {
      const order = state.orders.find((o) => o.id === button.dataset.orderId);
      if (!order) return;
      applyOrderSale(order);
      order.status = button.dataset.orderAction === "paid" ? "Оплачен" : "Завершен";
      order.confirmedAt = new Date().toISOString();
      saveDb();
      toast(button.dataset.orderAction === "paid" ? "Оплата подтверждена" : "Заказ подтвержден");
      renderAdmin();
    }));
    document.querySelector("#settingsForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const banners = Array.from({ length: 5 }, (_, index) => ({
        title: data[`bannerTitle${index}`] || "",
        text: data[`bannerText${index}`] || "",
        image: data[`bannerImage${index}`] || ""
      })).filter((banner) => banner.title || banner.text || banner.image);
      Object.keys(data).forEach((key) => {
        if (key.startsWith("bannerTitle") || key.startsWith("bannerText") || key.startsWith("bannerImage") || key.startsWith("bannerFile")) delete data[key];
      });
      state.settings = { ...state.settings, ...data, banners: normalizeBanners(banners) };
      state.settings.deliveryPrice = Number(state.settings.deliveryPrice || 0);
      await saveDbNow();
      toast("Настройки сохранены");
      renderAdmin();
    });
  }

  async function uploadBannerImage(e) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const index = e.currentTarget.dataset.bannerFile;
    const imageInput = document.querySelector(`#settingsForm input[name='bannerImage${index}']`);
    const cloudName = String(state.settings.cloudinaryCloudName || "").trim();
    const uploadPreset = String(state.settings.cloudinaryUploadPreset || "").trim();
    if (!cloudName || !uploadPreset) {
      toast("Сначала укажите Cloudinary cloud name и preset");
      return;
    }
    try {
      toast("Загружаем баннер в Cloudinary...");
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", uploadPreset);
      form.append("folder", "ixsayz-shop/banners");
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: form
      });
      if (!response.ok) throw new Error("Cloudinary upload failed");
      const data = await response.json();
      imageInput.value = data.secure_url;
      toast("Баннер загружен в Cloudinary");
    } catch (error) {
      console.error(error);
      toast("Cloudinary не принял баннер. Проверьте preset");
    }
  }

  async function previewProductImage(e) {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const imageInput = document.querySelector("#productForm input[name='image']");
    const cloudName = String(state.settings.cloudinaryCloudName || "").trim();
    const uploadPreset = String(state.settings.cloudinaryUploadPreset || "").trim();

    if (cloudName && uploadPreset) {
      try {
        toast("Загружаем фото в облако...");
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", uploadPreset);
        form.append("folder", "ixsayz-shop");
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: form
        });
        if (!response.ok) throw new Error("Cloudinary upload failed");
        const data = await response.json();
        imageInput.value = data.secure_url;
        toast("Фото загружено в Cloudinary");
        return;
      } catch (error) {
        toast("Cloudinary не принял фото. Проверьте cloud name и preset");
        return;
      }
    }

    if (hasFirebaseConfig) {
      toast("Для общего сайта нужно настроить Cloudinary");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      imageInput.value = reader.result;
      toast("Фото добавлено в демо-режиме");
    };
    reader.readAsDataURL(file);
  }

  async function previewProductImages(e) {
    const files = [...(e.currentTarget.files || [])];
    if (!files.length) return;
    const imagesInput = document.querySelector("#productForm textarea[name='images']");
    const cloudName = String(state.settings.cloudinaryCloudName || "").trim();
    const uploadPreset = String(state.settings.cloudinaryUploadPreset || "").trim();
    if (!cloudName || !uploadPreset) {
      toast("Для нескольких фото сначала настройте Cloudinary");
      return;
    }
    try {
      toast("Загружаем дополнительные фото...");
      const urls = [];
      for (const file of files.slice(0, 8)) {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", uploadPreset);
        form.append("folder", "ixsayz-shop/products");
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: form
        });
        if (!response.ok) throw new Error("Cloudinary upload failed");
        const data = await response.json();
        urls.push(data.secure_url);
      }
      const existing = parseImages(imagesInput.value);
      imagesInput.value = [...new Set([...existing, ...urls])].join("\n");
      toast("Дополнительные фото загружены");
    } catch (error) {
      console.error(error);
      toast("Cloudinary не принял дополнительные фото");
    }
  }

  async function saveProduct(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const existing = state.products.find((p) => p.id === data.id);
    const product = {
      id: data.id || uid(),
      title: data.title,
      category: data.category,
      price: Number(data.price),
      image: data.image,
      images: parseImages(data.images),
      description: data.description,
      sizes: parseSizes(data.sizes),
      lookItems: parseLookItems(data.lookItems),
      inStock: data.inStock === "true",
      views: Number(existing?.views || 0),
      added: Number(existing?.added || 0),
      bought: Number(existing?.bought || 0)
    };
    const index = state.products.findIndex((p) => p.id === product.id);
    if (index >= 0) state.products[index] = { ...state.products[index], ...product };
    else state.products.unshift(product);
    await saveDbNow();
    toast("Товар сохранен");
    renderAdmin();
  }

  function fillProduct(id) {
    const p = state.products.find((item) => item.id === id);
    const form = document.getElementById("productForm");
    form.elements.id.value = p.id;
    form.elements.title.value = p.title;
    form.elements.price.value = p.price;
    form.elements.category.value = p.category;
    form.elements.image.value = p.image;
    form.elements.images.value = productImages(p).filter((image) => image !== p.image).join("\n");
    form.elements.description.value = p.description;
    form.elements.sizes.value = Object.entries(p.sizes || {}).map(([s, c]) => `${s}:${c}`).join(",");
    form.elements.lookItems.value = (p.lookItems || []).map((i) => `${i.name}:${i.price}`).join("; ");
    form.elements.inStock.value = String(p.inStock);
    form.scrollIntoView({ behavior: "smooth" });
  }

  function parseSizes(value) {
    return String(value).split(",").reduce((acc, part) => {
      const [size, count] = part.split(":").map((x) => x.trim());
      if (size) acc[size] = Number(count || 0);
      return acc;
    }, {});
  }

  function parseImages(value) {
    return String(value || "")
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 12);
  }

  function parseLookItems(value) {
    return String(value || "").split(";").map((part) => {
      const [name, price] = part.split(":").map((x) => x.trim());
      return name ? { name, price: Number(price || 0) } : null;
    }).filter(Boolean);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  if (hasFirebaseConfig) {
    app.innerHTML = `<section class="silent-loader"></section>`;
    startFirebaseSync();
  } else {
    app.innerHTML = `<section class="silent-loader"></section>`;
  }
}());











