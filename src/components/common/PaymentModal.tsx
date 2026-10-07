import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Building, QrCode, Lock } from 'lucide-react';
import { PaymentStatus } from '../../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  itemDescription: string;
  amount: number;
  bookingRef: string;
  onSuccess: (paymentStatus: PaymentStatus, paymentId: string) => void;
  allowPayAtClinic?: boolean;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  title,
  itemDescription,
  amount,
  bookingRef,
  onSuccess,
  allowPayAtClinic = true,
}) => {
  const [method, setMethod] = useState<'razorpay' | 'clinic'>('razorpay');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{ id: string; timestamp: string } | null>(null);

  if (!isOpen) return null;

  const handleProcessPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      if (method === 'razorpay') {
        const generatedPaymentId = `pay_rzp_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;
        setPaymentDetails({
          id: generatedPaymentId,
          timestamp: new Date().toISOString(),
        });
        setCompleted(true);
        setProcessing(false);
        setTimeout(() => {
          onSuccess('paid', generatedPaymentId);
        }, 1200);
      } else {
        const clinicRef = `pay_clinic_${bookingRef}`;
        setPaymentDetails({
          id: clinicRef,
          timestamp: new Date().toISOString(),
        });
        setCompleted(true);
        setProcessing(false);
        setTimeout(() => {
          onSuccess('pay_at_clinic', clinicRef);
        }, 1200);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#143D27]/10 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0C281B] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full hover:bg-white/10 text-white/80"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C29B38] mb-1">
            <Lock className="w-3.5 h-3.5" />
            256-Bit Encrypted Healthcare Checkout
          </div>
          <h3 className="font-serif text-2xl font-bold">{title}</h3>
          <p className="text-sm text-[#FAF8F5]/80 mt-1">{itemDescription}</p>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-[#FAF8F5]/70">Reference: {bookingRef}</span>
            <div className="text-right">
              <span className="text-xs text-[#FAF8F5]/70 block">Total Payable</span>
              <span className="text-2xl font-bold font-serif text-white">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {completed ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-[#2C6E49]/15 text-[#2C6E49] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#0C281B]">
                {method === 'razorpay' ? 'Payment Verified Successfully' : 'Reservation Confirmed'}
              </h4>
              <p className="text-xs text-[#143D27]/80 max-w-xs mx-auto">
                {method === 'razorpay'
                  ? `Payment ID: ${paymentDetails?.id}. Transaction registered in secure clinical ledger.`
                  : 'You may complete payment during consultation or prior to first care session.'}
              </p>
              <div className="text-[11px] text-[#2C6E49] font-medium pt-2">
                Syncing your booking schedule...
              </div>
            </div>
          ) : (
            <>
              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#143D27] uppercase tracking-wider block">
                  Select Payment Option
                </label>

                {/* Razorpay Online */}
                <div
                  onClick={() => setMethod('razorpay')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    method === 'razorpay'
                      ? 'border-[#2C6E49] bg-white shadow-sm ring-1 ring-[#2C6E49]'
                      : 'border-[#143D27]/10 bg-white/60 hover:border-[#143D27]/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2C6E49]/10 flex items-center justify-center text-[#2C6E49]">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#0C281B] flex items-center gap-2">
                          <span>Razorpay Secure Online Gateway</span>
                          <span className="text-[10px] bg-[#2C6E49]/10 text-[#2C6E49] px-2 py-0.5 rounded-full font-bold">
                            Instant Confirmation
                          </span>
                        </div>
                        <p className="text-xs text-[#143D27]/70 mt-0.5">
                          UPI (GPay, PhonePe, Paytm), NetBanking, Debit & Credit Cards
                        </p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      checked={method === 'razorpay'}
                      onChange={() => setMethod('razorpay')}
                      className="mt-1 text-[#2C6E49] focus:ring-[#2C6E49]"
                    />
                  </div>
                </div>

                {/* Pay at Clinic */}
                {allowPayAtClinic && (
                  <div
                    onClick={() => setMethod('clinic')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      method === 'clinic'
                        ? 'border-[#2C6E49] bg-white shadow-sm ring-1 ring-[#2C6E49]'
                        : 'border-[#143D27]/10 bg-white/60 hover:border-[#143D27]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E06D53]/10 flex items-center justify-center text-[#C4573E]">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[#0C281B]">
                            Pay at Clinic / Post-Consultation
                          </div>
                          <p className="text-xs text-[#143D27]/70 mt-0.5">
                            Reserve slot now and settle fees upon physical arrival or via direct bank transfer
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={method === 'clinic'}
                        onChange={() => setMethod('clinic')}
                        className="mt-1 text-[#2C6E49] focus:ring-[#2C6E49]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Security badges */}
              <div className="p-3 bg-[#E8F5E9] rounded-xl flex items-center gap-2.5 text-xs text-[#143D27]">
                <ShieldCheck className="w-5 h-5 text-[#2C6E49] flex-shrink-0" />
                <span className="leading-tight">
                  Razorpay PCI-DSS Level 1 compliant gateway. Card & banking credentials are never stored on Vaidyam servers.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProcessPayment}
                  disabled={processing}
                  className="w-full py-3.5 bg-[#E06D53] hover:bg-[#C4573E] text-white font-medium rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connecting with Payment Gateway...
                    </span>
                  ) : method === 'razorpay' ? (
                    `Pay ₹${amount.toLocaleString('en-IN')} Securely`
                  ) : (
                    'Confirm Slot & Pay at Clinic'
                  )}
                </button>

                <button
                  onClick={onClose}
                  disabled={processing}
                  className="w-full py-2.5 text-xs font-semibold text-[#143D27]/70 hover:text-[#0C281B] transition-colors"
                >
                  Cancel and Return
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
