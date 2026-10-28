import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Home,
  LayoutGrid,
  Heart,
  ReceiptText,
  UserRound,
  Search,
  ShoppingCart,
  Sun,
  Moon,
  ArrowRight,
  Phone,
  MapPin,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useStore } from "../hooks/Store";
import { categories, slug } from "../services/catalog";
export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Libardi Instalações — início">
      <img src="/assets/logo.png" alt="" width="50" height="50" />
      <span>
        <strong>LIBARDI</strong>
        <small>INSTALAÇÕES</small>
      </span>
    </Link>
  );
}
export function SearchForm({ autoFocus = false, placeholder = "O que você procura?" }: { autoFocus?: boolean; placeholder?: string }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  function submit(e: FormEvent) {
    e.preventDefault();
    nav("/catalogo" + (q.trim() ? "?q=" + encodeURIComponent(q.trim()) : ""));
  }
  return (
    <form className="search-form" role="search" onSubmit={submit}>
      <input
        aria-label="Buscar produtos"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={autoFocus}
      />
      <button aria-label="Pesquisar" type="submit">
        <Search size={21} />
      </button>
    </form>
  );
}
export function ThemeButton() {
  const { theme, setTheme } = useStore();
  return (
    <button
      className="icon-button theme-button"
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
export function Layout() {
  const store = useStore();
  const location = useLocation();
  const count = Object.values(store.cart).reduce((a, b) => a + b, 0);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Libardi Instalações";
  }, [location.pathname]);
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="header">
        <Logo />
        <div className="desktop-search">
          <SearchForm />
        </div>
        <nav className="header-actions" aria-label="Principal">
          <ThemeButton />
          <Link className="button secondary desktop-only" to="/explorar">
            Explorar
          </Link>
          <Link
            className="icon-button mobile-only"
            aria-label="Abrir pesquisa"
            to="/pesquisa"
          >
            <Search />
          </Link>
          <Link
            className="icon-button cart-link"
            to="/carrinho"
            aria-label={"Carrinho, " + count + " itens"}
          >
            <ShoppingCart />
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
          <Link className="account-link desktop-only" to="/perfil">
            <UserRound />
            <span>
              Minha
              <br />
              conta
            </span>
          </Link>
        </nav>
      </header>
      {store.storageError && (
        <div role="alert" className="notice">
          Seu navegador não permitiu salvar os dados. Eles serão mantidos
          somente nesta visita.
        </div>
      )}
      <Outlet />
      <footer className="footer">
        <div className="footer-columns">
          <section>
            <Logo />
            <p>
              Materiais elétricos e serviços de instalação com qualidade,
              segurança e atendimento próximo.
            </p>
          </section>
          <section>
            <h3>Produtos</h3>
            {categories.slice(0, 4).map((c) => (
              <Link key={c} to={"/categoria/" + slug(c)}>
                {c}
              </Link>
            ))}
          </section>
          <section>
            <h3>Serviços</h3>
            <Link to="/servicos">Instalação residencial</Link>
            <Link to="/servicos">Instalação comercial</Link>
            <Link to="/servicos">Manutenção</Link>
            <Link to="/orcamento">Solicitar orçamento</Link>
          </section>
          <section>
            <h3>Institucional</h3>
            <Link to="/sobre">Sobre a Libardi</Link>
            <Link to="/trabalhe-conosco">Trabalhe conosco</Link>
            <Link to="/privacidade">Política de privacidade</Link>
            <Link to="/termos">Termos de uso</Link>
          </section>
          <section>
            <h3>Ajuda</h3>
            <Link to="/ajuda">Central de ajuda</Link>
            <Link to="/trocas">Trocas e devoluções</Link>
            <Link to="/entregas">Prazos de entrega</Link>
            <Link to="/pedidos">Meus pedidos</Link>
          </section>
          <section>
            <h3>Contato</h3>
            <a href="tel:+5551999718787">
              <Phone size={16} /> (51) 99971-8787
            </a>
            <p>
              <MapPin size={16} /> R. Gen. Daltro Filho, 88 — Centro, Sapiranga
              — RS, 93800-236
            </p>
            <Link to="/ajuda">
              Fale com a gente <ArrowRight size={14} />
            </Link>
          </section>
        </div>
        <div className="footer-demo">
          <strong>Ambiente demonstrativo</strong>
          <span>
            Preços e avaliações de exemplo. Sem cobrança, pedidos reais ou envio
            de formulários.
          </span>
        </div>
        <p className="copyright">
          © 2026 Libardi Instalações. Todos os direitos reservados.
        </p>
      </footer>
      <nav className="bottom-nav" aria-label="Navegação mobile">
        {[
          ["/", "Início", Home],
          ["/explorar", "Categorias", LayoutGrid],
          ["/favoritos", "Favoritos", Heart],
          ["/pedidos", "Pedidos", ReceiptText],
          ["/perfil", "Perfil", UserRound],
        ].map(([to, label, Icon]) => {
          const Component = Icon as typeof Home;
          return (
            <NavLink key={String(to)} end={to === "/"} to={String(to)}>
              <Component size={23} />
              <span>{String(label)}</span>
            </NavLink>
          );
        })}
      </nav>
      <div
        className={"toast " + (store.message ? "shown" : "")}
        role="status"
        aria-live="polite"
      >
        {store.message}
      </div>
    </>
  );
}
