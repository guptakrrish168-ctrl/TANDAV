/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CustomBuild } from "../types";
import { BIKES_DATA } from "../data/bikesData";
import { Sliders, Trash2, Calendar, MapPin, Scale, ChevronRight, Package, ClipboardCheck, LayoutGrid } from "lucide-react";

interface GarageSectionProps {
  onNavigate: (tab: string) => void;
  onSetPreselectedBike: (modelId: string) => void;
  onDeleteBuildCallback: () => void;
}

export default function GarageSection({ onNavigate, onSetPreselectedBike, onDeleteBuildCallback }: GarageSectionProps) {
  const [builds, setBuilds] = useState<CustomBuild[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tandav_builds");
    if (saved) {
      setBuilds(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = builds.filter((b) => b.id !== id);
    setBuilds(updated);
    localStorage.setItem("tandav_builds", JSON.stringify(updated));
    onDeleteBuildCallback(); // Updates badge count in parent
    onDeleteBuildCallback(); // Updates badge count in parent
  };

  const handleTestRideShortcut = (modelId: string) => {
    onSetPreselectedBike(modelId);
    onNavigate("test-ride");
  };

  return (
    <div className="bg-zinc-950 py-12 text-white min-h-[calc(100vh-80px)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs text-[#FF3E00] tracking-widest uppercase">Your Fleet</span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">
            The Garage
          </h2>
          <div className="h-[2px] w-12 bg-[#FF3E00] mx-auto mt-4" />
          <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-4">
            A curated portfolio of your custom-configured machines. Review technical blueprints, download parts listings, or schedule track testing sessions.
          </p>
        </div>

        {builds.length === 0 ? (
          /* Empty Garage State */
          <div className="max-w-md mx-auto rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 text-center space-y-6 shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#FF3E00]">
              <LayoutGrid className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-sans text-base font-extrabold text-white uppercase tracking-wide">No Machines in Garage</h3>
              <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                Your portfolio is currently empty. Head over to the custom bike configurator to design your high-performance machine from scratch.
              </p>
            </div>
            <button
              onClick={() => onNavigate("configurator")}
              className="w-full flex items-center justify-center space-x-2 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-5 py-3 font-sans text-xs font-bold tracking-widest text-white uppercase transition-all duration-300"
            >
              <Sliders className="h-4 w-4" />
              <span>LAUNCH CONFIGURATOR</span>
            </button>
          </div>
        ) : (
          /* Grid of Saved Custom Builds */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {builds.map((build) => {
              // Find matching static bike model to pull its cover image
              const baseModel = BIKES_DATA.find((b) => b.id === build.modelId);
              const coverImage = baseModel?.colors[0].imageUrls.side || "https://picsum.photos/seed/vibrant/800/600";

              return (
                <div
                  key={build.id}
                  className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between hover:border-zinc-800 transition-colors shadow-2xl relative overflow-hidden group"
                >
                  {/* Subtle Accent Glow */}
                  <div 
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] pointer-events-none opacity-15"
                    style={{ backgroundColor: build.colorHex }}
                  />

                  {/* Top Bar Info */}
                  <div className="text-left space-y-2.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-[9px] text-[#FF3E00] tracking-wider uppercase">Custom Specification</span>
                        <h3 className="font-sans text-lg font-black text-white uppercase tracking-wide leading-tight mt-0.5">
                          {build.buildName}
                        </h3>
                        <span className="inline-block font-sans text-[10px] text-zinc-500 font-medium">
                          Based on {build.modelName} ({build.colorName})
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(build.id)}
                        className="rounded-lg p-2 text-zinc-600 hover:text-rose-500 hover:bg-rose-950/20 transition-all border border-transparent hover:border-rose-900/40"
                        title="Delete Build"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Compact Image Display */}
                    <div className="h-36 w-full rounded-xl bg-zinc-900/10 border border-zinc-900 flex items-center justify-center p-2.5 overflow-hidden">
                      <img
                        src={coverImage}
                        alt={build.buildName}
                        className="h-28 w-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Spec Metrics Row */}
                    <div className="grid grid-cols-2 gap-2 py-2 border-t border-b border-zinc-900 text-xs font-mono text-zinc-400">
                      <div className="flex items-center space-x-1.5 justify-start">
                        <Scale className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Weight: {build.totalWeight.toFixed(1)} kg</span>
                      </div>
                      <div className="text-right">
                        <span>Price: <span className="font-sans font-bold text-white">₹{build.totalPrice.toLocaleString("en-IN")}</span></span>
                      </div>
                    </div>

                    {/* Accessories Checklist Block */}
                    <div>
                      <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center">
                        <Package className="h-3 w-3 mr-1" />
                        Selected Parts ({build.selectedAccessories.length})
                      </span>
                      {build.selectedAccessories.length === 0 ? (
                        <p className="font-sans text-[10px] text-zinc-600 italic">No optional parts fitted. Standard ex-factory chassis.</p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {build.selectedAccessories.map((acc) => (
                            <span
                              key={acc.id}
                              className="inline-flex items-center rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[9px] font-sans text-zinc-300"
                            >
                              {acc.name.split(" ")[0]}..
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-6 border-t border-zinc-900 mt-6 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleTestRideShortcut(build.modelId)}
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 px-4 py-2 text-xs font-bold text-[#FF3E00] uppercase tracking-wide transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>BOOK TRACK TEST</span>
                    </button>
                    
                    <div className="inline-flex items-center justify-center space-x-1 py-2 text-[10px] font-mono text-zinc-500 px-2">
                      <ClipboardCheck className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                      <span>Blueprints Saved {build.createdAt}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
