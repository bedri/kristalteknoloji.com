export const translations: Record<string, any> = {
  tr: {
    nav: {
      home: 'Giriş',
      about: 'Biz Kimiz?',
      ecosystem: 'Ekosistem',
      lab: 'Laboratuvar',
      contact: 'İletişim',
      menu: 'Kristal Menü',
      close: 'Kapat',
      lang: 'Dil'
    },
    common: {
      docs: 'Dokümantasyonu İncele',
      visit: 'Ziyaret Et',
      downloadWallet: 'Cüzdanı İndir',
      explorer: 'Blok Gezgini',
      github: 'GitHub'
    },
    home: {
      tagline: 'Kooperatif Konsensüs ve Akıllı Sözleşmeler',
      title: 'Güvenli ve Huzurlu Merkeziyetsiz Altyapı',
      description: 'Ultra hızlı kooperatif konsensüs, Boneh-Lynn-Shacham (BLS) eşik çekilişleri ve gaz ücreti bulunmayan görsel akıllı sözleşmeler sunan yeni nesil blokzincir mimarisi.',
      exploreBtn: 'Özellikleri İncele',
      masternodes: 'Aktif Doğrulayıcı Komitesi',
      masternodeCollateral: '4.200 KRISTA Teminat • 250 / 10 / 0 KRISTA Lock',
      circulatingSupply: 'Maksimum Arz (0 Premine)',
      hardcap: '210M KRISTA • %93 Net Ödül Havuzu',
      tps: 'Ağ Kesinlik Süresi',
      blockSpacing: '30sn Blok • Model D (%35/%40/%15/%10)',
      coreTechTitle: 'Çekirdek Teknolojiler',
      coreTechSubtitle: 'KristaTech Core v1.5.9.0 (Proto 70983) ağına güç veren yenilikçi mühendislik çalışmaları.',
      viewTechBtn: 'Ayrıntıları İncele',
      adam: {
        title: 'ADAM Konsensüsü (7+1+3 Dual-Track)',
        desc: 'Doğrulanabilir rastgele işlevler (VRF) ve döngüsel tohum (rolling-seed) mekanizması kullanan konsensüs modeli. Her turda 7+1+3 Dual-Track komitesi (7 Masternode, 1 izole 250 KRISTA Coin-Lock, 2 Fonlu 10 KRISTA PoW-Lock ve 1 kalıcı 0 KRISTA Açık PoW) ile 4.200:250:10 orantılı teminat ağırlıklı VRF koordinatörü (ADAM_FAIR_COORD_V4, en az %75 MN tabanı) seçer; 17 tek geçişli algoritma ve 4.080 3’lü permütasyon VRF yapısını kullanır (X11KVS yalnızca PoW Kaydı içindir).'
      },
      pobls: {
        title: 'Proof of BLS (PoBLS)',
        desc: 'supranational/blst kütüphanesi, KTDIP3 (wallet.dat mnmeta) deterministik operatör anahtarları ve BIP324 şifreli P2P v2 ile güçlendirilmiş kesinlik katmanı. Blok 4.800’de 4.080’li PoMBL v12 permütasyonu, Blok 5.000 itibarıyla da 3/5’ten 8/15’e dinamik BLS12-381 LLMQ kesinlik quorumu (yalnızca aktif imzacılara 1 blok gecikmeli %10 ödül, -5/+5 PoSe) devreye girer.'
      },
      mescal: {
        title: 'MESCAL Sözleşmeleri',
        desc: 'Öngörülebilir dijital anlaşmalar için gaz açık artırması olmayan deterministik MESCAL v2 Taproot (kt1p... Bech32m) ve CScript (CMescal) akıllı sözleşme motoru. Cüzdan içi JSON/YAML görsel tasarımcısı ve BIP174 PSBT desteğiyle 250 KRISTA Coin-Lock, 10 KRISTA Fonlu PoW-Lock (2.880 blok CLTV + 20 blok cüzdan tamponu), Blok 2.500+ kalıcı 0 KRISTA Açık PoW, M-of-N çoklu imza, zaman kilidi, vesting (CSV) ve HTLC atomik takaslarını doğrudan destekler.'
      },
      heroBadge: 'Yarınları Şekillendiriyoruz',
      heroTitleStart: 'Geleceğin Teknolojik',
      heroTitleSpan: 'Kristallerini',
      heroTitleEnd: 'İnşa Ediyoruz',
      heroDesc: 'Merkeziyetsiz finans, gelişmiş köprü protokolleri ve akıllı sözleşme dilleriyle yarının internetini bugünden tasarlıyoruz.',
      exploreProjectsBtn: 'Projelerimizi Keşfet',
      sandboxLabBtn: 'Sandbox Laboratuvarı',
      teaserTagline: 'Bölümlerimiz',
      teaserTitle: 'Kristal Dünyasını Keşfedin',
      teaserSubtitle: 'Yenilikçi teknolojilerimizi, geliştirici araçlarımızı ve kurumsal vizyonumuzu incelemek için ilgili bölümlere göz atın.',
      teaserAboutTitle: 'Biz Kimiz?',
      teaserAboutDesc: 'Fikirleri ve dijital varlıkları en berrak, dayanıklı ve ölçeklenebilir yapılara dönüştürüyoruz. Şeffaf, güvenli ve insan odaklı ekosistemimiz hakkında bilgi edinin.',
      teaserAboutBtn: 'Hakkımızda Detaylı Bilgi',
      teaserProjectsTitle: 'Projelerimiz',
      teaserProjectsDesc: 'Katman-1 hibrit blokzincirimiz KristaTech (KRISTA) ve çoklu platform cüzdan ekosistemi, Block Explorer, FastChange Exchange ve yaratıcı Web3 girişimlerimizin yer aldığı geniş teknoloji ekosistemini keşfedin.',
      teaserProjectsBtn: 'Ekosistemi Keşfet',
      teaserLabTitle: 'Kristal Laboratuvarı',
      teaserLabDesc: '3D Kristal Tasarımcısını kişiselleştirin veya PoBLS mutabakat loterisi simülatörünü test ederek blokzincir teknolojimizi interaktif olarak deneyimleyin.',
      teaserLabBtn: 'Laboratuvara Giriş Yap',
      teaserContactTitle: 'İletişim',
      teaserContactDesc: 'Projelerimiz hakkında bilgi almak, ekosisteme katılmak ya da merkeziyetsiz fikirler üzerine konuşmak için bizimle iletişime geçin.',
      teaserContactBtn: 'İletişim Formuna Git'
    },
    about: {
      tagline: 'Vizyonumuz ve Ekibimiz',
      title: 'Geleceği Kristalize Ediyoruz',
      desc: 'Kristal Teknoloji, fikirleri ve dijital varlıkları en dayanıklı, ölçeklenebilir ve berrak yapılara dönüştürmek amacıyla kurulmuş bir teknoloji laboratuvarıdır. Soğuk, yabancı ve erişilmez bir mühendislik yerine; samimi, minimalist ve insan odaklı bir ekosistem kurguluyoruz.',
      visionTitle: 'Vizyonumuz',
      visionDesc: 'Herkes için adil, şeffaf ve manipüle edilemeyen bir merkeziyetsiz ekonomi yaratmak.',
      missionTitle: 'Misyonumuz',
      missionDesc: 'Yüksek performanslı, enerji dostu ve sıfır gaz ücretli akıllı sözleşme dilleri ve konsensüs protokolleri geliştirmek.',
      teamTitle: 'Çekirdek Ekibimiz',
      teamSubtitle: 'Kriptografi, dağıtık sistemler ve yazılım mimarisi alanında uzman kadromuz.',
      pillar1Title: 'Yüksek Berraklık',
      pillar1Desc: 'Tasarım ve kodlama süreçlerimizde şeffaflığı ve sadeliği ön planda tutuyor, karmaşık yapıları anlaşılır kılmak için çalışıyoruz.',
      pillar2Title: 'Kırılmaz Güvenlik',
      pillar2Desc: 'Konsensüs protokollerimiz ve akıllı sözleşme mimarilerimiz, kriptografik loteriler ve formal doğrulamalarla en zorlu koşullara hazırdır.',
      pillar3Title: 'Samimi İşbirlikleri',
      pillar3Desc: 'Topluluklarımız, madencilerimiz, stakerlarımız ve düğüm operatörlerimizle adil ödül bölüşümü ve açık diyalog temelli bağlar kuruyoruz.',
      philosophyTitle: 'Vizyonumuz & Felsefemiz',
      philosophyP1: 'Teknolojinin sadece soğuk algoritmalar ve rakamlardan ibaret olmadığına inanıyoruz. Kristal yapısı, doğadaki en mükemmel geometrik düzenlerden biridir. Karmaşık atom bağları, dışarıdan son derece sade ve kusursuz bir kristal formu oluşturur.',
      philosophyP2: 'Bizim yazılım ve blokzincir mimarilerine bakış açımız da tam olarak budur: Arkasındaki karmaşık kriptografiyi ve matematiksel altyapıyı, kullanıcının hayatını kolaylaştıracak, berrak ve anlaşılır ürünlere dönüştürmek.',
      philosophyP3: 'Her projemizde, merkeziyetsizlik felsefesini adil ödül mekanizmalarıyla güçlendiriyor ve topluluk katılımına açık, erişilebilir Web3 çözümleri sunuyoruz.'
    },
    ecosystem: {
      tagline: 'Geliştirdiğimiz Çözümler',
      title: 'Kristal Ekosistemi',
      desc: 'KristaTech altyapısı üzerinde çalışan, blokzincir deneyimini kolaylaştıran ve zenginleştiren projelerimiz.',
      category: 'Kategori',
      features: 'Özellikler',
      kristatechDesc: 'Core v1.5.9.0 (Proto 70983) üzerinde çalışan; UPGRADE_FAIRNESS, KTDIP3 deterministik Masternode (wallet.dat mnmeta), BIP324 şifreli P2P v2, 17 tek geçişli algoritma (4.080 3’lü permütasyon), 7+1+3 Dual-Track ADAM konsensüsü, dinamik BLS12-381 LLMQ, eşit paylaşımlı Model D (%35/%40/%15/%10 + %50 Yakım), MESCAL v2 Taproot (kt1p...) ve çoklu platform cüzdan ailesine (9 sekmeli Qt Core, Light/PWA, Mobil, Tarayıcı) sahip hibrit Katman-1 blokzincir ağı.',
      activeProjects: 'Aktif Projeler',
      projectsDesc: 'Kendi laboratuvarımızda filizlenen, her biri merkeziyetsiz geleceğe farklı bir perspektif getiren yenilikçi teknoloji girişimlerimiz.',
      kristatech: {
        category: 'Katman-1 Blokzincir • Core v1.5.9.0',
        title: 'KristaTech Coin (KRISTA)',
        text: 'Core v1.5.9.0 (Proto 70983) üzerinde çalışan; UPGRADE_FAIRNESS, KTDIP3 deterministik Masternode (wallet.dat mnmeta), BIP324 şifreli P2P v2, 17 tek geçişli algoritma (4.080 3’lü permütasyon), 7+1+3 Dual-Track ADAM konsensüsü, dinamik BLS12-381 LLMQ, eşit paylaşımlı Model D (%35/%40/%15/%10 + %50 Yakım), MESCAL v2 Taproot (kt1p...) ve çoklu platform cüzdan ailesine (9 sekmeli Qt Core, Light/PWA, Mobil, Tarayıcı) sahip hibrit Katman-1 blokzincir ağı.',
        feature1: 'ADAM 7+1+3, KTDIP3 (wallet.dat) & BIP324 P2P',
        feature2: 'Model D (%35 MN / %40 Eşit Komite / %15 Üretici / %10 LLMQ)',
        feature3: 'MESCAL v2 Taproot (kt1p...) & Çoklu Cüzdan Ailesi',
        link1: 'KristaTech Coin Ziyaret Et'
      },
      explorer: {
        category: 'Blokzincir Kaşifi & Analitik v2.0',
        title: 'KristaTech Block Explorer',
        text: 'KristaTech ağındaki tüm blokları, transferleri, MESCAL akıllı sözleşmelerini, Model D ödül dağılımlarını, %50 sahipsiz koltuk yakımlarını (burn) ve 7+1+3 doğrulayıcı düğüm metriklerini gerçek zamanlı izlemenizi sağlayan Explorer v2.0 arayüzü.',
        feature1: 'Anlık Blok, İşlem & Bech32m Taproot Takibi',
        feature2: 'Model D, Yakım (Burn) & 7+1+3 Havuz Metrikleri',
        feature3: 'MESCAL Akıllı Sözleşme & PoBLS Doğrulama',
        link1: 'Kaşifi Başlat'
      },
      velvet: {
        category: 'Kreatif Web3 Oyun',
        title: 'Velvet: Ateşli Bir Oyun',
        text: 'Gelişmiş bulmacalar, zengin dijital sanat galerileri ve yapay zeka destekli interaktif kurgusal hikayeler barındıran, Web3 tabanlı premium yetişkin interaktif eğlence deneyimi.',
        feature1: 'İnteraktif Yapay Zeka Kurguları',
        feature2: 'Bulmaca & Galeri Ödülleri',
        feature3: 'Bulut Tabanlı İlerleme Kaydı',
        link1: 'Oyunu Oyna'
      },
      nudearts: {
        category: 'Yapay Zeka Destekli Sanat Portalı',
        title: 'Nudearts Studio',
        text: 'Sanatçıların ve yaratıcıların sınırları aşan dijital sanat eserlerini yüksek sadakatle sentezlemesine, sergilemesine ve tescil etmesine imkan veren lider kreatif Web3 yapay zeka stüdyosu.',
        feature1: 'Yüksek Çözünürlüklü Sentez',
        feature2: 'Kreatif Özgürlük Modelleri',
        feature3: 'Akıllı Sözleşme Lisanslama',
        link1: 'Stüdyoyu İncele'
      },
      fastchange: {
        category: 'Çapraz Zincir Takas Platformu',
        title: 'FastChange Exchange',
        text: 'Üyelik, kayıt veya kimlik doğrulama adımları gerektirmeden, farklı blokzincir ağları arasında anında, düşük işlem ücretli ve güvenli coin takası sağlayan yeni nesil borsa aracı.',
        feature1: 'Hesapsız & Kayıtsız Takas',
        feature2: 'Maksimum Hız & Minimum Gas',
        feature3: 'Gerçek Zamanlı Takas Akışı',
        link1: 'Takasa Başla'
      },
      quickybet: {
        category: 'Merkeziyetsiz Kripto Bahis',
        title: 'Quicky Bet',
        text: 'Kayıt veya hesap açma zahmeti olmadan, cüzdandan doğrudan katılım sağlayıp kazançlarınızı anında yine cüzdanınızda toplamanızı sağlayan güvenli ve hızlı Web3 bahis platformu.',
        feature1: 'Sıfır Kayıt, Sıfır Hesap',
        feature2: 'Doğrudan Akıllı Sözleşme Payı',
        feature3: 'Anında Otomatik Çekim',
        link1: 'Bahisleri Gör'
      },
      alicante: {
        category: 'Kreatif Şehir Rehberi',
        title: 'Alicante Guide',
        text: 'Alicante\'nin tarihi dokusunu, altın kumlu plajlarını ve yerel lezzet duraklarını modern, interaktif ve kullanıcı dostu bir arayüzle sunan dijital turizm rehberi.',
        feature1: 'İnteraktif Şehir Haritası',
        feature2: 'Yerel Mekan & Rota Önerileri',
        feature3: 'Plaj & Etkinlik Rehberi',
        link1: 'Alicante\'yi Keşfet'
      }
    },
    lab: {
      seoTitle: 'Kristal Laboratuvarı | Sandbox & Teknolojiler',
      seoDesc: '3D Kristal Tasarımcısı, PoBLS Kripto Loterisi ve Kristal Teknoloji\'nin yenilikçi altyapı mimarisini keşfedin.',
      tagline: 'Sıradışı Sayfalar',
      title: 'Kristal Laboratuvarı',
      desc: 'Fikirlerimizi kristalize ettiğimiz yer. Aşağıdaki interaktif araçları kullanarak teknolojimizi ve felsefemizi uygulamalı olarak keşfedebilirsiniz.',
      designerTab: '3D Kristal Tasarımcısı',
      lotteryTab: 'PoBLS Kripto Loterisi',
      techTitle: 'Çekirdek Teknolojilerimiz',
      techSubtitle: 'Yenilikçi Altyapı Çözümlerimiz',
      techDesc: 'KristaTech ekosisteminin arkasındaki matematiksel, kriptografik ve yazılımsal temel taşı teknolojileri yakından tanıyın.',
      viewDoc: 'Dokümantasyonu İncele',
      designer: {
        title: '3D Kristal Oluşturucu',
        intro: 'Kristal yapısını belirleyen parametreleri değiştirerek gerçek zamanlı 3D kristal modelinizi oluşturun.',
        complexity: 'Karmaşıklık',
        facets: 'Yüzey Sayısı',
        glow: 'Parlama Yoğunluğu',
        hue: 'Renk Tonu (Hue)',
        seed: 'Seed Değeri',
        exportBtn: '3D Modeli Dışa Aktar',
        infoTitle: 'Kristal Geometrisi Hakkında',
        infoText: 'Kristalin köşe ve yüzey koordinatları, girdiğiniz tohum (seed) değerinin SHA-256 özeti kullanılarak deterministik olarak hesaplanır. Her tohum tamamen benzersiz bir geometrik parmak izi üretir.',
        paramsTitle: 'Kristal Parametreleri',
        paramsDesc: 'Kendi kristalinizi oluşturmak için geometrik parametreleri, ışık kırma indeksini ve yansıma renklerini özelleştirin.',
        facetsLabel: 'Geometrik Köşe Sayısı',
        refractionLabel: 'Işık Kırılması (Refraction)',
        rotationSpeedLabel: 'Dönüş Hızı',
        colorLabel: 'Kristal Rengi',
        crystallizeBtn: 'Fikri Kristalize Et'
      },
      lottery: {
        title: 'PoBLS Blok Çekiliş Simülatörü',
        intro: 'BLS eşik imzalı loteri algoritmasının çalışmasını interaktif olarak deneyimleyin.',
        drawBtn: 'Çekilişi Başlat',
        drawing: 'İmzalar Birleştiriliyor...',
        winnerTitle: 'Çekiliş Sonucu',
        winnerLabel: 'Kazanan Madenci',
        hashLabel: 'Eşik İmza Özeti',
        nodesLabel: 'Katılan Düğümler',
        statusReady: 'Sistem hazır. Çekilişi başlatmak için butona tıklayın.',
        statusDrawing: 'Quorum imzaları toplanıyor ve eşik imza oluşturuluyor...',
        statusWinner: 'Kazanan düğüm kriptografik olarak başarıyla doğrulandı!'
      },
      tech: {
        mescal: {
          tagline: 'MESCAL v2 Taproot (kt1p...) & Deterministik CScript',
          desc: 'JSON/YAML bildirimsel şablonlarından doğrudan BIP-341 Taproot (kt1p... Bech32m) ve yığın tabanlı CScript byte koduna derlenen (CMescal), döngüsüz ve re-entrancy korumalı akıllı sözleşme mimarisi. Cüzdan içi görsel tasarımcı ve BIP174 PSBT ile 250 KRISTA Coin-Lock, 10 KRISTA Fonlu PoW-Lock (2.880 blok CLTV + 20 blok tampon), Blok 2.500+ kalıcı 0 KRISTA Açık PoW, M-of-N kasa, zaman kilidi, vesting (CSV) ve HTLC takaslarını yerleşik olarak destekler.',
          spec1Name: 'Kilit & Kayıt Protokolü',
          spec1Val: '250 Coin-Lock / 10 Funded PoW (2.880 CLTV) / 0 Open PoW',
          spec2Name: 'Desteklenen Şablonlar',
          spec2Val: 'Time-Lock, M-of-N Kasa, Vesting (CSV) & HTLC Takas',
          spec3Name: 'Yürütme & İmza Mimarisi',
          spec3Val: 'Taproot (kt1p... Bech32m) • CScript (CMescal) • BIP174 PSBT'
        },
        adam: {
          tagline: '7+1+3 Dual-Track Komite & 17 Algoritmalı Orantılı VRF',
          desc: 'Her blok turunda 11 doğrulayıcıdan oluşan 7+1+3 Dual-Track komitesini (7 Masternode, 1 izole 250 KRISTA Coin-Lock, 2 Fonlu 10 KRISTA PoW-Lock ve 1 kalıcı 0 KRISTA Açık PoW) ve 4.200:250:10 orantılı teminat ağırlıklı VRF (ADAM_FAIR_COORD_V4, en az %75 MN tabanı) ile 1 koordinatörü seçen kooperatif konsensüs katmanı. 17 tek geçişli algoritma ve 4.080 3’lü permütasyon kullanır.',
          spec1Name: 'Doğrulayıcı Komitesi',
          spec1Val: '7+1+3 Dual-Track (7 MN + 1 Coin-Lock + 2 Funded + 1 Open PoW)',
          spec2Name: 'Bulmaca & ASIC Direnci',
          spec2Val: '17 Tek Geçişli Algoritma + 4.080 3’lü Permütasyon VRF',
          spec3Name: 'Koordinatör Seçimi',
          spec3Val: '4.200:250:10 Orantılı Teminat VRF (≥%75 MN Tabanı)'
        },
        pobls: {
          tagline: 'KTDIP3 BLS12-381 LLMQ Kesinlik & BIP324 Güvenlik Katmanı',
          desc: 'supranational/blst üzerinde KTDIP3 deterministik operatör anahtarlarını (wallet.dat mnmeta ile masternode.conf emekli) ve BIP324 şifreli P2P v2 ağını kullanan kesinlik katmanı. Blok 4.800’de 4.080’li PoMBL v12 permütasyonu, Blok 5.000 itibarıyla da 3/5–8/15 dinamik LLMQ yeter sayısı (yalnızca imzacıya 1 blok gecikmeli %10 ödül, -5/+5 PoSe) ve XOR mesafe loterisi devreye girer.',
          spec1Name: 'Kriptografik Motor',
          spec1Val: 'supranational/blst (KTDIP3 BLS12-381) • BIP324 P2P v2',
          spec2Name: 'Quorum & Eşik Yapısı',
          spec2Val: '3/5–8/15 Dinamik LLMQ (Yalnızca İmzacı %10 • -5/+5 PoSe)',
          spec3Name: 'Aktivasyon & Seçim',
          spec3Val: 'PoMBL v12 (Blok 4.800) • Model D LLMQ (Blok 5.000)'
        },
        modelD: {
          tagline: 'Sıfır Premine & Eşit Paylaşımlı Model D (%93 Net Havuz)',
          desc: '210M KRISTA üst sınırına (~204,95M asimptot) ve 0 Premine ilkesine sahip ekonomik model (Blok 2 itibarıyla 17 KRISTA ve her 259.200 blokta -%2,15 azalma). %7 LLMQ yönetimli Geliştirici Hazinesi sonrası %93 net havuz Blok 5.000+ itibarıyla %35 Pasif MN, %40 Eşit Komite (%40/11 = ~%3,64/koltuk), %15 Üretici (PoS’ta %12 Staker [600 blok olgunluk; PoM 1.25x, PoL 3x, PoB 6x] + %3 Koord. + %100 işlem ücreti) ve %10 LLMQ arasında bölüşülür; sahipsiz koltuklar %50 Yakım / %50 Hazine olarak dağıtılır.',
          spec1Name: 'Arz & Net Ödül Havuzu',
          spec1Val: '210M KRISTA (0 Premine) • %93 Net / %7 Hazine',
          spec2Name: 'Model D Dağılımı (Blok 5.000+)',
          spec2Val: '%35 Pasif MN / %40 Eşit Komite / %15 Üretici / %10 LLMQ',
          spec3Name: 'Eşit Komite & Yakım Kuralı',
          spec3Val: '%40/11 Eşit Koltuk (~%3,64) • %50 Sahipsiz Yakım / %50 Hazine'
        }
      }
    },
    contact: {
      tagline: 'Bize Ulaşın',
      title: 'İletişime Geçin',
      desc: 'Projelerimiz hakkında bilgi almak, ekosisteme katılmak ya da sadece bir çay içip merkeziyetsiz fikirler üzerine konuşmak için bize yazın. Samimi bir ekip sizi bekliyor.',
      name: 'Adınız Soyadınız',
      namePlaceholder: 'John Doe',
      email: 'E-Posta Adresiniz',
      emailPlaceholder: 'john@example.com',
      emailLabel: 'E-Posta',
      subject: 'Konu',
      subjectPlaceholder: 'Ortaklık, Yatırım, Bilgi Edinme...',
      message: 'Mesajınız',
      messagePlaceholder: 'Fikrinizi bizimle paylaşın...',
      sendBtn: 'Mesaj Gönder',
      sending: 'Gönderiliyor...',
      success: 'Mesajınız başarıyla iletildi! En kısa sürede dönüş yapacağız.',
      successTitle: 'Mesaj Gönderildi',
      errorTitle: 'Hata Oluştu',
      errorDesc: 'Mesajınız gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.'
    },
    footer: {
      tagline: 'Geleceğin Teknolojik Kristallerini İnşa Ediyoruz.',
      corporate: 'Kurumsal',
      developer: 'Geliştirici & Lab',
      copyright: 'Tüm hakları saklıdır.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      ecosystem: 'Ecosystem',
      lab: 'Laboratory',
      contact: 'Contact',
      menu: 'Kristal Menu',
      close: 'Close',
      lang: 'Language'
    },
    common: {
      docs: 'Explore Documentation',
      visit: 'Visit Site',
      downloadWallet: 'Download Wallet',
      explorer: 'Block Explorer',
      github: 'GitHub'
    },
    home: {
      tagline: 'Cooperative Consensus & Smart Contracts',
      title: 'Secure and Peaceful Decentralized Infrastructure',
      description: 'Next-generation blockchain architecture offering ultra-fast cooperative consensus, Boneh-Lynn-Shacham (BLS) threshold lottery, and gas-free visual smart contracts.',
      exploreBtn: 'Explore Features',
      circulatingSupply: 'Max Supply (0 Premine)',
      hardcap: '210M KRISTA • 93% Net Reward Pool',
      masternodes: 'Active Validator Committee',
      masternodeCollateral: '4,200 KRISTA Collateral • 250 / 10 / 0 KRISTA Lock',
      tps: 'Network Finality Time',
      blockSpacing: '30s Block • Model D (35%/40%/15%/10%)',
      coreTechTitle: 'Core Technologies',
      coreTechSubtitle: 'Innovative engineering works powering the KristaTech Core v1.5.9.0 (Proto 70983) network.',
      viewTechBtn: 'Review Details',
      adam: {
        title: 'ADAM Consensus (7+1+3 Dual-Track)',
        desc: 'Consensus model utilizing Verifiable Random Functions (VRF) and rolling-seed mechanism. Selects an 11-validator 7+1+3 Dual-Track committee (7 Masternodes, 1 isolated 250 KRISTA Coin-Lock, 2 Funded 10 KRISTA PoW-Lock, and 1 permanent 0 KRISTA Open PoW) plus 1 coordinator via 4,200:250:10 Proportional Capital VRF (ADAM_FAIR_COORD_V4, ≥75% MN floor); uses 17 uniform single-pass algorithms and 4,080 3-permutations (X11KVS reserved for PoW Registration).'
      },
      pobls: {
        title: 'Proof of BLS (PoBLS)',
        desc: 'Cryptographic finality layer powered by supranational/blst, KTDIP3 deterministic operator keys (wallet.dat mnmeta, retiring masternode.conf), and BIP324 encrypted P2P v2 transport. PoMBL v12 (4,080 permutations) activates at Block 4,800, followed by dynamic 3-of-5 to 8-of-15 BLS12-381 LLMQ quorums (signer-only 10% reward, 1-block lag, -5/+5 PoSe) at Block 5,000.'
      },
      mescal: {
        title: 'MESCAL Contracts',
        desc: 'Deterministic MESCAL v2 Taproot (kt1p... Bech32m) and CScript (CMescal) smart contract engine with predictable byte-sized fees and zero gas wars. Powered by the in-wallet JSON/YAML visual designer and BIP174 PSBT, natively supporting 250 KRISTA Coin-Lock, 10 KRISTA Funded PoW-Lock (2,880-block CLTV + 20-block wallet buffer), Block 2,500+ permanent 0 KRISTA Open-Entry PoW, M-of-N vaults, time-locks, vesting (CSV), and HTLC swaps.'
      },
      heroBadge: 'Shaping the Tomorrows',
      heroTitleStart: 'Building the Technological',
      heroTitleSpan: 'Crystals',
      heroTitleEnd: 'of the Future',
      heroDesc: 'We design the internet of tomorrow today with decentralized finance, advanced bridge protocols, and smart contract languages.',
      exploreProjectsBtn: 'Explore Our Projects',
      sandboxLabBtn: 'Sandbox Laboratory',
      teaserTagline: 'Our Sections',
      teaserTitle: 'Explore the Kristal World',
      teaserSubtitle: 'Browse the relevant sections to review our innovative technologies, developer tools, and corporate vision.',
      teaserAboutTitle: 'Who We Are',
      teaserAboutDesc: 'We transform ideas and digital assets into the clearest, most durable, and scalable structures. Learn about our transparent, secure, and human-centric ecosystem.',
      teaserAboutBtn: 'Detailed Info About Us',
      teaserProjectsTitle: 'Our Projects',
      teaserProjectsDesc: 'Explore our vast tech ecosystem featuring our Layer-1 hybrid blockchain KristaTech (KRISTA) & multi-platform wallet suite, Block Explorer, FastChange Exchange, and creative Web3 initiatives.',
      teaserProjectsBtn: 'Explore the Ecosystem',
      teaserLabTitle: 'Kristal Laboratory',
      teaserLabDesc: 'Personalize the 3D Crystal Designer or test the PoBLS consensus lottery simulator to interactively experience our blockchain technology.',
      teaserLabBtn: 'Enter the Laboratory',
      teaserContactTitle: 'Contact',
      teaserContactDesc: 'Contact us to get information about our projects, join the ecosystem, or discuss decentralized ideas.',
      teaserContactBtn: 'Go to Contact Form'
    },
    about: {
      tagline: 'Our Vision and Team',
      title: 'Crystallizing the Future',
      desc: 'Kristal Technology is a technology laboratory established to transform ideas and digital assets into the most durable, scalable, and clear structures. Instead of cold, alien, and inaccessible engineering; we build an intimate, minimalist, and human-centric ecosystem.',
      visionTitle: 'Our Vision',
      visionDesc: 'To create a fair, transparent, and unmanipulable decentralized economy for everyone.',
      missionTitle: 'Our Mission',
      missionDesc: 'To develop high-performance, eco-friendly, and gas-free smart contract languages and consensus protocols.',
      teamTitle: 'Our Core Team',
      teamSubtitle: 'Our expert team specializing in cryptography, distributed systems, and software architecture.',
      pillar1Title: 'High Clarity',
      pillar1Desc: 'We prioritize transparency and simplicity in our design and coding processes, working to make complex structures understandable.',
      pillar2Title: 'Unbreakable Security',
      pillar2Desc: 'Our consensus protocols and smart contract architectures are ready for the most demanding conditions with cryptographic lotteries and formal verifications.',
      pillar3Title: 'Warm Collaborations',
      pillar3Desc: 'We establish bonds based on fair reward distribution and open dialogue with our communities, miners, stakers, and node operators.',
      philosophyTitle: 'Our Vision & Philosophy',
      philosophyP1: 'We believe technology is not just about cold algorithms and numbers. The crystal structure is one of the most perfect geometric arrangements in nature. Complex atomic bonds create an extremely simple and flawless crystal form from the outside.',
      philosophyP2: 'This is exactly our perspective on software and blockchain architectures: transforming the complex cryptography and mathematical infrastructure behind them into clear, understandable products that make users\' lives easier.',
      philosophyP3: 'In each of our projects, we reinforce the philosophy of decentralization with fair reward mechanisms and offer accessible Web3 solutions open to community participation.'
    },
    ecosystem: {
      tagline: 'Solutions We Develop',
      title: 'Kristal Ecosystem',
      desc: 'Our projects working on the KristaTech infrastructure that simplify and enrich the blockchain experience.',
      category: 'Category',
      features: 'Features',
      kristatechDesc: 'Powered by Core v1.5.9.0 (Proto 70983), a hybrid Layer-1 blockchain network featuring UPGRADE_FAIRNESS, KTDIP3 deterministic Masternodes (wallet.dat mnmeta), BIP324 encrypted P2P v2, 17 uniform algorithms (4,080 3-permutations) & 7+1+3 Dual-Track ADAM consensus, dynamic BLS12-381 LLMQs, Equal-Pay Model D (35%/40%/15%/10% + 50% Burn), MESCAL v2 Taproot (kt1p...), and a multi-platform wallet suite (9-tab Qt Core, Light/PWA, Mobile, Browser).',
      activeProjects: 'Active Projects',
      projectsDesc: 'Our innovative technology ventures sprouting in our own laboratory, each bringing a different perspective to the decentralized future.',
      kristatech: {
        category: 'Layer-1 Blockchain • Core v1.5.9.0',
        title: 'KristaTech Coin (KRISTA)',
        text: 'Powered by Core v1.5.9.0 (Proto 70983), a hybrid Layer-1 blockchain network featuring UPGRADE_FAIRNESS, KTDIP3 deterministic Masternodes (wallet.dat mnmeta), BIP324 encrypted P2P v2, 17 uniform algorithms (4,080 3-permutations) & 7+1+3 Dual-Track ADAM consensus, dynamic BLS12-381 LLMQs, Equal-Pay Model D (35%/40%/15%/10% + 50% Burn), MESCAL v2 Taproot (kt1p...), and a multi-platform wallet suite (9-tab Qt Core, Light/PWA, Mobile, Browser).',
        feature1: 'ADAM 7+1+3, KTDIP3 (wallet.dat) & BIP324 P2P',
        feature2: 'Model D (35% MN / 40% Equal Committee / 15% Producer / 10% LLMQ)',
        feature3: 'MESCAL v2 Taproot (kt1p...) & Multi-Wallet Suite',
        link1: 'Visit KristaTech Coin'
      },
      explorer: {
        category: 'Blockchain Explorer & Analytics v2.0',
        title: 'KristaTech Block Explorer',
        text: 'Explorer v2.0 interface allowing you to monitor all blocks, transfers, MESCAL smart contracts, Model D reward splits, 50% unclaimed-seat burns, and 7+1+3 validator node metrics on the KristaTech network in real-time.',
        feature1: 'Instant Block, Tx & Bech32m Taproot Tracking',
        feature2: 'Model D, Burn & 7+1+3 Pool Metrics',
        feature3: 'MESCAL Smart Contract & PoBLS Verification',
        link1: 'Launch Explorer'
      },
      velvet: {
        category: 'Creative Web3 Game',
        title: 'Velvet: A Fiery Game',
        text: 'Premium Web3-based interactive adult entertainment experience containing advanced puzzles, rich digital art galleries, and AI-powered interactive fictional stories.',
        feature1: 'Interactive AI Fictions',
        feature2: 'Puzzle & Gallery Rewards',
        feature3: 'Cloud-Based Progress Saving',
        link1: 'Play the Game'
      },
      nudearts: {
        category: 'AI-Powered Art Portal',
        title: 'Nudearts Studio',
        text: 'Leading creative Web3 AI studio allowing artists and creators to synthesize, showcase, and register boundary-pushing digital artworks with high fidelity.',
        feature1: 'High-Resolution Synthesis',
        feature2: 'Creative Freedom Models',
        feature3: 'Smart Contract Licensing',
        link1: 'Explore the Studio'
      },
      fastchange: {
        category: 'Cross-Chain Swap Platform',
        title: 'FastChange Exchange',
        text: 'New-generation exchange tool providing instant, low-fee, and secure coin swaps between different blockchain networks without requiring membership, registration, or identity verification.',
        feature1: 'Accountless & Registrationless Swap',
        feature2: 'Maximum Speed & Minimum Gas',
        feature3: 'Real-Time Swap Flow',
        link1: 'Start Swap'
      },
      quickybet: {
        category: 'Decentralized Crypto Betting',
        title: 'Quicky Bet',
        text: 'Secure and fast Web3 betting platform allowing you to participate directly from your wallet and instantly collect your winnings back in your wallet without the hassle of registration or account creation.',
        feature1: 'Zero Registration, Zero Account',
        feature2: 'Direct Smart Contract Payout',
        feature3: 'Instant Automatic Withdrawal',
        link1: 'See Bets'
      },
      alicante: {
        category: 'Creative City Guide',
        title: 'Alicante Guide',
        text: 'Digital tourism guide presenting Alicante\'s historical texture, golden sandy beaches, and local food stops through a modern, interactive, and user-friendly interface.',
        feature1: 'Interactive City Map',
        feature2: 'Local Venue & Route Recommendations',
        feature3: 'Beach & Event Guide',
        link1: 'Explore Alicante'
      }
    },
    lab: {
      seoTitle: 'Crystal Laboratory | Sandbox & Technologies',
      seoDesc: 'Explore the 3D Crystal Designer, PoBLS Crypto Lottery, and Kristal Teknoloji\'s innovative infrastructure architecture (MESCAL, ADAM, PoBLS, Model D).',
      tagline: 'Extraordinary Pages',
      title: 'Kristal Laboratory',
      desc: 'The place where we crystallize our ideas. You can experience our technology and philosophy interactively using the tools below.',
      designerTab: '3D Crystal Designer',
      lotteryTab: 'PoBLS Crypto Lottery',
      techTitle: 'Our Core Technologies',
      techSubtitle: 'Innovative Infrastructure Solutions',
      techDesc: 'Get to know the mathematical, cryptographic, and software building block technologies behind the KristaTech ecosystem.',
      viewDoc: 'Read Documentation',
      designer: {
        title: '3D Crystal Generator',
        intro: 'Modify the parameters that define the crystal structure to create your real-time 3D crystal model.',
        complexity: 'Complexity',
        facets: 'Facet Count',
        glow: 'Glow Intensity',
        hue: 'Color Hue',
        seed: 'Seed Value',
        exportBtn: 'Export 3D Model',
        infoTitle: 'About Crystal Geometry',
        infoText: 'The crystal\'s vertex and face coordinates are deterministically calculated using the SHA-256 hash of the input seed value. Each seed produces a completely unique geometric fingerprint.',
        paramsTitle: 'Crystal Parameters',
        paramsDesc: 'Customize the geometric parameters, refractive index, and reflection colors to create your own crystal.',
        facetsLabel: 'Geometric Facet Count',
        refractionLabel: 'Refraction Index',
        rotationSpeedLabel: 'Rotation Speed',
        colorLabel: 'Crystal Color',
        crystallizeBtn: 'Crystallize Idea'
      },
      lottery: {
        title: 'PoBLS Block Lottery Simulator',
        intro: 'Experience the operation of the BLS threshold signature lottery algorithm interactively.',
        drawBtn: 'Start Lottery Draw',
        drawing: 'Combining Signatures...',
        winnerTitle: 'Lottery Result',
        winnerLabel: 'Winning Miner',
        hashLabel: 'Threshold Signature Hash',
        nodesLabel: 'Participating Nodes',
        statusReady: 'System ready. Click the button to start the lottery draw.',
        statusDrawing: 'Gathering quorum signatures and generating threshold signature...',
        statusWinner: 'Winning node successfully verified cryptographically!'
      },
      tech: {
        mescal: {
          tagline: 'MESCAL v2 Taproot (kt1p...) & Deterministic CScript',
          desc: 'Deterministic, loop-free declarative smart contract architecture (CMescal) compiling JSON/YAML templates directly to BIP-341 Taproot (kt1p... Bech32m) and stack-based CScript bytecode while preventing re-entrancy vulnerabilities. Via the in-wallet visual designer and BIP174 PSBT, natively supports 250 KRISTA Coin-Lock, 10 KRISTA Funded PoW-Lock (2,880-block CLTV + 20-block buffer), Block 2,500+ permanent 0 KRISTA Open PoW, M-of-N vaults, time-locks, vesting (CSV), and HTLC swaps.',
          spec1Name: 'Lock & Registration Protocol',
          spec1Val: '250 Coin-Lock / 10 Funded PoW (2,880 CLTV) / 0 Open PoW',
          spec2Name: 'Supported Templates',
          spec2Val: 'Time-Lock, M-of-N Vault, Vesting (CSV) & HTLC Swap',
          spec3Name: 'Execution & Signing Stack',
          spec3Val: 'Taproot (kt1p... Bech32m) • CScript (CMescal) • BIP174 PSBT'
        },
        adam: {
          tagline: '7+1+3 Dual-Track Committee & 17-Algorithm Proportional VRF',
          desc: 'Cooperative consensus layer electing an 11-validator 7+1+3 Dual-Track committee (7 Masternodes, 1 isolated 250 KRISTA Coin-Lock, 2 Funded 10 KRISTA PoW-Lock, and 1 permanent 0 KRISTA Open PoW) plus 1 coordinator via 4,200:250:10 Proportional Capital VRF (ADAM_FAIR_COORD_V4, ≥75% MN floor). Uses 17 uniform single-pass algorithms and 4,080 3-permutations.',
          spec1Name: 'Validator Committee',
          spec1Val: '7+1+3 Dual-Track (7 MN + 1 Coin-Lock + 2 Funded + 1 Open PoW)',
          spec2Name: 'Puzzle & ASIC Resistance',
          spec2Val: '17 Uniform Algorithms + 4,080 3-Permutation VRF',
          spec3Name: 'Coordinator Election',
          spec3Val: '4,200:250:10 Proportional Capital VRF (≥75% MN Floor)'
        },
        pobls: {
          tagline: 'KTDIP3 BLS12-381 LLMQ Finality & BIP324 Security Layer',
          desc: 'Cryptographic finality layer powered by supranational/blst, KTDIP3 deterministic operator keys (wallet.dat mnmeta, retiring masternode.conf), and BIP324 encrypted P2P v2 transport. PoMBL v12 (4,080 permutations) activates at Block 4,800, followed at Block 5,000 by dynamic 3-of-5 to 8-of-15 LLMQ threshold finality (signer-only 10% reward, 1-block lag, -5/+5 PoSe) and XOR distance selection.',
          spec1Name: 'Cryptographic Engine',
          spec1Val: 'supranational/blst (KTDIP3 BLS12-381) • BIP324 P2P v2',
          spec2Name: 'Quorum & Threshold Model',
          spec2Val: '3/5–8/15 Dynamic LLMQ (Signer-Only 10% • -5/+5 PoSe)',
          spec3Name: 'Activation & Selection',
          spec3Val: 'PoMBL v12 (Block 4,800) • Model D LLMQ (Block 5,000)'
        },
        modelD: {
          tagline: 'Zero Premine & Equal-Pay Model D (93% Net Pool)',
          desc: 'Economic model with a 210M KRISTA hard cap (~204.95M asymptote), 0 Premine, 17 KRISTA Block 2+ emission, and -2.15% decay per 259,200 blocks. After the 7% LLMQ-governed Developer Treasury, the 93% net pool from Block 5,000+ splits 35% Passive MN, 40% Equal-Pay Committee (40%/11 = ~3.64%/seat), 15% Producer (in PoS: 12% Staker [600-block maturity; PoM 1.25x, PoL 3x, PoB 6x] + 3% Coord + 100% tx fees), and 10% LLMQ; unclaimed shares split 50% Burn / 50% Treasury.',
          spec1Name: 'Supply & Net Reward Pool',
          spec1Val: '210M KRISTA (0 Premine) • 93% Net / 7% Treasury',
          spec2Name: 'Model D Split (Block 5,000+)',
          spec2Val: '35% Passive MN / 40% Equal Committee / 15% Producer / 10% LLMQ',
          spec3Name: 'Equal-Pay & Deflation Rule',
          spec3Val: '40%/11 Equal Seat (~3.64%) • 50% Unclaimed Burn / 50% Treasury'
        }
      }
    },
    contact: {
      tagline: 'Contact Us',
      title: 'Get in Touch',
      desc: 'Write to us to get information about our projects, join the ecosystem, or just to have a cup of tea and talk about decentralized ideas. A warm team is waiting for you.',
      name: 'Full Name',
      namePlaceholder: 'John Doe',
      email: 'Email Address',
      emailPlaceholder: 'john@example.com',
      emailLabel: 'Email',
      subject: 'Subject',
      subjectPlaceholder: 'Partnership, Investment, Inquiry...',
      message: 'Your Message',
      messagePlaceholder: 'Share your ideas with us...',
      sendBtn: 'Send Message',
      sending: 'Sending...',
      success: 'Your message has been successfully sent! We will get back to you as soon as possible.',
      successTitle: 'Message Sent',
      errorTitle: 'Error Occurred',
      errorDesc: 'Something went wrong while sending your message. Please try again.'
    },
    footer: {
      tagline: 'Building the Technological Crystals of the Future.',
      corporate: 'Corporate',
      developer: 'Developer & Lab',
      copyright: 'All rights reserved.'
    }
  }
}

export type SupportedLocale = 'tr' | 'en'

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = Object.freeze(['tr', 'en'])

export function isValidLocale(lang: unknown): lang is SupportedLocale {
  return lang === 'tr' || lang === 'en'
}

export function normalizeLocale(lang: unknown): SupportedLocale {
  return isValidLocale(lang) ? lang : 'tr'
}

function getOwnNestedValue(root: Record<string, any> | undefined, keys: string[]): string | undefined {
  let current: any = root
  for (const key of keys) {
    if (
      current !== null &&
      typeof current === 'object' &&
      Object.prototype.hasOwnProperty.call(current, key)
    ) {
      current = current[key]
    } else {
      return undefined
    }
  }
  return typeof current === 'string' ? current : undefined
}

export function resolveTranslation(key: string, lang: unknown = 'tr'): string {
  if (typeof key !== 'string' || key.length === 0) {
    return ''
  }
  const activeLocale = normalizeLocale(lang)
  const keys = key.split('.')

  const localized = getOwnNestedValue(translations[activeLocale], keys)
  if (localized !== undefined) {
    return localized
  }

  const fallback = getOwnNestedValue(translations.tr, keys)
  if (fallback !== undefined) {
    return fallback
  }

  return key
}
