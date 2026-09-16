// NGÂN HÀNG — nơi ở duy nhất về trạng thái kết nối. Thêm bank = thêm 1 dòng; mọi trang/FAQ/docs đọc từ đây.
// status: 'live' = đã tích hợp (VA thật hoặc báo có qua biến động) · 'dang-dang-ky' · 'ke-hoach'. features.va = có tài khoản định danh; qr = VietQR; notify = báo có.
export type BankStatus = 'live' | 'dang-dang-ky' | 'ke-hoach';
export type Bank = { slug: string; name: string; fullName: string; bin: string; status: BankStatus; since?: string; note?: string; page?: boolean; features?: { va: boolean; qr: boolean; notify: boolean } };
export const BANKS: Bank[] = [
  { slug: 'acb', name: "ACB", fullName: "Ngân hàng TMCP Á Châu", bin: '970416', status: 'live', since: '2022', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'bidv', name: "BIDV", fullName: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam", bin: '970418', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'vietinbank', name: "VietinBank", fullName: "Ngân hàng TMCP Công thương Việt Nam", bin: '970415', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'mb', name: "MBBank", fullName: "Ngân hàng TMCP Quân đội", bin: '970422', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'ocb', name: "OCB", fullName: "Ngân hàng TMCP Phương Đông", bin: '970448', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'msb', name: "MSB", fullName: "Ngân hàng TMCP Hàng Hải Việt Nam", bin: '970426', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'kienlongbank', name: "KienLongBank", fullName: "Ngân hàng TMCP Kiên Long", bin: '970452', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'tpbank', name: "TPBank", fullName: "Ngân hàng TMCP Tiên Phong", bin: '970423', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'vpbank', name: "VPBank", fullName: "Ngân hàng TMCP Việt Nam Thịnh Vượng", bin: '970432', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'sacombank', name: "Sacombank", fullName: "Ngân hàng TMCP Sài Gòn Thương Tín", bin: '970403', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'vietcombank', name: "Vietcombank", fullName: "Ngân hàng TMCP Ngoại Thương Việt Nam", bin: '970436', status: 'live', since: '2026', note: "Tài khoản ảo, VietQR động, thông báo giao dịch realtime.", page: true, features: { va: true, qr: true, notify: true } },
  { slug: 'techcombank', name: "Techcombank", fullName: "Ngân hàng TMCP Kỹ thương Việt Nam", bin: '970407', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'agribank', name: "Agribank", fullName: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam", bin: '970405', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'hdbank', name: "HDBank", fullName: "Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh", bin: '970437', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'abbank', name: "ABBANK", fullName: "Ngân hàng TMCP An Bình", bin: '970425', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'eximbank', name: "Eximbank", fullName: "Ngân hàng TMCP Xuất Nhập khẩu Việt Nam", bin: '970431', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'vib', name: "VIB", fullName: "Ngân hàng TMCP Quốc tế Việt Nam", bin: '970441', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'shinhan', name: "ShinhanBank", fullName: "Ngân hàng TNHH MTV Shinhan Việt Nam", bin: '970424', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'lpbank', name: "LPBank", fullName: "Ngân hàng TMCP Lộc Phát Việt Nam", bin: '970449', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'bacabank', name: "BacABank", fullName: "Ngân hàng TMCP Bắc Á", bin: '970409', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'seabank', name: "SeABank", fullName: "Ngân hàng TMCP Đông Nam Á", bin: '970440', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'shb', name: "SHB", fullName: "Ngân hàng TMCP Sài Gòn - Hà Nội", bin: '970443', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'publicbank', name: "PublicBank", fullName: "Ngân hàng TNHH MTV Public Việt Nam", bin: '970439', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'ncb', name: "NCB", fullName: "Ngân hàng TMCP Quốc Dân", bin: '970419', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'woori', name: "Woori", fullName: "Ngân hàng TNHH MTV Woori Việt Nam", bin: '970457', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'vietabank', name: "VietABank", fullName: "Ngân hàng TMCP Việt Á", bin: '970427', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'vietbank', name: "VietBank", fullName: "Ngân hàng TMCP Việt Nam Thương Tín", bin: '970433', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'namabank', name: "NamABank", fullName: "Ngân hàng TMCP Nam Á", bin: '970428', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
  { slug: 'pgbank', name: "PGBank", fullName: "Ngân hàng TMCP Thịnh vượng và Phát triển", bin: '970430', status: 'live', since: '2026', note: "VietQR động, báo có qua biến động số dư.", page: true, features: { va: false, qr: true, notify: true } },
];
export const LIVE_BANKS = BANKS.filter((b) => b.status === 'live');
export const APPLYING_BANKS = BANKS.filter((b) => b.status === 'dang-dang-ky');
export const PLANNED_BANKS = BANKS.filter((b) => b.status === 'ke-hoach');
export const VA_BANKS = BANKS.filter((b) => b.features?.va);
export const BANKS_COUNT = LIVE_BANKS.length;
export const STATUS_LABEL: Record<BankStatus, string> = { live: 'Đã tích hợp', 'dang-dang-ky': 'Đang đăng ký kết nối', 'ke-hoach': 'Trong kế hoạch' };
// Câu dùng chung khắp site (import, không gõ tay). Nhiều bank → nêu vài tên rồi "và N ngân hàng khác".
const _head = LIVE_BANKS.slice(0, 6).map((b) => b.name).join(', ');
export const BANKS_LINE = `MONA Pay đã tích hợp ${LIVE_BANKS.length} ngân hàng, gồm ${_head} và nhiều ngân hàng khác`;
export const BANKS_SHORT = `${LIVE_BANKS.slice(0, 3).map((b) => b.name).join(', ')} và ${LIVE_BANKS.length - 3} ngân hàng khác`;
