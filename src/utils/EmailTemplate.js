export const EmailTemplate = (verificationUrl, fullname) => {
  return `
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Verify your email</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f3f5f7;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <!-- Wrapper -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f5f7;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <!-- Card -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 6px 18px rgba(20,30,60,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:28px 32px 0;text-align:left;">
                <img src="https://res.cloudinary.com/ddi4tcdjn/image/upload/v1770533315/folioo_logo_ytprhe.png" alt="Folioo logo" width="120" height="35" style="display:block;border:0;outline:none;text-decoration:none;" />
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 12px;font-size:22px;line-height:28px;color:#0f1724;font-weight:700;">
                  Verify your email
                </h1>

                <p style="margin:0 0 20px;font-size:15px;line-height:22px;color:#334155;">
                  Hi <strong style="font-weight:600;color:#0f1724;">${fullname}</strong>,<br/>
                  Thanks for signing up for <strong>Folioo</strong>. Please confirm your email address by clicking the button below. This link will expire in 15 minutes.
                </p>

                <!-- CTA Button -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:22px;">
                  <tr>
                    <td align="center">
                      <a href="${verificationUrl}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 22px;background-color:#0066ff;color:#ffffff;font-weight:600;text-decoration:none;border-radius:8px;font-size:15px;">
                        Verify Email
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Fallback link -->
                <p style="margin:22px 0 0;font-size:13px;line-height:20px;color:#475569;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>

                <p style="word-break:break-all;margin:8px 0 0;padding:10px;background:#f8fafc;border:1px solid #e6eef8;border-radius:6px;color:#0f1724;font-size:13px;">
                  <a href="${verificationUrl}" target="_blank" rel="noopener" style="color:#0366d6;text-decoration:underline;">${verificationUrl}</a>
                </p>

                <hr style="border:none;border-top:1px solid #eef2f7;margin:26px 0;" />

                <p style="margin:0;font-size:13px;line-height:20px;color:#64748b;">
                  If you didn't create an account with <strong>Folioo</strong>, you can safely ignore this email. If you need help, contact us at
                  <a href="mailto:support@folioo.com" style="color:#0366d6;text-decoration:underline;">support@folioo.com</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px 28px;background:#fbfdff;text-align:left;">
                <p style="margin:0;font-size:12px;line-height:18px;color:#94a3b8;">
                  © <span style="color:#0f1724;font-weight:600;">Folioo</span> 2026. All rights reserved.<br />
                </p>
              </td>
            </tr>
          </table>
          <!-- /Card -->
        </td>
      </tr>
    </table>
  </body>
</html>
    `;
};
