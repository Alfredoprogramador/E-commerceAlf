"use client";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/components/cart/CartContext";
import { useState } from "react";

export function Header() {
  const { data: session } = useSession();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label="AlfShop - Página inicial"
          >
            AlfShop
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Navegação principal"
          >
            <Link
              href="/products"
              className="text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
            >
              Produtos
            </Link>
            <Link
              href="/products?category=eletronicos"
              className="text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
            >
              Eletrônicos
            </Link>
            <Link
              href="/products?category=moda"
              className="text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
            >
              Moda
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              aria-label="Buscar produtos"
            >
              <Search size={20} aria-hidden="true" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              aria-label={`Carrinho de compras, ${count} itens`}
            >
              <ShoppingCart size={20} aria-hidden="true" />
              {count > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  aria-hidden="true"
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label="Menu do usuário"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <User size={20} aria-hidden="true" />
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 border border-gray-100"
                  role="menu"
                  aria-label="Opções de conta"
                >
                  {session?.user ? (
                    <>
                      <p className="px-4 py-2 text-sm text-gray-500 border-b">
                        {session.user.name || session.user.email}
                      </p>
                      <Link
                        href="/account"
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Minha Conta
                      </Link>
                      <Link
                        href="/account/orders"
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Meus Pedidos
                      </Link>
                      <button
                        role="menuitem"
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        onClick={() => {
                          setUserMenuOpen(false);
                          signOut();
                        }}
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Entrar
                      </Link>
                      <Link
                        href="/auth/register"
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Cadastrar
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav
            className="md:hidden py-3 border-t border-gray-100"
            aria-label="Navegação mobile"
          >
            {[
              { href: "/products", label: "Produtos" },
              { href: "/products?category=eletronicos", label: "Eletrônicos" },
              { href: "/products?category=moda", label: "Moda" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-gray-600 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
