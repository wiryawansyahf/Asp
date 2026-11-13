import React from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  MessageCircle, 
  FileText 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomerOrdersModal: React.FC = () => {
  const { 
    isOrdersOpen, 
    setIsOrdersOpen, 
    orders, 
    currentUser, 
    formatWhatsAppUrl 
  } = useApp();

  if (!isOrdersOpen) return null;

  // Filter orders by current user email if logged in, or show recent orders
  const customerOrders = currentUser
    ? orders.filter((o) => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() || o.customerName === currentUser.name)
    : orders;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Selesai / Dibayar</span>;
      case 'processing':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Sedang Diproses</span>;
      case 'shipped':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">Sedang Dikirim</span>;
      case 'pending_payment':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Menunggu Pembayaran</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Riwayat Pesanan Saya</h3>
              <p className="text-xs text-slate-500">Lacak pengiriman dan bukti transaksi pembelian Anda</p>
            </div>
          </div>

          <button
            onClick={() => setIsOrdersOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {customerOrders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">Belum Ada Pesanan Tercatat</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Setelah Anda menyelesaikan pembelian melalui katalog atau checkout, rincian pesanan akan muncul di sini.
              </p>
            </div>
          ) : (
            customerOrders.map((ord) => (
              <div 
                key={ord.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900 block">
                      {ord.orderNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">{ord.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(ord.orderStatus)}
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      Rp {ord.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-slate-800 truncate block">
                          {item.productName}
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking & Courier */}
                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Kurir: <strong>{ord.courier}</strong></span>
                    {ord.trackingNumber && (
                      <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                        Resi: {ord.trackingNumber}
                      </span>
                    )}
                  </div>

                  <a
                    href={formatWhatsAppUrl(`Halo Admin, saya ingin menanyakan status pesanan dengan Nomor: ${ord.orderNumber}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Tanya CS via WA</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
