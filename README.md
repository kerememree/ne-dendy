# Ne Dendy? — Anket İçgörü Paneli

Dendy.ai için geliştirilmiş B2B yönetici dashboard'u. Anket katılımcılarından toplanan ve AI tarafından etiketlenmiş yanıtları içgörü kartları olarak sunar.

## Nasıl Çalıştırılır

```bash
git clone https://github.com/kerememree/ne-dendy.git
cd ne-dendy
npm install
npm run dev
# Tarayıcıda http://localhost:5173
```

## Teknik Tercihler

- **Vite + React 18 + TypeScript** — Hızlı HMR, tip güvenliği, modern build pipeline
- **Tailwind CSS** — Utility-first ile tutarlı dark theme, B2B estetiği
- **papaparse** — Büyük CSV dosyaları için streaming-uyumlu, robust parse
- **recharts** — React-native, SVG tabanlı, Tailwind renkleriyle uyumlu grafik kütüphanesi

## Özellikler

- CSV'yi fetch + papaparse ile runtime'da okuma (hardcode yok)
- `should_display = t` filtresi — sadece ilgili kayıtlar gösterilir
- İçgörü kartları: label, note, sentiment, severity bar, action badge, themes
- Action önceliklendirmesi: escalate → follow_up → watch → ignore (renkli gruplar)
- Sentiment filtresi (olumlu / olumsuz / nötr)
- Tema filtreleme (tıklanabilir chip'ler)
- Anket özet kartı: toplam içgörü, katılımcı, ort. skor, risk bayrakları
- Duygu dağılım grafiği (Pie chart + progress bars)
- Loading ve empty state UI

## Yapılamayanlar / Bilinen Eksikler

- Mobil responsive optimizasyon 
- Tarih bazlı sıralama / filtreleme eklenmedi

