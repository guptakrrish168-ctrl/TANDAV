/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BIKES_DATA, DEALERS_DATA } from "../data/bikesData";
import { Booking } from "../types";
import { Calendar, Clock, MapPin, Phone, Check, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

interface TestRideSectionProps {
  preselectedModelId?: string | null;
}

export default function TestRideSection({ preselectedModelId }: TestRideSectionProps) {
  // Cities list
  const cities = ["Bengaluru", "Mumbai", "Delhi NCR", "Pune", "Chennai", "Kochi"];

  // Booking form state
  const [selectedModelId, setSelectedModelId] = useState<string>(
    preselectedModelId || BIKES_DATA[0].id
  );
  const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [preferredSlot, setPreferredSlot] = useState<string>("morning");

  // Success Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Filter dealer by city selection
  const activeDealer = DEALERS_DATA.find((d) => d.city === selectedCity) || DEALERS_DATA[0];
  const activeBike = BIKES_DATA.find((b) => b.id === selectedModelId) || BIKES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !preferredDate) return;

    const newBooking: Booking = {
      id: "TD_" + Math.floor(100000 + Math.random() * 900000),
      modelId: selectedModelId,
      modelName: activeBike.name,
      dealerCity: selectedCity,
      dealerName: activeDealer.name,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredDate,
      preferredSlot: preferredSlot.toUpperCase(),
      createdAt: new Date().toLocaleDateString("en-IN"),
    };

    // Save to local storage
    const existing = localStorage.getItem("tandav_bookings");
    const bookingsList = existing ? JSON.parse(existing) : [];
    bookingsList.push(newBooking);
    localStorage.setItem("tandav_bookings", JSON.stringify(bookingsList));

    setConfirmedBooking(newBooking);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setPreferredDate("");
    setPreferredSlot("morning");
  };

  return (
    <div className="bg-zinc-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs text-[#FF3E00] tracking-widest uppercase">The Throttle Pass</span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">
            Book a Test Ride
          </h2>
          <div className="h-[2px] w-12 bg-[#FF3E00] mx-auto mt-4" />
          <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-4">
            Experience the thunderbolt firsthand. Select your nearest metro flagship dealership, pick a convenient calendar slot, and get ready for track-level velocity on Indian roads.
          </p>
        </div>

        {/* Dynamic Split Screen: Booking Form vs Dealership details */}
        <div className="max-w-4xl mx-auto items-stretch">
          
          {confirmedBooking ? (
            /* Elegant, high-contrast digital ticket display */
            <div className="rounded-2xl border border-emerald-900 bg-zinc-950 p-6 md:p-8 shadow-2xl text-left space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-5">
                <div>
                  <div className="inline-flex items-center space-x-1 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400 px-2 py-0.5 text-[10px] font-mono font-bold uppercase mb-2">
                    <Check className="h-3 w-3 mr-0.5" />
                    <span>Booking Confirmed</span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-black uppercase tracking-wide">Ride Ticket Issued</h3>
                </div>
                <div className="text-left sm:text-right font-mono">
                  <span className="block text-[10px] text-zinc-500 uppercase">PASS CODE ID</span>
                  <span className="text-lg font-bold text-white tracking-widest">{confirmedBooking.id}</span>
                </div>
              </div>

              {/* Grid: Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left side ticket info */}
                <div className="space-y-4">
                  <div>
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">MACHINE ALLOCATED</span>
                    <span className="font-sans text-base font-extrabold text-[#FF3E00] uppercase">{confirmedBooking.modelName}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">CONFIRMED DATE</span>
                      <span className="font-sans text-sm font-bold text-zinc-200">{confirmedBooking.preferredDate}</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">PREPARED SLOT</span>
                      <span className="font-sans text-sm font-bold text-zinc-200 uppercase">{confirmedBooking.preferredSlot}</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-900 pt-4">
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">RIDER REGISTERED</span>
                    <span className="font-sans text-sm font-bold text-zinc-100">{confirmedBooking.fullName}</span>
                    <span className="block font-sans text-xs text-zinc-500">{confirmedBooking.phone} | {confirmedBooking.email}</span>
                  </div>
                </div>

                {/* Right side pickup dealership info */}
                <div className="rounded-xl bg-zinc-900/30 border border-zinc-900 p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">PICKUP LOCATION</span>
                    <h4 className="font-sans text-sm font-extrabold text-white uppercase">{confirmedBooking.dealerName}</h4>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed flex items-start">
                      <MapPin className="h-4 w-4 text-[#FF3E00] mr-2 shrink-0 mt-0.5" />
                      {activeDealer.address}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-mono text-zinc-400 border-t border-zinc-900/80 pt-3">
                    <Phone className="h-3.5 w-3.5 text-[#FF3E00] mr-2" />
                    <span>Flagship Hotline: {activeDealer.phone}</span>
                  </div>
                </div>

              </div>

              {/* Ticket Instructions */}
              <div className="rounded-xl bg-zinc-900/20 border border-zinc-900 p-4 text-xs font-sans text-zinc-500 space-y-2">
                <span className="font-bold text-zinc-300 block uppercase tracking-wider flex items-center">
                  <ShieldAlert className="h-4 w-4 text-amber-500 mr-2" />
                  Rider Readiness Guidelines:
                </span>
                <p>1. Please arrive at the flagship store 15 minutes before your slot with a valid two-wheeler Driving License.</p>
                <p>2. Protective gear (DOT/ECE certified helmet, riding jacket, gloves, boots) will be supplied at the pit bay, but you are welcome to bring your own setup.</p>
                <p>3. Dynamic track orientation and chassis overview take about 10 minutes prior to engine fire-up.</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleReset}
                  className="rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-6 py-3 font-sans text-xs font-bold tracking-widest uppercase transition-colors focus:outline-none"
                >
                  BOOK ANOTHER PASS
                </button>
              </div>

            </div>
          ) : (
            /* Dynamic split form and location cards */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side Booking form (7 cols) */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 rounded-2xl border border-zinc-900 bg-zinc-950 p-6 space-y-5 text-left">
                <div className="mb-2">
                  <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">Pass Selection</span>
                  <h3 className="font-sans text-lg font-extrabold text-white uppercase mt-0.5">Register Details</h3>
                  <div className="h-[1px] w-8 bg-[#FF3E00] mt-2" />
                </div>

                {/* Bike & City selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Model to Experience</label>
                    <select
                      value={selectedModelId}
                      onChange={(e) => setSelectedModelId(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs font-sans font-bold text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                    >
                      {BIKES_DATA.map((bike) => (
                        <option key={bike.id} value={bike.id} className="bg-zinc-900 uppercase">
                          {bike.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">City Location</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs font-sans font-bold text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city} className="bg-zinc-900 uppercase">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="space-y-4 pt-1">
                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="E.G. RAGHAV MENON"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 font-sans text-xs text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E.G. RAGHAV@OUTLOOK.COM"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 font-sans text-xs text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Phone (Mobile)</label>
                      <input
                        type="tel"
                        required
                        pattern="^[6789]\d{9}$"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-DIGIT MOBILE NUMBER"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 font-sans text-xs text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time Slot selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Preferred Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 font-mono text-xs text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Time Interval</label>
                    <div className="flex space-x-1.5 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                      {(["morning", "afternoon", "evening"] as const).map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredSlot(slot)}
                          className={`flex-1 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-md transition-all ${
                            preferredSlot === slot
                              ? "bg-zinc-800 text-white border-zinc-700"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Pass Request */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-5 py-3.5 font-sans text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,62,0,0.25)] focus:outline-none"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>SECURE TEST RIDE PASS</span>
                </button>

              </form>

              {/* Right Side Dealership Information Panel (5 cols) */}
              <div className="lg:col-span-5 space-y-6 text-left">
                
                {/* Dealer specs info card */}
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 space-y-5">
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">Metropolitan Node</span>
                    <h3 className="font-sans text-base font-extrabold text-white uppercase mt-0.5">{activeDealer.name}</h3>
                    <div className="h-[1px] w-6 bg-[#FF3E00] mt-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#FF3E00] mr-3 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-mono text-[8px] text-zinc-500 uppercase">DEALERSHIP ADDRESS</span>
                        <p className="font-sans text-xs text-zinc-300 leading-relaxed">{activeDealer.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-[#FF3E00] mr-3 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-mono text-[8px] text-zinc-500 uppercase">CONTACT TELEPHONE</span>
                        <p className="font-sans text-xs text-zinc-300 leading-relaxed font-semibold">{activeDealer.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dealer opening hours checklist */}
                  <div className="border-t border-zinc-900 pt-4 text-xs font-sans text-zinc-400 space-y-1.5 bg-zinc-900/10 p-3 rounded-lg border border-zinc-900/60">
                    <span className="font-bold text-zinc-200 block uppercase text-[10px] tracking-wider mb-1 font-mono">Chassis Center Hours</span>
                    <div className="flex justify-between">
                      <span>Weekdays (Mon-Fri)</span>
                      <span className="font-semibold text-zinc-300">09:00 AM - 08:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekends (Sat-Sun)</span>
                      <span className="font-semibold text-zinc-300">08:00 AM - 09:30 PM</span>
                    </div>
                  </div>
                </div>

                {/* Technical dynamic bike preview info */}
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 flex items-center space-x-4">
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <img
                      src={activeBike.colors[0].imageUrls.side}
                      alt={activeBike.name}
                      className="h-10 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-zinc-500 uppercase">ALLOCATED TEST CHASSIS</span>
                    <span className="block font-sans text-xs font-extrabold text-white uppercase">{activeBike.name}</span>
                    <span className="block font-sans text-[10px] text-[#FF3E00] uppercase tracking-wide font-medium">
                      {activeBike.power.split(" ")[0]} BHP | {activeBike.weight} KG WET WEIGHT
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
