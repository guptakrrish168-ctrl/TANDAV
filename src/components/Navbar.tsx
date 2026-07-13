/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Bike, Sliders, Users, MapPin, Sparkles, FolderHeart, Flame } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  garageCount: number;
}

export default function Navbar({ activeTab, setActiveTab, garageCount }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Manifesto", icon: Sparkles },
    { id: "bikes", label: "Machines", icon: Bike },
    { id: "configurator", label: "Configurator", icon: Sliders },
    { id: "community", label: "Tribe Hub", icon: Users },
    { id: "test-ride", label: "Book Ride", icon: MapPin },
    { id: "garage", label: "Garage", icon: FolderHeart, badge: garageCount },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Typographic Logo */}
        <button
          onClick={() => setActiveTab("home")}
          className="group flex items-center space-x-3 focus:outline-none"
          id="logo-button"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-[#FF3E00]/60 group-hover:bg-zinc-950 shadow-[0_0_15px_rgba(255,62,0,0.1)] group-hover:shadow-[0_0_25px_rgba(255,62,0,0.4)]">
            <Flame className="h-6 w-6 text-[#FF3E00] fill-[#FF3E00]/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 animate-pulse" />
            <div className="absolute -inset-0.5 rounded-xl bg-[#FF3E00]/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="text-left">
            <span className="block font-sans text-2xl font-black tracking-wider text-white uppercase group-hover:text-[#FF3E00] transition-colors leading-none">
              TANDAV
            </span>
            <span className="block font-mono text-[8px] tracking-[0.3em] text-zinc-500 uppercase mt-1">
              CHAOS ENGINEERING
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center space-x-2 rounded-lg px-4 py-2.5 font-sans text-xs font-medium tracking-wider uppercase transition-all duration-200 focus:outline-none ${
                  isActive
                    ? "text-[#FF3E00] bg-zinc-900/50 font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/20"
                }`}
                id={`nav-${item.id}`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[#FF3E00]" : "text-zinc-500"}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF3E00] px-1 text-[9px] font-bold text-white ring-2 ring-zinc-950 animate-pulse">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#FF3E00] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab("test-ride")}
            className="relative hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-[#FF3E00] px-5 py-2 font-sans text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#d53300] hover:shadow-[0_0_20px_rgba(255,62,0,0.5)] focus:outline-none"
            id="header-cta"
          >
            BOOK TRACK LAP
          </button>
          
          {/* Mobile Menu Icon Badge */}
          <div className="md:hidden flex space-x-1">
            {navItems.filter(item => item.id === "garage" || item.id === "configurator").map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`p-2 rounded-lg border border-zinc-900 ${
                    isActive ? "text-[#FF3E00] bg-zinc-900" : "text-zinc-400"
                  }`}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF3E00] text-[9px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Bar - Quick Sub-Nav for Mobile Screens */}
      <div className="flex md:hidden border-t border-zinc-900 bg-zinc-950 px-2 py-1 items-center justify-around overflow-x-auto text-[10px]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 uppercase font-medium tracking-wider text-center ${
                isActive ? "text-[#FF3E00] font-bold" : "text-zinc-500"
              }`}
            >
              {item.label.split(" ")[0]}
            </button>
          );
        })}
      </div>
    </header>
  );
}
