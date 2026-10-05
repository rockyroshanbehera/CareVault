import React, { useState, useMemo } from 'react';
import {
  Pill,
  Search,
  MapPin,
  Phone,
  Truck,
  Clock,
  Star,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';

export const PharmacyFinderPage: React.FC = () => {
  const { pharmacies } = useCareVault();

  const [searchQuery, setSearchQuery] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [onlyDelivery, setOnlyDelivery] = useState(false);

  const filteredPharmacies = useMemo(() => {
    return pharmacies.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesOpen = !onlyOpen || p.isOpen;
      const matchesDelivery = !onlyDelivery || p.hasDelivery;

      return matchesSearch && matchesOpen && matchesDelivery;
    });
  }, [pharmacies, searchQuery, onlyOpen, onlyDelivery]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Nearby Pharmacies & Medical Stores
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Find 24/7 chemists, verified medicine stock, and home delivery across your locality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SafetyNotice />

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pharmacy name or locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
            />
          </div>

          <button
            onClick={() => setOnlyOpen(!onlyOpen)}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              onlyOpen
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Clock className={`w-4 h-4 ${onlyOpen ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>Open Right Now (24/7)</span>
          </button>

          <button
            onClick={() => setOnlyDelivery(!onlyDelivery)}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              onlyDelivery
                ? 'bg-brand-50 border-brand-400 text-brand-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Truck className={`w-4 h-4 ${onlyDelivery ? 'text-brand-600' : 'text-slate-400'}`} />
            <span>Home Delivery Available</span>
          </button>
        </div>
      </div>

      {/* Pharmacy Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {filteredPharmacies.length} Pharmacies Near You
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map((pharm) => (
            <div
              key={pharm.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft hover:shadow-card hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{pharm.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        {pharm.rating}
                      </span>
                      <span>({pharm.reviewCount})</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">{pharm.distanceKm} km away</span>
                    </div>
                  </div>

                  <Badge variant={pharm.isOpen ? 'success' : 'neutral'}>
                    {pharm.isOpen ? 'Open Now' : 'Closed'}
                  </Badge>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <p className="text-slate-600 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{pharm.address}</span>
                  </p>

                  <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500">Working Hours:</span>
                    <span className="font-bold text-slate-800">{pharm.openingHours}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Stock Availability:</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {pharm.medicineStockStatus}
                    </span>
                  </div>

                  {pharm.hasDelivery && (
                    <div className="p-2 rounded-lg bg-brand-50 border border-brand-100 text-[11px] text-brand-900 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span>Home Delivery in ~{pharm.deliveryTimeMin} mins</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${pharm.phone}`}
                  className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
                <button
                  onClick={() => alert(`Directions opened for ${pharm.name}`)}
                  className="py-2.5 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};