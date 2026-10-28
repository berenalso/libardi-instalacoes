import { describe, expect, it } from "vitest";
import { validateCustomer, type Customer } from "./checkout";
const valid: Customer = {
  name: "Cliente Exemplo", email: "cliente@example.com", phone: "(51) 99999-9999",
  cep: "93800-000", street: "Rua Exemplo", number: "100", district: "Centro",
  city: "Cidade Exemplo", state: "RS", delivery: "entrega",
};
describe("Validação do checkout demonstrativo", () => {
  it("aceita endereço completo e retirada sem endereço de entrega", () => {
    expect(validateCustomer(valid)).toBe("");
    expect(validateCustomer({ ...valid, delivery: "retirada", cep: "", street: "", number: "", district: "", city: "" })).toBe("");
  });
  it("rejeita nome incompleto, e-mail inválido e telefone inválido", () => {
    expect(validateCustomer({ ...valid, name: "Cliente" })).toContain("sobrenome");
    expect(validateCustomer({ ...valid, email: "a@" })).toContain("e-mail");
    for (const phone of ["123", "abcdef51999999999", "   "])
      expect(validateCustomer({ ...valid, phone })).toContain("telefone");
  });
  it("rejeita CEP incorreto e campos de endereço contendo somente espaços", () => {
    for (const cep of ["123", "abc93800000", "93800 000"])
      expect(validateCustomer({ ...valid, cep })).toContain("CEP");
    for (const key of ["street", "number", "district", "city"])
      expect(validateCustomer({ ...valid, [key]: "   " })).toContain("Espaços");
    expect(validateCustomer({ ...valid, state: "XX" })).toContain("estado");
    expect(validateCustomer({ ...valid, delivery: "unknown" })).toContain("entrega");
  });
});
