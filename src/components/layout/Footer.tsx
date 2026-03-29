import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white text-xl font-bold mb-4">AlfShop</h2>
            <p className="text-sm text-gray-400">
              Sua loja online com os melhores produtos, preços e atendimento.
            </p>
          </div>
          <nav aria-label="Links rápidos">
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/products", label: "Produtos" },
                { href: "/cart", label: "Carrinho" },
                { href: "/account", label: "Minha Conta" },
                { href: "/account/orders", label: "Pedidos" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Categorias">
            <h3 className="text-white font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/products?category=eletronicos", label: "Eletrônicos" },
                { href: "/products?category=moda", label: "Moda" },
                { href: "/products?category=casa", label: "Casa" },
                { href: "/products?category=esportes", label: "Esportes" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-white font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 (11) 9999-9999</li>
              <li>📧 contato@alfshop.com.br</li>
              <li>🕐 Seg–Sex: 8h–18h</li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Aceitamos: Visa, Mastercard, Pix, Boleto
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AlfShop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
