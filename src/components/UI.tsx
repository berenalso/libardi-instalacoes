import { Link } from "react-router-dom";
import { Box, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types";
import { money } from "../services/catalog";
import { useStore } from "../hooks/Store";
import { calculatePayment } from "../services/payment";
import { InstallmentDescription } from "./PaymentChoices";
export function Page({
  title,
  children,
  subtitle,
}: {
  title: string;
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <main id="conteudo" className="container page">
      <nav aria-label="Localização" className="breadcrumb">
        <Link to="/">Início</Link>
        <span>/</span>
        <span>{title}</span>
      </nav>
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </main>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return <p className="notice">{children}</p>;
}
export function Empty({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty panel">
      <Box size={44} />
      <h2>{title}</h2>
      {children}
      <Link className="button primary" to="/catalogo">
        Explorar catálogo
      </Link>
    </div>
  );
}
export function ProductImage({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [product.image]);
  return (
    <div className={"product-image " + (large ? "large" : "")}>
      {product.image && !failed ? (
        <img
          src={product.image}
          alt={product.imageNote || product.name}
          loading={large ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo-placeholder">
          <Box size={32} />
          <span>Foto em atualização</span>
        </div>
      )}
    </div>
  );
}
export function FavoriteButton({ id }: { id: string }) {
  const store = useStore();
  const active = store.favorites.includes(id);
  return (
    <button
      className={"icon-button favorite " + (active ? "selected" : "")}
      aria-label={
        (active ? "Remover dos favoritos: " : "Adicionar aos favoritos: ") + id
      }
      aria-pressed={active}
      onClick={() => store.favorite(id)}
    >
      <Heart size={22} fill={active ? "#f5c400" : "none"} />
    </button>
  );
}
export function Quantity({
  value,
  onChange,
  label = "Quantidade",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
}) {
  return (
    <div className="quantity" role="group" aria-label={label}>
      <button
        type="button"
        aria-label="Diminuir quantidade"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function ProductCard({ product }: { product: Product }) {
  const store = useStore();
  return (
    <article className="product-card">
      <div className="image-wrap">
        <Link to={"/produto/" + product.id}>
          <ProductImage product={product} />
        </Link>
        <span className="price-tag">Preço exemplo</span>
        <FavoriteButton id={product.id} />
      </div>
      {product.imageNote && (
        <small className="image-note">Imagem ilustrativa</small>
      )}
      <Link className="product-name" to={"/produto/" + product.id}>
        {product.name}
      </Link>
      <div className="product-meta">
        <span>{product.category}</span>
        <p>{product.description}</p>
      </div>
      <div className="desktop-price">
        <p className="rating">
          <span aria-label="Avaliação">★★★★★</span>{" "}
          {product.rating.toFixed(1).replace(".", ",")} · exemplo
        </p>
        <del>{money(Math.round(product.priceCents * 1.15))}</del>
      </div>
      <strong className="price">{money(product.priceCents)}</strong>
      <small className="mobile-only">Preço de exemplo</small>
      <div className="desktop-price">
        <small>
          {money(Math.round(product.priceCents * 0.95))} Pix · exemplo
        </small>
        <small>
          <InstallmentDescription amounts={calculatePayment(product.priceCents, { method: "credit", installments: 10 }).amounts} /> · exemplo
        </small>
      </div>
      <Link
        className="button outline view-product"
        to={"/produto/" + product.id}
      >
        Ver produto
      </Link>
      <button
        className="button primary add-product"
        onClick={() => store.add(product.id)}
      >
        <ShoppingCart size={17} />
        <span className="desktop-only">Adicionar ao carrinho</span>
        <span className="mobile-only">Comprar</span>
      </button>
    </article>
  );
}
export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
