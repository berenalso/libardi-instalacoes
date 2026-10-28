import { CreditCard, WalletCards, QrCode } from "lucide-react";
import {
  calculatePayment,
  paymentNames,
  type PaymentMethod,
} from "../services/payment";
import { money } from "../services/catalog";
const choices = [
  {
    method: "debit",
    icon: WalletCards,
    description: "À vista, com cartão fictício.",
  },
  {
    method: "credit",
    icon: CreditCard,
    description: "De 1 a 10 parcelas sem juros, apenas como exemplo.",
  },
  {
    method: "pix",
    icon: QrCode,
    description: "À vista, com 5% de desconto de exemplo.",
  },
] as const;
export function InstallmentDescription({ amounts }: { amounts: number[] }) {
  const minimum = Math.min(...amounts),
    maximum = Math.max(...amounts);
  return (
    <>
      {amounts.length === 1
        ? `À vista: ${money(amounts[0])}`
        : minimum === maximum
          ? `${amounts.length}x de ${money(minimum)} sem juros`
          : `${amounts.length} parcelas de ${money(minimum)} a ${money(maximum)} sem juros`}
    </>
  );
}
export function PaymentChoices({
  method,
  installments,
  subtotal,
  onMethod,
  onInstallments,
}: {
  method: PaymentMethod | "";
  installments: number;
  subtotal: number;
  onMethod: (m: PaymentMethod) => void;
  onInstallments: (n: number) => void;
}) {
  const plan = method
    ? calculatePayment(subtotal, { method, installments })
    : null;
  return (
    <fieldset className="payment-fieldset">
      <legend>Escolha a forma de pagamento demonstrativa</legend>
      <div className="payment-options">
        {choices.map(({ method: value, icon: Icon, description }) => (
          <label
            className={"payment-option " + (method === value ? "chosen" : "")}
            key={value}
          >
            <input
              type="radio"
              name="payment"
              required
              value={value}
              checked={method === value}
              onChange={() => onMethod(value)}
            />
            <Icon size={23} />
            <span>
              <strong>{paymentNames[value]}</strong>
              <small>{description}</small>
            </span>
          </label>
        ))}
      </div>
      {method === "credit" && (
        <label>
          Parcelamento
          <select
            value={installments}
            onChange={(e) => onInstallments(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((count) => (
              <option key={count} value={count}>
                {count}x sem juros · total {money(subtotal)}
              </option>
            ))}
          </select>
        </label>
      )}
      {plan && (
        <div className="payment-preview" aria-live="polite">
          <strong>{paymentNames[plan.method]} · simulação</strong>
          <p>
            <InstallmentDescription amounts={plan.amounts} />
          </p>
          {method === "credit" && plan.amounts.length > 1 && (
            <ol className="installment-list">
              {plan.amounts.map((amount, index) => (
                <li key={index}>
                  Parcela {index + 1}: {money(amount)}
                </li>
              ))}
            </ol>
          )}
          {method === "pix" && (
            <p>
              Desconto de exemplo: {money(plan.discountCents)}. Nenhuma chave ou
              QR Code de pagamento é gerado.
            </p>
          )}
          <small>
            Dados fictícios. Nenhuma transação ou aprovação de pagamento será
            realizada.
          </small>
        </div>
      )}
    </fieldset>
  );
}
