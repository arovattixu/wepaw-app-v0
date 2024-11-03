export function calculateProgressiveDiscount(
  memberCount: number,
  basePrice: number,
  minDiscount: number,
  maxDiscount: number
): { discountPercentage: number; finalPrice: number } {
  // Ensure discounts are within valid range (0-100)
  minDiscount = Math.max(0, Math.min(100, minDiscount));
  maxDiscount = Math.max(0, Math.min(100, maxDiscount));

  // Calculate discount percentage based on member count
  // Using a logarithmic scale for smoother progression
  const discountRange = maxDiscount - minDiscount;
  const maxMembers = 100; // Maximum members for full discount
  
  let discountPercentage = minDiscount;
  
  if (memberCount > 1) {
    const progressFactor = Math.log(memberCount) / Math.log(maxMembers);
    discountPercentage += discountRange * Math.min(1, progressFactor);
  }

  // Round to 2 decimal places
  discountPercentage = Math.round(discountPercentage * 100) / 100;
  
  // Calculate final price
  const discount = basePrice * (discountPercentage / 100);
  const finalPrice = Math.round((basePrice - discount) * 100) / 100;

  return {
    discountPercentage,
    finalPrice
  };
}