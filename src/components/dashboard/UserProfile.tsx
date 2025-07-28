import { useState } from 'react'; 
import type { UserProfileProps } from '../../types';
import { MOCK_BOOSTER } from '../../data/boosters';
import { GOLD_TIER_BENEFITS } from '../../data/tierBenefits';
import { TECHCOMBANK_SERVICES } from '../../data/techcombankServices';
import { Award, Star, Zap, Info, X, ArrowRight, ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import Card from '../common/Card';


const UserProfile = ({ user }: UserProfileProps) => {

  // State management for modal and carousel
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);

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
  const openServicesModal = () => setIsServicesModalOpen(true);
  const closeServicesModal = () => setIsServicesModalOpen(false);
  const openTierModal = () => setIsTierModalOpen(true);
  const closeTierModal = () => setIsTierModalOpen(false);

  const currentService = TECHCOMBANK_SERVICES[currentServiceIndex];
  
  return (
    <Card className="relative flex flex-col h-full overflow-hidden p-3"> 

    {/* <div className="relative overflow-hidden"> */}
      
      {/* Main Content - Fixed border styling */}
      {/* <div className="relative"> */}
        {/* Solid background layer for better border rendering */}
        {/* <div className="absolute inset-0 bg-white rounded-2xl shadow-lg"></div> */}
        
        {/* Content layer with subtle transparency */}
        {/* <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200/80 p-6 md:p-8"> */}
          <div className="flex flex-col items-center space-y-6 md:flex-row md:items-center md:space-x-8 md:space-y-0">

            {/* User Info Section */}
            <div className="flex-1 text-center md:text-left space-y-4">
              {/* Welcome Message */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Welcome Back, {user.name}!
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
                  
                  {/* Points needed with clickable tier benefits */}
                  <p className="text-sm text-gray-500 text-center md:text-left">
                    {user.pointsToNextTier - user.points} more points to reach {user.nextTier} - {' '}
                    <button 
                      onClick={openTierModal}
                      className="text-amber-600 hover:text-amber-700 underline font-medium transition-colors duration-200"
                    >
                      Discover {user.nextTier} tier benefits!
                    </button>
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
                        className="flex items-center space-x-1 text-sm text-amber-600 hover:text-amber-700 transition-colors duration-200 font-medium hover:bg-amber-30 px-2 py-1 rounded-lg"
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
        {/* </div> */}
      {/* </div> */}

      {/* Decorative Elements - moved outside main container */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-xl pointer-events-none"></div>

      {/* Modal for Techcombank Services */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}>
          </div>
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Unlock Powerful Reward Boosters</h2>
                  <p className="text-amber-100 mt-1">Activate Techcombank services to supercharge your reward journey</p>
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
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 min-h-[500px]">
                  <div className="flex flex-col h-full">
                    {/* Service Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-4 bg-gradient-to-r ${currentService.gradient} rounded-2xl text-white shadow-lg`}>
                          <currentService.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{currentService.name}</h3>
                            {currentService.isPopular && (
                              <span className="bg-gradient-to-r from-amber-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{currentService.description}</p>
                          
                          {/* Quick Stats */}
                          <div className="flex gap-4 text-sm">
                            {currentService.interestRate && (
                              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1">
                                <span className="text-amber-700 font-semibold">{currentService.interestRate}</span>
                              </div>
                            )}
                            {currentService.minAmount && (
                              <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1">
                                <span className="text-gray-700">Min: {currentService.minAmount}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booster Benefit Highlight */}
                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-6 h-6 text-amber-600" />
                        <div>
                          <p className="font-semibold text-gray-800">Reward Booster Unlock</p>
                          <p className="text-amber-700 font-bold text-lg">{currentService.boosterBenefit}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="flex-1 mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Award className="w-5 h-5 text-amber-600 mr-2" />
                        Key Features & Benefits
                      </h4>
                      <ul className="space-y-3">
                        {currentService.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3 text-gray-600">
                            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white py-4 px-6 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-900 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                      <span>Activate Service & Unlock Booster</span>
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
                        ? 'bg-gradient-to-r from-amber-500 to-amber-700 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Service Counter */}
              <p className="text-center text-gray-500 text-sm mt-4">
                {currentServiceIndex + 1} of {TECHCOMBANK_SERVICES.length} services • Activate any service to earn instant booster rewards
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Tier Benefits */}
      {isTierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeTierModal}
          ></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <Crown className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Gold Tier Gaming Perks</h2>
                    <p className="text-amber-100 mt-1">Unlock exclusive challenges, free rewards, and premium gaming benefits</p>
                  </div>
                </div>
                <button
                  onClick={closeTierModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {/* Progress Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Your Progress to Gold</h3>
                    <p className="text-gray-600">
                      Only <span className="font-bold text-amber-600">{user.pointsToNextTier - user.points} points</span> away from unlocking these amazing benefits!
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-600">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {GOLD_TIER_BENEFITS.map((benefit) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={benefit.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl text-white flex-shrink-0">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-2">{benefit.title}</h4>
                          <p className="text-gray-600 text-sm mb-4">{benefit.description}</p>
                          
                          {/* Comparison */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Current ({user.currentTier}):</span>
                              <span className="text-gray-600 font-medium">{benefit.currentTierValue}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-amber-600 font-semibold">Gold Tier:</span>
                              <span className="text-amber-700 font-bold">{benefit.goldTierValue}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Unlock Gold Gaming Perks?</h3>
                  <p className="text-gray-600">Level up your reward game with exclusive challenges, free orders, and premium benefits!</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      closeTierModal();
                      openServicesModal();
                    }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Activate Services & Earn Points</span>
                  </button>
                  
                  <button className="border-2 border-amber-600 text-amber-600 py-4 px-8 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Crown className="w-5 h-5" />
                    <span>View All Gold Perks</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    {/* </div> */}
    </Card>
  );
};

export default UserProfile;