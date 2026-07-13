/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BikesCatalog from "./components/BikesCatalog";
import BikeConfigurator from "./components/BikeConfigurator";
import CommunitySection from "./components/CommunitySection";
import TestRideSection from "./components/TestRideSection";
import GarageSection from "./components/GarageSection";
import { CustomBuild } from "./types";
import { Sparkles, ArrowUpRight, Compass, ShieldCheck } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [garageCount, setGarageCount] = useState<number>(0);
  const [preselectedModelId, setPreselectedModelId] = useState<string | null>(null);

  // Sync saved builds count on mount and updates
  const updateGarageCount = () => {
    const saved = localStorage.getItem("tandav_builds");
    if (saved) {
      try {
        const builds: CustomBuild[] = JSON.parse(saved);
        setGarageCount(builds.length);
      } catch (e) {
        setGarageCount(0);
      }
    } else {
      setGarageCount(0);
    }
  };

  useEffect(() => {
    updateGarageCount();
  }, []);

  // Handle saving custom builds from configurator
  const handleSaveBuild = (build: CustomBuild) => {
    const saved = localStorage.getItem("tandav_builds");
    let buildsList: CustomBuild[] = [];
    if (saved) {
      try {
        buildsList = JSON.parse(saved);
      } catch (e) {
        buildsList = [];
      }
    }
    buildsList.push(build);
    localStorage.setItem("tandav_builds", JSON.stringify(buildsList));
    updateGarageCount();
  };

  // Navigational wrappers
  const handleConfigureBike = (modelId: string) => {
    setPreselectedModelId(modelId);
    setActiveTab("configurator");
  };

  const handleBookTestRide = (modelId: string) => {
    setPreselectedModelId(modelId);
    setActiveTab("test-ride");
  };

  // Render current tab body
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HeroSection
            onConfigureClick={handleConfigureBike}
            onBookClick={() => handleBookTestRide("nomad-hellhound-900")}
            onNavigate={(tab) => {
              setPreselectedModelId(null);
              setActiveTab(tab);
            }}
          />
        );
      case "bikes":
        return (
          <BikesCatalog
            onConfigureClick={handleConfigureBike}
            onBookClick={handleBookTestRide}
          />
        );
      case "configurator":
        return (
          <BikeConfigurator
            initialModelId={preselectedModelId}
            onSaveBuild={handleSaveBuild}
          />
        );
      case "community":
        return <CommunitySection />;
      case "test-ride":
        return <TestRideSection preselectedModelId={preselectedModelId} />;
      case "garage":
        return (
          <GarageSection
            onNavigate={(tab) => {
              setPreselectedModelId(null);
              setActiveTab(tab);
            }}
            onSetPreselectedBike={(id) => setPreselectedModelId(id)}
            onDeleteBuildCallback={updateGarageCount}
          />
        );
      default:
        return (
          <HeroSection
            onConfigureClick={handleConfigureBike}
            onBookClick={() => handleBookTestRide("nomad-hellhound-900")}
            onNavigate={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-[#FF3E00] selection:text-white" id="tandav-root">
      
      {/* Top Header Glass bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          // Reset preselection when navigating manually via navbar
          setPreselectedModelId(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        garageCount={garageCount}
      />

      {/* Primary Dynamic Container */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Cinematic Brand Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-left text-zinc-400 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-zinc-900 pb-12 mb-8">
            {/* Branding pitch */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-sans text-lg font-black tracking-widest text-white">TANDAV</span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">MOTORS</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Hand-crafted performance motorcycling. Engineering chassis solutions, dynamic torque deliveries, and specialized high-altitude ECU mapping for the Indian sub-continent.
              </p>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-600">
                <Compass className="h-4.5 w-4.5 text-[#FF3E00]" />
                <span>CHASSIS DEV HUB: PUNE, INDIA</span>
              </div>
            </div>

            {/* Models links */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">Flagship Series</h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button onClick={() => handleConfigureBike("apex-rage-990")} className="hover:text-white transition-colors uppercase">
                    Apex-Rage 990 (Naked Sport)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleConfigureBike("nomad-hellhound-900")} className="hover:text-white transition-colors uppercase">
                    Nomad-Hellhound 900 (Adventure)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleConfigureBike("ronin-spectre-1200")} className="hover:text-white transition-colors uppercase">
                    Ronin-Spectre 1200 (V-Twin Cruiser)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleConfigureBike("chronos-ev")} className="hover:text-white transition-colors uppercase">
                    Chronos EV (Hyper Electric)
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">Rider Portals</h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button onClick={() => { setActiveTab("community"); window.scrollTo({top:0, behavior:"smooth"}); }} className="hover:text-white transition-colors uppercase">
                    Tribe Ride Calendar
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab("community"); window.scrollTo({top:0, behavior:"smooth"}); }} className="hover:text-white transition-colors uppercase">
                    Discussion Bulletin Board
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab("test-ride"); window.scrollTo({top:0, behavior:"smooth"}); }} className="hover:text-white transition-colors uppercase">
                    Locate Pune Factory Store
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveTab("garage"); window.scrollTo({top:0, behavior:"smooth"}); }} className="hover:text-white transition-colors uppercase">
                    Access My Spec Garage
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">The Torrent dispatch</h4>
              <p className="text-xs text-zinc-500">Subscribe to receive first-look blueprints, track-day passes, and community ride routes.</p>
              <div className="flex rounded-md border border-zinc-800 bg-zinc-900 p-1">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="flex-grow bg-transparent px-3 py-1.5 text-xs text-white placeholder-zinc-600 uppercase focus:outline-none"
                />
                <button
                  onClick={() => alert("Subscription registered! Welcome to the TANDAV Tribe.")}
                  className="rounded bg-[#FF3E00] hover:bg-[#d53300] px-3.5 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white transition-all"
                >
                  JOIN
                </button>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-600 gap-4">
            <div>
              <span>© {new Date().getFullYear()} Tandav Performance Motors Private Limited. All Rights Reserved.</span>
            </div>
            <div className="flex space-x-4">
              <span className="hover:text-zinc-500 cursor-pointer">PRIVACY BLUEPRINT</span>
              <span className="hover:text-zinc-500 cursor-pointer">TERMS OF HIGHWAY USE</span>
              <span className="hover:text-zinc-500 cursor-pointer font-mono text-[#FF3E00]">PROUDLY ENGINEERED IN INDIA</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
