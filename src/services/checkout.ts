export type Customer = {
  name: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  delivery: string;
};
export const states = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");
export function validateCustomer(data: Customer): string {
  if (data.name.trim().split(/\s+/).length < 2)
    return "Informe nome e sobrenome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    return "Informe um e-mail válido.";
  if (!/^[\d\s()+.-]+$/.test(data.phone) || !/^\d{10,11}$/.test(data.phone.replace(/\D/g, "")))
    return "Informe um telefone com DDD e 10 ou 11 dígitos.";
  if (!["entrega", "retirada"].includes(data.delivery))
    return "Escolha entrega ou retirada.";
  if (data.delivery === "entrega") {
    if (!/^\d{5}-?\d{3}$/.test(data.cep.trim()))
      return "Informe um CEP com 8 dígitos.";
    if ([data.street, data.number, data.district, data.city].some((value) => !value.trim()))
      return "Preencha rua, número, bairro e cidade. Espaços em branco não são válidos.";
    if (!states.includes(data.state)) return "Escolha um estado válido.";
  }
  return "";
}
