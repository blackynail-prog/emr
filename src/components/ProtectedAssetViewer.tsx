// src/components/ProtectedAssetViewer.tsx
import { FC } from 'hono/jsx';

// 프론트엔드 전용 컴포넌트이므로 서버에서는 플레이스홀더만 렌더링
export const ProtectedAssetViewer: FC<{
  hospitalId: string;
  pdfPath?: string;
  imagePath?: string;
  videoPath?: string;
}> = ({ hospitalId, pdfPath, imagePath, videoPath }) => {
  return (
    <div id="protected-asset-viewer" data-hospital-id={hospitalId} data-pdf={pdfPath} data-image={imagePath} data-video={videoPath}>
      <div class="grid gap-3">
        {pdfPath && (
          <button
            class="protected-asset-btn w-full p-4 rounded-xl border border-gray-300 bg-white font-bold text-base flex justify-between items-center gap-3 hover:bg-gray-50 transition-colors"
            data-type="pdf"
            data-path={pdfPath}
          >
            <span>📄 PDF 열기</span>
            <span class="text-gray-500">열기</span>
          </button>
        )}
        
        {videoPath && (
          <button
            class="protected-asset-btn w-full p-4 rounded-xl border border-gray-300 bg-white font-bold text-base flex justify-between items-center gap-3 hover:bg-gray-50 transition-colors"
            data-type="video"
            data-path={videoPath}
          >
            <span>🎬 영상 보기</span>
            <span class="text-gray-500">재생</span>
          </button>
        )}
        
        {imagePath && (
          <button
            class="protected-asset-btn w-full p-4 rounded-xl border border-gray-300 bg-white font-bold text-base flex justify-between items-center gap-3 hover:bg-gray-50 transition-colors"
            data-type="image"
            data-path={imagePath}
          >
            <span>🖼️ 사진 보기</span>
            <span class="text-gray-500">보기</span>
          </button>
        )}
      </div>
      
      {/* 에러 메시지 표시 영역 */}
      <div id="asset-error" class="hidden mt-4 p-4 rounded-xl border border-red-300 bg-red-50">
        <div class="font-bold text-red-900" id="asset-error-text"></div>
        <div class="text-sm text-red-700 mt-2 opacity-70">
          (401이면 로그인 만료, 403이면 다른 병원 코드로 접속한 상태일 수 있어요.)
        </div>
      </div>

      {/* 모달 */}
      <div id="asset-modal" class="hidden fixed inset-0 bg-black bg-opacity-55 flex justify-center items-center p-4 z-[9999]">
        <div class="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col" onclick="event.stopPropagation()">
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <div class="font-bold text-lg" id="asset-modal-title"></div>
            <button id="asset-modal-close" class="px-4 py-2 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-colors">
              닫기
            </button>
          </div>
          <div class="p-4 overflow-auto flex-1">
            <div class="flex gap-2 justify-end mb-3">
              <button id="asset-modal-newtab" class="px-4 py-2 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                새 창으로 열기
              </button>
            </div>
            <div id="asset-modal-content"></div>
          </div>
        </div>
      </div>

      {/* 클라이언트 스크립트 */}
      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          if (typeof window === 'undefined') return;
          
          const TOKEN_KEY = "ot_token";
          let currentBlobUrl = null;
          
          function getToken() {
            return localStorage.getItem(TOKEN_KEY);
          }
          
          async function authFetch(url) {
            const token = getToken();
            const headers = {};
            if (token) headers["Authorization"] = "Bearer " + token;
            
            const res = await fetch(url, { method: "GET", headers });
            if (!res.ok) throw new Error("자산 다운로드 실패 (" + res.status + ")");
            return await res.blob();
          }
          
          function guessKind(path) {
            const p = path.toLowerCase();
            if (p.endsWith(".pdf")) return "pdf";
            if (p.endsWith(".mp4") || p.endsWith(".webm") || p.endsWith(".mov")) return "video";
            return "image";
          }
          
          function showError(msg) {
            const errorDiv = document.getElementById("asset-error");
            const errorText = document.getElementById("asset-error-text");
            errorText.textContent = msg;
            errorDiv.classList.remove("hidden");
            setTimeout(() => errorDiv.classList.add("hidden"), 5000);
          }
          
          function showModal(title, kind, blobUrl) {
            if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
            currentBlobUrl = blobUrl;
            
            const modal = document.getElementById("asset-modal");
            const modalTitle = document.getElementById("asset-modal-title");
            const modalContent = document.getElementById("asset-modal-content");
            const newTabBtn = document.getElementById("asset-modal-newtab");
            
            modalTitle.textContent = title;
            modal.classList.remove("hidden");
            
            modalContent.innerHTML = "";
            
            if (kind === "pdf") {
              const iframe = document.createElement("iframe");
              iframe.src = blobUrl;
              iframe.style.width = "100%";
              iframe.style.height = "72vh";
              iframe.style.border = "1px solid rgba(0,0,0,0.1)";
              iframe.style.borderRadius = "12px";
              modalContent.appendChild(iframe);
            } else if (kind === "image") {
              const img = document.createElement("img");
              img.src = blobUrl;
              img.style.width = "100%";
              img.style.borderRadius = "12px";
              img.style.border = "1px solid rgba(0,0,0,0.1)";
              modalContent.appendChild(img);
            } else if (kind === "video") {
              const video = document.createElement("video");
              video.src = blobUrl;
              video.controls = true;
              video.playsInline = true;
              video.style.width = "100%";
              video.style.borderRadius = "12px";
              video.style.border = "1px solid rgba(0,0,0,0.1)";
              modalContent.appendChild(video);
            }
            
            newTabBtn.onclick = () => window.open(blobUrl, "_blank", "noopener,noreferrer");
          }
          
          function closeModal() {
            const modal = document.getElementById("asset-modal");
            modal.classList.add("hidden");
            if (currentBlobUrl) {
              URL.revokeObjectURL(currentBlobUrl);
              currentBlobUrl = null;
            }
          }
          
          async function openAsset(hospitalId, path, title) {
            const fullPath = "/protected/" + hospitalId + "/" + path;
            
            try {
              const blob = await authFetch(fullPath);
              const blobUrl = URL.createObjectURL(blob);
              const kind = guessKind(path);
              showModal(title, kind, blobUrl);
            } catch (err) {
              showError(err.message || "파일을 여는 중 오류가 발생했습니다.");
            }
          }
          
          document.addEventListener("DOMContentLoaded", function() {
            const viewer = document.getElementById("protected-asset-viewer");
            if (!viewer) return;
            
            const hospitalId = viewer.dataset.hospitalId;
            
            const buttons = document.querySelectorAll(".protected-asset-btn");
            buttons.forEach(btn => {
              btn.addEventListener("click", function() {
                const type = this.dataset.type;
                const path = this.dataset.path;
                let title = "파일 보기";
                
                if (type === "pdf") title = "PDF 열기";
                else if (type === "video") title = "영상 보기";
                else if (type === "image") title = "사진 보기";
                
                openAsset(hospitalId, path, title);
              });
            });
            
            const closeBtn = document.getElementById("asset-modal-close");
            const modal = document.getElementById("asset-modal");
            
            if (closeBtn) closeBtn.onclick = closeModal;
            if (modal) modal.onclick = closeModal;
            
            document.addEventListener("keydown", function(e) {
              if (e.key === "Escape") closeModal();
            });
          });
        })();
      `}} />
    </div>
  );
};
