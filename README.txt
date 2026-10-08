# NOIR ATELIER — Website Structure V2

Prototype website B2B custom accessories / merchandise dengan visual luxury, bold, dark, minimal.

## Struktur

/
├── index.html
├── README.txt
├── css/
│   └── style.css
├── js/
│   ├── products.js
│   └── main.js
└── assets/
    ├── keyholder-brown.png
    ├── keyholder-red.png
    ├── keyholder-tan.png
    └── brand-reference.png

## Fitur JavaScript

1. Product catalogue dinamis dari `PRODUCTS`
2. Filter kategori
3. Product detail modal
4. Spesifikasi produk otomatis
5. Request quotation
6. Form project brief
7. Validasi MOQ minimum 100 pcs
8. WhatsApp quotation generator
9. Floating WhatsApp button
10. Mobile navigation
11. FAQ accordion menggunakan `<details>`
12. Scroll reveal animation
13. Sticky header state
14. Page loader

## Hal yang wajib diganti

Edit `js/main.js`:

    whatsappNumber: "6281234567890"

Ganti dengan nomor WhatsApp bisnis tanpa tanda + atau spasi.

Edit `js/products.js` untuk:
- nama produk
- harga awal
- foto
- kategori
- deskripsi
- spesifikasi

Edit `index.html` untuk:
- nama brand
- alamat/email
- social media
- SEO metadata
- copywriting final

## Menjalankan secara lokal

Bisa dibuka langsung dengan `index.html`, tetapi untuk pengembangan disarankan memakai local server.

Jika memakai VS Code:
- install Live Server
- klik kanan `index.html`
- Open with Live Server

## Catatan

Harga Rp35.000 digunakan sebagai "starting from" untuk contoh produk dan bukan harga final seluruh katalog. MOQ website ditetapkan 100 pcs.
