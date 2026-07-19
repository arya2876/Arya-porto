import { useEffect, useRef, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';

/**
 * PdfThumbnail — render halaman 1 PDF sebagai gambar canvas.
 *
 * Cara kerja:
 * 1. Load PDF.js secara dynamic (lazy) supaya tidak membebani bundle utama.
 * 2. Ambil halaman pertama PDF dari URL (Supabase Storage).
 * 3. Render ke <canvas> dengan viewport yang di-scale otomatis.
 * 4. Tampilkan canvas seperti gambar biasa.
 *
 * Props:
 *  url        — URL PDF publik (dari Supabase Storage)
 *  className  — className tambahan untuk wrapper div
 *  scale      — skala render (default 1.5; lebih besar = lebih tajam)
 */
const PdfThumbnail = ({ url, className = '', scale = 1.5 }) => {
    const canvasRef = useRef(null);
    const [status, setStatus] = useState('loading'); // 'loading' | 'done' | 'error'

    useEffect(() => {
        if (!url) { setStatus('error'); return; }
        let cancelled = false;

        async function render() {
            try {
                // Dynamic import — hanya load PDF.js saat komponen ini dipakai
                const pdfjsLib = await import('pdfjs-dist');

                // Worker: gunakan versi yang sama via CDN (tidak perlu bundling worker)
                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

                const loadingTask = pdfjsLib.getDocument({
                    url,
                    // Hindari CORS preflight untuk Supabase Storage
                    withCredentials: false,
                });
                const pdf = await loadingTask.promise;
                if (cancelled) return;

                const page = await pdf.getPage(1);
                if (cancelled) return;

                const canvas = canvasRef.current;
                if (!canvas) return;

                const viewport = page.getViewport({ scale });
                const ctx = canvas.getContext('2d');

                // Set ukuran canvas sesuai PDF page
                canvas.width  = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: ctx, viewport }).promise;
                if (!cancelled) setStatus('done');
            } catch (err) {
                console.warn('[PdfThumbnail] render error:', err.message);
                if (!cancelled) setStatus('error');
            }
        }

        render();
        return () => { cancelled = true; };
    }, [url, scale]);

    if (status === 'error') {
        // Fallback: ikon PDF jika gagal render
        return (
            <div className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}>
                <FaFilePdf className="w-10 h-10 text-red-400" />
                <span className="text-xs text-slate-400">PDF Document</span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading spinner */}
            {status === 'loading' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900">
                    <div className="w-7 h-7 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-slate-400">Rendering PDF…</span>
                </div>
            )}

            {/* Canvas — rendered PDF page 1 */}
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    objectFit: 'cover',
                    display: status === 'done' ? 'block' : 'none',
                }}
            />
        </div>
    );
};

export default PdfThumbnail;
