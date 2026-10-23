/**
 * StockWise – Professional Supply Chain & Inventory Management Calculators
 * Mobile App Look, Multi-Currency, Multi-Language, Smart Install Detection
 * Pure Client-Side JavaScript (script.js)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Currencies Configuration (24 Global & Regional Currencies)
     ========================================================================== */
  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', name: 'USD ($) · US Dollar' },
    PKR: { code: 'PKR', symbol: '₨', name: 'PKR (₨) · Pakistani Rupee' },
    INR: { code: 'INR', symbol: '₹', name: 'INR (₹) · Indian Rupee' },
    EUR: { code: 'EUR', symbol: '€', name: 'EUR (€) · Euro' },
    GBP: { code: 'GBP', symbol: '£', name: 'GBP (£) · British Pound' },
    AED: { code: 'AED', symbol: 'د.إ', name: 'AED (د.إ) · UAE Dirham' },
    SAR: { code: 'SAR', symbol: 'ر.س', name: 'SAR (ر.س) · Saudi Riyal' },
    CAD: { code: 'CAD', symbol: 'C$', name: 'CAD (C$) · Canadian Dollar' },
    AUD: { code: 'AUD', symbol: 'A$', name: 'AUD (A$) · Australian Dollar' },
    JPY: { code: 'JPY', symbol: '¥', name: 'JPY (¥) · Japanese Yen' },
    CNY: { code: 'CNY', symbol: '¥', name: 'CNY (¥) · Chinese Yuan' },
    BDT: { code: 'BDT', symbol: '৳', name: 'BDT (৳) · Bangladeshi Taka' },
    BRL: { code: 'BRL', symbol: 'R$', name: 'BRL (R$) · Brazilian Real' },
    TRY: { code: 'TRY', symbol: '₺', name: 'TRY (₺) · Turkish Lira' },
    MYR: { code: 'MYR', symbol: 'RM', name: 'MYR (RM) · Malaysian Ringgit' },
    IDR: { code: 'IDR', symbol: 'Rp', name: 'IDR (Rp) · Indonesian Rupiah' },
    NGN: { code: 'NGN', symbol: '₦', name: 'NGN (₦) · Nigerian Naira' },
    ZAR: { code: 'ZAR', symbol: 'R', name: 'ZAR (R) · South African Rand' },
    PHP: { code: 'PHP', symbol: '₱', name: 'PHP (₱) · Philippine Peso' },
    EGP: { code: 'EGP', symbol: 'E£', name: 'EGP (E£) · Egyptian Pound' },
    KWD: { code: 'KWD', symbol: 'KD', name: 'KWD (KD) · Kuwaiti Dinar' },
    QAR: { code: 'QAR', symbol: 'QR', name: 'QAR (QR) · Qatari Riyal' },
    SGD: { code: 'SGD', symbol: 'S$', name: 'SGD (S$) · Singapore Dollar' },
    CHF: { code: 'CHF', symbol: 'CHF', name: 'CHF · Swiss Franc' }
  };

  let currentCurrency = localStorage.getItem('stockwise_currency') || 'USD';
  if (!CURRENCIES[currentCurrency]) currentCurrency = 'USD';

  function formatMoney(amount, currencyCode) {
    const code = currencyCode || currentCurrency;
    const curr = CURRENCIES[code] || CURRENCIES.USD;
    const isZeroDec = code === 'JPY' || code === 'IDR';
    const num = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: isZeroDec ? 0 : 2,
      maximumFractionDigits: isZeroDec ? 0 : 2
    }).format(amount);
    return `${curr.symbol} ${num}`;
  }

  function getCurrencySymbol() {
    return (CURRENCIES[currentCurrency] || CURRENCIES.USD).symbol;
  }

  /* ==========================================================================
     2. Multi-Language System (English, Urdu, Hindi, Arabic, Spanish, French, German, Chinese)
     ========================================================================== */
  const LANGUAGES = {
    en: { name: 'English', dir: 'ltr' },
    ur: { name: 'اردو (Urdu)', dir: 'rtl' },
    hi: { name: 'हिंदी (Hindi)', dir: 'ltr' },
    ar: { name: 'العربية (Arabic)', dir: 'rtl' },
    es: { name: 'Español', dir: 'ltr' },
    fr: { name: 'Français', dir: 'ltr' },
    de: { name: 'Deutsch', dir: 'ltr' },
    zh: { name: '中文 (Chinese)', dir: 'ltr' }
  };

  let currentLang = localStorage.getItem('stockwise_lang') || 'en';
  if (!LANGUAGES[currentLang]) currentLang = 'en';

  const TRANSLATIONS = {
    en: {
      navHome: 'Home',
      navEOQ: 'EOQ Calculator',
      navROP: 'Reorder Point',
      navSS: 'Safety Stock',
      navIT: 'Inventory Turnover',
      installBtn: 'Install App',
      installBannerTitle: 'Install StockWise Mobile App',
      installBannerDesc: 'Add to your home screen for one-tap offline access like a native app.',
      installBannerAction: 'Install Now',
      appLauncherTitle: 'Calculator Apps',
      appLauncherSubtitle: 'Tap any calculator icon below to launch and calculate',
      tileCalculate: 'Calculate',
      heroKicker: 'Supply Chain & Inventory Operations Suite',
      heroTitle: 'Precision Inventory Calculators for Smarter Stock Decisions',
      heroLead: 'Free, instant supply chain calculators to balance order quantities, prevent stockouts, and boost inventory turnover. Select any tool below for instant results.',
      heroBadgeFree: '100% Free Utility',
      heroBadgeOffline: 'Works Offline (PWA)',
      heroBadgeNoPaywall: 'No Login Required',
      quickRefTitle: 'Standard Supply Chain Formulas',
      cardsHeading: 'Inventory & Replenishment Calculators',
      cardsSubheading: 'Click any calculator to enter your numbers and view solved examples',
      calcButton: 'Calculate',
      resetButton: 'Reset',
      loadSample: 'Load Sample Numbers',
      resultsTitle: 'Calculation Results',
      disclaimer: 'For estimation purposes only — consult your supply chain team for critical business decisions',
      copyright: '© 2026 StockWise. All rights reserved.',
      dockHome: 'Home',
      dockEOQ: 'EOQ',
      dockROP: 'Reorder',
      dockSS: 'Safety',
      dockIT: 'Turnover'
    },
    ur: {
      navHome: 'ہوم',
      navEOQ: 'ای او کیو کیلکولیٹر',
      navROP: 'ری آرڈر پوائنٹ',
      navSS: 'سیفٹی اسٹاک',
      navIT: 'انوینٹری ٹرن اوور',
      installBtn: 'ایپ انسٹال کریں',
      installBannerTitle: 'سٹاک وائز موبائل ایپ انسٹال کریں',
      installBannerDesc: 'موبائل ہوم اسکرین پر شامل کریں تاکہ بغیر انٹرنیٹ بھی کام کرے۔',
      installBannerAction: 'ابھی انسٹال کریں',
      appLauncherTitle: 'کیلکولیٹر ایپس',
      appLauncherSubtitle: 'حساب لگانے کے لیے نیچے کسی بھی کیلکولیٹر آئیکن پر کلک کریں',
      tileCalculate: 'حساب لگائیں',
      heroKicker: 'سپلائی چین اور انوینٹری مینجمنٹ ٹولز',
      heroTitle: 'انوینٹری کے بہترین فیصلوں کے لیے جدید کیلکولیٹرز',
      heroLead: 'آرڈر کی لاگت متوازن کرنے، اسٹاک ختم ہونے سے بچانے اور انوینٹری کی رفتار بڑھانے کے لیے مفت کیلکولیٹرز۔ فوری نتائج کے لیے نیچے ٹول منتخب کریں۔',
      heroBadgeFree: '100% مفت ٹول',
      heroBadgeOffline: 'آف لائن کام کرتا ہے',
      heroBadgeNoPaywall: 'لاگ اِن کی ضرورت نہیں',
      quickRefTitle: 'اہم سپلائی چین فارمولے',
      cardsHeading: 'انوینٹری کیلکولیٹرز',
      cardsSubheading: 'اپنے اعداد درج کرنے کے لیے کسی بھی کیلکولیٹر پر کلک کریں',
      calcButton: 'حساب لگائیں',
      resetButton: 'دوبارہ ترتیب دیں',
      loadSample: 'مثال کے اعداد بھریں',
      resultsTitle: 'حساب کے نتائج',
      disclaimer: 'صرف تخمینے کے لیے ہے — اہم کاروباری فیصلوں کے لیے اپنی سپلائی چین ٹیم سے مشورہ کریں۔',
      copyright: '© 2026 StockWise. جملہ حقوق محفوظ ہیں۔',
      dockHome: 'ہوم',
      dockEOQ: 'ای او کیو',
      dockROP: 'ری آرڈر',
      dockSS: 'سیفٹی',
      dockIT: 'ٹرن اوور'
    },
    hi: {
      navHome: 'होम',
      navEOQ: 'EOQ कैलकुलेटर',
      navROP: 'रीऑर्डर पॉइंट',
      navSS: 'सेफ्टी स्टॉक',
      navIT: 'इन्वेंट्री टर्नओवर',
      installBtn: 'ऐप इंस्टॉल करें',
      installBannerTitle: 'StockWise मोबाइल ऐप इंस्टॉल करें',
      installBannerDesc: 'बिना इंटरनेट के उपयोग के लिए अपने मोबाइल होम स्क्रीन पर जोड़ें।',
      installBannerAction: 'अभी इंस्टॉल करें',
      appLauncherTitle: 'कैलकुलेटर ऐप्स',
      appLauncherSubtitle: 'गणना करने के लिए नीचे किसी भी कैलकुलेटर आइकन पर क्लिक करें',
      tileCalculate: 'गणना करें',
      heroKicker: 'सप्लाई चेन एवं इन्वेंट्री प्रबंधन टूल',
      heroTitle: 'स्मार्ट इन्वेंट्री निर्णयों के लिए सटीक कैलकुलेटर',
      heroLead: 'ऑर्डर लागत को संतुलित करने और स्टॉक की कमी को रोकने के लिए मुफ्त कैलकुलेटर। तुरंत परिणाम देखने के लिए नीचे दिए गए टूल चुनें।',
      heroBadgeFree: '100% मुफ्त टूल',
      heroBadgeOffline: 'ऑफ़लाइन काम करता है',
      heroBadgeNoPaywall: 'लॉगिन की आवश्यकता नहीं',
      quickRefTitle: 'मानक सप्लाई चेन सूत्र',
      cardsHeading: 'इन्वेंट्री कैलकुलेटर',
      cardsSubheading: 'अपने नंबर दर्ज करने के लिए किसी भी कैलकुलेटर पर क्लिक करें',
      calcButton: 'गणना करें',
      resetButton: 'रीसेट करें',
      loadSample: 'नमूना संख्या भरें',
      resultsTitle: 'गणना परिणाम',
      disclaimer: 'केवल अनुमान उद्देश्यों के लिए — महत्वपूर्ण व्यावसायिक निर्णयों के लिए अपनी टीम से परामर्श लें।',
      copyright: '© 2026 StockWise. सर्वाधिकार सुरक्षित।',
      dockHome: 'होम',
      dockEOQ: 'EOQ',
      dockROP: 'रीऑर्डर',
      dockSS: 'सेफ्टी',
      dockIT: 'टर्नओवर'
    },
    ar: {
      navHome: 'الرئيسية',
      navEOQ: 'حاسبة EOQ',
      navROP: 'نقطة إعادة الطلب',
      navSS: 'مخزون الأمان',
      navIT: 'معدل دوران المخزون',
      installBtn: 'تثبيت التطبيق',
      installBannerTitle: 'تثبيت تطبيق StockWise للجوّال',
      installBannerDesc: 'أضفه إلى شاشتك الرئيسية للوصول السريع بدون إنترنت كتطبيق حقيقي.',
      installBannerAction: 'تثبيت الآن',
      appLauncherTitle: 'تطبيقات الحاسبة',
      appLauncherSubtitle: 'انقر على أي أيقونة للبدء في الحساب فوراً',
      tileCalculate: 'احسب الآن',
      heroKicker: 'أدوات إدارة سلاسل الإمداد والمخزون',
      heroTitle: 'حاسبات دقيقة لإدارة المخزون بذكاء وكفاءة',
      heroLead: 'أدوات مجانية وسريعة لحساب الكميات الاقتصادية ونقاط الطلب وتجنب نفاد المخزون. اختر الأداة أدناه.',
      heroBadgeFree: 'أداة مجانية 100%',
      heroBadgeOffline: 'يعمل بدون إنترنت',
      heroBadgeNoPaywall: 'لا يتطلب تسجيل الدخول',
      quickRefTitle: 'معادلات سلاسل الإمداد',
      cardsHeading: 'حاسبات المخزون والتوريد',
      cardsSubheading: 'انقر على أي حاسبة لإدخال الأرقام وعرض النتائج',
      calcButton: 'احسب الآن',
      resetButton: 'إعادة ضبط',
      loadSample: 'تحميل نموذج تجريبي',
      resultsTitle: 'نتائج الحساب',
      disclaimer: 'لأغراض التقدير فقط — استشر فريق سلاسل الإمداد للقرارات التجارية الهامة.',
      copyright: '© 2026 StockWise. جميع الحقوق محفوظة.',
      dockHome: 'الرئيسية',
      dockEOQ: 'EOQ',
      dockROP: 'إعادة الطلب',
      dockSS: 'الأمان',
      dockIT: 'الدوران'
    },
    es: {
      navHome: 'Inicio',
      navEOQ: 'Calculadora EOQ',
      navROP: 'Punto de Reorden',
      navSS: 'Stock de Seguridad',
      navIT: 'Rotación de Inventario',
      installBtn: 'Instalar App',
      installBannerTitle: 'Instalar App Móvil StockWise',
      installBannerDesc: 'Agrega a la pantalla de inicio para acceso sin conexión como app nativa.',
      installBannerAction: 'Instalar Ahora',
      appLauncherTitle: 'Calculadoras Rápidas',
      appLauncherSubtitle: 'Toca cualquier icono para abrir y calcular al instante',
      tileCalculate: 'Calcular',
      heroKicker: 'Herramientas de Cadena de Suministro',
      heroTitle: 'Calculadoras de Inventario para Decisiones Inteligentes',
      heroLead: 'Calculadoras gratuitas para optimizar pedidos, evitar desabastecimientos y mejorar la rotación de capital.',
      heroBadgeFree: '100% Gratuito',
      heroBadgeOffline: 'Funciona Sin Conexión',
      heroBadgeNoPaywall: 'Sin Registro',
      quickRefTitle: 'Fórmulas de Cadena de Suministro',
      cardsHeading: 'Calculadoras de Inventario',
      cardsSubheading: 'Selecciona una calculadora para ingresar datos y ver ejemplos resueltos',
      calcButton: 'Calcular',
      resetButton: 'Restablecer',
      loadSample: 'Cargar Ejemplo',
      resultsTitle: 'Resultados del Cálculo',
      disclaimer: 'Solo para fines de estimación — consulte con su equipo para decisiones críticas.',
      copyright: '© 2026 StockWise. Todos los derechos reservados.',
      dockHome: 'Inicio',
      dockEOQ: 'EOQ',
      dockROP: 'Reorden',
      dockSS: 'Seguridad',
      dockIT: 'Rotación'
    },
    fr: {
      navHome: 'Accueil',
      navEOQ: 'Calculateur EOQ',
      navROP: 'Point de Commande',
      navSS: 'Stock de Sécurité',
      navIT: 'Rotation des Stocks',
      installBtn: 'Installer l\'App',
      installBannerTitle: 'Installer l\'Appli Mobile StockWise',
      installBannerDesc: 'Ajoutez à l\'écran d\'accueil pour un accès hors ligne comme une application native.',
      installBannerAction: 'Installer',
      appLauncherTitle: 'Applications de Calcul',
      appLauncherSubtitle: 'Appuyez sur une icône pour lancer le calcul instantané',
      tileCalculate: 'Calculer',
      heroKicker: 'Gestion de la Chaîne d\'Approvisionnement',
      heroTitle: 'Calculateurs de Stock Précis pour Décisions Éclairées',
      heroLead: 'Calculateurs gratuits pour équilibrer vos commandes, éviter les ruptures et maximiser la rotation des stocks.',
      heroBadgeFree: '100% Gratuit',
      heroBadgeOffline: 'Fonctionne Hors Ligne',
      heroBadgeNoPaywall: 'Aucune Inscription',
      quickRefTitle: 'Formules Logistiques',
      cardsHeading: 'Calculateurs d\'Inventaire',
      cardsSubheading: 'Sélectionnez un outil pour entrer vos chiffres et voir la solution',
      calcButton: 'Calculer',
      resetButton: 'Réinitialiser',
      loadSample: 'Charger Exemple',
      resultsTitle: 'Résultats du Calcul',
      disclaimer: 'À des fins d\'estimation uniquement — consultez votre équipe logistique.',
      copyright: '© 2026 StockWise. Tous droits réservés.',
      dockHome: 'Accueil',
      dockEOQ: 'EOQ',
      dockROP: 'Commande',
      dockSS: 'Sécurité',
      dockIT: 'Rotation'
    },
    de: {
      navHome: 'Startseite',
      navEOQ: 'EOQ-Rechner',
      navROP: 'Meldebestand-Rechner',
      navSS: 'Sicherheitsbestand',
      navIT: 'Lagerumschlagshäufigkeit',
      installBtn: 'App installieren',
      installBannerTitle: 'StockWise Mobile App installieren',
      installBannerDesc: 'Zum Startbildschirm hinzufügen für Offline-Nutzung wie eine echte App.',
      installBannerAction: 'Jetzt installieren',
      appLauncherTitle: 'Rechner-Apps',
      appLauncherSubtitle: 'Tippen Sie auf ein Icon, um sofort zu berechnen',
      tileCalculate: 'Berechnen',
      heroKicker: 'Supply-Chain & Bestandsmanagement',
      heroTitle: 'Präzisionsrechner für wirtschaftliche Bestandsentscheidungen',
      heroLead: 'Kostenlose Tools zur Optimierung von Bestellmengen, Vermeidung von Lieferengpässen und Erhöhung des Umschlagstempos.',
      heroBadgeFree: '100% Kostenlos',
      heroBadgeOffline: 'Funktioniert Offline',
      heroBadgeNoPaywall: 'Ohne Anmeldung',
      quickRefTitle: 'Standard-Logistikformeln',
      cardsHeading: 'Bestandsrechner',
      cardsSubheading: 'Wählen Sie einen Rechner aus, um Zahlen einzugeben',
      calcButton: 'Berechnen',
      resetButton: 'Zurücksetzen',
      loadSample: 'Beispiel laden',
      resultsTitle: 'Berechnungsergebnisse',
      disclaimer: 'Nur zur Schätzung — wenden Sie sich für wichtige Entscheidungen an Ihr Team.',
      copyright: '© 2026 StockWise. Alle Rechte vorbehalten.',
      dockHome: 'Start',
      dockEOQ: 'EOQ',
      dockROP: 'Meldebestand',
      dockSS: 'Sicherheit',
      dockIT: 'Umschlag'
    },
    zh: {
      navHome: '首页',
      navEOQ: 'EOQ 经济订货量计算器',
      navROP: '再订货点计算器',
      navSS: '安全库存计算器',
      navIT: '库存周转率计算器',
      installBtn: '安装应用程序',
      installBannerTitle: '安装 StockWise 手机应用程序',
      installBannerDesc: '添加到手机主屏幕，像原生应用一样离线随时使用。',
      installBannerAction: '立即安装',
      appLauncherTitle: '计算器应用图标',
      appLauncherSubtitle: '点击下方任意应用图标直接开始计算',
      tileCalculate: '开始计算',
      heroKicker: '供应链与库存运营工具箱',
      heroTitle: '精准库存计算器 助力智慧运营决策',
      heroLead: '完全免费的专业供应链计算器，平衡订货成本与仓储费用，预防缺货断货，提升流动资金效率。',
      heroBadgeFree: '100% 免费工具',
      heroBadgeOffline: '离线可用 (PWA)',
      heroBadgeNoPaywall: '无需注册登录',
      quickRefTitle: '经典供应链计算公式',
      cardsHeading: '库存与补货计算工具',
      cardsSubheading: '点击下方任一计算器即可输入数据并查看步骤解析',
      calcButton: '计算结果',
      resetButton: '重置数据',
      loadSample: '填充示例数值',
      resultsTitle: '计算结果明细',
      disclaimer: '仅供测算参考 — 关键业务决策请咨询您的供应链专业团队。',
      copyright: '© 2026 StockWise. 保留所有权利。',
      dockHome: '首页',
      dockEOQ: 'EOQ',
      dockROP: '再订货',
      dockSS: '安全库存',
      dockIT: '周转率'
    }
  };

  function applyLanguage(langCode) {
    currentLang = LANGUAGES[langCode] ? langCode : 'en';
    localStorage.setItem('stockwise_lang', currentLang);

    // Apply RTL/LTR
    const dir = LANGUAGES[currentLang].dir || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;

    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

    // Apply to elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // Update select dropdowns
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = currentLang;
    const mobileLangSelect = document.getElementById('mobile-lang-select');
    if (mobileLangSelect) mobileLangSelect.value = currentLang;

    // Re-run calculations to refresh interpretations
    runAllCalculations();
  }

  function updateCurrencyUI() {
    const symbol = getCurrencySymbol();
    // Update currency prefixes
    document.querySelectorAll('.currency-prefix-symbol').forEach((el) => {
      el.textContent = symbol;
    });

    // Update currency dropdowns
    const currSelect = document.getElementById('currency-select');
    if (currSelect) currSelect.value = currentCurrency;
    const mobileCurrSelect = document.getElementById('mobile-currency-select');
    if (mobileCurrSelect) mobileCurrSelect.value = currentCurrency;

    // Recalculate
    runAllCalculations();
  }

  function setCurrency(code) {
    if (CURRENCIES[code]) {
      currentCurrency = code;
      localStorage.setItem('stockwise_currency', code);
      updateCurrencyUI();
    }
  }

  /* ==========================================================================
     3. Smart Install Detection (Automatic Detection of PWA Installation)
     ========================================================================== */
  function isAppInstalled() {
    // 1. Check standalone display mode (Chromium / iOS)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://') ||
      localStorage.getItem('stockwise_installed') === 'true';

    return isStandalone;
  }

  function applyInstallState() {
    const installed = isAppInstalled();
    const installBtn = document.getElementById('pwa-install-btn');
    const mobileInstallBtn = document.getElementById('mobile-install-btn');
    const installBanner = document.getElementById('install-app-banner');

    if (installed) {
      // Completely HIDE all install options if app is already installed!
      if (installBtn) installBtn.classList.add('is-installed-hidden');
      if (mobileInstallBtn) mobileInstallBtn.classList.add('is-installed-hidden');
      if (installBanner) installBanner.classList.add('is-installed-hidden');
    } else {
      // Show install options if NOT installed
      const dismissed = sessionStorage.getItem('stockwise_banner_dismissed') === 'true';
      if (installBtn) installBtn.classList.remove('is-installed-hidden');
      if (mobileInstallBtn) mobileInstallBtn.classList.remove('is-installed-hidden');
      if (installBanner && !dismissed) installBanner.classList.remove('is-installed-hidden');
    }
  }

  /* ==========================================================================
     4. Page Metadata & SEO Configuration
     ========================================================================== */
  const PAGE_META = {
    home: {
      title: 'StockWise – Free Supply Chain & Inventory Management Calculators',
      description:
        'Free professional supply chain and inventory calculators for Economic Order Quantity (EOQ), Reorder Point (ROP), Safety Stock, and Inventory Turnover.',
      path: '/index.html'
    },
    eoq: {
      title: 'Free EOQ Calculator – Economic Order Quantity Tool | StockWise',
      description:
        'Calculate optimal order quantity with our free EOQ Calculator. Balance ordering and holding costs using the Wilson Economic Order Quantity formula.',
      path: '/eoq.html'
    },
    'reorder-point': {
      title: 'Free Reorder Point Calculator – ROP Inventory Tool | StockWise',
      description:
        'Determine the exact inventory threshold to trigger replenishment orders using average daily usage, supplier lead time, and safety stock.',
      path: '/reorder-point.html'
    },
    'safety-stock': {
      title: 'Free Safety Stock Calculator – Buffer Inventory Tool | StockWise',
      description:
        'Calculate optimal safety stock buffer units to protect your supply chain against demand spikes and supplier lead time variability.',
      path: '/safety-stock.html'
    },
    'inventory-turnover': {
      title: 'Free Inventory Turnover Calculator – Stock Turns & DSI Tool | StockWise',
      description:
        'Measure how efficiently your business cycles through stock by dividing Cost of Goods Sold (COGS) by Average Inventory Value.',
      path: '/inventory-turnover.html'
    }
  };

  const fmtInt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const fmtDec = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtOneDec = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  function parsePositiveNumber(inputEl) {
    if (!inputEl) return NaN;
    const raw = String(inputEl.value).replace(/,/g, '').trim();
    if (raw === '') return NaN;
    return Number(raw);
  }

  function setError(errorId, message) {
    const el = document.getElementById(errorId);
    if (!el) return;
    if (message) {
      el.textContent = message;
      el.classList.add('visible');
    } else {
      el.textContent = '';
      el.classList.remove('visible');
    }
  }

  function updateMetaTag(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function resolveInitialPage() {
    const bodyPage = document.body.getAttribute('data-initial-page');
    if (bodyPage && PAGE_META[bodyPage]) {
      const hash = window.location.hash.replace(/^#/, '').trim();
      if (hash && PAGE_META[hash]) return hash;
      return bodyPage;
    }

    const pathname = window.location.pathname.toLowerCase();
    if (pathname.endsWith('eoq.html')) return 'eoq';
    if (pathname.endsWith('reorder-point.html')) return 'reorder-point';
    if (pathname.endsWith('safety-stock.html')) return 'safety-stock';
    if (pathname.endsWith('inventory-turnover.html')) return 'inventory-turnover';

    const hash = window.location.hash.replace(/^#/, '').trim();
    if (hash && PAGE_META[hash]) return hash;

    return 'home';
  }

  function showPage(pageKey, pushHistory = true) {
    const targetKey = PAGE_META[pageKey] ? pageKey : 'home';
    const meta = PAGE_META[targetKey];

    // Toggle active view section
    const views = document.querySelectorAll('.page-view');
    views.forEach((view) => {
      const isMatch = view.getAttribute('data-view') === targetKey;
      view.classList.toggle('active', isMatch);
      view.setAttribute('aria-hidden', isMatch ? 'false' : 'true');
    });

    // Update active state on navigation links (Desktop, Mobile Drawer, Bottom Dock)
    document.querySelectorAll('[data-nav-page]').forEach((link) => {
      const isCurrent = link.getAttribute('data-nav-page') === targetKey;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // Dynamic SEO
    document.title = meta.title;
    updateMetaTag('meta[name="description"]', 'content', meta.description);
    updateMetaTag('meta[property="og:title"]', 'content', meta.title);
    updateMetaTag('meta[property="og:description"]', 'content', meta.description);
    updateMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    updateMetaTag('meta[name="twitter:description"]', 'content', meta.description);

    // Close mobile drawer if open
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileDrawer && mobileDrawer.classList.contains('open')) {
      mobileDrawer.classList.remove('open');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    }

    if (pushHistory && window.history && window.history.pushState) {
      const newHash = targetKey === 'home' ? '#home' : '#' + targetKey;
      try {
        window.history.pushState({ page: targetKey }, meta.title, newHash);
      } catch (_err) {
        window.location.hash = newHash;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     5. Calculator 1: Economic Order Quantity (EOQ)
     ========================================================================== */
  function calculateEOQ() {
    const demandEl = document.getElementById('eoq-demand');
    const orderCostEl = document.getElementById('eoq-order-cost');
    const holdingCostEl = document.getElementById('eoq-holding-cost');

    const demand = parsePositiveNumber(demandEl);
    const orderCost = parsePositiveNumber(orderCostEl);
    const holdingCost = parsePositiveNumber(holdingCostEl);

    if (isNaN(demand) || demand <= 0) {
      setError('eoq-error', 'Please enter an Annual Demand greater than 0 units/year.');
      return;
    }
    if (isNaN(orderCost) || orderCost <= 0) {
      setError('eoq-error', 'Please enter an Order Cost greater than 0.');
      return;
    }
    if (isNaN(holdingCost) || holdingCost <= 0) {
      setError('eoq-error', 'Please enter a Holding Cost greater than 0.');
      return;
    }

    setError('eoq-error', '');

    const eoqExact = Math.sqrt((2 * demand * orderCost) / holdingCost);
    const eoqRounded = Math.round(eoqExact);
    const ordersPerYear = demand / eoqExact;
    const cycleDays = 365 / ordersPerYear;
    const annualOrderCost = ordersPerYear * orderCost;
    const annualHoldingCost = (eoqExact / 2) * holdingCost;
    const totalInventoryCost = annualOrderCost + annualHoldingCost;

    const valueEl = document.getElementById('eoq-result-value');
    const interpEl = document.getElementById('eoq-result-interpretation');
    const exactEl = document.getElementById('eoq-metric-exact');
    const ordersEl = document.getElementById('eoq-metric-orders');
    const cycleEl = document.getElementById('eoq-metric-cycle');
    const orderCostOutEl = document.getElementById('eoq-metric-order-cost');
    const holdCostOutEl = document.getElementById('eoq-metric-hold-cost');
    const totalCostEl = document.getElementById('eoq-metric-total-cost');

    if (valueEl) valueEl.textContent = fmtInt.format(eoqRounded);
    if (interpEl) {
      interpEl.textContent =
        `Ordering ${fmtInt.format(eoqRounded)} units per batch (${fmtDec.format(eoqExact)} exact) minimizes combined ordering and storage costs at ${formatMoney(totalInventoryCost)} per year.`;
    }
    if (exactEl) exactEl.textContent = `${fmtDec.format(eoqExact)} units`;
    if (ordersEl) ordersEl.textContent = `${fmtOneDec.format(ordersPerYear)} orders/yr`;
    if (cycleEl) cycleEl.textContent = `Every ${fmtOneDec.format(cycleDays)} days`;
    if (orderCostOutEl) orderCostOutEl.textContent = `${formatMoney(annualOrderCost)}/yr`;
    if (holdCostOutEl) holdCostOutEl.textContent = `${formatMoney(annualHoldingCost)}/yr`;
    if (totalCostEl) totalCostEl.textContent = `${formatMoney(totalInventoryCost)}/yr`;
  }

  /* ==========================================================================
     6. Calculator 2: Reorder Point (ROP)
     ========================================================================== */
  function calculateROP() {
    const dailyUsageEl = document.getElementById('rop-daily-usage');
    const leadTimeEl = document.getElementById('rop-lead-time');
    const safetyStockEl = document.getElementById('rop-safety-stock');

    const dailyUsage = parsePositiveNumber(dailyUsageEl);
    const leadTime = parsePositiveNumber(leadTimeEl);
    const safetyStock = parsePositiveNumber(safetyStockEl);

    if (isNaN(dailyUsage) || dailyUsage <= 0) {
      setError('rop-error', 'Please enter an Average Daily Usage greater than 0 units/day.');
      return;
    }
    if (isNaN(leadTime) || leadTime <= 0) {
      setError('rop-error', 'Please enter a Lead Time greater than 0 days.');
      return;
    }
    if (isNaN(safetyStock) || safetyStock < 0) {
      setError('rop-error', 'Please enter a Safety Stock value of 0 or greater.');
      return;
    }

    setError('rop-error', '');

    const leadTimeDemand = dailyUsage * leadTime;
    const ropExact = leadTimeDemand + safetyStock;
    const ropRounded = Math.ceil(ropExact);
    const bufferPercentage = ropExact > 0 ? (safetyStock / ropExact) * 100 : 0;
    const coverageDays = ropExact / dailyUsage;

    const valueEl = document.getElementById('rop-result-value');
    const interpEl = document.getElementById('rop-result-interpretation');
    const ltdEl = document.getElementById('rop-metric-ltd');
    const ssEl = document.getElementById('rop-metric-ss');
    const shareEl = document.getElementById('rop-metric-share');
    const daysEl = document.getElementById('rop-metric-days');

    if (valueEl) valueEl.textContent = fmtInt.format(ropRounded);
    if (interpEl) {
      interpEl.textContent =
        `Place a new replenishment purchase order as soon as on-hand inventory drops to ${fmtInt.format(ropRounded)} units (${fmtInt.format(Math.round(leadTimeDemand))} units lead time demand + ${fmtInt.format(Math.round(safetyStock))} safety units).`;
    }
    if (ltdEl) ltdEl.textContent = `${fmtDec.format(leadTimeDemand)} units`;
    if (ssEl) ssEl.textContent = `${fmtDec.format(safetyStock)} units`;
    if (shareEl) shareEl.textContent = `${fmtOneDec.format(bufferPercentage)}% of ROP`;
    if (daysEl) daysEl.textContent = `${fmtOneDec.format(coverageDays)} days of stock`;
  }

  /* ==========================================================================
     7. Calculator 3: Safety Stock
     ========================================================================== */
  function calculateSafetyStock() {
    const maxUsageEl = document.getElementById('ss-max-usage');
    const maxLeadEl = document.getElementById('ss-max-lead');
    const avgUsageEl = document.getElementById('ss-avg-usage');
    const avgLeadEl = document.getElementById('ss-avg-lead');

    const maxUsage = parsePositiveNumber(maxUsageEl);
    const maxLead = parsePositiveNumber(maxLeadEl);
    const avgUsage = parsePositiveNumber(avgUsageEl);
    const avgLead = parsePositiveNumber(avgLeadEl);

    if (isNaN(maxUsage) || maxUsage <= 0 || isNaN(maxLead) || maxLead <= 0) {
      setError('ss-error', 'Please enter positive numbers for Maximum Daily Usage and Maximum Lead Time.');
      return;
    }
    if (isNaN(avgUsage) || avgUsage <= 0 || isNaN(avgLead) || avgLead <= 0) {
      setError('ss-error', 'Please enter positive numbers for Average Daily Usage and Average Lead Time.');
      return;
    }
    if (maxUsage < avgUsage) {
      setError('ss-error', 'Max Daily Usage must be greater than or equal to Average Daily Usage.');
      return;
    }
    if (maxLead < avgLead) {
      setError('ss-error', 'Max Lead Time must be greater than or equal to Average Lead Time.');
      return;
    }

    setError('ss-error', '');

    const maxDemandDuringLead = maxUsage * maxLead;
    const avgDemandDuringLead = avgUsage * avgLead;
    const safetyStockExact = maxDemandDuringLead - avgDemandDuringLead;
    const safetyStockRounded = Math.ceil(safetyStockExact);
    const bufferDays = safetyStockExact / avgUsage;
    const impliedROP = avgDemandDuringLead + safetyStockExact;

    const valueEl = document.getElementById('ss-result-value');
    const interpEl = document.getElementById('ss-result-interpretation');
    const maxDemEl = document.getElementById('ss-metric-max-demand');
    const avgDemEl = document.getElementById('ss-metric-avg-demand');
    const daysEl = document.getElementById('ss-metric-days');
    const ropEl = document.getElementById('ss-metric-rop');

    if (valueEl) valueEl.textContent = fmtInt.format(safetyStockRounded);
    if (interpEl) {
      interpEl.textContent =
        `Hold ${fmtInt.format(safetyStockRounded)} buffer units in reserve to absorb peak demand surges up to ${fmtInt.format(maxUsage)} units/day and delays up to ${fmtInt.format(maxLead)} days without stockouts.`;
    }
    if (maxDemEl) maxDemEl.textContent = `${fmtDec.format(maxDemandDuringLead)} units`;
    if (avgDemEl) avgDemEl.textContent = `${fmtDec.format(avgDemandDuringLead)} units`;
    if (daysEl) daysEl.textContent = `${fmtOneDec.format(bufferDays)} days at avg usage`;
    if (ropEl) ropEl.textContent = `${fmtInt.format(Math.ceil(impliedROP))} units`;
  }

  /* ==========================================================================
     8. Calculator 4: Inventory Turnover
     ========================================================================== */
  function calculateTurnover() {
    const cogsEl = document.getElementById('it-cogs');
    const avgInvEl = document.getElementById('it-avg-inventory');

    const cogs = parsePositiveNumber(cogsEl);
    const avgInv = parsePositiveNumber(avgInvEl);

    if (isNaN(cogs) || cogs <= 0) {
      setError('it-error', 'Please enter an Annual Cost of Goods Sold (COGS) greater than 0.');
      return;
    }
    if (isNaN(avgInv) || avgInv <= 0) {
      setError('it-error', 'Please enter an Average Inventory Value greater than 0.');
      return;
    }

    setError('it-error', '');

    const turnover = cogs / avgInv;
    const dsi = 365 / turnover;
    const monthlyTurns = turnover / 12;

    const valueEl = document.getElementById('it-result-value');
    const interpEl = document.getElementById('it-result-interpretation');
    const dsiEl = document.getElementById('it-metric-dsi');
    const monthlyEl = document.getElementById('it-metric-monthly');
    const cogsOutEl = document.getElementById('it-metric-cogs');
    const invOutEl = document.getElementById('it-metric-inv');

    if (valueEl) valueEl.textContent = fmtDec.format(turnover);
    if (interpEl) {
      interpEl.textContent =
        `Your inventory cycles completely ${fmtDec.format(turnover)} times per year. On average, a unit remains in storage for ${fmtOneDec.format(dsi)} days before being sold.`;
    }
    if (dsiEl) dsiEl.textContent = `${fmtOneDec.format(dsi)} days (DSI)`;
    if (monthlyEl) monthlyEl.textContent = `${fmtDec.format(monthlyTurns)} turns/month`;
    if (cogsOutEl) cogsOutEl.textContent = formatMoney(cogs);
    if (invOutEl) invOutEl.textContent = formatMoney(avgInv);
  }

  function runAllCalculations() {
    calculateEOQ();
    calculateROP();
    calculateSafetyStock();
    calculateTurnover();
  }

  /* ==========================================================================
     9. Sample Presets
     ========================================================================== */
  const PRESETS = {
    eoq: { 'eoq-demand': '12000', 'eoq-order-cost': '150', 'eoq-holding-cost': '4.50' },
    rop: { 'rop-daily-usage': '45', 'rop-lead-time': '8', 'rop-safety-stock': '120' },
    ss: { 'ss-max-usage': '65', 'ss-max-lead': '12', 'ss-avg-usage': '45', 'ss-avg-lead': '8' },
    it: { 'it-cogs': '1800000', 'it-avg-inventory': '225000' }
  };

  function applyPreset(calcType) {
    const map = PRESETS[calcType];
    if (!map) return;
    Object.keys(map).forEach((id) => {
      const input = document.getElementById(id);
      if (input) input.value = map[id];
    });
    if (calcType === 'eoq') calculateEOQ();
    else if (calcType === 'rop') calculateROP();
    else if (calcType === 'ss') calculateSafetyStock();
    else if (calcType === 'it') calculateTurnover();
  }

  /* ==========================================================================
     10. PWA Service Worker & Install Prompt
     ========================================================================== */
  let deferredInstallPrompt = null;

  function initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
      });
    }

    applyInstallState();

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      applyInstallState();
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      localStorage.setItem('stockwise_installed', 'true');
      applyInstallState();
    });

    // Wire Install buttons
    const triggerInstall = async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        if (outcome === 'accepted') {
          localStorage.setItem('stockwise_installed', 'true');
        }
        deferredInstallPrompt = null;
        applyInstallState();
      } else {
        const modalBackdrop = document.getElementById('pwa-modal-backdrop');
        if (modalBackdrop) modalBackdrop.classList.add('open');
      }
    };

    const headerInstallBtn = document.getElementById('pwa-install-btn');
    if (headerInstallBtn) headerInstallBtn.addEventListener('click', triggerInstall);

    const bannerInstallBtn = document.getElementById('btn-banner-install');
    if (bannerInstallBtn) bannerInstallBtn.addEventListener('click', triggerInstall);

    const mobileInstallBtn = document.getElementById('mobile-install-btn');
    if (mobileInstallBtn) mobileInstallBtn.addEventListener('click', triggerInstall);

    // Banner dismiss
    const bannerDismissBtn = document.getElementById('btn-banner-dismiss');
    if (bannerDismissBtn) {
      bannerDismissBtn.addEventListener('click', () => {
        const banner = document.getElementById('install-app-banner');
        if (banner) banner.classList.add('is-installed-hidden');
        sessionStorage.setItem('stockwise_banner_dismissed', 'true');
      });
    }

    // Modal close
    const modalCloseBtn = document.getElementById('pwa-modal-close');
    const modalBackdrop = document.getElementById('pwa-modal-backdrop');
    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => modalBackdrop.classList.remove('open'));
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
      });
    }

    // Offline toast
    const offlineToast = document.getElementById('offline-toast');
    function updateOnlineStatus() {
      if (!offlineToast) return;
      if (navigator.onLine) {
        offlineToast.classList.remove('visible');
      } else {
        offlineToast.classList.add('visible');
      }
    }
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  }

  /* ==========================================================================
     11. Populate Currency & Language Selectors
     ========================================================================== */
  function setupSelectors() {
    // Populate Currency Selectors
    const currSelects = [
      document.getElementById('currency-select'),
      document.getElementById('mobile-currency-select')
    ];

    currSelects.forEach((sel) => {
      if (!sel) return;
      sel.innerHTML = '';
      Object.keys(CURRENCIES).forEach((code) => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = CURRENCIES[code].name;
        if (code === currentCurrency) opt.selected = true;
        sel.appendChild(opt);
      });

      sel.addEventListener('change', (e) => {
        setCurrency(e.target.value);
      });
    });

    // Populate Language Selectors
    const langSelects = [
      document.getElementById('lang-select'),
      document.getElementById('mobile-lang-select')
    ];

    langSelects.forEach((sel) => {
      if (!sel) return;
      sel.innerHTML = '';
      Object.keys(LANGUAGES).forEach((code) => {
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = LANGUAGES[code].name;
        if (code === currentLang) opt.selected = true;
        sel.appendChild(opt);
      });

      sel.addEventListener('change', (e) => {
        applyLanguage(e.target.value);
      });
    });
  }

  /* ==========================================================================
     12. DOM Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Currency & Language controls
    setupSelectors();
    updateCurrencyUI();
    applyLanguage(currentLang);

    // 2. Wire navigation links, cards, and bottom dock
    document.querySelectorAll('[data-nav-page]').forEach((el) => {
      el.addEventListener('click', (e) => {
        const targetPage = el.getAttribute('data-nav-page');
        if (targetPage && PAGE_META[targetPage]) {
          e.preventDefault();
          showPage(targetPage, true);
        }
      });
    });

    // 3. Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // 4. Popstate handler
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.page) {
        showPage(e.state.page, false);
      } else {
        showPage(resolveInitialPage(), false);
      }
    });

    // 5. Wire Calculator Forms
    const forms = [
      { formId: 'form-eoq', handler: calculateEOQ },
      { formId: 'form-rop', handler: calculateROP },
      { formId: 'form-ss', handler: calculateSafetyStock },
      { formId: 'form-it', handler: calculateTurnover }
    ];

    forms.forEach(({ formId, handler }) => {
      const formEl = document.getElementById(formId);
      if (formEl) {
        formEl.addEventListener('submit', (e) => {
          e.preventDefault();
          handler();
        });
      }
    });

    // Wire presets & reset
    document.querySelectorAll('[data-load-example]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-load-example');
        applyPreset(type);
      });
    });

    document.querySelectorAll('[data-reset-calc]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-reset-calc');
        applyPreset(type);
      });
    });

    // 6. Run initial calculations
    runAllCalculations();

    // 7. Initial page activation
    showPage(resolveInitialPage(), false);

    // 8. Initialize PWA & Install detection
    initPWA();
  });
})();
