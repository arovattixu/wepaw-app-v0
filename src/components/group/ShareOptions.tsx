import React from 'react';
import { Share2, MessageCircle, Copy } from 'lucide-react';

interface ShareOptionsProps {
  groupId: string;
}

export function ShareOptions({ groupId }: ShareOptionsProps) {
  const shareUrl = `https://wepaw.com/group/${groupId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // TODO: Show success toast
    } catch (err) {
      // TODO: Show error toast
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my WePaw group purchase!',
          text: 'Join me to save on premium pet supplies!',
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">Share with Friends</h4>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleShare}
          className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Share2 size={20} className="text-gray-600" />
          <span>Share</span>
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <Copy size={20} className="text-gray-600" />
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  );
}