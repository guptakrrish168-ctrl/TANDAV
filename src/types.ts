/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BikeColor {
  name: string;
  hex: string;
  bgClass: string;
  accentColor: string;
  imageUrls: {
    side: string;
    front: string;
    rear: string;
  };
}

export interface BikeAccessory {
  id: string;
  name: string;
  category: "exhaust" | "luggage" | "ergonomics" | "protection" | "performance";
  price: number;
  weightChange: number; // in kg (can be negative like carbon exhaust)
  desc: string;
}

export interface BikeModel {
  id: string;
  name: string;
  tagline: string;
  category: "Street" | "Adventure" | "Cruiser" | "Electric";
  basePrice: number; // in INR
  engine: string;
  power: string; // e.g., "115 BHP @ 10,500 RPM"
  torque: string; // e.g., "89 Nm @ 8,500 RPM"
  weight: number; // wet weight in kg
  tankCapacity: string;
  seatHeight: string;
  description: string;
  engineeringStory: string;
  terrainTags: string[];
  colors: BikeColor[];
  accessories: BikeAccessory[];
  specs: {
    label: string;
    value: string;
  }[];
}

export interface CustomBuild {
  id: string;
  modelId: string;
  modelName: string;
  colorName: string;
  colorHex: string;
  selectedAccessories: BikeAccessory[];
  totalPrice: number;
  totalWeight: number;
  buildName: string;
  createdAt: string;
}

export interface RideEvent {
  id: string;
  title: string;
  route: string;
  date: string;
  region: "North" | "South" | "West" | "East";
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme";
  distance: string;
  duration: string;
  description: string;
  rsvpCount: number;
  userRsvped: boolean;
  imageUrl: string;
}

export interface RiderChapter {
  id: string;
  name: string;
  city: string;
  memberCount: number;
  description: string;
  coverImage: string;
  leader: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorTitle: string;
  avatarSeed: string;
  title: string;
  content: string;
  category: "rides" | "tech" | "general" | "customs";
  likes: number;
  repliesCount: number;
  date: string;
  hasLiked?: boolean;
}

export interface Booking {
  id: string;
  modelId: string;
  modelName: string;
  dealerCity: string;
  dealerName: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredSlot: string;
  createdAt: string;
}
