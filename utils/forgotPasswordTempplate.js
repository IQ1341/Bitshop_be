const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password - BITSHOP</title>
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
                // text-align: center; /* Pusatkan teks */
            }
            .content p {
                margin: 10px 0;
            }
            .otp-container {
                display: flex;
                justify-content: center; /* Pusatkan kotak OTP */
                margin: 20px 0;
            }
            .otp {
                display: inline-block;
                padding: 12px 24px;
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;
                background-color: #38a169;
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
                <img src="https://example.com/logo-BITSHOP.png" alt="BITSHOP Logo">
                <h1>Reset Password - BITSHOP</h1>
            </div>
            <div class="content">
                <p>Halo <strong>${name}</strong>,</p>
                <p>Kami menerima permintaan untuk mereset password akun BITSHOP Anda. Berikut adalah kode OTP (One-Time Password) Anda:</p>
                <div class="otp-container">
                    <div class="otp">${otp}</div>
                </div>
                <p>Kode ini akan kedaluwarsa dalam <strong>10 menit</strong>. Jangan bagikan kode ini kepada siapa pun.</p>
                <p>Jika Anda tidak meminta reset password, silakan abaikan email ini atau <a href="mailto:support@BITSHOP.com">hubungi tim dukungan kami</a>.</p>
            </div>
            <div class="footer">
                <p>Jika Anda memiliki pertanyaan, jangan ragu untuk <a href="mailto:support@BITSHOP.com">menghubungi tim dukungan kami</a>.</p>
                <p>&copy; 2023 BITSHOP. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export default forgotPasswordTemplate

