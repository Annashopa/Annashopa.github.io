import { Product } from '../types/index.ts';

export const PRODUCTS: Product[] = [
  // ================= BADMINTON (4 PRODUCTS) =================
  {
    id: 'bmt-01',
    name: 'ANNA AERO-BLITZ PRO X',
    category: 'badminton',
    categoryLabelVi: 'Giày Cầu Lông',
    series: 'Pro Circuit Avant-Garde 2026',
    colorway: 'Obsidian Black / Acid Volt / Raw Gum',
    price: 3650000,
    originalPrice: 4100000,
    shortDesc: 'Đỉnh cao bứt tốc ngang và chuyển hướng tức thì trên thảm đấu chuyên nghiệp.',
    longDesc: 'ANNA AERO-BLITZ PRO X được thiết kế dành cho các vận động viên cầu lông thi đấu tốc độ cao. Bộ đế kép Hexa-Grip từ cao su thiên nhiên chống mài mòn kết hợp thanh ổn định Power-Plate bằng sợi carbon giúp tối ưu lực đẩy khi bật nhảy đập cầu (smash) và hấp thụ chấn động khi tiếp đất.',
    sizes: [39, 40, 41, 42, 43, 44],
    inStock: true,
    stockCount: 18,
    accentColor: '#C8FF2F',
    themeGradient: 'from-[#142210] to-[#0B0D0C]',
    featured: true,
    badge: 'Flagship Speed',
    techHighlights: ['Hexa-Grip Outsole', 'Carbon Power-Plate', 'Aero-Weave Upper', 'Shock-Zero Heel'],
    specs: {
      cushioning: 'Shock-Zero đệm bọt kép đa mật độ',
      upper: 'Vải dệt nguyên khối Aero-Weave gia cố TPU',
      outsole: 'Cao su non tự nhiên Hexa-Grip siêu bám thảm sân',
      weight: '295g (Size 41)',
      drop: '6mm',
      surface: 'Thảm PVC chuyên dụng, sàn gỗ nhà thi đấu'
    }
  },
  {
    id: 'bmt-02',
    name: 'ANNA METEOR STRIKE 7',
    category: 'badminton',
    categoryLabelVi: 'Giày Cầu Lông',
    series: 'Power Badminton Lab · Cyber Edition',
    colorway: 'Glacier Cyan / Matte Carbon / Chrome',
    price: 2890000,
    shortDesc: 'Độ ổn định tối đa cho những pha di chuyển bao sân và bật nhảy liên tục.',
    longDesc: 'Dòng giày dành cho người chơi cầu lông thiên về lối đánh công thủ toàn diện. Khung bảo vệ mắt cá kép Lateral-Claw giữ chân cố định, hạn chế tối đa lật cổ chân khi cứu cầu sát biên lưới hoặc di chuyển lùi gấp.',
    sizes: [38, 39, 40, 41, 42, 43],
    inStock: true,
    stockCount: 12,
    accentColor: '#00E5FF',
    themeGradient: 'from-[#0A1A22] to-[#0B0D0C]',
    techHighlights: ['Lateral-Claw Support', 'High-Elastic Foam', 'Anti-Torsion Bridge'],
    specs: {
      cushioning: 'High-Elastic EVA bọc túi khí nén gót',
      upper: 'Microfiber siêu nhẹ kết hợp lưới thông khí 3D',
      outsole: 'Đế cao su Radial chống trượt đa hướng',
      weight: '310g (Size 41)',
      drop: '7mm',
      surface: 'Thảm thi đấu, sàn đa năng trong nhà'
    }
  },
  {
    id: 'bmt-03',
    name: 'ANNA VORTEX FEATHERLIGHT',
    category: 'badminton',
    categoryLabelVi: 'Giày Cầu Lông',
    series: 'Featherlight Capsule 260g',
    colorway: 'Solar Tangerine / Pitch Black',
    price: 2450000,
    shortDesc: 'Trọng lượng siêu nhẹ chỉ 260g, linh hoạt tối đa cho phản xạ trên lưới.',
    longDesc: 'Mẫu giày nhẹ nhất trong bộ sưu tập cầu lông ANNA, tối ưu cho những tay vợt đánh đôi ở vị trí cầu trước. Phom ôm sát chân cùng hệ thống dây khóa đan chéo mang lại cảm giác thanh thoát như lướt đi trên mặt sân.',
    sizes: [39, 40, 41, 42, 43],
    inStock: true,
    stockCount: 9,
    accentColor: '#FF6B00',
    themeGradient: 'from-[#22130A] to-[#0B0D0C]',
    techHighlights: ['260g Ultralight', 'Dynamic Lacing', 'Hyper-Flex Forefoot'],
    specs: {
      cushioning: 'Đệm vi bọt Polyme đàn hồi thế hệ mới',
      upper: 'Màng Monofilament siêu dai siêu thoáng',
      outsole: 'Đế cao su sống dập rãnh linh hoạt Hyper-Flex',
      weight: '260g (Size 41)',
      drop: '5mm',
      surface: 'Sân thảm cầu lông tiêu chuẩn'
    }
  },
  {
    id: 'bmt-04',
    name: 'ANNA PHANTOM COURT SHADOW',
    category: 'badminton',
    categoryLabelVi: 'Giày Cầu Lông',
    series: 'Tournament Stealth Edition',
    colorway: 'Triple Matte Black / Acid Lime Accents',
    price: 3200000,
    shortDesc: 'Phiên bản thi đấu bóng đêm kết hợp khả năng kháng mòn mũi giày vượt trội.',
    longDesc: 'Được trang bị lớp bọc mũi giày Tough-Skin chống trầy xước gấp 3 lần khi rê chân cứu cầu. Hệ thống chống xoắn Anti-Torque ở gan bàn chân giúp người chơi tự tin thực hiện các pha bật bước chéo nhanh.',
    sizes: [40, 41, 42, 43, 44, 45],
    inStock: true,
    stockCount: 15,
    accentColor: '#C8FF2F',
    themeGradient: 'from-[#171D15] to-[#0B0D0C]',
    techHighlights: ['Tough-Skin Toe Cap', 'Anti-Torque Midsole', 'Comfort Inner Sock'],
    specs: {
      cushioning: 'Đệm gót gel hấp thụ 92% xung chấn',
      upper: 'Sợi tổng hợp phủ lớp bảo vệ Tough-Skin',
      outsole: 'Cao su Non-Marking không lưu dấu sàn',
      weight: '305g (Size 41)',
      drop: '6mm',
      surface: 'Thảm thi đấu quốc tế BWF'
    }
  },

  // ================= TENNIS (4 PRODUCTS) =================
  {
    id: 'tns-01',
    name: 'ANNA COURT-DOMINATOR ACE',
    category: 'tennis',
    categoryLabelVi: 'Giày Tennis',
    series: 'Grand Slam Hard Court Masterpiece',
    colorway: 'Chalk Porcelain / Electric Cobalt / Chrome',
    price: 3950000,
    originalPrice: 4500000,
    shortDesc: 'Độ bám sân cứng huyền thoại và khung ổn định gót chân cho các pha trượt cứu bóng.',
    longDesc: 'Dòng giày tennis thi đấu chuyên nghiệp của ANNA. Thiết kế chịu lực va đập cường độ cao với phần mũi được gia cố lớp cao su nhiệt dẻo Drag-Shield. Khung sườn Dynawall ôm từ cổ chân xuống đế giữa tạo độ vững chãi tuyệt đối trong từng cú giao bóng và đánh thuận tay (forehand).',
    sizes: [39, 40, 41, 42, 43, 44, 45],
    inStock: true,
    stockCount: 14,
    accentColor: '#C8FF2F',
    themeGradient: 'from-[#152316] to-[#0B0D0C]',
    featured: true,
    badge: 'Court Monster',
    techHighlights: ['Drag-Shield Toe', 'Dynawall Chassis', 'All-Court Herringbone', 'Dual-Gel Heel'],
    specs: {
      cushioning: 'Dual-Gel phân bổ trước và sau gan bàn chân',
      upper: 'Vải lưới thoáng khí bọc khung nhựa Polyurethane',
      outsole: 'Đế cao su A-Dura hoa văn xương cá cải tiến',
      weight: '385g (Size 42)',
      drop: '10mm',
      surface: 'Sân cứng (Hard Court), Sân đất nện (Clay)'
    }
  },
  {
    id: 'tns-02',
    name: 'ANNA SPIN-MATRIX PRO',
    category: 'tennis',
    categoryLabelVi: 'Giày Tennis',
    series: 'Clay & Hardcourt Hybrid Tech',
    colorway: 'Monochrome Silver / Hyper Sky Blue',
    price: 3450000,
    shortDesc: 'Tối ưu độ xoáy chân và kiểm soát lực ma sát trên bề mặt sân cứng hiện đại.',
    longDesc: 'Dành cho các tay vợt có lối chơi đánh bóng từ cuối sân (baseline) với nhiều pha trượt ngang đổi hướng. Thân giày sở hữu kết cấu lồng TPU 360 độ hạn chế biến dạng khi phanh gấp ở tốc độ cao.',
    sizes: [40, 41, 42, 43, 44],
    inStock: true,
    stockCount: 10,
    accentColor: '#38BDF8',
    themeGradient: 'from-[#0C1E28] to-[#0B0D0C]',
    techHighlights: ['360 TPU Cage', 'Clay-Master Outsole', 'Responsive Foam'],
    specs: {
      cushioning: 'Bọt xốp năng lượng E-TPU siêu nảy',
      upper: 'Lưới kỹ thuật gia cường sợi Kevlar ở mép chân',
      outsole: 'Hợp chất cao su chống mòn sân cứng cao cấp',
      weight: '390g (Size 42)',
      drop: '9mm',
      surface: 'Mọi mặt sân tiêu chuẩn ITF'
    }
  },
  {
    id: 'tns-03',
    name: 'ANNA BASELINE KINETIC',
    category: 'tennis',
    categoryLabelVi: 'Giày Tennis',
    series: 'Kinetic Stability Lab Architectural',
    colorway: 'Desert Dune / Solar Amber / Jet Black',
    price: 3100000,
    shortDesc: 'Cân bằng hoàn hảo giữa độ êm ái khi đứng nhiều giờ và lực đáp trả mạnh mẽ.',
    longDesc: 'Được chế tạo để bảo vệ đầu gối và cơ bắp người chơi trong các trận đấu kéo dài hơn 3 séc. Đệm lót công thái học có khả năng nhớ hình dạng bàn chân, kết hợp rãnh thoát ẩm giúp chân luôn khô ráo.',
    sizes: [39, 40, 41, 42, 43],
    inStock: true,
    stockCount: 8,
    accentColor: '#F59E0B',
    themeGradient: 'from-[#20170A] to-[#0B0D0C]',
    techHighlights: ['Ergo-Fit Insole', 'Impact-Absorption Pod', 'Side-Armor Protection'],
    specs: {
      cushioning: 'Hệ thống đệm khí nén Pod-Air phân vùng',
      upper: 'Da tổng hợp cao cấp kết hợp lưới dệt kim',
      outsole: 'Đế cao su lưu hóa chịu ma sát cao',
      weight: '370g (Size 42)',
      drop: '8mm',
      surface: 'Sân cứng, sân cỏ nhân tạo'
    }
  },
  {
    id: 'tns-04',
    name: 'ANNA GLIDE-MASTER RUSH',
    category: 'tennis',
    categoryLabelVi: 'Giày Tennis',
    series: 'Speed Baseline Attack Fast-Lane',
    colorway: 'Obsidian / Acid Lime Racing Stripe',
    price: 2950000,
    shortDesc: 'Thiết kế thanh thoát dành cho các tay vợt ưa chuộng lối đánh dâng lưới tấn công.',
    longDesc: 'Dòng giày tennis trọng lượng nhẹ tối ưu khả năng tăng tốc bước một. Cổ giày bo chun co giãn ôm khít cổ chân ngăn cát bụi lọt vào bên trong khi di chuyển trên sân đất nện.',
    sizes: [39, 40, 41, 42, 43, 44],
    inStock: true,
    stockCount: 16,
    accentColor: '#C8FF2F',
    themeGradient: 'from-[#171E13] to-[#0B0D0C]',
    techHighlights: ['Sock-Like Collar', 'Fast-Step Forefoot', 'Anti-Abrasion Compound'],
    specs: {
      cushioning: 'Đệm EVA nhẹ đúc định hình với độ đàn hồi cao',
      upper: 'Vải dệt nguyên khối co giãn 4 chiều',
      outsole: 'Đế đinh dăm mịn đa hướng cho sân cứng và đất nện',
      weight: '350g (Size 42)',
      drop: '8.5mm',
      surface: 'Sân tennis đa năng'
    }
  },

  // ================= RUNNING (4 PRODUCTS) =================
  {
    id: 'run-01',
    name: 'ANNA NITRO-VELOCITY ELITE',
    category: 'running',
    categoryLabelVi: 'Giày Chạy Bộ',
    series: 'Marathon Carbon Racing Lab',
    colorway: 'Cyber Volt / Stealth Carbon / Vapor White',
    price: 4690000,
    originalPrice: 5200000,
    shortDesc: 'Tấm đệm sợi Carbon toàn phần cùng bọt Nitro-Foam siêu nảy cho kỷ lục cự ly Marathon.',
    longDesc: 'Vũ khí chinh phục cự ly 21K và 42K của ANNASHOP. Tấm đĩa carbon uốn cong hình muỗng (Curved Carbon Plate) hoạt động như chiếc lò xo trợ lực, đẩy từng bước chạy về phía trước với hiệu suất hoàn trả năng lượng lên tới 87%. Bọt đệm truyền khí nitơ siêu nhẹ giúp bảo vệ cơ bắp qua từng kilomet.',
    sizes: [39, 40, 41, 42, 43, 44, 45],
    inStock: true,
    stockCount: 22,
    accentColor: '#C8FF2F',
    themeGradient: 'from-[#16270E] to-[#0B0D0C]',
    featured: true,
    badge: 'Marathon Gold',
    techHighlights: ['Full-Length Carbon Plate', 'Nitro-Foam Pro (87% Energy Return)', 'Vapor-Mesh 185g', 'Wet-Traction Rubber'],
    specs: {
      cushioning: 'Bọt Nitro-Foam truyền Nitơ siêu nảy siêu nhẹ',
      upper: 'Vải Vapor-Mesh siêu mỏng mờ, không thấm nước',
      outsole: 'Cao su gai phân tán lực bám đường nhựa cả khi trời mưa',
      weight: '195g (Size 42)',
      drop: '8mm',
      surface: 'Đường nhựa (Road), Đường chạy điền kinh (Track)'
    }
  },
  {
    id: 'run-02',
    name: 'ANNA INFINITY STRIDE 4D',
    category: 'running',
    categoryLabelVi: 'Giày Chạy Bộ',
    series: 'Daily Cushion Long-Run Luxury',
    colorway: 'Deep Amethyst / Cyber Lilac / Silver',
    price: 3350000,
    shortDesc: 'Đệm êm tối đa như lướt trên mây, bảo vệ khớp gối cho cự ly chạy hàng ngày 5K - 15K.',
    longDesc: 'Được thiết kế cho các buổi chạy phục hồi và tập luyện hàng ngày. Phần đế giữa dầy dặn cấu trúc hình học tổ ong triệt tiêu chấn động hiệu quả, đem lại cảm giác êm ái bền bỉ từ kilomet đầu tiên tới kilomet cuối cùng.',
    sizes: [38, 39, 40, 41, 42, 43, 44],
    inStock: true,
    stockCount: 19,
    accentColor: '#A855F7',
    themeGradient: 'from-[#190D24] to-[#0B0D0C]',
    techHighlights: ['Cloud-Max Midsole', 'Padded Heel Collar', 'Durable High-Mileage Outsole'],
    specs: {
      cushioning: 'Hệ thống đệm kép Cloud-Max bọt khí siêu êm',
      upper: 'Vải Engineered Mesh co giãn linh hoạt theo cử động ngón',
      outsole: 'Cao su chịu mài mòn cao cấp cho tuổi thọ trên 1,000 km',
      weight: '255g (Size 42)',
      drop: '10mm',
      surface: 'Đường bê tông, công viên, máy chạy bộ'
    }
  },
  {
    id: 'run-03',
    name: 'ANNA AERO-TEMPO SUB-3',
    category: 'running',
    categoryLabelVi: 'Giày Chạy Bộ',
    series: 'Speed Training & 10K High-Fashion',
    colorway: 'Hyper Magenta / Neon Carbon / Void',
    price: 3600000,
    shortDesc: 'Vũ khí cho những buổi chạy biến tốc (Interval) và Tempo pace cao chuẩn Sub-3.',
    longDesc: 'Dành cho runner muốn cải thiện pace chạy và thử thách ngưỡng giới hạn mới. Thiết kế phom vuốt khí động học giảm lực cản gió, đế ngoài cao su vi tinh thể bám chắc mặt đường khi tăng tốc nước rút.',
    sizes: [39, 40, 41, 42, 43, 44],
    inStock: true,
    stockCount: 11,
    accentColor: '#EC4899',
    themeGradient: 'from-[#220B19] to-[#0B0D0C]',
    techHighlights: ['Rocker Geometry Shape', 'Pebax Energy Foam', 'Ultralight Gusseted Tongue'],
    specs: {
      cushioning: 'Hạt đệm Pebax cao cấp chuyển hóa lực tiếp đất',
      upper: 'Vải lưới ma trận siêu thoáng khí tản nhiệt nhanh',
      outsole: 'Hợp chất cao su siêu bám Micro-Lug',
      weight: '215g (Size 42)',
      drop: '6mm',
      surface: 'Đường nhựa, sân vận động'
    }
  },
  {
    id: 'run-04',
    name: 'ANNA TERRA-APEX TRAIL X',
    category: 'running',
    categoryLabelVi: 'Giày Chạy Bộ',
    series: 'Mountain & All-Terrain Luxury Trail',
    colorway: 'Matte Sage / Acid Moss / Stealth Slate',
    price: 3850000,
    shortDesc: 'Đế gai sâu 5mm bám bùn đất đá cùng màng kháng nước nhẹ cho chạy địa hình trail.',
    longDesc: 'Dành cho những người yêu thích chạy trail leo núi, băng rừng. Tấm bảo vệ Rock-Plate dưới bàn chân ngăn đá nhọn đâm thủng, kết hợp lớp màng Water-Repel chống văng nước bùn lầy trong điều kiện thời tiết khắc nghiệt.',
    sizes: [40, 41, 42, 43, 44, 45],
    inStock: true,
    stockCount: 7,
    accentColor: '#10B981',
    themeGradient: 'from-[#0B1E16] to-[#0B0D0C]',
    techHighlights: ['5mm Deep Lugs', 'Rock-Shield Plate', 'Water-Repel Membrane'],
    specs: {
      cushioning: 'Đệm mật độ kép ổn định trên dốc nghiêng',
      upper: 'Sợi Ripstop chống rách va quẹt cành cây đá sỏi',
      outsole: 'Đế gai sâu 5mm Megagrip bám rêu trơn trượt',
      weight: '290g (Size 42)',
      drop: '5mm',
      surface: 'Đường mòn địa hình (Trail), rừng núi, bùn đất sỏi'
    }
  }
];

