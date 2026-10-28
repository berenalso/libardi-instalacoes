import { describe, it, expect } from "vitest";
import { calculatePayment, normalizePayment } from "./payment";
describe("Pagamento demonstrativo", () => {
  it("preserva o total para todos os parcelamentos e totais de exemplo", () => {
    for (const total of [1, 990, 1499, 19980, 40950, 1978020]) {
      for (let installments = 1; installments <= 10; installments++) {
        const payment = calculatePayment(total, { method: "credit", installments });
        expect(payment.amounts.reduce((sum, amount) => sum + amount, 0)).toBe(total);
        expect(payment.amounts.every(Number.isSafeInteger)).toBe(true);
      }
    }
  });
  it("neutraliza subtotais inválidos", () => {
    for (const total of [-1, NaN, Infinity, 1.5])
      expect(calculatePayment(total, { method: "debit", installments: 1 }).totalCents).toBe(0);
  });
  it("aplica 5% de desconto Pix em centavos", () =>
    expect(
      calculatePayment(19980, { method: "pix", installments: 10 }),
    ).toMatchObject({
      discountCents: 999,
      totalCents: 18981,
      installments: 1,
      amounts: [18981],
    }));
  it("mantém o preço Pix anunciado nos cards mesmo no meio centavo", () =>
    expect(
      calculatePayment(18990, { method: "pix", installments: 1 }),
    ).toMatchObject({ totalCents: 18041, discountCents: 949 }));
  it("mantém débito à vista sem desconto", () =>
    expect(
      calculatePayment(19980, { method: "debit", installments: 4 }),
    ).toMatchObject({
      discountCents: 0,
      totalCents: 19980,
      installments: 1,
      amounts: [19980],
    }));
  it("divide o crédito preservando todos os centavos", () => {
    const p = calculatePayment(19980, { method: "credit", installments: 7 });
    expect(p.amounts).toHaveLength(7);
    expect(p.amounts.reduce((a, b) => a + b, 0)).toBe(19980);
    expect(Math.max(...p.amounts) - Math.min(...p.amounts)).toBe(1);
  });
  it("limita e recupera preferências inválidas do armazenamento", () => {
    expect(normalizePayment({ method: "credit", installments: 999 })).toEqual({
      method: "credit",
      installments: 10,
    });
    expect(normalizePayment({ method: "credit", installments: NaN })).toEqual({
      method: "credit",
      installments: 1,
    });
    expect(normalizePayment(null)).toEqual({
      method: "debit",
      installments: 1,
    });
  });
});
