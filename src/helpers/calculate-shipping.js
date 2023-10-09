import {
  minPriceShippingFree,
  shippingPrice,
} from "../components/Navigation/Placeholders";

export const calculateShippingStatus = (
  totalAmountToPay,
  totalAmount,
  voucher
) => {
  let shippingTotal;
  if (totalAmount > minPriceShippingFree) {
    shippingTotal = "FREE";
  } else {
    shippingTotal = shippingPrice;
  }

  const voucherTotal = totalAmount - totalAmountToPay;

  let totalTotal;
  if (!voucher) {
    if (totalAmount < minPriceShippingFree) {
      totalTotal = totalAmount + shippingPrice;
    } else {
      totalTotal = totalAmount;
    }
  } else {
    if (totalAmountToPay < minPriceShippingFree) {
      totalTotal = totalAmountToPay + shippingPrice;
    } else {
      totalTotal = totalAmountToPay;
    }
  }

  return [
    { name: "subtotal", total: totalAmount },
    { name: "shipping", total: shippingTotal },
    { name: "voucher", total: -voucherTotal },
    { name: "total", total: totalTotal },
  ];
};
