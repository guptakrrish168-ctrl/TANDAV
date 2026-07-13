/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BIKES_DATA } from "../data/bikesData";
import { BikeModel, BikeAccessory, CustomBuild } from "../types";
import { Sliders, Save, Trash2, CheckCircle2, RotateCcw, Sparkles, Scale, IndianRupee } from "lucide-react";

interface BikeConfiguratorProps {
  initialModelId?: string | null;
  onSaveBuild: (build: CustomBuild) => void;
}

export default function BikeConfigurator({ initialModelId, onSaveBuild }: BikeConfiguratorProps) {
  // Select active model
  const [selectedModelId, setSelectedModelId] = useState<string>(
    initialModelId || BIKES_DATA[0].id
  );
  
  const activeModel = BIKES_DATA.find((b) => b.id === selectedModelId) || BIKES_DATA[0];

  // Configurator state variables
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [activeAngle, setActiveAngle] = useState<"side" | "front" | "rear">("side");
  const [selectedAccessories, setSelectedAccessories] = useState<BikeAccessory[]>([]);
  const [customBuildName, setCustomBuildName] = useState<string>("");
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync state when model shifts
  useEffect(() => {
    setSelectedColorIdx(0);
    setActiveAngle("side");
    setSelectedAccessories([]);
    setCustomBuildName("");
    setSaveSuccess(false);
  }, [selectedModelId]);

  // Handle accessory toggle
  const toggleAccessory = (acc: BikeAccessory) => {
    setSelectedAccessories((prev) => {
      const exists = prev.some((item) => item.id === acc.id);
      if (exists) {
        return prev.filter((item) => item.id !== acc.id);
      } else {
        return [...prev, acc];
      }
    });
  };

  // Calculations
  const accessoriesPrice = selectedAccessories.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = activeModel.basePrice + accessoriesPrice;
  const accessoriesWeightChange = selectedAccessories.reduce((sum, item) => sum + item.weightChange, 0);
  const totalWeight = activeModel.weight + accessoriesWeightChange;

  // Save config
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const buildName = customBuildName.trim() || `${activeModel.name} ${activeModel.colors[selectedColorIdx].name}`;
    
    const newBuild: CustomBuild = {
      id: "build_" + Date.now(),
      modelId: activeModel.id,
      modelName: activeModel.name,
      colorName: activeModel.colors[selectedColorIdx].name,
      colorHex: activeModel.colors[selectedColorIdx].hex,
      selectedAccessories: [...selectedAccessories],
      totalPrice,
      totalWeight,
      buildName,
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    onSaveBuild(newBuild);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const selectedColor = activeModel.colors[selectedColorIdx];
  const activeImage = selectedColor.imageUrls[activeAngle];

  return (
    <div className="bg-zinc-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Typographic Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs text-[#FF3E00] tracking-widest uppercase">The Atelier Chaos Program</span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">
            Build Your Machine
          </h2>
          <div className="h-[2px] w-12 bg-[#FF3E00] mx-auto mt-4" />
          <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-4">
            Co-create your exclusive Tandav machine. Handpick performance alloys, race exhaust acoustics, high-altitude accessories, and select bespoke savage paint schemes.
          </p>
        </div>

        {/* Master Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): Large Interactive Visualizer Studio */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 p-6 overflow-hidden shadow-2xl flex flex-col justify-between h-[450px] sm:h-[520px]">
              {/* Engineering Grid Ambient */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />
              <div 
                className="absolute inset-x-0 bottom-0 h-48 blur-[80px] opacity-15 pointer-events-none"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Top Bar: Selector of Models */}
              <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 border-b border-zinc-900 pb-4">
                <div className="w-full sm:w-auto">
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Select Chassis Platform</label>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="w-full sm:w-64 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-sans font-bold tracking-wider text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                  >
                    {BIKES_DATA.map((bike) => (
                      <option key={bike.id} value={bike.id} className="bg-zinc-900 uppercase">
                        {bike.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-2 w-full sm:w-auto justify-end">
                  {/* Dynamic Indicators */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-center">
                    <span className="block font-mono text-[8px] text-zinc-500 uppercase">Config Price</span>
                    <span className="font-sans text-xs sm:text-sm font-bold text-[#FF3E00]">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-center">
                    <span className="block font-mono text-[8px] text-zinc-500 uppercase">Wet Weight</span>
                    <span className="font-sans text-xs sm:text-sm font-bold text-zinc-100 flex items-center justify-center">
                      <Scale className="h-3 w-3 text-zinc-400 mr-1" />
                      {totalWeight.toFixed(1)} kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Center: Live Rotating Bike Render with Angle View swaps */}
              <div className="relative flex-grow flex items-center justify-center my-6 group">
                
                {/* Simulated Glow Platform */}
                <div 
                  className="absolute bottom-6 w-3/4 h-6 rounded-full blur-[25px] opacity-25"
                  style={{ backgroundColor: selectedColor.hex }}
                />

                <img
                  src={activeImage}
                  alt={`${activeModel.name} config`}
                  className="max-h-56 sm:max-h-72 w-auto object-contain z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Simulated 360° Rotate prompt */}
                <div className="absolute top-2 right-2 flex items-center space-x-1 rounded bg-zinc-900/80 px-2 py-0.5 text-[8px] font-mono text-zinc-500">
                  <Sparkles className="h-2.5 w-2.5 text-[#FF3E00] mr-0.5" />
                  <span>CGI DIGITAL RENDER</span>
                </div>
              </div>

              {/* Bottom Bar: Angle Selection Tabs & Color presets */}
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-zinc-900 pt-4">
                
                {/* Angle Selectors */}
                <div className="flex space-x-1.5 bg-zinc-900/60 rounded-lg p-1 border border-zinc-900">
                  {(["side", "front", "rear"] as const).map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setActiveAngle(angle)}
                      className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-md transition-all ${
                        activeAngle === angle
                          ? "bg-zinc-800 text-white border-zinc-700"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {angle} VIEW
                    </button>
                  ))}
                </div>

                {/* Color swatches with names */}
                <div className="flex items-center space-x-3 bg-zinc-900/30 px-3 py-1.5 rounded-lg border border-zinc-900">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">BODY COLORWAY:</span>
                  <div className="flex space-x-2">
                    {activeModel.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`h-4.5 w-4.5 rounded-full border-2 transition-transform ${color.bgClass} ${
                          selectedColorIdx === idx ? "border-white scale-125" : "border-transparent hover:scale-110"
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <span className="font-sans text-[10px] font-bold text-zinc-300 uppercase">{selectedColor.name}</span>
                </div>

              </div>

            </div>

            {/* Quick Warning Specs Banner */}
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 px-4 py-3 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2.5 animate-pulse" />
                HAND-CRAFTED AT PUNE CHASSIS CENTRE
              </span>
              <span>ESTIMATED DELIVERY: 24 DAYS</span>
            </div>

          </div>

          {/* Right Column (4 cols): Accessories Selection & Final Invoice Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Build Customizing Panel */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between">
              
              <div className="mb-6">
                <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">Atelier Catalog</span>
                <h3 className="font-sans text-lg font-extrabold text-white uppercase mt-1">Select Custom Parts</h3>
                <div className="h-[1px] w-8 bg-[#FF3E00] mt-2" />
              </div>

              {/* Scrollable accessories items */}
              <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1">
                {activeModel.accessories.map((acc) => {
                  const isChecked = selectedAccessories.some((item) => item.id === acc.id);
                  return (
                    <button
                      key={acc.id}
                      onClick={() => toggleAccessory(acc)}
                      className={`w-full text-left rounded-xl border p-3 flex items-center justify-between gap-3 transition-all ${
                        isChecked
                          ? "border-[#FF3E00]/60 bg-[#FF3E00]/5 shadow-[0_0_10px_rgba(255,62,0,0.1)]"
                          : "border-zinc-900 bg-zinc-900/30 hover:border-zinc-800 hover:bg-zinc-900/50"
                      }`}
                    >
                      <div className="flex-grow space-y-1">
                        <div className="flex justify-between items-start">
                          <span className="font-sans text-xs font-bold text-zinc-100 uppercase tracking-wide line-clamp-1">{acc.name}</span>
                          <span className="font-mono text-xs font-bold text-[#FF3E00] ml-2">
                            +₹{acc.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="font-sans text-[10px] text-zinc-500 leading-snug line-clamp-2">{acc.desc}</p>
                        <div className="flex space-x-3 text-[9px] font-mono text-zinc-400">
                          <span className="uppercase">Category: {acc.category}</span>
                          <span>
                            Weight: {acc.weightChange > 0 ? `+${acc.weightChange}` : acc.weightChange} kg
                          </span>
                        </div>
                      </div>
                      <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        isChecked ? "border-[#FF3E00] bg-[#FF3E00] text-white" : "border-zinc-800"
                      }`}>
                        {isChecked && (
                          <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 20 20">
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Build Customizing Summary Form */}
              <form onSubmit={handleSave} className="mt-6 pt-6 border-t border-zinc-900 space-y-5">
                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">
                    Custom Title Your Machine
                  </label>
                  <input
                    type="text"
                    required
                    value={customBuildName}
                    onChange={(e) => setCustomBuildName(e.target.value.toUpperCase())}
                    placeholder={`E.G. TANDAV ${activeModel.name.split(" ").pop()} RAGE`}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 font-mono text-xs text-white uppercase placeholder-zinc-600 focus:border-[#FF3E00] focus:outline-none"
                    maxLength={32}
                  />
                </div>

                {/* Invoice Breakdown */}
                <div className="rounded-xl bg-zinc-900/20 border border-zinc-900/60 p-3.5 space-y-2 text-xs">
                  <div className="flex justify-between font-sans text-zinc-500">
                    <span>Base Platform Price</span>
                    <span className="text-zinc-300">₹{activeModel.basePrice.toLocaleString("en-IN")}</span>
                  </div>
                  {selectedAccessories.length > 0 && (
                    <div className="flex justify-between font-sans text-zinc-500">
                      <span>Premium Accessories ({selectedAccessories.length})</span>
                      <span className="text-zinc-300">₹{accessoriesPrice.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-sans text-zinc-500">
                    <span>GST & RTO Registration (Pune)</span>
                    <span className="text-zinc-300">Inclusive</span>
                  </div>
                  <div className="h-[1px] bg-zinc-900 my-1" />
                  <div className="flex justify-between font-sans font-bold text-sm">
                    <span className="text-zinc-100 uppercase tracking-wide">Total Estimated Price</span>
                    <span className="text-[#FF3E00]">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-5 py-3.5 font-sans text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,62,0,0.4)] focus:outline-none"
                >
                  <Save className="h-4 w-4" />
                  <span>SAVE TO GARAGE</span>
                </button>

                {/* Succes Notification */}
                {saveSuccess && (
                  <div className="rounded-lg bg-emerald-950/40 border border-emerald-900 p-3 text-emerald-400 flex items-center space-x-2.5 animate-fadeIn">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <div className="text-left font-sans text-xs leading-snug">
                      <span className="font-bold block">SPECIFICATION SAVED</span>
                      Your build has been cataloged in your private Garage!
                    </div>
                  </div>
                )}

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
