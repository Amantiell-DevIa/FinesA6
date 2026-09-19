/**
 * AUTOMÓVILES FINES - Base de Datos de Vehículos de Ocasión y Seminuevos
 * Modelos con especificaciones completas, distintivos DGT, fotos de estudio,
 * datos de mercado (Deal Rating CarGurus), historial DGT verificado y hotspots de inspección.
 */

const VEHICLES_DATA = [
  {
    id: "AF-101",
    brand: "Audi",
    model: "A3 Sportback",
    version: "35 TFSI S tronic S Line 150 CV Mild Hybrid",
    year: 2022,
    mileage: 38500,
    fuel: "Gasolina / MHEV",
    transmission: "Automático (S tronic)",
    powerCv: 150,
    dgtBadge: "ECO",
    bodyType: "Compacto",
    color: "Gris Daytona Metalizado",
    doors: 5,
    seats: 5,
    cashPrice: 28900,
    financedPrice: 26400,
    monthlyInstallment: 289,
    downPaymentDefault: 3000,
    monthsDefault: 72,
    warrantyMonths: 24,
    location: "Exposición Central",
    isImmediateDelivery: true,
    isFeatured: true,
    inspectionPassed: 150,
    // Datos de Mercado (Deal Rating tipo CarGurus)
    dealRating: "Gran Oferta",
    marketSavings: 1400, // 1.400€ por debajo de la media de mercado en Andalucía
    daysInStock: 5,
    // Historial Oficial DGT / Carfax
    dgtHistory: {
      previousOwners: 1,
      structuralAccidents: 0,
      lienFree: true, // Libre de cargas y embargos
      itvValidUntil: "Mayo 2026",
      origin: "Particular nacional (un solo propietario)"
    },
    // Hotspots interactivos de inspección sobre la foto (estilo Carvana / Clicars)
    hotspots: [
      { x: 30, y: 72, title: "Llanta delantera derecha", desc: "Leve roce de 1.5 cm pulido y lacado en taller propio." },
      { x: 74, y: 55, title: "Paragolpes trasero", desc: "Micro-arañazo superficial sellado sin daño de pintura." }
    ],
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    wearPoints: [
      { area: "Llanta delantera derecha", description: "Leve roce superficial de aparcamiento de 1.5 cm pulido y sellado en taller.", severity: "leve" },
      { area: "Paragolpes trasero", description: "Micro-arañazo superficial apenas visible a 1 metro de distancia.", severity: "leve" }
    ],
    equipment: [
      "Paquete exterior e interior S Line",
      "Faros Audi Matrix LED con intermitentes dinámicos",
      "Audi Virtual Cockpit Plus de 12.3\"",
      "Control de crucero adaptativo (ACC)",
      "Sistema de sonido Audi Sound System con 10 altavoces",
      "Sensores de aparcamiento delanteros y traseros con cámara de marcha atrás",
      "Climatizador automático bizona",
      "Apple CarPlay y Android Auto inalámbricos",
      "Llantas de aleación de 18\" Audi Sport"
    ],
    technicalSpecs: {
      engine: "1.5 TFSI 4 cilindros Turbo Mild-Hybrid",
      displacement: "1.498 cc",
      acceleration: "8.4 s (0-100 km/h)",
      topSpeed: "224 km/h",
      combinedConsumption: "5.6 l/100 km",
      co2Emissions: "128 g/km (WLTP)",
      trunkCapacity: "380 litros",
      tankCapacity: "50 litros"
    }
  },
  {
    id: "AF-102",
    brand: "Mercedes-Benz",
    model: "Clase A",
    version: "A 200 d 8G-DCT AMG Line 150 CV",
    year: 2021,
    mileage: 49200,
    fuel: "Diésel",
    transmission: "Automático (8G-DCT)",
    powerCv: 150,
    dgtBadge: "C",
    bodyType: "Compacto",
    color: "Blanco Polar",
    doors: 5,
    seats: 5,
    cashPrice: 27500,
    financedPrice: 25100,
    monthlyInstallment: 275,
    downPaymentDefault: 2500,
    monthsDefault: 72,
    warrantyMonths: 12,
    location: "Exposición Central",
    isImmediateDelivery: true,
    isFeatured: true,
    inspectionPassed: 150,
    dealRating: "Precio Justo",
    marketSavings: 950,
    daysInStock: 8,
    dgtHistory: {
      previousOwners: 1,
      structuralAccidents: 0,
      lienFree: true,
      itvValidUntil: "Noviembre 2025",
      origin: "Nacional con historial de mantenimiento oficial"
    },
    hotspots: [
      { x: 50, y: 60, title: "Tapicería lateral asiento", desc: "Pliegue natural de uso en cuero ARTICO, tratado con hidratante profesional." }
    ],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
    ],
    wearPoints: [
      { area: "Asiento conductor", description: "Ligero pliegue natural en el cuero del pétalo lateral por uso normal.", severity: "leve" }
    ],
    equipment: [
      "Paquete deportivo AMG Line exterior e interior",
      "Sistema multimedia MBUX con pantalla dual de 10.25\"",
      "Faros LED High Performance",
      "Asistente de frenado activo y mantenimiento de carril",
      "Cámara de marcha atrás con guías dinámicas",
      "Asientos deportivos tapizados en símil de cuero ARTICO / microfibra DINAMICA",
      "Iluminación de ambiente en 64 colores",
      "Llantas de aleación AMG de 18\" con diseño de 5 radios dobles"
    ],
    technicalSpecs: {
      engine: "2.0 Turbo Diésel 4 cilindros",
      displacement: "1.950 cc",
      acceleration: "8.1 s (0-100 km/h)",
      topSpeed: "220 km/h",
      combinedConsumption: "4.8 l/100 km",
      co2Emissions: "127 g/km (WLTP)",
      trunkCapacity: "370 litros",
      tankCapacity: "43 litros"
    }
  },
  {
    id: "AF-103",
    brand: "BMW",
    model: "Serie 3",
    version: "320d xDrive M Sport Aut. 190 CV",
    year: 2021,
    mileage: 56000,
    fuel: "Diésel / MHEV",
    transmission: "Automático (Steptronic 8v)",
    powerCv: 190,
    dgtBadge: "ECO",
    bodyType: "Berlina",
    color: "Azul Portimao Metalizado",
    doors: 4,
    seats: 5,
    cashPrice: 34900,
    financedPrice: 32200,
    monthlyInstallment: 349,
    downPaymentDefault: 4000,
    monthsDefault: 72,
    warrantyMonths: 24,
    location: "Exposición Central",
    isImmediateDelivery: true,
    isFeatured: true,
    inspectionPassed: 150,
    dealRating: "Gran Oferta",
    marketSavings: 1800,
    daysInStock: 3,
    dgtHistory: {
      previousOwners: 1,
      structuralAccidents: 0,
      lienFree: true,
      itvValidUntil: "Julio 2025",
      origin: "Vehículo nacional certificado"
    },
    hotspots: [
      { x: 42, y: 48, title: "Capó frontal", desc: "Piquetes milimétricos de gravilla disimulados con pintura original BMW." }
    ],
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=1200&q=80"
    ],
    wearPoints: [
      { area: "Capó delantero", description: "Dos impactos minúsculos de gravilla en carretera de 1 mm corregidos con pincel original BMW.", severity: "leve" }
    ],
    equipment: [
      "Acabado M Sport con suspensión deportiva M",
      "Tracción integral inteligente BMW xDrive",
      "BMW Live Cockpit Professional con Navegación",
      "Faros BMW LED autoadaptables",
      "Head-Up Display a todo color",
      "Acceso confort sin llave y portón trasero eléctrico",
      "Sensores Parking Assistant con maniobra automática",
      "Llantas de 19\" bicolor de radios dobles M"
    ],
    technicalSpecs: {
      engine: "2.0 TwinPower Turbo 4 cilindros + Mild-Hybrid",
      displacement: "1.995 cc",
      acceleration: "6.9 s (0-100 km/h)",
      topSpeed: "235 km/h",
      combinedConsumption: "5.1 l/100 km",
      co2Emissions: "134 g/km (WLTP)",
      trunkCapacity: "480 litros",
      tankCapacity: "59 litros"
    }
  },
  {
    id: "AF-104",
    brand: "Volkswagen",
    model: "Tiguan",
    version: "2.0 TDI 150 CV DSG R-Line",
    year: 2022,
    mileage: 32400,
    fuel: "Diésel",
    transmission: "Automático (DSG 7v)",
    powerCv: 150,
    dgtBadge: "C",
    bodyType: "SUV",
    color: "Gris Delfín Metalizado",
    doors: 5,
    seats: 5,
    cashPrice: 32500,
    financedPrice: 29900,
    monthlyInstallment: 325,
    downPaymentDefault: 3500,
    monthsDefault: 72,
    warrantyMonths: 12,
    location: "Exposición Central",
    isImmediateDelivery: true,
    isFeatured: true,
    inspectionPassed: 150,
    dealRating: "Gran Oferta",
    marketSavings: 1550,
    daysInStock: 6,
    dgtHistory: {
      previousOwners: 1,
      structuralAccidents: 0,
      lienFree: true,
      itvValidUntil: "Marzo 2026",
      origin: "Concesionario oficial Volkswagen (gerencia)"
    },
    hotspots: [
      { x: 80, y: 68, title: "Borde de maletero", desc: "Protegido con moldura protectora en acero inoxidable." }
    ],
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80"
    ],
    wearPoints: [
      { area: "Borde de carga maletero", description: "Mínimo roce superficial por introducción de equipaje, protegido con moldura cromada nueva.", severity: "leve" }
    ],
    equipment: [
      "Paquete deportivo exterior e interior R-Line",
      "Techo solar panorámico corredizo eléctrico",
      "Faros IQ.LIGHT - LED Matrix con asistente de luz dinámica",
      "Digital Cockpit Pro con pantalla configurable de 10.25\"",
      "Travel Assist con guiado longitudinal y lateral de carril",
      "Climatizador Air Care Climatronic de 3 zonas",
      "Apertura y cierre de portón de maletero 'Easy Open' con pedal virtual",
      "Llantas de aleación de 19\" Valencia"
    ],
    technicalSpecs: {
      engine: "2.0 TDI 4 cilindros Common Rail",
      displacement: "1.968 cc",
      acceleration: "9.3 s (0-100 km/h)",
      topSpeed: "200 km/h",
      combinedConsumption: "5.4 l/100 km",
      co2Emissions: "142 g/km (WLTP)",
      trunkCapacity: "615 litros (ampliable a 1.655 l)",
      tankCapacity: "58 litros"
    }
  },
  {
    id: "AF-105",
    brand: "Peugeot",
    model: "3008",
    version: "1.2 PureTech 130 CV EAT8 Allure Pack",
    year: 2021,
    mileage: 44000,
    fuel: "Gasolina",
    transmission: "Automático (EAT8)",
    powerCv: 130,
    dgtBadge: "C",
    bodyType: "SUV",
    color: "Azul Vértigo",
    doors: 5,
    seats: 5,
    cashPrice: 22900,
    financedPrice: 20900,
    monthlyInstallment: 229,
    downPaymentDefault: 2000,
    monthsDefault: 72,
    warrantyMonths: 12,
    location: "Exposición Central",
    isImmediateDelivery: true,
    isFeatured: false,
    inspectionPassed: 150,
    dealRating: "Precio Justo",
    marketSavings: 700,
    daysInStock: 12,
    dgtHistory: {
      previousOwners: 1,
      structuralAccidents: 0,
      lienFree: true,
      itvValidUntil: "Octubre 2025",
      origin: "Particular nacional"
    },
    hotspots: [
      { x: 62, y: 50, title: "Maneta puerta copiloto", desc: "Leve desgaste estético habitual en lacado pulido." }
    ],
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
    ],
    wearPoints: [
      { area: "Maneta puerta copiloto", description: "Leve desgaste estético habitual en lacado pulido.", severity: "leve" }
    ],
    equipment: [
      "Peugeot i-Cockpit® con cuadro digital personalizable de 12.3\"",
      "Pantalla táctil central HD de 10\" con navegación 3D conectada",
      "Faros Full LED con luces diurnas con diseño de 'colmillos'",
      "Cámara de visión trasera 180° Visiopark 1",
      "Acceso y arranque manos libres (Keyless)",
      "Lunas traseras sobretintadas de privacidad",
      "Llantas de aleación de 18\" diamantadas Detroit"
    ],
    technicalSpecs: {
      engine: "1.2 PureTech 3 cilindros Turbo",
      displacement: "1.199 cc",
      acceleration: "9.7 s (0-100 km/h)",
      topSpeed: "188 km/h",
      combinedConsumption: "6.5 l/100 km",
      co2Emissions: "146 g/km (WLTP)",
      trunkCapacity: "520 litros",
      tankCapacity: "53 litros"
    }
  },
  {
    id: "AF-106",
    brand: "Toyota",
    model: "Yaris Cross",
    version: "120H e-CVT Style 116 CV Híbrido Eléctrico",
    year: 2023,
    mileage: 18200,
    fuel: "Híbrido No Enchufable (HEV)",
    transmission: "Automático (e-CVT)",
    powerCv: 116,
    dgtBadge: "ECO",
    bodyType: "SUV",
    color: "Blanco Perlado con Techo Negro",
    doors: 5,
    seats: 5,
    cashPrice: 24200,
    financedPrice: 22100,
    monthlyInstallment: 239,
    downPaymentDefault: 2500,
    monthsDefault: 72,
    warrantyMonths: 24,
    location: "Exposición Central",
    isImmediateDelivery: true,
    isFeatured: true,
    inspectionPassed: 150,
    dealRating: "Gran Oferta",
    marketSavings: 1250,
    daysInStock: 2,
    dgtHistory: {
      previousOwners: 1,
      structuralAccidents: 0,
      lienFree: true,
      itvValidUntil: "Enero 2027",
      origin: "Particular único dueño con garantía Toyota Relax activa"
    },
    hotspots: [
      { x: 50, y: 50, title: "Estado Reestreno", desc: "Pintura y habitáculo 100% libre de marcas o roces." }
    ],
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
    ],
    wearPoints: [
      { area: "Estado impoluto", description: "Vehículo en estado reestreno sin ningún defecto estético destacable.", severity: "ninguno" }
    ],
    equipment: [
      "Sistema híbrido autorrecargable de 4ª generación de Toyota",
      "Paquete de seguridad activa Toyota Safety Sense 2.5",
      "Control de crucero adaptativo inteligente de rango completo",
      "Faros delanteros y traseros Full LED",
      "Sistema multimedia Toyota Smart Connect con pantalla de 9\"",
      "Cargador inalámbrico para smartphone",
      "Climatizador automático bizona",
      "Llantas de aleación de 18\" bi-tono oscurecidas"
    ],
    technicalSpecs: {
      engine: "1.5 litros 3 cilindros Atkinson + Motor Eléctrico",
      displacement: "1.490 cc",
      acceleration: "11.2 s (0-100 km/h)",
      topSpeed: "170 km/h",
      combinedConsumption: "4.5 l/100 km",
      co2Emissions: "101 g/km (WLTP)",
      trunkCapacity: "397 litros",
      tankCapacity: "36 litros"
    }
  },
  {
    id: "AF-107",
    brand: "Seat",
    model: "León",
    version: "1.5 eTSI 150 CV DSG FR ECO",
    year: 2022,
    mileage: 35100,
    fuel: "Gasolina / MHEV",
    transmission: "Automático (DSG 7v)",
    powerCv: 150,
    dgtBadge: "ECO",
    bodyType: "Compacto",
    color: "Rojo Deseo Especial",
    doors: 5,
    seats: 5,
    cashPrice: 23800,
    financedPrice: 21700,
    monthlyInstallment: 235,
    downPaymentDefault: 2500,
    monthsDefault: 72,
    warrantyMonths: 12,
    location: "Exposición Central",
    isImmediateDelivery: true,
    isFeatured: false,
    inspectionPassed: 150,
    dealRating: "Precio Justo",
    marketSavings: 850,
    daysInStock: 9,
    dgtHistory: {
      previousOwners: 1,
      structuralAccidents: 0,
      lienFree: true,
      itvValidUntil: "Mayo 2026",
      origin: "Nacional con revisiones en servicio oficial SEAT"
    },
    hotspots: [
      { x: 35, y: 78, title: "Bajo de faldón frontal", desc: "Pequeño roce de bordillo de 2 cm completamente pulido." }
    ],
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
    ],
    wearPoints: [
      { area: "Bajo de faldón delantero", description: "Pequeño roce de bordillo de 2 cm completamente disimulado.", severity: "leve" }
    ],
    equipment: [
      "Acabado deportivo FR con chasis dinámico",
      "Digital Cockpit de 10.25\" configurable",
      "Faros Full LED con luz infinita trasera 'Coast-to-Coast'",
      "Selector de modos de conducción SEAT Drive Profile",
      "Sistema de navegación con pantalla táctil de 10\"",
      "Asistente de salida involuntaria de carril y frenada de emergencia",
      "Iluminación ambiental envolvente LED en salpicadero",
      "Llantas de 17\" FR Dynamic"
    ],
    technicalSpecs: {
      engine: "1.5 eTSI 4 cilindros Turbo Mild-Hybrid",
      displacement: "1.498 cc",
      acceleration: "8.4 s (0-100 km/h)",
      topSpeed: "221 km/h",
      combinedConsumption: "5.7 l/100 km",
      co2Emissions: "130 g/km (WLTP)",
      trunkCapacity: "380 litros",
      tankCapacity: "45 litros"
    }
  },
  {
    id: "AF-108",
    brand: "Cupra",
    model: "Formentor",
    version: "1.4 e-HYBRID 204 CV DSG Enchufable",
    year: 2022,
    mileage: 29800,
    fuel: "Híbrido Enchufable (PHEV)",
    transmission: "Automático (DSG 6v)",
    powerCv: 204,
    dgtBadge: "0",
    bodyType: "SUV",
    color: "Gris Graphene Mate",
    doors: 5,
    seats: 5,
    cashPrice: 31900,
    financedPrice: 29300,
    monthlyInstallment: 319,
    downPaymentDefault: 3500,
    monthsDefault: 72,
    warrantyMonths: 24,
    location: "Exposición Central",
    isImmediateDelivery: true,
    isFeatured: true,
    inspectionPassed: 150,
    dealRating: "Gran Oferta",
    marketSavings: 1650,
    daysInStock: 4,
    dgtHistory: {
      previousOwners: 1,
      structuralAccidents: 0,
      lienFree: true,
      itvValidUntil: "Junio 2026",
      origin: "Particular nacional con cable de carga original incluido"
    },
    hotspots: [
      { x: 75, y: 70, title: "Llanta trasera izquierda", desc: "Microroce superficial en el ribete de cobre, repasado en taller." }
    ],
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=1200&q=80"
    ],
    wearPoints: [
      { area: "Llanta trasera izquierda", description: "Microroce superficial en el borde pulido de cobre, repasado en taller.", severity: "leve" }
    ],
    equipment: [
      "Distintivo CERO Emisiones de la DGT (hasta 55 km en modo 100% eléctrico)",
      "Asientos tipo Bucket deportivos en tela y símil de piel con costuras Copper",
      "Faros Full LED con encendido automático y luz de bienvenida",
      "Sistema de navegación con pantalla táctil de 12\"",
      "Cargador inalámbrico para smartphone y conectividad inalámbrica Full Link",
      "Control de crucero adaptativo predictivo",
      "Llantas de aleación de 18\" Sport Black & Silver",
      "Cable de carga Tipo 2 (Mennekes) incluido"
    ],
    technicalSpecs: {
      engine: "1.4 TSI Gasolina + Motor Eléctrico (Batería 12.8 kWh)",
      displacement: "1.395 cc",
      acceleration: "7.8 s (0-100 km/h)",
      topSpeed: "205 km/h",
      combinedConsumption: "1.4 l/100 km",
      co2Emissions: "32 g/km (WLTP)",
      trunkCapacity: "345 litros",
      tankCapacity: "40 litros"
    }
  }
];