export const CATEGORIES = [
  {
    id: 'all',
    labelVi: 'Tất Cả Môn Đấu',
    count: 12
  },
  {
    id: 'badminton',
    labelVi: 'Giày Cầu Lông',
    badge: 'AGILITY & SMASH',
    tagline: 'Tốc độ, bứt phá phản xạ và chuyển hướng tức thì.',
    courtType: 'Thảm PVC thi đấu & Sàn gỗ',
    keyBenefit: 'Chống lật cổ chân & bám sàn tuyệt đối',
    count: 4
  },
  {
    id: 'tennis',
    labelVi: 'Giày Tennis',
    badge: 'POWER & STABILITY',
    tagline: 'Vững chãi trên vạch cuối sân, trượt cứu bóng hoàn hảo.',
    courtType: 'Sân cứng & Sân đất nện',
    keyBenefit: 'Khung Dynawall & Chống mài mòn mũi',
    count: 4
  },
  {
    id: 'running',
    labelVi: 'Giày Chạy Bộ',
    badge: 'PROPULSION & SPEED',
    tagline: 'Trợ lực sợi carbon, giải phóng tiềm năng marathon.',
    courtType: 'Đường nhựa Road & Đường chạy Track',
    keyBenefit: 'Hoàn trả năng lượng 87% & Trọng lượng siêu nhẹ',
    count: 4
  }
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}
