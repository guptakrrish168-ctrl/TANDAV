/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sliders, ArrowRight, ShieldCheck, Zap, Compass, MapPin } from "lucide-react";
import { BIKES_DATA } from "../data/bikesData";

interface HeroSectionProps {
  onConfigureClick: (modelId: string) => void;
  onBookClick: () => void;
  onNavigate: (tab: string) => void;
}

export default function HeroSection({ onConfigureClick, onBookClick, onNavigate }: HeroSectionProps) {
  const featuredBikes = BIKES_DATA.slice(0, 3); // Street, Adventure, Cruiser
  const [activePreviewIdx, setActivePreviewIdx] = useState(0);
  const activeBike = featuredBikes[activePreviewIdx];

  return (
    <div className="relative bg-zinc-950 text-white overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Visual Ambient Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FF3E00]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-zinc-900/40 blur-[80px] pointer-events-none" />

      {/* Main Grid: Manifesto & Highlight Preview */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        {/* Left Col: Brand Statement (Manifesto) */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6 lg:pr-4">
          <div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3.5 py-1 text-xs text-[#FF3E00] animate-pulse">
            <Compass className="h-3.5 w-3.5 animate-spin-slow text-[#FF3E00]" />
            <span className="font-mono tracking-wider uppercase text-[10px] font-bold">CHAOS ROAD LABS: PUNE</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none uppercase">
            WE DON'T BUILD BIKES. <br />
            WE UNLEASH <span className="text-[#FF3E00] drop-shadow-[0_0_15px_rgba(255,62,0,0.3)]">TANDAV</span>.
          </h1>

          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
            Tandav is the absolute cosmic fury of modern motorcycling. Designed with zero compromise, track-bred chassis stiffness, and raw, unrestrained torque deliveries. Forged in Pune to decimate mountain switchbacks and set national highways completely on fire. Do you dare ride the storm?
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate("configurator")}
              className="flex items-center justify-center space-x-2.5 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-6 py-3.5 font-sans text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,62,0,0.5)]"
              id="hero-config-btn"
            >
              <Sliders className="h-4 w-4" />
              <span>CUSTOM SPEC YOUR BEAST</span>
            </button>
            <button
              onClick={onBookClick}
              className="flex items-center justify-center space-x-2 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/90 hover:border-zinc-700 px-6 py-3.5 font-sans text-xs font-bold tracking-widest text-white uppercase transition-all duration-300"
              id="hero-test-btn"
            >
              <span>REQUEST TRACK LAP</span>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white" />
            </button>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
            <div>
              <span className="block font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Chassis Stiffness</span>
              <span className="font-sans text-sm font-semibold text-zinc-200">Laser Trellis Core</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Survival Brain</span>
              <span className="font-sans text-sm font-semibold text-zinc-200">Savage 6-Axis IMU</span>
            </div>
          </div>
        </div>

        {/* Right Col: High-Impact Sports Bike Interactive Display */}
        <div className="lg:col-span-7 relative flex flex-col justify-center">
          {/* Main Visual Card */}
          <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 overflow-hidden shadow-2xl shadow-black/80">
            {/* Grid Line Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
            
            {/* Top Details */}
            <div className="relative flex justify-between items-start mb-6 z-10">
              <div>
                <span className="font-mono text-xs text-[#FF3E00] tracking-wider uppercase">{activeBike.category} SERIES</span>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-white uppercase mt-1">{activeBike.name}</h2>
                <p className="font-sans text-xs text-zinc-400 mt-1 max-w-sm italic">{activeBike.tagline}</p>
              </div>
              <div className="text-right">
                <span className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase">Starting From</span>
                <span className="font-sans text-lg sm:text-xl font-extrabold text-white">
                  ₹{activeBike.basePrice.toLocaleString("en-IN")}
                </span>
                <span className="block font-mono text-[8px] text-zinc-500 uppercase">Ex-Showroom Pune</span>
              </div>
            </div>

            {/* Large Interactive Visual of the Bike */}
            <div className="relative w-full h-56 sm:h-72 flex items-center justify-center my-4 overflow-hidden rounded-xl border border-zinc-900 bg-zinc-900/20 group">
              {/* Cinematic Lighting backdrop */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950/90 to-transparent" />
              <div 
                className="absolute inset-0 opacity-15 transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${activeBike.colors[0].imageUrls.side}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              
              {/* Product render layer with customized lighting shadow */}
              <img
                src={activeBike.colors[0].imageUrls.side}
                alt={activeBike.name}
                className="h-44 sm:h-56 w-auto object-contain z-10 drop-shadow-[0_20px_35px_rgba(255,62,0,0.35)] transition-transform duration-700 group-hover:-translate-y-2"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Overlay Accent Circle */}
              <div 
                className="absolute h-48 w-48 rounded-full blur-[40px] pointer-events-none transition-all duration-500 opacity-60 group-hover:scale-110"
                style={{ backgroundColor: activeBike.colors[0].hex }}
              />

              {/* Angle selector badge (static simulation in hero) */}
              <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-1.5 rounded-md bg-zinc-900/80 backdrop-blur px-2.5 py-1 text-[10px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1" />
                <span>360° ENGINE VIEW ENABLED</span>
              </div>
            </div>

            {/* Quick Spec Specs Row */}
            <div className="grid grid-cols-4 gap-2 py-4 border-t border-b border-zinc-900">
              <div className="text-center">
                <span className="block font-mono text-[9px] tracking-wider text-zinc-500 uppercase">Power</span>
                <span className="font-sans text-xs sm:text-sm font-bold text-zinc-100">{activeBike.power.split(" ")[0]} BHP</span>
              </div>
              <div className="text-center">
                <span className="block font-mono text-[9px] tracking-wider text-zinc-500 uppercase">Torque</span>
                <span className="font-sans text-xs sm:text-sm font-bold text-zinc-100">{activeBike.torque.split(" ")[0]} Nm</span>
              </div>
              <div className="text-center">
                <span className="block font-mono text-[9px] tracking-wider text-zinc-500 uppercase">Wet Weight</span>
                <span className="font-sans text-xs sm:text-sm font-bold text-zinc-100">{activeBike.weight} KG</span>
              </div>
              <div className="text-center">
                <span className="block font-mono text-[9px] tracking-wider text-zinc-500 uppercase">Tank Capacity</span>
                <span className="font-sans text-xs sm:text-sm font-bold text-zinc-100">{activeBike.tankCapacity.split(" ")[0]}L</span>
              </div>
            </div>

            {/* Footer Interaction Options */}
            <div className="flex items-center justify-between mt-6 pt-1">
              {/* Bike Switch Dots */}
              <div className="flex space-x-2">
                {featuredBikes.map((bike, idx) => (
                  <button
                    key={bike.id}
                    onClick={() => setActivePreviewIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activePreviewIdx === idx ? "w-8 bg-[#FF3E00]" : "w-2.5 bg-zinc-800 hover:bg-zinc-700"
                    }`}
                    title={`View ${bike.name}`}
                  />
                ))}
              </div>

              {/* Route Config CTA */}
              <button
                onClick={() => onConfigureClick(activeBike.id)}
                className="group flex items-center space-x-1.5 font-mono text-[10px] tracking-widest text-[#FF3E00] font-bold uppercase hover:text-white transition-colors"
              >
                <span>SPEC THIS BUILD</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Manifesto Landscape Strip */}
      <div className="w-full bg-zinc-950 border-t border-zinc-900 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
              <ShieldCheck className="h-5 w-5 text-[#FF3E00]" />
            </div>
            <div>
              <span className="block font-sans text-sm font-bold text-zinc-100 uppercase tracking-wide">3-Year Precision Warranty</span>
              <span className="block font-sans text-xs text-zinc-500">Includes 24/7 roadside assistance across high Himalayan corridors.</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
              <Zap className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <span className="block font-sans text-sm font-bold text-zinc-100 uppercase tracking-wide">Carbon Reduction Focus</span>
              <span className="block font-sans text-xs text-zinc-500">Recycled aerospace-grade alloys utilized across body fasteners.</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800">
              <Compass className="h-5 w-5 text-[#FF3E00]" />
            </div>
            <div>
              <span className="block font-sans text-sm font-bold text-zinc-100 uppercase tracking-wide">The Tribe Advantage</span>
              <span className="block font-sans text-xs text-zinc-500">Complimentary local chapter access with every custom machine build.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
