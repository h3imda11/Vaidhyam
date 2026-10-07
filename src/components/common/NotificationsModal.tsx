import React, { useEffect, useState } from 'react';
import { X, Check, Bell, Calendar, HeartPulse, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserNotifications, markNotificationRead } from '../../services/dbService';
import { NotificationItem } from '../../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { userProfile } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen, userProfile]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const list = await getUserNotifications(userProfile?.id, userProfile?.role);
      setNotifications(list);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#143D27]/10 w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0C281B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-[#E06D53]" />
            <h3 className="font-serif text-lg font-semibold tracking-wide">
              Notifications & Updates
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="py-12 text-center text-sm text-[#143D27]/60">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Bell className="w-10 h-10 text-[#143D27]/30 mx-auto" />
              <p className="text-sm font-medium text-[#143D27]">No notifications yet</p>
              <p className="text-xs text-[#143D27]/60">
                You will receive real-time updates regarding your consultations and PDC bookings here.
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border transition-all ${
                  notif.read
                    ? 'bg-white/60 border-[#143D27]/10'
                    : 'bg-white border-[#E06D53]/40 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        notif.type === 'pdc'
                          ? 'bg-[#E06D53]/15 text-[#C4573E]'
                          : notif.type === 'appointment'
                          ? 'bg-[#2C6E49]/15 text-[#2C6E49]'
                          : 'bg-[#143D27]/10 text-[#143D27]'
                      }`}
                    >
                      {notif.type === 'pdc' ? (
                        <HeartPulse className="w-4 h-4" />
                      ) : notif.type === 'appointment' ? (
                        <Calendar className="w-4 h-4" />
                      ) : (
                        <Info className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-[#0C281B]">
                          {notif.title}
                        </h4>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-[#E06D53]" />
                        )}
                      </div>
                      <p className="text-xs text-[#143D27]/80 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <span className="text-[10px] text-[#143D27]/50 mt-2 block">
                        {new Date(notif.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  </div>

                  {!notif.read && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="p-1.5 rounded-lg text-[#2C6E49] hover:bg-[#2C6E49]/10 transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F4EFE6] border-t border-[#143D27]/10 flex items-center justify-between text-xs text-[#143D27]/70">
          <span>In-App Medical Notification Service</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#143D27] text-white rounded-lg hover:bg-[#0C281B] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
