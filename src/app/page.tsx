import Link from "next/link";

const categorias = [
  {
    titulo: "Tecnologia",
    descricao: "Acessorios inteligentes para produtividade e lazer.",
    href: "/products?category=eletronicos",
  },
  {
    titulo: "Moda Urbana",
    descricao: "Pecas atuais para um estilo autentico todos os dias.",
    href: "/products?category=moda",
  },
  {
    titulo: "Casa & Conforto",
    descricao: "Itens funcionais para deixar seu espaco mais acolhedor.",
    href: "/products?category=casa",
  },
  {
    titulo: "Esportes",
    descricao: "Performance e bem-estar com curadoria de alta qualidade.",
    href: "/products?category=esportes",
  },
];

const destaques = [
  { nome: "Smartwatch Pulse X", preco: "R$ 499,90", selo: "Frete gratis" },
  { nome: "Jaqueta Orbit", preco: "R$ 289,90", selo: "Novo" },
  { nome: "Fone AirBeat Pro", preco: "R$ 359,90", selo: "Mais vendido" },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="hero-card fade-up overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-teal-900 uppercase">
              Nova colecao primavera 2026
            </p>
            <h1 className="text-4xl leading-tight font-semibold text-[#1b2f29] sm:text-5xl lg:text-6xl">
              Seu estilo, sua rotina, sua loja online.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#2f463f] sm:text-lg">
              Descubra produtos selecionados com design premium, entrega rapida
              e ofertas que fazem sentido para o seu dia a dia.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
              >
                Explorar vitrine
              </Link>
              <Link
                href="/products?category=eletronicos"
                className="inline-flex items-center justify-center rounded-full border border-[#24473f] bg-white/70 px-6 py-3 text-sm font-semibold text-[#17332d] transition-colors hover:bg-white"
              >
                Ver ofertas do dia
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Frete gratis acima de R$ 199",
              "Troca descomplicada em 7 dias",
              "Parcelamento em ate 10x",
              "Curadoria semanal de novidades",
            ].map((item, index) => (
              <div
                key={item}
                className={`feature-tile fade-up rounded-2xl p-4 text-sm text-[#29433c] ${
                  index === 1
                    ? "stagger-1"
                    : index === 2
                      ? "stagger-2"
                      : index === 3
                        ? "stagger-3"
                        : ""
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-[#1d312b] sm:text-3xl">
            Categorias em destaque
          </h2>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#0f766e] hover:text-[#115e59]"
          >
            Ver tudo
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((categoria, index) => (
            <Link
              key={categoria.titulo}
              href={categoria.href}
              className={`feature-tile fade-up group rounded-2xl p-5 ${
                index === 1
                  ? "stagger-1"
                  : index === 2
                    ? "stagger-2"
                    : index === 3
                      ? "stagger-3"
                      : ""
              }`}
            >
              <p className="text-xs font-semibold tracking-[0.1em] text-[#c2410c] uppercase">
                Colecao
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[#1f342d] group-hover:text-[#0f766e]">
                {categoria.titulo}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#3d5650]">
                {categoria.descricao}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[#1d312b] sm:text-3xl">
          Produtos que estao em alta
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {destaques.map((produto, index) => (
            <article
              key={produto.nome}
              className={`feature-tile fade-up overflow-hidden rounded-2xl ${
                index === 1 ? "stagger-1" : index === 2 ? "stagger-2" : ""
              }`}
            >
              <div className="h-44 bg-gradient-to-br from-[#2a4f47] via-[#3f6f66] to-[#9bc7bf]" />
              <div className="space-y-3 p-5">
                <span className="inline-flex rounded-full bg-[#fce9dd] px-3 py-1 text-xs font-semibold text-[#b45309]">
                  {produto.selo}
                </span>
                <h3 className="text-xl font-semibold text-[#1c312a]">
                  {produto.nome}
                </h3>
                <p className="text-lg font-semibold text-[#0f766e]">{produto.preco}</p>
                <Link
                  href="/products"
                  className="inline-flex text-sm font-semibold text-[#17332d] underline decoration-[#17332d]/40 underline-offset-4 hover:decoration-[#17332d]"
                >
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-[#17332d] p-8 text-white sm:p-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-[#97d5cc] uppercase">
          Clube AlfShop
        </p>
        <h2 className="mt-3 text-3xl leading-tight font-semibold sm:text-4xl">
          Receba ofertas exclusivas e lancamentos antes de todo mundo.
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-[#d2eae5] sm:text-base">
          Junte-se ao nosso canal de novidades e ganhe um cupom de 10% na
          primeira compra.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#17332d]"
          >
            Criar conta
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white"
          >
            Continuar comprando
          </Link>
        </div>
      </section>
    </div>
  );
}
