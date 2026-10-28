export type PaymentMethod = "debit" | "credit" | "pix";
export type PaymentSelection = { method: PaymentMethod; installments: number };
export const paymentNames: Record<PaymentMethod, string> = {
  debit: "Cartão de débito",
  credit: "Cartão de crédito",
  pix: "Pix",
};
export function normalizePayment(value: unknown): PaymentSelection {
  const candidate = value as Partial<PaymentSelection> | null;
  const method =
    candidate?.method === "credit" || candidate?.method === "pix"
      ? candidate.method
      : "debit";
  const count = candidate?.installments;
  return {
    method,
    installments:
      method === "credit" && typeof count === "number" && Number.isFinite(count)
        ? Math.min(10, Math.max(1, Math.floor(count)))
        : 1,
  };
}
export function calculatePayment(
  subtotalCents: number,
  selection: PaymentSelection,
) {
  const subtotal =
    Number.isSafeInteger(subtotalCents) && subtotalCents >= 0
      ? subtotalCents
      : 0;
  const payment = normalizePayment(selection);
  const discountCents =
    payment.method === "pix" ? subtotal - Math.round((subtotal * 95) / 100) : 0;
  const totalCents = subtotal - discountCents;
  const count = payment.installments;
  const floor = Math.floor(totalCents / count);
  const remainder = totalCents % count;
  const amounts = Array.from(
    { length: count },
    (_, index) => floor + (index < remainder ? 1 : 0),
  );
  return {
    ...payment,
    subtotalCents: subtotal,
    discountCents,
    totalCents,
    amounts,
  };
}