const INSPECTION_CATEGORIES = [
  {
    category: "Motor y Mecánica (45 puntos)",
    items: [
      "Prueba de compresión y estanqueidad del bloque motor",
      "Estado de correas de distribución y accesorios",
      "Nivel, calidad y ausencia de fugas de aceite y refrigerante",
      "Funcionamiento del turbo e intercooler",
      "Respuesta del sistema de inyección y bomba de combustible",
      "Diagnóstico electrónico por puerto OBD sin códigos de avería (DTC)",
      "Sistema de escape y filtro antipartículas (DPF/FAP) regenerado"
    ]
  },
  {
    category: "Frenos, Dirección y Neumáticos (35 puntos)",
    items: [
      "Grosor de pastillas de freno > 70% de vida útil",
      "Discos de freno sin alabeo ni rebaba pronunciada",
      "Profundidad de dibujo de neumáticos > 4.5 mm (mínimo legal 1.6 mm)",
      "Alineación computerizada y equilibrado de las 4 ruedas",
      "Amortiguadores y fuelles de suspensión sin pérdidas",
      "Holguras en rótulas, bieletas y cremallera de dirección verificadas"
    ]
  },
  {
    category: "Electrónica, Iluminación y Confort (40 puntos)",
    items: [
      "Funcionamiento de faros LED, intermitentes y luces antiniebla",
      "Prueba de carga y salud de batería (Health > 85%)",
      "Climatizador y compresor de aire acondicionado rindiendo a < 6°C",
      "Pantallas táctiles, cuadro digital y mandos al volante",
      "Asistentes ADAS (Frenada automática, cambio de carril, radares)",
      "Sensores de aparcamiento y cámaras 360°/traseras calibradas"
    ]
  },
  {
    category: "Estructura, Carrocería e Interior (30 puntos)",
    items: [
      "Inspección de largueros y chasis (libre de siniestros estructurales garantizado)",
      "Comprobación de espesor de pintura con micrómetro digital",
      "Ajuste y estanqueidad de juntas de puertas y luna parabrisas",
      "Higienización y desinfección con ozono del habitáculo",
      "Anclajes Isofix, cinturones de seguridad y pretensores pirotécnicos"
    ]
  }
];
