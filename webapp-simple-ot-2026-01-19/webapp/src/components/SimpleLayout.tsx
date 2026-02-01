// src/components/SimpleLayout.tsx
import { FC } from 'hono/jsx';

export const SimpleLayout: FC<{ title?: string }> = ({ title, children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>{title || '2026학년도 실습 OT 안내'}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          crossorigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{__html: `
          * {
            -webkit-tap-highlight-color: transparent;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Noto Sans KR", sans-serif;
            background: #f8f9fa;
          }
          .notice-body h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .notice-body ul, .notice-body ol {
            margin-left: 1.5rem;
            margin-bottom: 0.75rem;
          }
          .notice-body li {
            margin-bottom: 0.25rem;
          }
          .notice-body strong {
            font-weight: 600;
            color: #1f2937;
          }
          .notice-body p {
            margin-bottom: 0.75rem;
          }
          .text-red-600 {
            color: #dc2626;
          }
        `}} />
      </head>
      <body class="min-h-screen">
        {children}
      </body>
    </html>
  );
};
