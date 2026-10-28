import React, { Component, type ErrorInfo, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "./styles.css";
import { StoreProvider } from "./hooks/Store";
import { Layout } from "./components/Layout";
import {
  HomePage,
  CatalogPage,
  ProductPage,
  FavoritesPage,
  ExplorePage,
  SearchPage,
} from "./pages/Shop";
import { CartPage, CheckoutPage, CheckoutDone } from "./pages/Checkout";
import { ProfilePage, AuthPage, OrdersPage, OrderPage } from "./pages/Account";
import { ServicesPage, QuotePage, QuoteDone } from "./pages/Services";
import {
  HelpPage,
  AboutPage,
  ArticlePage,
  NotFound,
} from "./pages/Information";
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      "Falha ao renderizar a aplicação",
      error,
      info.componentStack,
    );
  }
  render() {
    return this.state.error ? (
      <main className="container page">
        <h1>Não foi possível abrir esta página</h1>
        <p>Tente recarregar o site.</p>
        <button
          className="button primary"
          onClick={() => window.location.reload()}
        >
          Recarregar
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="catalogo" element={<CatalogPage />} />
              <Route path="categoria/:category" element={<CatalogPage />} />
              <Route path="produto/:id" element={<ProductPage />} />
              <Route path="explorar" element={<ExplorePage />} />
              <Route path="pesquisa" element={<SearchPage />} />
              <Route path="favoritos" element={<FavoritesPage />} />
              <Route path="carrinho" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="checkout/concluido" element={<CheckoutDone />} />
              <Route path="perfil" element={<ProfilePage />} />
              <Route path="login" element={<AuthPage />} />
              <Route path="cadastro" element={<AuthPage register />} />
              <Route path="pedidos" element={<OrdersPage />} />
              <Route path="pedidos/:id" element={<OrderPage />} />
              <Route path="servicos" element={<ServicesPage />} />
              <Route path="orcamento" element={<QuotePage />} />
              <Route path="orcamento/concluido" element={<QuoteDone />} />
              <Route path="ajuda" element={<HelpPage />} />
              <Route path="sobre" element={<AboutPage />} />
              {[
                "privacidade",
                "termos",
                "trocas",
                "entregas",
                "trabalhe-conosco",
              ].map((k) => (
                <Route key={k} path={k} element={<ArticlePage kind={k} />} />
              ))}
              <Route
                path="ofertas"
                element={<Navigate to="/catalogo?ordem=menor-preco" replace />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
