export function calculateCurrentDiscount(
  memberCount: number,
  baseDiscount: number,
  maxDiscount: number,
  minMembers: number
): number {
  if (memberCount >= minMembers) {
    return maxDiscount;
  }

  const progressPercentage = (memberCount - 1) / (minMembers - 1);
  const discountRange = maxDiscount - baseDiscount;
  const additionalDiscount = discountRange * progressPercentage;
  
  return Math.round(baseDiscount + additionalDiscount);
}

export function calculateGroupPrice(
  basePrice: number,
  discountPercentage: number
): number {
  const discountMultiplier = 1 - (discountPercentage / 100);
  return Math.round(basePrice * discountMultiplier * 100) / 100;
}

export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function calculateSavings(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}