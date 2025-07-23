import type { CarouselBoxProps } from "../types";
import tcbRewardBanner from '../assets/images/tcb-reward-banner.png';

export const MOCK_CAROUSEL_BOX: CarouselBoxProps[] = [
    { id: '1', title: 'Earn 2X Stars!', description: 'On all food purchases this week.', imageURL: "https://www.cnet.com/a/img/resize/f5a2c63431028e46ee91a04e0e6d608c41616735/hub/2025/04/16/3826a000-b642-4435-9e1d-710084fc752d/l3dwlwnvbn-gettyimages-1311472496.jpg?auto=webp&fit=crop&height=675&width=1200" },
    { id: '2', title: 'Free Coffee Refill', description: 'With any pastry purchase.', imageURL: tcbRewardBanner },
    { id: '3', title: 'New Summer Drinks', description: 'Try our refreshing new menu items!', imageURL: tcbRewardBanner },
    { id: '4', title: 'Weekend Bonus', description: 'Get 10 bonus stars on Saturday and Sunday.', imageURL: tcbRewardBanner },
    { id: '5', title: 'App Exclusive', description: 'Order ahead and skip the line!', imageURL: tcbRewardBanner },
  ];