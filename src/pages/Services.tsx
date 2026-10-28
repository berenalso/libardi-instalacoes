import { useState, type FormEvent } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Zap,
  Wrench,
  Building2,
  LayoutGrid,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Page, Notice } from "../components/UI";
import { services } from "../data/services";
export function ServicesPage() {
  const icons = [Zap, Building2, Wrench, LayoutGrid, Lightbulb, ShieldCheck];
  return (
    <Page
      title="Serviços de instalação elétrica"
      subtitle="Materiais e soluções para sua casa ou empresa."
    >
      <Notice>
        Catálogo demonstrativo. Valores de exemplo; nenhum agendamento é
        realizado por este site.
      </Notice>
      <h2>Tipos de serviço</h2>
      <div className="services-grid">
        {services.map((s, i) => {
          const Icon = icons[i];
          return (
            <article className="panel service-card" key={s.name}>
              <Icon size={32} />
              <h2>{s.name}</h2>
              <p>{s.description}</p>
              <strong>{s.price}</strong>
              <Link
                className="button primary"
                to={"/orcamento?servico=" + encodeURIComponent(s.name)}
              >
                Solicitar orçamento
              </Link>
            </article>
          );
        })}
      </div>
      <h2 className="spaced">Como funciona</h2>
      <div className="steps">
        {[
          [
            "1",
            "Solicite o orçamento",
            "Descreva o serviço, o endereço e a data que prefere.",
          ],
          [
            "2",
            "Visita técnica",
            "Na operação real, a equipe avalia o local e prepara uma proposta.",
          ],
          [
            "3",
            "Execução",
            "O serviço depende de orçamento aprovado e disponibilidade.",
          ],
        ].map(([n, t, d]) => (
          <div className="panel" key={n}>
            <span className="step-number">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}
export function QuotePage() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (!/^\d{10,11}$/.test(String(d.get("phone")).replace(/\D/g, ""))) {
      setError("Informe um telefone válido com DDD.");
      return;
    }
    if (!/^\d{8}$/.test(String(d.get("cep")).replace(/\D/g, ""))) {
      setError("Informe um CEP com 8 dígitos.");
      return;
    }
    if (String(d.get("description")).trim().length < 15) {
      setError("Descreva sua necessidade com pelo menos 15 caracteres.");
      return;
    }
    nav("/orcamento/concluido");
  }
  return (
    <Page title="Solicitar orçamento" subtitle="Conte o que você precisa.">
      <div className="checkout-grid">
        <form className="panel form-panel" onSubmit={submit}>
          <Notice>
            Envio demonstrativo. Use dados fictícios: o formulário não envia
            informações nem agenda visitas.
          </Notice>
          <label>
            Nome completo
            <input name="name" required minLength={3} maxLength={100} />
          </label>
          <div className="form-row">
            <label>
              Telefone / WhatsApp
              <input
                name="phone"
                type="tel"
                required
                maxLength={20}
                placeholder="(51) 99999-9999"
              />
            </label>
            <label>
              E-mail
              <input name="email" type="email" required maxLength={200} />
            </label>
          </div>
          <label>
            Serviço
            <select
              name="service"
              defaultValue={
                services.some((s) => s.name === params.get("servico"))
                  ? params.get("servico")!
                  : services[0].name
              }
            >
              {services.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>
            Data preferida (opcional)
            <input
              name="date"
              type="date"
              min={new Intl.DateTimeFormat("en-CA", {
                timeZone: "America/Sao_Paulo",
              }).format(new Date())}
            />
          </label>
          <label>
            Endereço
            <input
              name="address"
              required
              minLength={5}
              maxLength={200}
              placeholder="Rua, número e complemento"
            />
          </label>
          <label>
            CEP
            <input
              name="cep"
              inputMode="numeric"
              required
              placeholder="00000-000"
              maxLength={9}
            />
          </label>
          <label>
            Descrição da necessidade
            <textarea
              name="description"
              required
              minLength={15}
              maxLength={2000}
              rows={5}
              placeholder="Descreva o serviço de que você precisa..."
            />
          </label>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <div className="actions">
            <Link className="button outline" to="/servicos">
              Cancelar
            </Link>
            <button className="button primary">
              Validar solicitação demonstrativa
            </button>
          </div>
        </form>
        <aside className="panel">
          <h2>Como funciona</h2>
          <ol className="process-list">
            <li>
              <strong>Você descreve a necessidade</strong>
              <p>Com os detalhes do serviço e endereço.</p>
            </li>
            <li>
              <strong>A equipe avalia</strong>
              <p>O envio real depende de uma integração de atendimento.</p>
            </li>
            <li>
              <strong>Você recebe uma proposta</strong>
              <p>Somente após contato real e avaliação do serviço.</p>
            </li>
          </ol>
          <Link className="button secondary" to="/ajuda">
            Central de ajuda
          </Link>
        </aside>
      </div>
    </Page>
  );
}
export function QuoteDone() {
  return (
    <Page title="Solicitação demonstrativa">
      <div className="panel success">
        <CheckCircle2 size={48} />
        <h2>Formulário validado</h2>
        <p>
          Nenhuma solicitação foi enviada à Libardi. Não houve agendamento,
          geração de protocolo real ou promessa de retorno.
        </p>
        <div className="actions">
          <Link className="button primary" to="/servicos">
            Ver serviços
          </Link>
          <Link className="button outline" to="/">
            Voltar para a Home
          </Link>
        </div>
      </div>
    </Page>
  );
}
