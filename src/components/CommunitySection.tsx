/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { UPCOMING_RIDES, RIDER_CHAPTERS, FORUM_POSTS } from "../data/bikesData";
import { RideEvent, RiderChapter, ForumPost } from "../types";
import { Calendar, Users, MessageSquare, ThumbsUp, Send, Plus, Filter, Route, MapPin, User, ChevronRight } from "lucide-react";

export default function CommunitySection() {
  const [activeSubTab, setActiveSubTab] = useState<"rides" | "forum" | "hall">("rides");

  // Local state persisted to LocalStorage
  const [rides, setRides] = useState<RideEvent[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [selectedForumCategory, setSelectedForumCategory] = useState<string>("all");
  
  // Create New Thread modal state
  const [isForumModalOpen, setIsForumModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<"rides" | "tech" | "general" | "customs">("general");

  // Log Your Ride (Hall of Fame) state
  const [loggedRides, setLoggedRides] = useState<{
    id: string;
    riderName: string;
    route: string;
    bike: string;
    desc: string;
    imageUrl: string;
  }[]>([]);
  const [isHallModalOpen, setIsHallModalOpen] = useState(false);
  const [newRider, setNewRider] = useState("");
  const [newRoute, setNewRoute] = useState("");
  const [newBike, setNewBike] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Load from local storage or defaults on mount
  useEffect(() => {
    // Rides
    const savedRides = localStorage.getItem("tandav_rides");
    if (savedRides) {
      setRides(JSON.parse(savedRides));
    } else {
      setRides(UPCOMING_RIDES);
    }

    // Forum
    const savedForum = localStorage.getItem("tandav_forum");
    if (savedForum) {
      setForumPosts(JSON.parse(savedForum));
    } else {
      setForumPosts(FORUM_POSTS);
    }

    // Hall of Fame submissions
    const savedHall = localStorage.getItem("tandav_hall");
    if (savedHall) {
      setLoggedRides(JSON.parse(savedHall));
    } else {
      // Default logged rides
      setLoggedRides([
        {
          id: "hall-1",
          riderName: "Kabir Shergill",
          route: "Spiti High Valley Bypass",
          bike: "Nomad-Hellhound 900",
          desc: "Chasing dust plumes through the Kaza riverbed loop at sunrise. Sandstorms have nothing on the Nomad's high intake filters.",
          imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "hall-2",
          riderName: "Siddharth Deshmukh",
          route: "Lavasa Hairpins at Twilight",
          bike: "Apex-Rage 990",
          desc: "Carving through 23 switchbacks on the road to Lavasa. The SC slip-on exhaust bellows like absolute lightning in the valleys.",
          imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800"
        },
        {
          id: "hall-3",
          riderName: "Rhea Chhabra",
          route: "Pondicherry Coastal Glide",
          bike: "Ronin-Spectre 1200",
          desc: "Midnight cruise along the Bay of Bengal coastline. Smooth V-Twin performance under heavy ocean humidity.",
          imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800"
        }
      ]);
    }
  }, []);

  // Save to local storage helpers
  const saveRidesToLocal = (updated: RideEvent[]) => {
    setRides(updated);
    localStorage.setItem("tandav_rides", JSON.stringify(updated));
  };

  const saveForumToLocal = (updated: ForumPost[]) => {
    setForumPosts(updated);
    localStorage.setItem("tandav_forum", JSON.stringify(updated));
  };

  const saveHallToLocal = (updated: typeof loggedRides) => {
    setLoggedRides(updated);
    localStorage.setItem("tandav_hall", JSON.stringify(updated));
  };

  // RSVP Toggle Handler
  const handleRsvpToggle = (rideId: string) => {
    const updated = rides.map((ride) => {
      if (ride.id === rideId) {
        const userRsvped = !ride.userRsvped;
        return {
          ...ride,
          userRsvped,
          rsvpCount: userRsvped ? ride.rsvpCount + 1 : ride.rsvpCount - 1,
        };
      }
      return ride;
    });
    saveRidesToLocal(updated);
  };

  // Forum Upvote Handler
  const handleForumUpvote = (postId: string) => {
    const updated = forumPosts.map((post) => {
      if (post.id === postId) {
        const hasLiked = !post.hasLiked;
        return {
          ...post,
          hasLiked,
          likes: hasLiked ? post.likes + 1 : post.likes - 1,
        };
      }
      return post;
    });
    saveForumToLocal(updated);
  };

  // Create forum thread submit handler
  const handleForumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: "post_" + Date.now(),
      authorName: "Tandav Rider (You)",
      authorTitle: "Rookie Carver",
      avatarSeed: "user_" + Date.now(),
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      likes: 1,
      repliesCount: 0,
      date: "Today",
      hasLiked: true,
    };

    saveForumToLocal([newPost, ...forumPosts]);
    setNewTitle("");
    setNewContent("");
    setIsForumModalOpen(false);
  };

  // Hall of Fame story submit handler
  const handleHallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRider.trim() || !newRoute.trim() || !newDesc.trim()) return;

    // Pick random unsplash moto image for user submission fallback
    const imagesFallback = [
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1615887137264-0017246a63f1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800"
    ];
    const pickedImage = imagesFallback[Math.floor(Math.random() * imagesFallback.length)];

    const newSubmission = {
      id: "hall_" + Date.now(),
      riderName: newRider.trim(),
      route: newRoute.trim(),
      bike: newBike.trim() || "Tandav Machine",
      desc: newDesc.trim(),
      imageUrl: pickedImage,
    };

    saveHallToLocal([newSubmission, ...loggedRides]);
    setNewRider("");
    setNewRoute("");
    setNewBike("");
    setNewDesc("");
    setIsHallModalOpen(false);
  };

  const filteredPosts = forumPosts.filter((post) => {
    if (selectedForumCategory === "all") return true;
    return post.category === selectedForumCategory;
  });

  return (
    <div className="bg-zinc-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Typographic Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs text-[#FF3E00] tracking-widest uppercase">The Tandav Tribe</span>
          <h2 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">
            Rider Community
          </h2>
          <div className="h-[2px] w-12 bg-[#FF3E00] mx-auto mt-4" />
          <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-4">
            Connect with owners and motorcycling enthusiasts across the subcontinent. RSVP to mountain expeditions, read mechanical blueprints, or share stories of your custom machine builds.
          </p>
        </div>

        {/* Section Tabs Selector */}
        <div className="flex justify-center border-b border-zinc-900 mb-10 overflow-x-auto text-xs sm:text-sm">
          <button
            onClick={() => setActiveSubTab("rides")}
            className={`flex items-center space-x-2 px-6 py-4 font-sans font-bold tracking-wider uppercase border-b-2 transition-colors focus:outline-none ${
              activeSubTab === "rides"
                ? "border-[#FF3E00] text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Tribe Rides</span>
          </button>
          <button
            onClick={() => setActiveSubTab("forum")}
            className={`flex items-center space-x-2 px-6 py-4 font-sans font-bold tracking-wider uppercase border-b-2 transition-colors focus:outline-none ${
              activeSubTab === "forum"
                ? "border-[#FF3E00] text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Bulletin Board</span>
          </button>
          <button
            onClick={() => setActiveSubTab("hall")}
            className={`flex items-center space-x-2 px-6 py-4 font-sans font-bold tracking-wider uppercase border-b-2 transition-colors focus:outline-none ${
              activeSubTab === "hall"
                ? "border-[#FF3E00] text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Route className="h-4 w-4" />
            <span>Hall of Fame</span>
          </button>
        </div>

        {/* SUB-TAB CONTENTS */}
        
        {/* 1. TRIBE RIDES: RIDE CALENDAR & CHAPTERS */}
        {activeSubTab === "rides" && (
          <div className="space-y-12 animate-fadeIn">
            {/* Upcoming Rides Grid */}
            <div>
              <h3 className="font-sans text-lg font-bold text-zinc-200 uppercase tracking-wider mb-6 flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3E00] mr-3" />
                Upcoming Expeditions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rides.map((ride) => (
                  <div
                    key={ride.id}
                    className="rounded-xl border border-zinc-900 bg-zinc-950/40 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Ride cover card */}
                      <div className="relative h-44 bg-zinc-900">
                        <img
                          src={ride.imageUrl}
                          alt={ride.title}
                          className="h-full w-full object-cover opacity-60"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 left-3 bg-zinc-950/90 border border-zinc-800 text-[9px] font-mono font-bold uppercase text-[#FF3E00] px-2 py-0.5 rounded">
                          {ride.difficulty} Difficulty
                        </span>
                        <span className="absolute bottom-3 left-3 bg-zinc-950/95 text-xs font-semibold px-2.5 py-1 rounded">
                          {ride.region} Region
                        </span>
                      </div>

                      {/* Ride Content */}
                      <div className="p-5 space-y-3 text-left">
                        <h4 className="font-sans text-base font-extrabold text-white uppercase tracking-wide line-clamp-1">{ride.title}</h4>
                        <p className="font-mono text-[10px] text-[#FF3E00] flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {ride.route}
                        </p>
                        <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                          {ride.description}
                        </p>

                        {/* Specs strip */}
                        <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 pt-3 text-[10px] font-mono text-zinc-400">
                          <div>
                            <span className="block text-zinc-600">DATE</span>
                            <span className="font-bold text-zinc-300">{ride.date.split(",")[0]}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-600">DISTANCE</span>
                            <span className="font-bold text-zinc-300">{ride.distance}</span>
                          </div>
                          <div>
                            <span className="block text-zinc-600">DURATION</span>
                            <span className="font-bold text-zinc-300">{ride.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Booking/RSVP action */}
                    <div className="p-5 pt-0 flex justify-between items-center">
                      <span className="font-mono text-[10px] text-zinc-500">
                        <span className="font-bold text-zinc-300">{ride.rsvpCount}</span> RSVPs Confirmed
                      </span>
                      <button
                        onClick={() => handleRsvpToggle(ride.id)}
                        className={`rounded-lg px-4 py-2 font-sans text-[10px] font-extrabold tracking-widest uppercase transition-colors focus:outline-none ${
                          ride.userRsvped
                            ? "bg-emerald-950 border border-emerald-800 text-emerald-400"
                            : "bg-[#FF3E00] text-white hover:bg-[#d53300]"
                        }`}
                      >
                        {ride.userRsvped ? "RSVP'D ✓" : "CONFIRM RSVP"}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Chapters Section */}
            <div className="border-t border-zinc-900 pt-10">
              <h3 className="font-sans text-lg font-bold text-zinc-200 uppercase tracking-wider mb-6 flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3E00] mr-3" />
                Active City Chapters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RIDER_CHAPTERS.map((chap) => (
                  <div
                    key={chap.id}
                    className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-5 flex space-x-4 items-center text-left"
                  >
                    <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                      <img
                        src={chap.coverImage}
                        alt={chap.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wide leading-tight">{chap.name}</h4>
                      <p className="font-sans text-xs text-zinc-500 line-clamp-1">{chap.description}</p>
                      <div className="flex items-center space-x-3 text-[10px] font-mono text-zinc-400">
                        <span>Members: {chap.memberCount}</span>
                        <span>Lead: {chap.leader}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. BULLETIN BOARD: FORUM DISCUSSIONS */}
        {activeSubTab === "forum" && (
          <div className="space-y-6 animate-fadeIn text-left max-w-4xl mx-auto">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-zinc-900 pb-5">
              {/* Categories Filter list */}
              <div className="flex items-center space-x-2 overflow-x-auto text-[11px] pb-1 sm:pb-0">
                <Filter className="h-3.5 w-3.5 text-zinc-500 mr-1.5" />
                {(["all", "rides", "tech", "customs", "general"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedForumCategory(cat)}
                    className={`rounded-full px-3.5 py-1.5 font-sans font-bold tracking-wider uppercase transition-colors focus:outline-none ${
                      selectedForumCategory === cat
                        ? "bg-zinc-800 text-[#FF3E00]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Create Thread button */}
              <button
                onClick={() => setIsForumModalOpen(true)}
                className="inline-flex items-center justify-center space-x-2 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-4 py-2 font-sans text-xs font-bold tracking-widest text-white uppercase transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>NEW TOPIC</span>
              </button>
            </div>

            {/* Discussions Threads stack */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 hover:border-zinc-800 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start"
                >
                  {/* Author profile avatar (simulated simple graphics) */}
                  <div className="flex items-start space-x-3.5 flex-grow">
                    <div className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-zinc-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-sans text-xs font-bold text-zinc-300">{post.authorName}</span>
                        <span className="text-[9px] font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded uppercase">
                          {post.authorTitle}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-500">{post.date}</span>
                      </div>
                      
                      <h4 className="font-sans text-base font-extrabold text-white uppercase tracking-wide leading-tight">
                        {post.title}
                      </h4>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed pr-2">
                        {post.content}
                      </p>
                      
                      {/* Topic Category tag */}
                      <span className="inline-block font-mono text-[9px] font-bold tracking-widest uppercase text-[#FF3E00]">
                        #{post.category}
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons right side */}
                  <div className="flex md:flex-col items-center gap-3.5 justify-end w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-zinc-900 shrink-0">
                    <button
                      onClick={() => handleForumUpvote(post.id)}
                      className={`inline-flex items-center space-x-2 rounded-lg border px-3 py-1.5 text-xs font-mono transition-colors focus:outline-none ${
                        post.hasLiked
                          ? "border-[#FF3E00]/40 bg-[#FF3E00]/5 text-[#FF3E00]"
                          : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{post.likes} Upvotes</span>
                    </button>
                    
                    <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-zinc-500 px-3">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{post.repliesCount} replies</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Interactive Create Forum Thread Modal */}
            {isForumModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
                <div className="w-full max-w-lg rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-2xl relative">
                  <div className="mb-4">
                    <h3 className="font-sans text-lg font-extrabold text-white uppercase tracking-wider">Start Discussion</h3>
                    <p className="font-sans text-xs text-zinc-500 mt-1">Publish a topic to the global Tandav Tribe bulletin board.</p>
                  </div>

                  <form onSubmit={handleForumSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-sans text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                      >
                        <option value="general">General Discussions</option>
                        <option value="rides">Group Rides & Routes</option>
                        <option value="tech">Technical & Mechanics</option>
                        <option value="customs">Custom Builds & Configs</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Discussion Title</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="E.G. CHRONOS EV MID-HIGH SPEED RANGE AUDIT"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                        maxLength={100}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Your Message</label>
                      <textarea
                        required
                        rows={4}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Write details of your question or report here..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-[#FF3E00] focus:outline-none"
                        maxLength={500}
                      />
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsForumModalOpen(false)}
                        className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 px-4 py-2.5 font-sans text-xs font-bold tracking-wider uppercase text-zinc-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-4 py-2.5 font-sans text-xs font-bold tracking-wider uppercase text-white transition-all duration-300"
                      >
                        Publish Topic
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. HALL OF FAME: FEATURED USER RIDES GALLERY */}
        {activeSubTab === "hall" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Log your ride trigger bar */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 flex flex-col sm:flex-row justify-between items-center text-left gap-4 max-w-4xl mx-auto">
              <div>
                <h4 className="font-sans text-lg font-extrabold text-zinc-100 uppercase tracking-wide">Share Your Journey</h4>
                <p className="font-sans text-xs text-zinc-500 mt-1">Conquered a high Himalayan pass or coastal hairpin? Post it to the Hall of Fame.</p>
              </div>
              <button
                onClick={() => setIsHallModalOpen(true)}
                className="inline-flex items-center justify-center space-x-2 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-5 py-2.5 font-sans text-xs font-bold tracking-widest text-white uppercase transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>LOG A RIDE STORY</span>
              </button>
            </div>

            {/* Ride Logs Gallery - Staggered layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left pt-4">
              {loggedRides.map((log) => (
                <div
                  key={log.id}
                  className="rounded-xl border border-zinc-900 bg-zinc-950 overflow-hidden group hover:border-zinc-800 transition-all"
                >
                  <div className="relative h-48 bg-zinc-900 overflow-hidden">
                    <img
                      src={log.imageUrl}
                      alt={log.route}
                      className="h-full w-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-zinc-900/80 px-2 py-0.5 rounded text-[9px] font-mono text-[#FF3E00] uppercase border border-zinc-800">
                      Ridden on {log.bike}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center space-x-1.5 text-zinc-500 font-mono text-[9px] uppercase">
                      <User className="h-3 w-3" />
                      <span>Rider: {log.riderName}</span>
                    </div>
                    <h5 className="font-sans text-base font-extrabold text-white uppercase tracking-wide">{log.route}</h5>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {log.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Log Your Ride Modal */}
            {isHallModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
                <div className="w-full max-w-md rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-2xl relative">
                  <div className="mb-4 text-left">
                    <h3 className="font-sans text-lg font-extrabold text-white uppercase tracking-wider">Log Ride Story</h3>
                    <p className="font-sans text-xs text-zinc-500 mt-1">Add your motorcycling experience on Indian roads to the gallery.</p>
                  </div>

                  <form onSubmit={handleHallSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newRider}
                        onChange={(e) => setNewRider(e.target.value)}
                        placeholder="E.G. AMAN SHARMA"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                        maxLength={40}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Route / Terrain Name</label>
                      <input
                        type="text"
                        required
                        value={newRoute}
                        onChange={(e) => setNewRoute(e.target.value)}
                        placeholder="E.G. KHARDUNG LA SUMMIT OVERPASS"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                        maxLength={60}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Tandav Bike Model ridden</label>
                      <input
                        type="text"
                        required
                        value={newBike}
                        onChange={(e) => setNewBike(e.target.value)}
                        placeholder="E.G. NOMAD-HELLHOUND 900"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white uppercase focus:border-[#FF3E00] focus:outline-none"
                        maxLength={45}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Ride Summary Description</label>
                      <textarea
                        required
                        rows={3}
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Tell the tribe what made this run legendary..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-[#FF3E00] focus:outline-none"
                        maxLength={250}
                      />
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsHallModalOpen(false)}
                        className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 px-4 py-2.5 font-sans text-xs font-bold tracking-wider uppercase text-zinc-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded-lg bg-[#FF3E00] hover:bg-[#d53300] px-4 py-2.5 font-sans text-xs font-bold tracking-wider uppercase text-white transition-all duration-300"
                      >
                        Submit Story
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
