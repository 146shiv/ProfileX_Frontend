import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';









const cardTypeToPath = {
  vehicle: 'vehicle-card',
  business: 'business-card',
  brand: 'brand-card',
  personal: 'card',
  event: 'card',
  custom: 'card',
};

export const QRCodeCard = ({
  card,
  onDownload,
  size = 200,
  showDownload = true,
  publicUrl,
}) => {
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    if (qrRef.current) {
      const svg = qrRef.current.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
          canvas.width = size * 2;
          canvas.height = size * 2;
          ctx?.drawImage(img, 0, 0, size * 2, size * 2);

          const pngFile = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.download = `${card.name}-qr-code.png`;
          downloadLink.href = pngFile;
          downloadLink.click();

          if (onDownload) onDownload();
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      }
    }
  };

  const cardUrl = typeof publicUrl === 'string' && publicUrl
    ? publicUrl
    : `${window.location.origin}/${cardTypeToPath[card.type] || 'card'}/${card.id}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-sm">
        <QRCodeSVG
          value={cardUrl}
          size={size}
          level="H"
          includeMargin={true} />
        
      </div>
      {showDownload &&
      <button
        onClick={downloadQRCode}
        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
        
          <Download className="w-4 h-4" />
          Download QR Code
        </button>
      }
    </div>);

};