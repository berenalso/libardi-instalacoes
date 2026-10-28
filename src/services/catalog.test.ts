import { describe, it, expect } from "vitest";
import {
  cleanCart,
  cartTotal,
  filterProducts,
  products,
  money,
  addCartItem,
  setCartQuantity,
} from "./catalog";
describe("Carrinho", () => {
  it("adiciona vários produtos, atualiza, remove e retorna ao estado vazio sem mutar o original", () => {
    const original = {};
    let cart = addCartItem(original, "cabo25");
    cart = addCartItem(cart, "tomada10", 3);
    expect(cartTotal(cart)).toBe(21960);
    cart = setCartQuantity(cart, "cabo25", 2);
    expect(cartTotal(cart)).toBe(40950);
    cart = setCartQuantity(cart, "tomada10", 0);
    expect(cartTotal(cart)).toBe(37980);
    cart = setCartQuantity(cart, "cabo25", 0);
    expect(cart).toEqual({});
    expect(cartTotal(cart)).toBe(0);
    expect(original).toEqual({});
  });
  it("rejeita operações com quantidades inválidas e produtos inexistentes", () => {
    const cart = { cabo25: 2 };
    for (const n of [-1, 0.5, NaN, Infinity, Number.MAX_VALUE]) {
      expect(addCartItem(cart, "cabo25", n)).toEqual(cart);
      expect(setCartQuantity(cart, "cabo25", n)).toEqual(cart);
    }
    expect(addCartItem(cart, "cabo25", 0)).toEqual(cart);
    expect(addCartItem(cart, "unknown", 1)).toEqual(cart);
    expect(setCartQuantity(cart, "unknown", 1)).toEqual(cart);
  });
  it("limita adições repetidas e mudanças a 99 unidades", () => {
    expect(addCartItem({ cabo25: 98 }, "cabo25", 4)).toEqual({ cabo25: 99 });
    expect(setCartQuantity({}, "cabo25", 200)).toEqual({ cabo25: 99 });
    expect(cartTotal({ cabo25: 99, tomada10: 99 })).toBe(1978020);
  });
  it("preserva um carrinho após serialização e recuperação local", () => {
    const cart = addCartItem(addCartItem({}, "painel", 7), "lampada", 3);
    expect(cleanCart(JSON.parse(JSON.stringify(cart)))).toEqual(cart);
    expect(cartTotal(cart)).toBe(33500);
  });
  it("soma valores em centavos sem erro de ponto flutuante", () =>
    expect(cartTotal({ cabo25: 2, tomada10: 3 })).toBe(40950));
  it("recusa dados adulterados ou corrompidos e limita quantidades", () =>
    expect(
      cleanCart({
        cabo25: Infinity,
        tomada10: -1,
        painel: 2.7,
        bipolar: 500,
        unknown: 5,
      }),
    ).toEqual({ painel: 2, bipolar: 99 }));
  it("aceita armazenamento ausente", () => {
    expect(cleanCart(null)).toEqual({});
    expect(cleanCart([])).toEqual({});
  });
  it("formata moeda brasileira", () =>
    expect(money(19980).replace(/\s/g, " ")).toBe("R$ 199,80"));
});
describe("Catálogo", () => {
  it("inclui todos os 26 produtos do Figma sem IDs duplicados", () => {
    expect(products).toHaveLength(26);
    expect(new Set(products.map((p) => p.id)).size).toBe(26);
  });
  it("busca sem diferenciar acentos e maiúsculas", () =>
    expect(filterProducts({ query: "LAMPADA" }).map((p) => p.id)).toEqual([
      "lampada",
    ]));
  it("combina categoria, marca e preço", () =>
    expect(
      filterProducts({
        category: "tomadas-e-interruptores",
        brand: "Tramontina",
        maximum: 1500,
      }).map((p) => p.id),
    ).toEqual(["tomada20"]));
  it("ordena valores numericamente nas duas direções", () => {
    expect(filterProducts({ sort: "menor-preco" })[0].id).toBe("lampada");
    expect(filterProducts({ sort: "maior-preco" })[0].id).toBe("cabopp");
  });
  it("retorna vazio quando nenhum produto corresponde", () =>
    expect(filterProducts({ query: "produto-inexistente" })).toEqual([]));
});
