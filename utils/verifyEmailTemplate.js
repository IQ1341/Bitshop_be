const verifyEmailTemplate = ({name, url}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifikasi Email - BITSHOP</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f7fafc;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 2px solid #e2e8f0;
            }
            .header img {
                width: 100px;
                height: auto;
            }
            .header h1 {
                color: #2d3748;
                font-size: 24px;
                margin-top: 10px;
            }
            .content {
                color: #4a5568;
                line-height: 1.6;
                padding: 20px 0;
            }
            .content p {
                margin: 10px 0;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                margin: 20px 0;
                font-size: 16px;
                color: #ffffff;
                background-color: #38a169;
                text-decoration: none;
                border-radius: 5px;
                text-align: center;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                color: #718096;
                font-size: 14px;
                border-top: 2px solid #e2e8f0;
                padding-top: 20px;
            }
            .footer a {
                color: #38a169;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://example.com/logo-bibitku.png" alt="BITSHOP Logo">
                <h1>Selamat Datang di BITSHOP!</h1>
            </div>
            <div class="content">
                <p>Halo <strong>${name}</strong>,</p>
                <p>Terima kasih telah bergabung dengan <strong>BITSHOP</strong>, platform jual beli bibit tanaman terbaik. Kami senang Anda menjadi bagian dari komunitas kami!</p>
                <p>Untuk memulai, silakan verifikasi alamat email Anda dengan menekan tombol di bawah ini:</p>
                <a href="${url}" class="button">Verifikasi Email Saya</a>
                <p>Jika tombol di atas tidak berfungsi, Anda dapat menyalin dan menempelkan tautan berikut ke browser Anda:</p>
                <p><a href="${url}">${url}</a></p>
                <p>Jika Anda tidak membuat akun ini, silakan abaikan email ini.</p>
            </div>
            <div class="footer">
                <p>Jika Anda memiliki pertanyaan, jangan ragu untuk <a href="mailto:support@bibitku.com">menghubungi tim dukungan kami</a>.</p>
                <p>&copy; 2023 BITSHOP. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};


export default verifyEmailTemplate