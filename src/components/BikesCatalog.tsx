/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BIKES_DATA } from "../data/bikesData";
import { BikeModel } from "../types";
import { Compass, Sliders, MapPin, Gauge, ChevronDown, ChevronUp, Eye } from "lucide-react";

interface BikesCatalogProps {
  onConfigureClick: (modelId: string) => void;
  onBookClick: (modelId: string) => void;
}

export default function BikesCatalog({ onConfigureClick, onBookClick }: BikesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null);
  
  // Track color selected per model in catalog preview
  const [selectedColorIdxs, setSelectedColorIdxs] = useState<Record<string, number>>({
    "apex-r-900": 0,
    "nomad-850": 0,
    "ronin-1200": 0,
    "chronos-ev": 0,
  });

  const categories = ["All", "Street", "Adventure", "Cruiser", "Electric"];

  const filteredBikes = BIKES_DATA.filter((bike) => {
    if (selectedCategory === "All") return true;
    return bike.category === selectedCategory;
  });

  const toggleExpand = (modelId: string) => {
    if (expandedModelId === modelId) {
      setExpandedModelId(null);
    } else {
      setExpandedModelId(modelId);
    }
  };

  const handleColorChange = (modelId: string, colorIdx: number) => {
    setSelectedColorIdxs((prev) => ({
      ...prev,
      [modelId]: colorIdx,
    }));
  };

  return (
    <div className="bg-zinc-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs text-[#FF3E00] tracking-widest uppercase">The TANDAV Weaponry</span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">
            The Machines
          </h2>
          <div className="h-[2px] w-12 bg-[#FF3E00] mx-auto mt-4" />
          <p className="font-sans text-sm text-zinc-400 mt-4">
            Engineered with extreme chassis stiffness, calibrated power delivery, and high-tension visual authority. Explore our four flagship series designed specifically for raw performance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center items-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setExpandedModelId(null);
              }}
              className={`rounded-lg px-6 py-2.5 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 border focus:outline-none ${
                selectedCategory === cat
                  ? "bg-[#FF3E00] text-white border-[#FF3E00]"
                  : "bg-zinc-900/60 text-zinc-400 border-zinc-900 hover:text-white hover:bg-zinc-900 hover:border-zinc-800"
              }`}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Lineup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredBikes.map((bike) => {
            const isExpanded = expandedModelId === bike.id;
            const currentColorIdx = selectedColorIdxs[bike.id] || 0;
            const currentColor = bike.colors[currentColorIdx];

            return (
              <div
                key={bike.id}
                className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col justify-between transition-all duration-300 hover:border-zinc-800 hover:shadow-xl hover:shadow-black/40 group relative overflow-hidden"
              >
                {/* Lighting glow effect */}
                <div 
                  className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-[60px] pointer-events-none opacity-20 transition-all duration-500 group-hover:scale-125"
                  style={{ backgroundColor: currentColor.hex }}
                />

                <div>
                  {/* Category & Price */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase">
                        {bike.category} Series
                      </span>
                      <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white uppercase mt-0.5">
                        {bike.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest">Starts From</span>
                      <span className="font-sans text-base sm:text-lg font-bold text-[#FF3E00]">
                        ₹{bike.basePrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Bike Side Angle Image with color swap support */}
                  <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-4 overflow-hidden rounded-xl bg-zinc-900/25 border border-zinc-900/40">
                    <img
                      src={currentColor.imageUrls.side}
                      alt={`${bike.name} in ${currentColor.name}`}
                      className="w-full h-full object-cover z-10 transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient overlay to make text tags and swappers stand out beautifully */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-zinc-950/30 z-10 pointer-events-none" />
                    
                    {/* Floating Terrain Compatibility tags */}
                    <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 max-w-[70%]">
                      {bike.terrainTags.map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded bg-zinc-900/90 border border-zinc-800 px-1.5 py-0.5 text-[8px] font-mono text-zinc-400">
                          <Compass className="h-2.5 w-2.5 text-[#FF3E00] mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Color Swappers in Card Preview */}
                    <div className="absolute bottom-3 right-3 z-20 flex items-center space-x-1.5 rounded-full bg-zinc-900/80 backdrop-blur px-2.5 py-1">
                      {bike.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={() => handleColorChange(bike.id, idx)}
                          className={`h-3 w-3 rounded-full transition-transform ${color.bgClass} ${
                            currentColorIdx === idx ? "ring-2 ring-white scale-125" : "hover:scale-110"
                          }`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* High level specifications */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-zinc-900 text-center mb-4">
                    <div>
                      <span className="block font-mono text-[8px] text-zinc-500 uppercase">Power Output</span>
                      <span className="font-sans text-xs font-bold text-zinc-100">{bike.power.split(" ")[0]} BHP</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] text-zinc-500 uppercase">Peak Torque</span>
                      <span className="font-sans text-xs font-bold text-zinc-100">{bike.torque.split(" ")[0]} Nm</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] text-zinc-500 uppercase">Curb Weight</span>
                      <span className="font-sans text-xs font-bold text-zinc-100">{bike.weight} KG</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                    {bike.description}
                  </p>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2 z-10">
                  <button
                    onClick={() => onConfigureClick(bike.id)}
                    className="flex-1 inline-flex items-center justify-center space-x-1.5 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-4 py-2.5 font-sans text-[10px] font-extrabold tracking-widest text-white uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,62,0,0.35)]"
                  >
                    <Sliders className="h-3.5 w-3.5" />
                    <span>LAUNCH CONFIGURATOR</span>
                  </button>

                  <button
                    onClick={() => toggleExpand(bike.id)}
                    className="inline-flex items-center justify-center space-x-1 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 px-3.5 py-2.5 font-sans text-[10px] font-extrabold tracking-widest text-white uppercase transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{isExpanded ? "HIDE DETAILS" : "FULL SPECS"}</span>
                  </button>
                </div>

                {/* Expanded Specifications Panel */}
                {isExpanded && (
                  <div className="col-span-full mt-6 pt-6 border-t border-zinc-900 w-full animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      
                      {/* Left: Engineering Story & Specs table */}
                      <div className="space-y-4">
                        <h4 className="font-mono text-xs text-[#FF3E00] uppercase tracking-wider">Pune Factory Engineering Story</h4>
                        <p className="font-sans text-xs text-zinc-400 leading-relaxed bg-zinc-900/20 border border-zinc-900 p-3 rounded-lg">
                          {bike.engineeringStory}
                        </p>
                        
                        {/* Highlights checklist */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-zinc-300">
                          <div className="flex items-center space-x-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3E00]" />
                            <span>Brembo Stylema Calipers</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3E00]" />
                            <span>Öhlins USD Front Forks</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3E00]" />
                            <span>Cornering ABS Traction</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3E00]" />
                            <span>Bi-directional Quickshifter</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Full Specs Grid */}
                      <div>
                        <h4 className="font-mono text-xs text-[#FF3E00] uppercase tracking-wider mb-3">Technical Specifications</h4>
                        <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-3.5 divide-y divide-zinc-900">
                          {bike.specs.map((spec) => (
                            <div key={spec.label} className="flex justify-between py-2 text-xs font-sans">
                              <span className="text-zinc-500 font-medium">{spec.label}</span>
                              <span className="text-zinc-200 font-semibold">{spec.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Direct Booking Shortcut */}
                        <div className="mt-4">
                          <button
                            onClick={() => onBookClick(bike.id)}
                            className="w-full inline-flex items-center justify-center space-x-1.5 rounded-lg border border-[#FF3E00]/40 bg-[#FF3E00]/10 hover:bg-[#FF3E00]/25 px-4 py-2.5 font-sans text-[10px] font-extrabold tracking-widest text-[#FF3E00] hover:text-white uppercase transition-all duration-300"
                          >
                            <MapPin className="h-3.5 w-3.5" />
                            <span>BOOK TEST RIDE FOR THIS BIKE</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
