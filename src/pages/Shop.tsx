import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Box,
  Sun,
  LayoutGrid,
  SlidersHorizontal,
  Truck,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  categories,
  products,
  slug,
  filterProducts,
  productById,
  money,
} from "../services/catalog";
import {
  Page,
  ProductGrid,
  ProductImage,
  Quantity,
  FavoriteButton,
  Empty,
} from "../components/UI";
import { SearchForm, ThemeButton } from "../components/Layout";
import { useStore } from "../hooks/Store";
const categoryLabels = [
  "Fios e Cabos",
  "Tomadas",
  "Interruptores",
  "Disjuntores",
  "Ferramentas",
  "Fixadores",
  "Eletrodutos",
  "Iluminação",
];
const categoryTargets = [
  categories[0],
  categories[1],
  categories[1],
  categories[3],
  categories[4],
  "Fixadores",
  "Eletrodutos",
  categories[2],
];
export function HomePage() {
  const featured = ["cabo25", "tomada10", "bipolar", "painel"].map((id) =>
    productById(id)!,
  );
  return (
    <main id="conteudo" className="home-page">
      <section className="hero desktop-only">
        <div>
          <span className="tag">Materiais e serviços elétricos</span>
          <h1>Tudo para a sua instalação elétrica, do material ao serviço</h1>
          <p>
            Compre fios, tomadas, disjuntores e iluminação ou contrate a equipe
            Libardi para instalar com segurança.
          </p>
          <div className="actions">
            <Link className="button primary" to="/catalogo">
              Ver produtos
            </Link>
            <Link className="button outline" to="/orcamento">
              Solicitar orçamento
            </Link>
          </div>
        </div>
        <img
          className="hero-art"
          src="/assets/banner.png"
          width="340"
          height="260"
          alt="Raio amarelo sobre fundo azul acinzentado"
        />
      </section>
      <div className="mobile-only mobile-home-intro">
        <SearchForm placeholder="Buscar produtos" />
        <section className="mobile-hero">
          <h1>
            Sua instalação
            <br />
            começa aqui.
          </h1>
          <p>Materiais e soluções elétricas em um só lugar.</p>
          <Link className="button primary" to="/catalogo">
            Explorar catálogo
          </Link>
        </section>
      </div>
      <section className="home-section">
        <div className="section-heading">
          <h2>
            <span className="desktop-only">Categorias</span>
            <span className="mobile-only">Compre por categoria</span>
          </h2>
          <Link className="desktop-only" to="/explorar">
            Ver todos <ArrowRight size={18} />
          </Link>
        </div>
        <div className="category-grid desktop-only">
          {categoryLabels.map((label, i) => (
            <Link key={label} to={"/categoria/" + slug(categoryTargets[i])}>
              {label}
              <ArrowRight size={20} />
            </Link>
          ))}
        </div>
        <div className="category-grid mobile-only">
          {[0, 1, 2, 3].map((i) => {
            const icons = [Zap, Box, Sun, LayoutGrid];
            const Icon = icons[i];
            return (
              <Link key={i} to={"/categoria/" + slug(categories[i])}>
                <Icon size={24} />
                {
                  [
                    "Fios e cabos",
                    "Tomadas",
                    "Iluminação",
                    "Proteção elétrica",
                  ][i]
                }
              </Link>
            );
          })}
        </div>
      </section>
      <section className="home-section">
        <div className="section-heading">
          <h2>
            <span className="desktop-only">Produtos em destaque</span>
            <span className="mobile-only">Em destaque</span>
          </h2>
          <Link className="desktop-only" to="/catalogo">
            Ver todos <ArrowRight size={18} />
          </Link>
        </div>
        <div className="desktop-featured">
          <ProductGrid items={featured} />
        </div>
        <div className="mobile-only">
          <ProductGrid items={featured.slice(0, 2)} />
          <h2 className="spaced">Mais vendidos</h2>
          <ProductGrid items={featured.slice(2)} />
        </div>
      </section>
      <section className="home-section">
        <div className="service-callout">
          <div>
            <h2>Precisa de uma instalação elétrica?</h2>
            <p>
              Conte o que você precisa e receba um orçamento da equipe Libardi.
            </p>
          </div>
          <Link to="/orcamento" className="button primary">
            Solicitar orçamento
          </Link>
        </div>
      </section>
    </main>
  );
}
export function CatalogPage() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const currentCategory = category || params.get("categoria") || "";
  const name = [...categories, "Fixadores", "Eletrodutos"].find(
    (c) => slug(c) === currentCategory,
  );
  const query = params.get("q") || "";
  function set(key: string, value: string) {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next);
  }
  const items = filterProducts({
    query,
    category: currentCategory,
    type: params.get("tipo") || "",
    brand: params.get("marca") || "",
    minimum: params.has("min") ? Number(params.get("min")) * 100 : undefined,
    maximum: params.has("max") ? Number(params.get("max")) * 100 : undefined,
    rating: Number(params.get("nota")) || 0,
    available: params.get("disponivel") === "sim",
    sort: params.get("ordem") || "",
  });
  return (
    <Page
      title={name || "Catálogo de produtos"}
      subtitle={
        query
          ? `Resultados para “${query}”`
          : "Preços, disponibilidade e avaliações demonstrativos."
      }
    >
      <div className="catalog-toolbar">
        <span aria-live="polite">{items.length} produtos</span>
        <button
          className="button secondary filter-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <SlidersHorizontal size={18} />
          Filtros
        </button>
        <label className="sort-label">
          Ordenar por
          <select
            aria-label="Ordenar por"
            value={params.get("ordem") || ""}
            onChange={(e) => set("ordem", e.target.value)}
          >
            <option value="">Relevância</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="mais-vendidos">Mais vendidos (exemplo)</option>
            <option value="avaliacao">Melhor avaliados</option>
            <option value="novidades">Novidades (exemplo)</option>
          </select>
        </label>
      </div>
      <div className="catalog-layout">
        <aside
          className={"filters panel " + (open ? "filters-open" : "")}
          aria-label="Filtros de produtos"
        >
          <h2>Departamentos</h2>
          <Link to="/catalogo">Todos os produtos</Link>
          {categories.map((c) => (
            <Link
              className={slug(c) === currentCategory ? "active" : ""}
              key={c}
              to={"/categoria/" + slug(c)}
            >
              {c}
            </Link>
          ))}
          <label>
            Buscar por nome
            <input
              value={query}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Nome do produto"
            />
          </label>
          <fieldset>
            <legend>Faixa de preço (R$)</legend>
            <div className="price-inputs">
              <label>
                Mínimo
                <input
                  aria-label="Preço mínimo"
                  type="number"
                  min="0"
                  value={params.get("min") || ""}
                  onChange={(e) => set("min", e.target.value)}
                />
              </label>
              <label>
                Máximo
                <input
                  aria-label="Preço máximo"
                  type="number"
                  min="0"
                  value={params.get("max") || ""}
                  onChange={(e) => set("max", e.target.value)}
                />
              </label>
            </div>
          </fieldset>
          <label>
            Marca
            <select
              value={params.get("marca") || ""}
              onChange={(e) => set("marca", e.target.value)}
            >
              <option value="">Todas</option>
              {[...new Set(products.map((p) => p.brand))].sort().map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label>
            Avaliação de exemplo
            <select
              value={params.get("nota") || ""}
              onChange={(e) => set("nota", e.target.value)}
            >
              <option value="">Todas</option>
              <option value="4.5">4,5 ou mais</option>
              <option value="4.8">4,8 ou mais</option>
            </select>
          </label>
          <label>
            Tipo de produto
            <select
              value={params.get("tipo") || ""}
              onChange={(e) => set("tipo", e.target.value)}
            >
              <option value="">Todos</option>
              {categories.map((c) => (
                <option key={c} value={slug(c)}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={params.get("disponivel") === "sim"}
              onChange={(e) => set("disponivel", e.target.checked ? "sim" : "")}
            />
            Disponível (simulado)
          </label>
          <button
            className="button outline"
            onClick={() => {
              setParams({});
              setOpen(false);
            }}
          >
            Limpar filtros
          </button>
          <button
            className="button primary mobile-only"
            onClick={() => setOpen(false)}
          >
            Ver {items.length} produtos
          </button>
        </aside>
        <div>
          {items.length ? (
            <ProductGrid items={items} />
          ) : (
            <Empty title="Nenhum produto encontrado">
              <p>Tente outro nome ou limpe os filtros.</p>
              <button className="button outline" onClick={() => setParams({})}>
                Limpar busca e filtros
              </button>
            </Empty>
          )}
        </div>
      </div>
    </Page>
  );
}
export function ProductPage() {
  const { id } = useParams();
  const p = productById(id || "");
  const store = useStore();
  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [id]);
  if (!p)
    return (
      <Page title="Produto não encontrado">
        <Empty title="Este produto não está no catálogo" />
      </Page>
    );
  return (
    <Page title={p.name}>
      <Link
        className="button secondary back-category"
        to={"/categoria/" + slug(p.category)}
      >
        Voltar à categoria
      </Link>
      <section className="product-detail panel">
        <div className="detail-photo">
          <ProductImage product={p} large />
          <FavoriteButton id={p.id} />
          {p.imageNote && <p className="image-note">{p.imageNote}</p>}
        </div>
        <div className="detail-info">
          <h2>{p.name}</h2>
          <p className="muted">
            ★ {p.rating.toFixed(1).replace(".", ",")} · avaliações de exemplo
          </p>
          <p className="desktop-only muted">
            Vendido e entregue por Libardi Instalações
          </p>
          <strong className="detail-price">{money(p.priceCents)}</strong>
          <small>Preço demonstrativo · sem oferta comercial</small>
          <p>
            {money(Math.round(p.priceCents * 0.95))} no Pix · 5% de desconto de
            exemplo
          </p>
          <div className="quantity-row">
            <span>Quantidade</span>
            <Quantity value={qty} onChange={setQty} />
          </div>
          <div className="product-buy">
            <button
              className="button primary"
              onClick={() => store.add(p.id, qty)}
            >
              Adicionar ao carrinho
            </button>
          </div>
          <div className="delivery-info">
            <Truck />
            <div>
              <strong>Entrega e retirada</strong>
              <p>Disponibilidade e frete a confirmar na operação real.</p>
            </div>
          </div>
        </div>
        <div className="detail-description">
          <details open>
            <summary>Descrição</summary>
            <p>{p.description}</p>
          </details>
          <details open>
            <summary>Especificações técnicas</summary>
            <dl>
              {p.specs.map((s, i) => (
                <div key={i}>
                  <dt>{s.split(":")[0]}</dt>
                  <dd>{s.split(":").slice(1).join(":").trim()}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </section>
      <section className="related">
        <h2>Produtos relacionados</h2>
        <ProductGrid
          items={products
            .filter((x) => x.category === p.category && x.id !== p.id)
            .slice(0, 3)}
        />
      </section>
    </Page>
  );
}
export function FavoritesPage() {
  const { favorites } = useStore();
  return (
    <Page
      title="Meus favoritos"
      subtitle="Sua lista fica salva neste navegador."
    >
      {favorites.length ? (
        <ProductGrid items={products.filter((p) => favorites.includes(p.id))} />
      ) : (
        <Empty title="Sua lista de favoritos está vazia">
          <Heart />
          <p>Toque no coração de um produto para salvá-lo aqui.</p>
        </Empty>
      )}
    </Page>
  );
}
export function ExplorePage() {
  return (
    <Page title="Explore a Libardi">
      <div className="explore-grid">
        <section className="panel">
          <h2>Departamentos</h2>
          {[...categories, "Fixadores", "Eletrodutos"].map((c) => (
            <Link className="menu-row" key={c} to={"/categoria/" + slug(c)}>
              {c}
              <ArrowRight size={18} />
            </Link>
          ))}
          <Link className="menu-row" to="/catalogo">
            Todos os produtos
            <ArrowRight size={18} />
          </Link>
          <Link className="menu-row" to="/ofertas">
            Ofertas de exemplo
            <ArrowRight size={18} />
          </Link>
        </section>
        <section className="panel">
          <h2>Sua conta</h2>
          {[
            ["/favoritos", "Favoritos"],
            ["/pedidos", "Meus pedidos"],
            ["/perfil", "Minha conta"],
          ].map(([to, label]) => (
            <Link className="menu-row" key={to} to={to}>
              {label}
              <ArrowRight size={18} />
            </Link>
          ))}
          <h2 className="spaced">Aparência</h2>
          <div className="actions">
            <ThemeButton />
            <span>Alternar entre claro e escuro</span>
          </div>
          <h2 className="spaced">Serviços e atendimento</h2>
          <Link className="menu-row" to="/servicos">
            Instalação elétrica
            <ArrowRight size={18} />
          </Link>
          <Link className="menu-row" to="/ajuda">
            Falar com a Libardi
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </Page>
  );
}
export function SearchPage() {
  return (
    <Page title="O que você procura?">
      <div className="search-page panel">
        <SearchForm autoFocus />
        <h2>Mais buscados</h2>
        <div className="chips">
          {["Cabo", "Disjuntor", "Tomada", "Lâmpada LED", "Alicate"].map(
            (q) => (
              <Link
                className="button outline"
                to={"/catalogo?q=" + encodeURIComponent(q)}
                key={q}
              >
                {q}
              </Link>
            ),
          )}
        </div>
        <Link to="/catalogo">Ver todos os produtos</Link>
      </div>
    </Page>
  );
}
