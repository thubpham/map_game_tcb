import { useState } from 'react'; 
import type { UserProfileProps } from '../../types';
import { MOCK_BOOSTER } from '../../data/boosters';
import { TECHCOMBANK_SERVICES } from '../../data/techcombankServices';
import { Award, Star, TrendingUp, Zap, Info, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';


const UserProfile = ({ user }: UserProfileProps) => {

  // State management for modal and carousel
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Calculate progress percentage to next tier
  const progressPercentage = (user.points / user.pointsToNextTier) * 100;

  // Retrieve the booster mock data
  const activeBoosters = MOCK_BOOSTER.filter(booster => booster.isActive);
  
  // Get tier-specific colors
  const getTierColors = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return {
          badge: 'bg-gradient-to-r from-amber-600 to-amber-800',
          text: 'text-amber-600',
          progress: 'bg-gradient-to-r from-amber-400 to-amber-600'
        };
      case 'Silver':
        return {
          badge: 'bg-gradient-to-r from-gray-400 to-gray-600',
          text: 'text-gray-600',
          progress: 'bg-gradient-to-r from-gray-400 to-gray-600'
        };
      case 'Gold':
        return {
          badge: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
          text: 'text-yellow-600',
          progress: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
        };
      default:
        return {
          badge: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
          text: 'text-indigo-600',
          progress: 'bg-gradient-to-r from-indigo-400 to-indigo-600'
        };
    }
  };

  const tierColors = getTierColors(user.currentTier);

  // Carousel navigation functions
  const goToNextService = () => {
    setCurrentServiceIndex((prev) => 
      prev === TECHCOMBANK_SERVICES.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevService = () => {
    setCurrentServiceIndex((prev) => 
      prev === 0 ? TECHCOMBANK_SERVICES.length - 1 : prev - 1
    );
  };

  const goToService = (index: number) => {
    setCurrentServiceIndex(index);
  };

  // Modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const currentService = TECHCOMBANK_SERVICES[currentServiceIndex];
  
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 md:p-8">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:items-center md:space-x-8 md:space-y-0">
          
          {/* Avatar Section */}
          {/* <div className="relative group">
            <div className="relative">
              <div className={`absolute -inset-1 ${tierColors.progress} rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse`}></div>
              
              <img
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105"
                src={`https://i.pravatar.cc/150?u=${user.name}`}
                alt={user.name}
              />
              
              <div className={`absolute -bottom-1 -right-1 ${tierColors.badge} rounded-full p-3 text-white shadow-lg transform transition-all duration-300 group-hover:scale-110`}>
                <Award className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </div> */}

          {/* User Info Section */}
          <div className="flex-1 text-center md:text-left space-y-4">
            {/* Welcome Message */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </h1>
            </div>

            {/* Tier and Points Info */}
            <div className="space-y-3">
              {/* Current Tier */}
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Star className={`w-5 h-5 ${tierColors.text}`} />
                <span className="text-lg font-semibold text-gray-700">
                  Current Tier: 
                  <span className={`ml-1 ${tierColors.text} font-bold`}>
                    {user.currentTier}
                  </span>
                </span>
              </div>

              {/* Progress to Next Tier */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    {/* <TrendingUp className="w-4 h-4" />
                    <span>Progress to {user.nextTier}</span> */}
                  </span>
                  <span className="font-semibold">
                    {user.points} / {user.pointsToNextTier} pts
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full ${tierColors.progress} transition-all duration-1000 ease-out rounded-full relative`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Points needed */}
                <p className="text-sm text-gray-500 text-center md:text-left">
                  {user.pointsToNextTier - user.points} more points to reach {user.nextTier}!
                </p>
              </div>

              {/* Booster Section */}
              {activeBoosters.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      <h3 className="font-semibold text-gray-700">Active Boosters</h3>
                    </div>
                    <button 
                      onClick={openModal}
                      className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium hover:bg-indigo-50 px-2 py-1 rounded-lg"
                    >
                      <Info className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {activeBoosters.map((booster) => {
                      const IconComponent = booster.icon;
                      return (
                        <div
                          key={booster.id}
                          className="flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-full px-3 py-2 text-sm group hover:from-orange-100 hover:to-orange-150 transition-all duration-200"
                        >
                          <IconComponent className="w-4 h-4 text-orange-600" />
                          <span className="text-gray-700 font-medium">
                            {booster.name}
                          </span>
                          <span className="text-orange-600 font-semibold">
                            {booster.benefit}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {MOCK_BOOSTER.some(b => !b.isActive) && (
                    <p className="text-xs text-gray-500 text-center md:text-left">
                      Activate more Techcombank services to unlock additional boosters!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-xl"></div>

      {/* Modal for Techcombank Services */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Unlock More Boosters</h2>
                  <p className="text-indigo-100 mt-1">Discover Techcombank services that supercharge your rewards</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="p-6">
              <div className="relative">
                {/* Main Service Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 min-h-[400px]">
                  <div className="flex flex-col h-full">
                    {/* Service Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-4 bg-gradient-to-r ${currentService.gradient} rounded-2xl text-white shadow-lg`}>
                          <currentService.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-bold text-gray-800">{currentService.name}</h3>
                            {currentService.isPopular && (
                              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{currentService.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Booster Benefit Highlight */}
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-6 h-6 text-orange-600" />
                        <div>
                          <p className="font-semibold text-gray-800">Reward Booster</p>
                          <p className="text-orange-600 font-bold text-lg">{currentService.boosterBenefit}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="flex-1 mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {currentService.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-600">
                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                      <span>Learn More & Activate</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevService}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={goToNextService}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {TECHCOMBANK_SERVICES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToService(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentServiceIndex
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Service Counter */}
              <p className="text-center text-gray-500 text-sm mt-4">
                {currentServiceIndex + 1} of {TECHCOMBANK_SERVICES.length} services
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
