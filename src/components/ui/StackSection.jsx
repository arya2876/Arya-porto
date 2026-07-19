import PropTypes from 'prop-types';

/**
 * StackSection - efek section "menumpuk" berbasis CSS position: sticky murni.
 * TANPA GSAP pin/scrub: mekanisme tumpuk 100% ditangani compositor browser,
 * jadi ringan dan mulus termasuk di HP (tidak ada listener scroll, tidak ada
 * pengukuran pin, tidak ada pin-spacer).
 *
 * Cara kerja: tiap section sticky top-0 min-h-screen. Saat scroll, section
 * "menempel" di atas viewport, lalu section BERIKUTNYA (yang z-index-nya
 * lebih tinggi via prop `index`) naik menutupinya seperti kartu bertumpuk.
 *
 * WAJIB:
 * - `bg` harus background SOLID (bukan transparan) — section transparan akan
 *   tembus ke section yang sedang tertutup dan tumpukan terlihat berantakan.
 * - `index` berurutan sesuai urutan DOM (section ke-n > section sebelumnya);
 *   salah urut = section naik dari BELAKANG dan tumpukan rusak.
 * - Section terakhir (Contact) pakai `sticky={false}` supaya akhir halaman /
 *   footer mengalir normal dan user tidak "terjebak".
 *
 * Catatan konten tinggi: pakai min-h-screen (bukan height fix) supaya konten
 * yang lebih tinggi dari layar tetap membesar normal. Kalau sebuah section
 * jauh lebih tinggi dari viewport dan bagian bawahnya terasa "tertutup"
 * terlalu cepat oleh section berikutnya, cukup set sticky={false} untuk
 * section itu — knob-nya sudah ada, tanpa rombak kode.
 */
const StackSection = ({
  id,
  index,
  children,
  card = false,
  sticky = true,
  bg = 'bg-light-bg dark:bg-dark-bg',
  className = '',
}) => (
  <section
    id={id}
    // z-index inline dari prop index: Tailwind tidak bisa class dinamis z-{n}
    style={{ zIndex: index }}
    className={[
      sticky ? 'sticky top-0' : 'relative',
      'min-h-screen',
      bg,
      // Gaya "kartu naik": lengkung atas + shadow ke atas + garis tepi halus
      card
        ? 'rounded-t-[2.5rem] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.35)] border-t border-light-border/60 dark:border-white/10'
        : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </section>
);

StackSection.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  card: PropTypes.bool,
  sticky: PropTypes.bool,
  /** WAJIB solid, mis. "bg-light-bg dark:bg-dark-bg" */
  bg: PropTypes.string,
  className: PropTypes.string,
};

export default StackSection;
