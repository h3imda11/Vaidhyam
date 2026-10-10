import React from 'react';
import { X, ExternalLink, ShoppingBag, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface ShopifyStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopifyStoreModal: React.FC<ShopifyStoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const curatedProducts = [
    {
      id: 'p1',
      name: 'Mathruka Dhanwantharam Kuzhambu',
      category: 'Postnatal Mother Care',
      volume: '450 ml',
      price: '₹780',
      description: 'Classical medicated oil preparation for maternal full-body abhyanga, formulated with bala roots and sesame oil to ease muscle fatigue.',
      badge: 'Bestseller',
    },
    {
      id: 'p2',
      name: 'Virgin Coconut Nalpamaradi Infant Oil',
      category: 'Baby Massage & Skin Care',
      volume: '200 ml',
      price: '₹540',
      description: 'Traditional four-bark ficus infusion in extra-virgin coconut oil. Gentle, hypoallergenic skin barrier protection for tender infants.',
      badge: 'Pediatric Grade',
    },
    {
      id: 'p3',
      name: 'Sowbhagya Shunti Postpartum Lehyam',
      category: 'Digestive & Lactation Rasayana',
      volume: '500 g',
      price: '₹650',
      description: 'Ginger, jaggery, and carminative herbs supporting healthy maternal digestive fire (Agni) and balanced lactation.',
      badge: 'Classical Recipe',
    },
    {
      id: 'p4',
      name: 'Garbha Samskara Mindful Herbal Tea',
      category: 'Prenatal Wellness',
      volume: '150 g',
      price: '₹420',
      description: 'Caffeine-free organic infusion of fennel, coriander seeds, and dry ginger to calm evening nausea and promote hydration.',
      badge: 'Organic Certified',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FFFCF7] rounded-3xl shadow-2xl border border-[#E4EAE4] w-full max-w-3xl overflow-hidden text-left flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-white border-b border-[#E4EAE4] flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F0E8] text-[#245B45] text-[11px] font-semibold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-[#F17C70]" />
              <span>Vaidhyam Wellness Store</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#245B45]">
              Curated Ayurvedic Formulations
            </h2>
            <p className="text-xs text-[#69766E]">
              Authentic herbal oils, postpartum lehyams, and gentle infant care preparations.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#69766E] hover:bg-[#E8F0E8]/50 hover:text-[#25352E] transition-colors"
            aria-label="Close store modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Products List */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="p-4 rounded-2xl bg-[#E8F0E8]/40 border border-[#E4EAE4] flex items-center justify-between gap-4">
            <div className="text-xs text-[#25352E] space-y-0.5">
              <span className="font-semibold text-[#245B45] block">Shopify Storefront Integration</span>
              <p className="text-[#69766E]">
                All store orders are securely processed and fulfilled through our official Shopify online store with home delivery across India.
              </p>
            </div>
            <a
              href="https://shopify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#245B45] hover:bg-[#1b4634] text-white px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 flex-shrink-0 transition-colors shadow-xs"
            >
              <span>Visit Shopify Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {curatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-5 rounded-2xl border border-[#E4EAE4] hover:border-[#34765A]/40 transition-all shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#34765A] bg-[#E8F0E8] px-2 py-0.5 rounded">
                      {product.badge}
                    </span>
                    <span className="text-xs font-bold text-[#F17C70]">
                      {product.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#245B45]">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-[#69766E] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E4EAE4] flex items-center justify-between text-[11px] text-[#69766E]">
                  <span>Size: {product.volume}</span>
                  <a
                    href="https://shopify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#245B45] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View on Store</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[#69766E] text-center pt-2">
            Physician guidance note: Always consult with our attending doctor before starting any internal herbal formulations during pregnancy.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E4EAE4] flex items-center justify-between">
          <span className="text-xs text-[#69766E]">
            Secure checkout powered by Shopify
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-medium text-[#25352E] hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
